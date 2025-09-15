const contactService = require("../services/contact.service");

exports.getContacts = async (req, res) => {
    try {
        const contacts = await contactService.getContacts(req.user.id);
        res.json(contacts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.createContact = async (req, res) => {
    try {
        const contact = await contactService.createContact(req.user.id, req.body);
        res.status(201).json(contact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateContact = async (req, res) => {
    try {
        const contact = await contactService.updateContact(req.user.id, req.params.id, req.body);
        res.json(contact);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const result = await contactService.deleteContact(req.user.id, req.params.id);
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};
