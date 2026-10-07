import pool from "../db/db.js";

// Récupérer les membres d'une même famille
export async function getFamilyMember(familyId){
    const [rows] = await pool.execute(
        `
        SELECT
            name,
            role
        FROM Users
        WHERE family_id = ?
        `,
        [
            familyId
        ]
    );

    return rows;
}

// Créer une famille et rendre le user admin
export async function createFamily(userId, familyName) {
    const connection = await pool.getConnection();

    // Vérifier si l'utilisateur possède déjà une famille
    const [existingFamily] = await connection.execute(
        `
        SELECT family_id FROM Users WHERE id = ?
        `,
        [userId]
    );

    // Si l'utilisateur a déjà une famille, vérifier qu'il y a un autre admin dans cette famille
    if (existingFamily.length > 0 && existingFamily[0].family_id !== null)
    {
        // Vérifier que la famille de l'utilisateur a un autre admin que lui-même
        const [existingAdmin] = await connection.execute(
            `
            SELECT id FROM Users WHERE family_id = ? AND role = ? AND id != ?
            `,
            [
                existingFamily[0].family_id,
                "admin",
                userId
            ]
        );

        // Si aucun autre admin n'existe, on ne peut pas créer une nouvelle famille
        if (existingAdmin.length === 0) {
            throw new Error("Aucun autre administrateur n'existe dans la famille. Vous ne pouvez pas créer une nouvelle famille.");
        }
    }

    try {
        // préprarer une transaction
        await connection.beginTransaction();

        // Création de la famille
        const [familyResult] = await connection.execute(
            `
            INSERT INTO Families (name)
            VALUES (?)
            `,
            [familyName]
        );

        const familyId = familyResult.insertId;

        // Attribution au user + admin
        const [updateResult] = await connection.execute(
            `
            UPDATE Users
            SET family_id = ?, role = ?
            WHERE id = ?
            `,
            [familyId, "admin", userId]
        );

        if (updateResult.affectedRows === 0) {
            throw new Error("Utilisateur introuvable");
        }

        // validation de la transaction (tout est passé)
        await connection.commit();

        return familyId;

    } catch (error) {
        // Une partie de la transaction a échouée
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

// Modifier le nom de la famille si l'utilisateur est admin
export async function updateFamilyName(familyId, userId, familyName) {
    // Vérifier que l'utilisateur est admin de la famille
    const [isadmin] = await pool.execute(
        `
        SELECT role FROM Users WHERE id = ? AND family_id = ?
        `,
        [userId, familyId]
    );

    if (isadmin.length === 0 || isadmin[0].role !== "admin") {
        throw new Error(JSON.stringify({ error: "FORBIDDEN", message: "Vous n'êtes pas administrateur de cette famille." }));
    }
    else {
        const [result] = await pool.execute(
        `
        UPDATE Families
        SET name = ?
        WHERE id = ?
        `,
        [familyName, familyId]
    );
    }

    return result.affectedRows > 0;
}