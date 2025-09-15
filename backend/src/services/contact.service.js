const Contact = require("../models/contact.model");

exports.getContacts = async (userId) => {
    return Contact.find({ ownerId: userId });
};

exports.createContact = async (userId, data) => {
    const contact = new Contact({ ...data, ownerId: userId });
    return contact.save();
};

exports.updateContact = async (userId, id, data) => {
    const contact = await Contact.findOneAndUpdate(
        { _id: id, ownerId: userId },
        data,
        { new: true }
    );
    if (!contact) throw new Error("Contact introuvable ou non autorisé");
    return contact;
};

exports.deleteContact = async (userId, id) => {
    const contact = await Contact.findOneAndDelete({ _id: id, ownerId: userId });
    if (!contact) throw new Error("Contact introuvable ou non autorisé");
    return { message: "Contact supprimé" };
};
