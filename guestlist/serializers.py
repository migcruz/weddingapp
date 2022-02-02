# Need serializers to convert model instances to JSON so that the frontend
# can work with the received data easily.

# We will create a guestlist/serializers.py file:

from rest_framework import serializers
from .models import Guestlist

#  Specify the model to work with and the fields we want to be converted to JSON.
class GuestlistSerializer(serializers.HyperlinkedModelSerializer):

    url = serializers.HyperlinkedIdentityField(
        view_name='guest-detail',
        lookup_field='token'
    )

    class Meta:
        model = Guestlist
        fields = ('id', 'token', 'firstName', 'lastName', 'email', 'phone', 'plusone', 'allergies', 'rsvp', 'vegan', 'vegetarian', 'newGuest', 'url')