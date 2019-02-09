from django.db import models

# Model containing the posts
class Post(models.Model):
    date = models.DateField()
    title = models.CharField(max_length=200)
    content = models.TextField()
    likes = models.IntegerField(default=0)
    keywords = models.ManyToManyField('Keyword')

# Model containing the keywords associated to the posts
class Keyword(models.Model): 
    keyword = models.CharField(max_length=200)

