import openai, pinecone
import json
import os 


api_key = os.environ.get('OPENAI_API_KEY')
pinecone_key = os.environ.get("PINECONE_API_KEY")

def queries(prompt):

    openai.api_key = api_key 

    pinecone.init(api_key=pinecone_key,
                  environment='us-west4-gcp-free')
    index = pinecone.Index('hacktest')

    minPrice = 0
    maxPrice = 500000
    xq = openai.Embedding.create(input=prompt, engine='text-embedding-ada-002')['data'][0]['embedding']
    res = index.query([xq], 
                      filter = {
                          "Price": {"$gte": minPrice, "$lte": maxPrice},
                          },
                      top_k=3,
                    include_metadata=True)
    listings = {}
    idx = 1
    for result in res['matches']:
         
        id  = int(result['id'])
        listings[f'listing-{idx}'] = get_json_file('./llm/data', id)
        idx=idx +1

    return listings


def get_json_file(dataset_path, id):

        for file in os.listdir(dataset_path):
            if file.endswith('.json'):
                with open(os.path.join(dataset_path, file), 'r') as f:

                    data = json.load(f)
                    if data['Id'] == id:
                        return data
                    
        return None

if __name__ == '__main__':
    queries()
    
