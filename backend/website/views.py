
from django.shortcuts import render, reverse, redirect


def homepage(request):
    return render(request, "index.html")

def about_page(request):
    return render(request, "about.html")
def contact_page(request):
    return render(request, "testbuilder.html")