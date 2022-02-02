from django.contrib import admin
from .models import Guestlist


class GuestlistAdmin(admin.ModelAdmin):
    list_display = ('token', 'firstName', 'lastName', 'email', 'phone', 'plusone', 'allergies', 'rsvp', 'vegan', 'newGuest', 'vegetarian')


# Register your models here.
admin.site.register(Guestlist, GuestlistAdmin)