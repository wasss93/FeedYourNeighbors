# Utilisez une image Node.js en tant qu'image de base
FROM node:16

# Définissez le répertoire de travail à l'intérieur du conteneur
WORKDIR /app/frontend

#for mac users
# RUN groupadd -r node && useradd -m -r -g node node
# USER node

# Exposez le port de développement (facultatif)
EXPOSE 19000

# Copiez package.json et package-lock.json dans le conteneur
COPY package*.json ./


# Install project dependencies
RUN yarn install
RUN npm installa

# Copy the rest of the application code to the container
COPY . .

# Define the command to start your React Native application

CMD ["npm", "start"]
