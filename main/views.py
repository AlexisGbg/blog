from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Post
from .models import Keyword



# Create your views here.
def index(request):
    posts = Post.objects.order_by('-date')
    template = loader.get_template('main/base_content.html')
    context = {
            'posts': posts.all(), 
        }
    return HttpResponse(template.render(context,request))


def star(request, post_id):
    post = Post.objects.filter(id=post_id)[0]
    post.likes += 1
    post.save()
    return(HttpResponse(post.likes))
