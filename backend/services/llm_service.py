import os
import openai
import boto3
from botocore.config import Config
from dotenv import load_dotenv
import json

load_dotenv()

class LLMService:
    def __init__(self):
        self.provider = os.getenv('LLM_PROVIDER', 'LOCAL')
        
        if self.provider == 'BEDROCK':
            # Initialize Bedrock client
            self.bedrock = boto3.client(
                service_name='bedrock-runtime',
                region_name=os.getenv('AWS_REGION'),
                aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
                config=Config(retries={'max_attempts': 3})
            )
            self.model_id = os.getenv('BEDROCK_MODEL_ID', 'anthropic.claude-3-sonnet-20240229-v1:0')
        else:
            # Initialize OpenAI client for LM Studio
            openai.api_base = os.getenv('LLM_API_BASE', 'http://localhost:1234/v1')
            openai.api_key = os.getenv('LLM_API_KEY', 'not-needed')

    def generate_text(self, prompt, system_prompt=None, temperature=0.7, max_tokens=1000):
        """
        Generate text using either Bedrock or LM Studio based on configuration.
        
        Args:
            prompt (str): The user prompt to send to the model
            system_prompt (str, optional): System prompt for the model
            temperature (float): Controls randomness (0.0 to 1.0)
            max_tokens (int): Maximum number of tokens to generate
            
        Returns:
            str: Generated text response
        """
        try:
            if self.provider == 'BEDROCK':
                return self._generate_with_bedrock(prompt, system_prompt, temperature, max_tokens)
            else:
                return self._generate_with_lm_studio(prompt, system_prompt, temperature, max_tokens)
        except Exception as e:
            raise Exception(f"Error generating text with {self.provider}: {str(e)}")

    def _generate_with_bedrock(self, prompt, system_prompt, temperature, max_tokens):
        """Generate text using Amazon Bedrock."""
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": max_tokens,
            "temperature": temperature,
            "messages": messages
        }

        response = self.bedrock.invoke_model(
            modelId=self.model_id,
            body=json.dumps(body)
        )
        
        response_body = json.loads(response['body'].read())
        return response_body['content'][0]['text']

    def _generate_with_lm_studio(self, prompt, system_prompt, temperature, max_tokens):
        """Generate text using LM Studio."""
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        response = openai.ChatCompletion.create(
            model="local-model",  # This will be ignored by LM Studio
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens
        )
        
        return response.choices[0].message.content

# Create a singleton instance
llm_service = LLMService() 