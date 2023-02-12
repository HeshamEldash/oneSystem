from django.urls import path
from . import views

app_name = 'website'
urlpatterns = [
    path("", views.homepage, name='homepage'),
    path("aj", views.ajax_view, name='homepage'),
    path("about/", views.about_page, name='about'),
    path("contact/", views.contact_page, name='contact'),
]