const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const authenticateToken = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Gestion des contacts (CRUD)
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Récupérer tous les contacts de l'utilisateur connecté
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 */
router.get("/", authenticateToken, contactController.getContacts);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Créer un nouveau contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               phone:
 *                 type: string
 *                 example: "0612345678"
 *     responses:
 *       201:
 *         description: Contact créé
 */
router.post("/", authenticateToken, contactController.createContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   patch:
 *     summary: Mettre à jour partiellement un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "0707070707"
 *     responses:
 *       200:
 *         description: Contact mis à jour
 *       404:
 *         description: Contact introuvable
 */
router.patch("/:id", authenticateToken, contactController.updateContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact supprimé
 *       404:
 *         description: Contact introuvable
 */
router.delete("/:id", authenticateToken, contactController.deleteContact);

module.exports = router;
