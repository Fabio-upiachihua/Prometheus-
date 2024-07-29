# Usa la imagen oficial de Node.js como base
FROM node:18

# Crea y define el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo de dependencias y el archivo de código al contenedor
COPY package*.json ./
COPY index.js ./

# Instala las dependencias
RUN npm install

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 8080

# Define el comando para ejecutar la aplicación
CMD ["node", "index.js"]
