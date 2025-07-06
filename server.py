import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from api.model.app import chigu_api

# Path to the React build folder (copied to /app/build in Docker)
BUILD_DIR = os.path.join(os.path.dirname(__file__), 'build')

app = Flask(__name__, static_folder=BUILD_DIR, static_url_path='')
CORS(app)

# Register API blueprint
app.register_blueprint(chigu_api)


# Serve React index.html
@app.route('/')
def serve_index():
    return send_from_directory(BUILD_DIR, 'index.html')

# (Optional) Serve other static assets like CSS/JS
@app.route('/<path:path>')
def serve_static(path):
    file_path = os.path.join(BUILD_DIR, path)
    if os.path.exists(file_path):
        return send_from_directory(BUILD_DIR, path)
    else:
        return send_from_directory(BUILD_DIR, 'index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
