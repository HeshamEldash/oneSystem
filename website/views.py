
from django.shortcuts import render, reverse, redirect

# Create your views here.



def homepage(request):
    return render(request, "homepage.html")