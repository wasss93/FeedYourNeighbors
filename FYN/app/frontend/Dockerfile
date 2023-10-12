# Utilisez une image Node.js en tant qu'image de base
FROM node:lts-alpine

# Définissez le répertoire de travail à l'intérieur du conteneur
WORKDIR /app/frontend

# Exposez le port de développement (facultatif)
EXPOSE 3000

# Copiez package.json et package-lock.json dans le conteneur
COPY package*.json ./


# Install project dependencies
RUN yarn install
RUN npm install
RUN npm install -g expo-cli@5.4.4
RUN npm install -g react-native-cli@2.0.1
RUN npm install -g react-native@0.64.2
RUN npm install -g react-native-webview@11.6.2


# Copy the rest of the application code to the container
COPY . .

# Define the command to start your React Native application

CMD ["npm", "start"]
