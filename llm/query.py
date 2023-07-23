import openai, pinecone, os,json
def make_query(query, min_price, max_price):
    openai.api_key = os.environ.get('OPENAI_API_KEY')
    pinecone.init(api_key=os.environ.get('PINECONE_API_KEY'),
             environment='us-west4-gcp-free')
    index = pinecone.Index('hacktest')
    xq = openai.Embedding.create(input=query, engine='text-embedding-ada-002')['data'][0]['embedding']
    res = index.query([xq], 
                      filter = {
                          "Price": {"$gte": min_price, "$lte": max_price},
                          },
                      top_k=3,
                      include_metadata=True)
    return res['matches']

def get_json(query, min_price, max_price):
    queries = make_query(query, min_price, max_price)
    print(queries)
    json_ids = [query['id']
                for query in queries]
    directory=os.path.join(os.path.dirname(__file__), 'data/')
    file_paths = [os.path.join(directory, f'listing-{json_id}.json') 
                 for json_id in json_ids]
    dataset = [] 
    for file_path in file_paths:
        with open(file_path, 'r') as f:
            data = json.load(f)
            dataset.append(data)
    return {"top-listings": {f'listing-{i+1}': data for i, data in enumerate(dataset)}}

def main():
    print(get_json(query='hi', min_price=0, max_price=10000000000000))

if __name__ == '__main__':
    main()


