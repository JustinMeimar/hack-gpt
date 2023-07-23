from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from llm.justin_embeddings import init_everything
from dotenv import load_dotenv
import threading
import os
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SequentialChain 
from langchain.memory import ConversationBufferMemory

app = Flask(__name__, static_folder='client/build', static_url_path='')

load_dotenv()

#prompt templates
description_template = PromptTemplate(
    input_variables = ['description'],
    template = 'act as prospective real estate buyer. In addition to what you know already, my input : {description}. Modify the small 200 word paragraph you just wrote describing your ideal home'
)
#memory
description_memory = ConversationBufferMemory(input_key='description', memory_key='chat_history')

#llms
llm = OpenAI(temperature=0.5)
description_chain = LLMChain(llm=llm, prompt= description_template,verbose=True, output_key='description', memory=description_memory)

# Enable CORS for all routes
CORS(app)

# init the vector DB in a separate thread
def run_in_background():
    print("=== Call init everything")
    # init_everything()

@app.route('/api/prompt', methods=['POST'])
def handle_prompt():
    
    data = request.json
    prompt_text = data.get('prompt', '') 
    form_values = data.get('formValues', '')
    
    print("Form Values", form_values)
    print("prompt text", prompt_text)

    description = description_chain.run(prompt_text)

    # from llm.justin_embeddings import get_mock_listings 
    listing_1, listing_2, listing_3 = [None] * 3

    response_text = f"{description}"
    print(response_text)
 
    return jsonify({
        "text-response": response_text,
        "top-listings": {
            "listing-1": listing_1,
            "listing-2": listing_2,
            "listing-3": listing_3
        }     
    })

@app.route('/')
def index():

    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    threading.Thread(target=run_in_background).start()
    app.run(debug=True)