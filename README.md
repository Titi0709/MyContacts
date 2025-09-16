# 📇 MyContacts – Carnet de Contacts Fullstack

Projet fil rouge EFREI – Module Fullstack JS (React + Node/Express + MongoDB + Auth JWT)

---

## 🚀 Fonctionnalités

- Authentification sécurisée (JWT)
- CRUD complet des contacts (Create, Read, Update, Delete)
- API documentée avec Swagger
- Frontend React simple (login/register + gestion des contacts)
- Séparation frontend (`/frontend`) et backend (`/backend`)
- Déploiement possible (Heroku / Render / Railway / Vercel)

---

## 🛠️ Technologies utilisées

- **Backend :**
  - Node.js / Express
  - MongoDB + Mongoose
  - JSON Web Token (JWT) pour l’auth
  - Swagger pour la doc API

- **Frontend :**
  - React (Hooks, useState, useEffect)
  - Fetch API pour appeler le backend

---

## 📂 Structure du projet

/backend → API Node/Express (auth + contacts + Swagger)
/frontend → Application React (login + gestion contacts)
README.md → Documentation globale

yaml
Copier le code


---


## 📝 PS – Ressources utilisées

Durant le développement de ce projet, je me suis appuyé sur différentes documentations et tutoriels pour comprendre certaines notions et structurer le code :

### 🔧 Backend
- [Express.js Documentation](https://expressjs.com/) – Mise en place du serveur et des routes.
- [Node.js Docs](https://nodejs.org/en/docs) – Compréhension des modules et du fonctionnement asynchrone.
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html) – Création de schémas et gestion des modèles MongoDB.
- [MongoDB Atlas Guide](https://www.mongodb.com/docs/atlas/) – Connexion à une base MongoDB dans le cloud.
- [bcrypt npm](https://www.npmjs.com/package/bcrypt) – Hashage sécurisé des mots de passe.
- [jsonwebtoken npm](https://www.npmjs.com/package/jsonwebtoken) – Génération et vérification de tokens JWT.
- [Swagger OpenAPI Documentation](https://swagger.io/docs/) – Écriture des commentaires `@swagger` et génération de la doc API.
- Articles Stack Overflow pour résoudre des erreurs fréquentes (middleware JWT, erreurs Mongoose, codes de statut HTTP).

### 🎨 Frontend
- [React Documentation](https://react.dev/) – Hooks (`useState`, `useEffect`), gestion des formulaires, état local.
- [Fetch API – MDN](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API) – Requêtes HTTP côté frontend.
- [React conditional rendering](https://react.dev/learn/conditional-rendering) – Afficher soit AuthPage soit HomePage selon l’état `isLogged`.
- Discussions Stack Overflow pour gérer l’édition inline dans une liste et la mise à jour de state avec `setForm`.



⚠️ Certains extraits de code (middlewares JWT, configuration Swagger, structure MVC Express) ont été adaptés à partir de ressources disponibles sur des blogs techniques, la documentation officielle, et des réponses Stack Overflow.


---

## ⚙️ Installation & Lancement

### 1. Cloner le repo
```bash
git clone https://github.com/Titi0709/MyContacts.git
cd MyContacts
2. Backend
bash
Copier le code
cd backend
npm install
npm start
Le backend tourne sur http://localhost:5000

3. Frontend
Dans un autre terminal :

bash
Copier le code
cd frontend
npm install
npm start
Le frontend tourne sur http://localhost:3000

🔑 Variables d’environnement
Créer un fichier .env dans /backend :

env
Copier le code
PORT=5000
MONGO=mongodb+srv://<user>:<password>@cluster/mycontacts
JWT_SECRET=blblablatitibouboubou
📖 Documentation API (Swagger)
Une fois le backend lancé, la doc Swagger est dispo sur :
👉 http://localhost:5000/api-docs

Exemples de routes :

POST /api/auth/register → créer un utilisateur

POST /api/auth/login → se connecter et obtenir un token JWT

GET /api/contacts → lister les contacts de l’utilisateur connecté

POST /api/contacts → ajouter un contact

PATCH /api/contacts/:id → modifier un contact

DELETE /api/contacts/:id → supprimer un contact

✅ Tests
Utiliser Swagger (http://localhost:5000/api-docs) pour tester directement les routes.

Ou Postman / Thunder Client.

Côté frontend : tester via les pages Login / Register / Home.

📦 Déploiement
Backend → Render 

Frontend →  Netlify

Prévoir d’ajuster les variables d’environnement (MONGO, JWT_SECRET, PORT) selon la plateforme choisie.
