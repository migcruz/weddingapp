from django.db import models
# Create your models here.


class Guestlist(models.Model):
    token = models.CharField(max_length=50)
    firstName = models.TextField(default="")
    lastName = models.TextField(default="")
    email = models.TextField(default="")
    phone = models.TextField(default="")
    plusone = models.TextField(default="")
    allergies = models.TextField(default="")
    rsvp = models.BooleanField(default=False)
    vegan = models.BooleanField(default=False)
    vegetarian = models.BooleanField(default=False)
    newGuest = models.BooleanField(default=False)
    hasResponded = models.BooleanField(default=False)

    def _str_(self):
        return self.token

    def __unicode__(self):
        return self.token


