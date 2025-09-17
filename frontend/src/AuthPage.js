import React, { useState } from "react";

export default function AuthPage({ onLogin }) {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [isRegister, setIsRegister] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegister
            ? "https://mycontacts-mc5l.onrender.com/api/auth/register"
            : "https://mycontacts-mc5l.onrender.com/api/auth/login";


        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            onLogin();
        } else if (data.message && isRegister) {
            setSuccessMessage("Inscription faite, vous pouvez vous connecter");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h2>{isRegister ? "Inscription" : "Connexion"}</h2>

            {successMessage && (
                <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
            )}

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                {isRegister && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Nom"
                        onChange={handleChange}
                        style={{ display: "block", margin: "10px auto" }}
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    style={{ display: "block", margin: "10px auto" }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                    style={{ display: "block", margin: "10px auto" }}
                />
                <button type="submit">
                    {isRegister ? "S'inscrire" : "Se connecter"}
                </button>
            </form>

            <button onClick={() => {
                setIsRegister(!isRegister);
                setSuccessMessage("");
            }}>
                {isRegister
                    ? "Déjà inscrit ? Connexion"
                    : "Pas encore de compte ? Inscription"}
            </button>
        </div>
    );
}
