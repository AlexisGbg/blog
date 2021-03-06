from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Post
from .models import Keyword



# Blog's main view
def index(request):
    posts = Post.objects.order_by('-date')
    template = loader.get_template('main/base_content.html')
    context = {
            'posts': posts.all(), 
        }
    return HttpResponse(template.render(context,request))
    
# Return the posts in a shuffled order
def shuffle(request): 
    posts = Post.objects.order_by('?')
    template = loader.get_template('main/base_content.html')
    context = {
     		'posts': posts.all(), 
     	}
    return HttpResponse(template.render(context,request))
    
    
# Return the top ten posts 
def top10(request): 
    posts = Post.objects.order_by('-likes')[:10]
    template = loader.get_template('main/base_content.html')
    context = {
     		'posts': posts.all(), 
     	}
    return HttpResponse(template.render(context,request))


# View incrementing the star counters
def star(request, post_id):
    post = Post.objects.filter(id=post_id)[0]
    post.likes += 1
    post.save()
    return(HttpResponse(post.likes))
    

