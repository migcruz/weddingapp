from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GuestlistSerializer
from .models import Guestlist
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
# The viewsets base class provides the implementation for CRUD operations by default,
# what we had to do was specify the serializer class and the query set.


class GuestlistView(viewsets.ModelViewSet):
    serializer_class = GuestlistSerializer
    queryset = Guestlist.objects.all()
    lookup_field = 'token'

# Upon deploying the web app in Heroku, one of the common issues that occur is the static files failing to load due to MIME type limitations. The particular MIME type (text/html) problem is related to your Django configuration.
# The views.py in your React frontend needs a content_type argument in the HttpResponse. Heroku needs to know where the static files are.
# The "refused to execute script ... MIME type ('text/html')" problem stems from Django's default content_type setting for an HttpResponse, which is text/html.
# This can be fixed by including a content_type='application/javascript' argument in the return statement of a new class-based view called Assets(View) inside views.py like so:

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()
