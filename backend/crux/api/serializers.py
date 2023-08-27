from rest_framework import serializers
from .models import CSVData


class CSVFileUploadSerializer(serializers.Serializer):
    csv_file = serializers.FileField()
