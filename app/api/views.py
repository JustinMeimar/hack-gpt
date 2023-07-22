from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.llm.mock_llm import process_prompt

@api_view(['POST'])
def prompt_endpoint(request):
    
    prompt = request.query_params.get('prompt', None)

    if prompt: 
        response = process_prompt(prompt) 
        return Response(response)
    else: 
        return Response({'error': 'prompt was not receieved or did not process'})