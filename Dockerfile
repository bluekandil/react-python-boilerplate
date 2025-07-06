# Stage 1: Build React front-end
FROM node:18 AS front-end-build

WORKDIR /app
COPY front-end/package*.json ./front-end/
RUN cd front-end && npm install
COPY front-end ./front-end
ENV FLASK_ENV=production
RUN cd front-end && npm run build

# Stage 2: Serve with Flask
FROM python:3.10-slim

# Set working directory in final image
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask backend
COPY server.py .
COPY api ./api

# Copy React build from frontend stage
COPY --from=front-end-build /app/front-end/build ./build

# Expose Flask port
EXPOSE 5000

# Start Flask
CMD ["python", "server.py"]
