const API_URL = "http://localhost:3000/api/auth";

// ---------------------------------------------------------
// Connexion
// ---------------------------------------------------------

export async function login(
    email: string,
    password: string
) {
    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Erreur de connexion"
        );
    }

    return data;
}

// ---------------------------------------------------------
// Inscription
// ---------------------------------------------------------

export type RegisterData = {
    name: string;
    email: string;
    password: string;
};

export async function register(
    user: RegisterData
) {
    const response = await fetch(
        `${API_URL}/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Impossible de créer le compte."
        );
    }

    return data;
}