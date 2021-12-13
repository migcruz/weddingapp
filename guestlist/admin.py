from django.contrib import admin
from .models import Guestlist


class GuestlistAdmin(admin.ModelAdmin):
    list_display = ('token', 'firstName', 'lastName', 'email', 'phone', 'allergies', 'rsvp', 'vegan', 'vegetarian')


# Register your models here.
admin.site.register(Guestlist, GuestlistAdmin)