# Usa una imagen de Node con soporte para TypeScript
FROM node:20

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del proyecto
COPY . .

# Ejecuta tests y genera cobertura
CMD ["npm", "run", "test"]
