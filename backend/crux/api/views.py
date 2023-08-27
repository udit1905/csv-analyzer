from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import CSVFileUploadSerializer
import os
import openai
import pandas


class CSVDataUpload(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, format="None"):
        serializer = CSVFileUploadSerializer(data=request.data)
        if serializer.is_valid():
            csv_file = serializer.validated_data["csv_file"]

            # Define the directory to save the uploaded files
            upload_dir = "uploads/csv/"
            os.makedirs(upload_dir, exist_ok=True)

            # Generate a unique filename and save the file
            file_name = os.path.join(upload_dir, csv_file.name)
            with open(file_name, "wb") as file:
                file.write(csv_file.read())

            return Response({"message": "CSV file uploaded and saved successfully."})
        return Response(serializer.errors, status=400)


class IndexClass(APIView):
    def get(self, request):
        return Response({"message": "This is index route"}, status=200)


class AnalyseCSV(APIView):
    def post(self, request):
        filename = request.data.get("filename")
        query = request.data.get("query")
        openai.api_base = "https://openrouter.ai/api/v1"
        openai.api_key = (
            "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"
        )
        if filename is None or not filename:
            response = openai.ChatCompletion.create(
                model="openai/gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a data analyst."},
                    {"role": "user", "content": query},
                ],
                temperature=0,
                headers={
                    "HTTP-Referer": "http:localhost:3000",  # To identify your app
                    "X-Title": "Testing",
                },
            )
            assistant_reply = response["choices"][0]["message"]["content"]
            return Response({"assistant_reply": assistant_reply}, status=200)
        else:
            upload_dir = "uploads/csv/"
            file_path = os.path.join(upload_dir, filename)
            data = pandas.read_csv(file_path)
            csvstring = data.to_csv(index=False)
            response = openai.ChatCompletion.create(
                model="openai/gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a data analyst."},
                    {
                        "role": "user",
                        "content": query
                        + "\nGive answer in reference with following csv data:\n"
                        + csvstring,
                    },
                ],
                temperature=0,
                headers={
                    "HTTP-Referer": "http:localhost:3000",  # To identify your app
                    "X-Title": "Testing",
                },
            )
            assistant_reply = response["choices"][0]["message"]["content"]
            return Response({"assistant_reply": assistant_reply}, status=200)
