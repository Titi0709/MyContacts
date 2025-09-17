import React, { useEffect, useState } from "react";

export default function HomePage({ onLogout }) {
    const [contacts, setContacts] = useState([]);
    const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({ firstName: "", lastName: "", phone: "" });

    const token = localStorage.getItem("token");

    const fetchContacts = async () => {
        const res = await fetch("https://mycontacts-mc5l.onrender.com/api/contacts", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.error) {
            localStorage.removeItem("token");
            onLogout();
        } else {
            setContacts(data);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addContact = async (e) => {
        e.preventDefault();
        await fetch("https://mycontacts-mc5l.onrender.com/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        });
        setForm({ firstName: "", lastName: "", phone: "" });
        fetchContacts();
    };

    const deleteContact = async (id) => {
        await fetch(`https://mycontacts-mc5l.onrender.com/api/contacts/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchContacts();
    };

    const startEdit = (contact) => {
        setEditId(contact._id);
        setEditForm({
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
        });
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const saveEdit = async (id) => {
        await fetch(`https://mycontacts-mc5l.onrender.com/api/contacts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editForm),
        });
        setEditId(null);
        fetchContacts();
    };

    return (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h2>Mes Contacts</h2>

            <button
                style={{ marginBottom: "20px" }}
                onClick={() => {
                    localStorage.removeItem("token");
                    onLogout();
                }}
            >
                Déconnexion
            </button>


            <form onSubmit={addContact} style={{ marginBottom: "20px" }}>
                <input
                    name="firstName"
                    placeholder="Prénom"
                    value={form.firstName}
                    onChange={handleChange}
                    style={{ display: "block", margin: "10px auto" }}
                />
                <input
                    name="lastName"
                    placeholder="Nom"
                    value={form.lastName}
                    onChange={handleChange}
                    style={{ display: "block", margin: "10px auto" }}
                />
                <input
                    name="phone"
                    placeholder="Téléphone"
                    value={form.phone}
                    onChange={handleChange}
                    style={{ display: "block", margin: "10px auto" }}
                />
                <button type="submit">Ajouter</button>
            </form>


            <div>
                {contacts.map((c) => (
                    <div key={c._id} style={{ marginBottom: "10px" }}>
                        {editId === c._id ? (
                            <>
                                <input
                                    name="firstName"
                                    value={editForm.firstName}
                                    onChange={handleEditChange}
                                    style={{ margin: "5px" }}
                                />
                                <input
                                    name="lastName"
                                    value={editForm.lastName}
                                    onChange={handleEditChange}
                                    style={{ margin: "5px" }}
                                />
                                <input
                                    name="phone"
                                    value={editForm.phone}
                                    onChange={handleEditChange}
                                    style={{ margin: "5px" }}
                                />
                                <button onClick={() => saveEdit(c._id)}>Enregistrer</button>
                                <button onClick={() => setEditId(null)}>Annuler</button>
                            </>
                        ) : (
                            <>
                                <span>
                                    {c.firstName} {c.lastName} - {c.phone}
                                </span>
                                <button onClick={() => startEdit(c)} style={{ marginLeft: "10px" }}>
                                    Éditer
                                </button>
                                <button onClick={() => deleteContact(c._id)} style={{ marginLeft: "5px" }}>
                                    Supprimer
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
