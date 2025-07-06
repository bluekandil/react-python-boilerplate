from flask import Blueprint, jsonify

chigu_api = Blueprint('api', __name__, url_prefix='/api')


@chigu_api.route('/test', methods=['GET'])
def hello():
    return jsonify({'message': 'Chigu says bow wow!'})
