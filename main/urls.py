from django.urls import path

from . import views

# Match the urls to the views
urlpatterns = [
    path('', views.index, name='index'),
    path('shuffle', views.shuffle, name='shuffle'),
    path('<int:post_id>/star', views.star, name='star'),
]
