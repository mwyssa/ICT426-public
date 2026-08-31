export async function login(email: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (
        email === "parent@test.ch" &&
        password === "1234"
    ) {
        return {
            success: true,
            token: "fake-jwt-token",
            user: {
                id: 1,
                role: "parent",
                email,
            },
        };
    }

    throw new Error("Identifiants incorrects");
}