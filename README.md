# React + Python starter kit
A simple, boilerplate for building web apps with a React front-end and a Python Flask back-end.

Architecture Considerations This setup assumes your Flask server is configured to serve the React build files as static assets, typically from a /build directory. The Flask app likely has routes for your API endpoints and a catch-all route that serves the React app's index.html for client-side routing. The container exposes port 5000, which is Flask's default development port, though you might want to consider using a production WSGI server like Gunicorn for actual deployment.

**Architecture**

This Flask server code perfectly complements the multi-stage Dockerfile you showed earlier. It's designed to serve as a **hybrid web server** that handles both API requests and static file serving for the React frontend. Let me break down how this architecture works and address the import issues you're seeing.

**Core Architecture Pattern**
The server implements a common full-stack deployment pattern where a single Flask application serves both your API endpoints and the built React application. The `BUILD_DIR` variable points to the React build output that gets copied from the first Docker stage. This creates a unified deployment where users hit one URL but get both frontend and backend functionality.

**Static File Serving Strategy**
The routing setup is particularly clever. The root route (`/`) serves the React app's `index.html`, while the catch-all route (`/<path:path>`) implements a **fallback mechanism**. It first tries to serve the requested file from the build directory (CSS, JS, images, etc.), but if the file doesn't exist, it falls back to serving `index.html`. This is essential for client-side routing - when users navigate to `/dashboard` or `/profile`, there's no actual file at that path, so the server serves the React app which then handles the routing internally.

**CORS and API Integration**
The `CORS(app)` call enables cross-origin requests, which is crucial during development when your React dev server (typically on port 3000) needs to communicate with your Flask API (on port 5000). The `chigu_api` blueprint suggests your actual API endpoints are organized in a separate module, keeping the server code clean and focused on the serving logic.

**Development vs Production Considerations**
The `host='0.0.0.0'` setting allows the server to accept connections from any IP address, which is necessary for Docker containers. However, in production, you'd typically want to use a more robust WSGI server like Gunicorn instead of Flask's built-in development server.
CORS and API Integration The CORS(app) call enables cross-origin requests, which is crucial during development when your React dev server (typically on port 3000) needs to communicate with your Flask API (on port 5000). The chigu_api blueprint suggests your actual API endpoints are organized in a separate module, keeping the server code clean and focused on the serving logic.

Development vs Production Considerations The host='0.0.0.0' setting allows the server to accept connections from any IP address, which is necessary for Docker containers. However, in production, you'd typically want to use a more robust WSGI server like Gunicorn instead of Flask's built-in development server.

Docker build and push to docker hub 

```
docker build -t bluekandil/docx:latest .
docker push bluekandil/docx
```

This Dockerfile implements a **multi-stage build** pattern to create a containerized full-stack application that combines a React frontend with a Flask backend. This approach is particularly efficient because it allows you to build the frontend assets in one stage and then copy only the production-ready files to the final image, keeping it lean.

**Stage 1: Frontend Build Process**
The first stage uses the `node:18` image to build the React application. It starts by copying only the `package.json` and `package-lock.json` files first, then running `npm install`. This leverages Docker's layer caching - if your dependencies haven't changed, Docker can skip reinstalling them on subsequent builds. After installing dependencies, it copies the entire frontend source code and runs `npm run build` to create the production-optimized bundle.

**Stage 2: Production Runtime**
The second stage switches to a much smaller `python:3.10-slim` base image for the final container. It installs the Python dependencies from requirements.txt, copies the Flask server code (server.py), and crucially uses `COPY --from=front-end-build` to grab the built React assets from the first stage. This is the key benefit of multi-stage builds - you get the compiled frontend without carrying the entire Node.js toolchain in your final image.
