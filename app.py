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
from llm.llm_utils import *


api_key = os.environ.get('OPENAI_API_KEY')
org_key  = os.environ.get('OPENAI_ORG_ID')
pinecone_key = os.environ.get("PINECONE_API_KEY")

app = Flask(__name__, static_folder='client/build', static_url_path='')

load_dotenv()

#prompt templates
description_template = PromptTemplate(
    input_variables = ['description'],
    template = """act as prospective real state buyer. 
    Here is little bit of information about you : {description}. Write a small 200 word paragraph describing your ideal home"""
)
#memory
description_memory = ConversationBufferMemory(input_key='description', memory_key='chat_history')

#llms
llm = OpenAI(openai_api_key=api_key,openai_organization=org_key, temperature=0.5)
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

    # description = description_chain.run(prompt_text)

    and return the data in response_text  
    """

    description = description_chain.run(prompt_text)

    listings  = queries(description)

    response_text = f"LLM processed output:"
 
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