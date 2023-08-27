from django.urls import path
from .views import CSVDataUpload
from .views import IndexClass
from .views import AnalyseCSV

urlpatterns = [
    path("api/uploadcsv/", CSVDataUpload.as_view(), name="uploadcsv"),
    path("api/", IndexClass.as_view(), name="index"),
    path("api/analysecsv/", AnalyseCSV.as_view(), name="analysecsv"),
]
