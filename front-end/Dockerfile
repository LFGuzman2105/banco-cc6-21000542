# Etapa 1: Construcción de la aplicación Angular
FROM node:20 AS build

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias de Angular y Node.js
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Angular para producción
RUN npm run build -- --configuration production

# Etapa 2: Configuración del servidor en Node.js para SSR o servir archivos estáticos
FROM node:20 AS runtime

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Instalar solo las dependencias necesarias para producción
COPY package*.json ./
RUN npm install --production

# Copiar los archivos construidos desde la etapa 1
COPY --from=build /usr/src/app/dist ./dist

# Exponer el puerto que usará la aplicación
EXPOSE 4000

# Comando por defecto para servir la aplicación
CMD ["npm", "run", "serve:ssr:front-end"]