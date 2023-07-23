from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from llm.chain import init_everything
import threading

app = Flask(__name__, static_folder='client/build', static_url_path='')

# Enable CORS for all routes
CORS(app)


# init the vector DB in a separate thread
def run_in_background():
    print("=== Call init everything")
    init_everything()

@app.route('/api/prompt', methods=['POST'])
def handle_prompt():
    
    data = request.json
    prompt_text = data.get('prompt', '')

    """
    HERE: We have the input from the frontend. Call LLM processing
    and return the data in response_text  
    """

    response_text = f"LLM processed output: {prompt_text}"

    return jsonify({'response': response_text})

@app.route('/')
def index():

    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    threading.Thread(target=run_in_background).start()
    app.run(debug=True)