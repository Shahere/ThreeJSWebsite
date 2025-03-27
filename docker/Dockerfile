# Utiliser une image Node.js légère
FROM node:20-alpine 

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json depuis la racine
COPY ../package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers depuis la racine
COPY ../ ./

# Exposer le port utilisé par Vite (par défaut 5173)
EXPOSE 5173

# Lancer l’application
CMD ["npm", "start"]
