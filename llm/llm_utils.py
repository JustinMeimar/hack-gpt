import openai
import pinecone
from datasets import load_dataset
import os
from dotenv import load_dotenv

"""
This class creates a Pinecone index and provides methods for upserting and querying the index.
"""
class PineconeIndex:

    """
    Initialize the class with the API keys and the index name.
    """

    def __init__(self, api_key, pinecone_key, index_name):
        self.api_key = api_key
        self.pinecone_key = pinecone_key
        self.index_name = index_name

        pinecone.init(api_key=self.pinecone_key)
        self.index = pinecone.Index(self.index_name)

    """
    Upsert a list of vectors into the index.
    """

    def upsert(self, vectors):
        """
        Args:
            vectors: A list of vectors to be upserted into the index.
        """
        self.index.upsert(vectors)

    """
    Query the index for the top `top_k` most similar results to a given query.
    """

    def query(self, query, top_k=2, include_metadata=True):
        """
        Args:
            query: The query to be used for the search.
            top_k: The number of results to be returned.
            include_metadata: Whether to include metadata in the results.
        """
        xq = openai.Embedding.create(input=query, engine='text-embedding-ada-002')['data'][0]['embedding']
        res = self.index.query([xq], top_k=top_k, include_metadata=include_metadata)
        return res
    
    def load_dataset_and_create_embeddings(self, dataset_path, model_name):
        """
        Load a dataset and create embeddings for the text.

        Args:
            dataset_path: The path to the dataset.
            model_name: The name of the embedding model to be used.

        Returns:
            A list of tuples, where each tuple contains the id, embedding, and metadata for a single document.
        """

        dataset = load_dataset('json', data_files=dataset_path)['train']
        ids = [str(n) for n in range(len(dataset['remarks']))]
        input = dataset['remarks']
        res = openai.Embedding.create(input=input, engine=model_name)
        embeds = [record['embedding'] for record in res['data']]
        meta = [{'text': text} for text in dataset['text']]
        to_upsert = zip(ids, embeds, meta)

        return to_upsert


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

if __name__ == '__main__':
    """
    Load the API keys from the environment.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    pinecone_key = os.environ.get("PINECONE_API_KEY")

    """
    Create a Pinecone index.
    """
    index = PineconeIndex(api_key, pinecone_key, 'hacktest')

    to_upsert = index.load_dataset_and_create_embeddings('fake_data.json', 'text-embedding-ada-002')
  
    """
    Upsert the data into the index.
    """
    index.upsert(to_upsert)

    """
    Query the index with a sample query and print out the top 2 results.
    """
    query = "This is a test query."
    res = index.query(query)

    for result in res:
        print(result)
