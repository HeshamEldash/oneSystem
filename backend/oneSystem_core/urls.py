"""oneSystem_core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)






urlpatterns = [

    path('', include('website.urls')),
    path('admin/', admin.site.urls),
    path('app-api/records/', include('records.urls')),
    path('app-api/users/', include('users.urls')),
    path('app-api/appointments/', include('appointments.urls')),
    path('app-api/medicines/', include('medicines.urls')),

    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # re_path('.*', TemplateView.as_view(template_name="index.html"))
]

if settings.DEBUG: 
    urlpatterns += static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)
