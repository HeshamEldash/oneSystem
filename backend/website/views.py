
from django.shortcuts import render, reverse, redirect
from django.conf import settings
from django.http import JsonResponse


AUTH = False

def ajax_view(request):
    
    if request.method == "POST":
        local_storage_token = request.POST.get('local_storage_token')
        if local_storage_token:
            AUTH = True
        

def homepage(request):
    auth = False
    print(request.user)
    
    return render(request, "index.html",)


def about_page(request):
    return render(request, "about.html")
def contact_page(request):
    return render(request, "testbuilder.html")