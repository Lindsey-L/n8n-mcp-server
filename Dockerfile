FROM node:20-slim
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY index.js ./

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "index.js"]
