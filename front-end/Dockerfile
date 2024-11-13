#imagem base
FROM node:20 as build
#criar um "pastas"
WORKDIR /app
##Copiar os arquivos de config
COPY  package*.json ./
RUN npm install
COPY . . 
RUN npm run build
##Inicializar o nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80