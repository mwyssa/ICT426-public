import express from "express";
import { authenticateToken } from "../middleware/auth_middleware.js";
import { getFamilyMember, createFamily, updateFamilyName } from "../models/family_model.js";

const router = express.Router();

// Récupérer tous les membres de la famille (family id)
router.get("/:id", async (req, res) =>{
    try {
            const id = parseInt(req.params.id);
    
            const members = await getFamilyMember(id);
    
            if (!members) {
                return res.status(404).json({
                    error: "NOT_FOUND",
                    message: "Aucun membre de la famille trouvé."
                });
            }
    
            return res.json(members);
    
        } catch (error) {
    
            return res.status(500).json({
                error: "INTERNAL_SERVER_ERROR",
                message: "Erreur lors de la récupération des membres de la famille."
            });
        }
});

// Créer une famille + rendre le user admin (user id)
router.post("/create/:userId", async (req,res) =>{
    try {
        const id = Number(req.params.userId);
        const { familyName } = req.body;
        if (!familyName) {
            return res.status(400).json({
                error: "BAD_REQUEST",
                message: "Le nom de la famille est requis."
            });
        }
        if (id <= 0 || !Number.isInteger(id)) {
            return res.status(400).json({
                error: "BAD_REQUEST",
                message: "L'identifiant de l'utilisateur doit être un entier positif."
            });
        }
        const familyId = await createFamily(id, familyName);
        return res.status(201).json({ id: familyId });
    } catch (error) {
        // Gestion des erreurs spécifiques
        if (error.message === "Aucun autre administrateur n'existe dans la famille. Vous ne pouvez pas créer une nouvelle famille.") {
            return res.status(400).json({
                error: "BAD_REQUEST",
                message: error.message
            });
        }
        else{
            return res.status(500).json({
            error: "INTERNAL_SERVER_ERROR",
            message: "Erreur lors de la création de la famille."
            });
        }
    }
});

// Modifier le nom de la famille (family id, user id)
router.put("/update/:familyId/:userId", async (req, res) => {
    try {
        const familyId = parseInt(req.params.familyId);
        const userId = parseInt(req.params.userId);
        const { familyName } = req.body;
        if (!familyName) {
            return res.status(400).json({
                error: "BAD_REQUEST",
                message: "Le nom de la famille est requis."
            });
        }
        if (familyId <= 0 || !Number.isInteger(familyId)) {
            return res.status(400).json({
                error: "BAD_REQUEST",
                message: "L'identifiant de la famille doit être un entier positif."
            });
        }
        if (userId <= 0 || !Number.isInteger(userId)) {
            return res.status(400).json({
                error: "BAD_REQUEST",
                message: "L'identifiant de l'utilisateur doit être un entier positif."
            });
        }
        const result = await updateFamilyName(familyId, userId, familyName);
        if (result){
            return res.json({
                message: "Nom de la famille mis à jour avec succès."
            });
        }
    } catch (error) {
        // Gestion des erreurs spécifiques --> s'affiche pas mais bon
        if (error.error === "FORBIDDEN") {
            return res.status(403).json({
                error: error.error,
                message: error.message
            });
        }
        else{
            return res.status(500).json({
                error: "INTERNAL_SERVER_ERROR",
                message: "Erreur lors de la mise à jour du nom de la famille."
            });
        }
    }
});

export default router;