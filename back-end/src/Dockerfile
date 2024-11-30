# Usar la imagen oficial de Node.js versión 20
FROM node:20

# Crear y establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que corre tu aplicación (por ejemplo, 3000)
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]