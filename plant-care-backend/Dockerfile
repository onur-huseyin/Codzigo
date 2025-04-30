# Temel image
FROM node:18

# Çalışma dizini oluştur
WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# Tüm dosyaları kopyala
COPY . .

# Build al
RUN npm run build

# Portu expose et
EXPOSE 5000

# Uygulamayı başlat
CMD ["npm", "start"] 