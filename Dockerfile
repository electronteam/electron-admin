## Stage 1 - build the "deployable package"
FROM node:12.2.0-alpine as electron-admin
WORKDIR /electron-admin

# Step 1 - download all package dependencies first.
# Redownload dependencies only when packages change.
COPY package.json package-lock.json ./
RUN npm install

# Step 2 - Copy all source and run build
COPY . ./
RUN npm run build

## Stage 2 - build a minimal image with the "deployable package"
FROM nginx:1.16.0-alpine
COPY --from=electron-admin /electron-admin/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]