const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async ({ name, email, password }) => {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email déja existant");

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    return { message: "Uti créé" };
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Uti introuvable");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Mot de passe incorrect");

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { message: "Connexion réussie", token };
};
