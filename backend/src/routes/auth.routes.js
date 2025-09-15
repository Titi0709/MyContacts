const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authenticateToken = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Thibault
 *               email:
 *                 type: string
 *                 example: thibault@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Erreur lors de la création
 */

router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur et génération d'un JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: thibault@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Connexion réussie + JWT
 *       400:
 *         description: Identifiants invalides
 */

router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/accueil:
 *   get:
 *     summary: Page protégée accessible uniquement avec un JWT valide
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé, retourne un message de bienvenue
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bienvenue thibault@mail.com"
 *       401:
 *         description: Token manquant
 *       403:
 *         description: Token invalide
 */
router.get("/accueil", authenticateToken, authController.accueil);

module.exports = router;
