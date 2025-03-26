from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from shop.models import User

from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User

from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User

from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    registerPassword = serializers.CharField(write_only=True, required=True)
    registerCheckPassword = serializers.CharField(write_only=True, required=True, label="Confirm Password")
    registerEmail = serializers.EmailField(source="email", required=True)
    registerName = serializers.CharField(source="first_name", required=True)
    registerSurname = serializers.CharField(source="last_name", required=True)
    registerPhone = serializers.CharField(source="phone", required=True)

    class Meta:
        model = User
        fields = ["registerName", "registerSurname", "registerPhone", "registerEmail", "registerPassword", "registerCheckPassword"]

    def validate(self, data):
        if data["registerPassword"] != data["registerCheckPassword"]:
            raise serializers.ValidationError({"registerCheckPassword": "Passwords must match."})
        return data

    def create(self, validated_data):
        validated_data.pop("registerCheckPassword")  # Убираем дублирующее поле
        validated_data["password"] = make_password(validated_data.pop("registerPassword"))
        return User.objects.create(**validated_data)


class LoginByEmailSerializer(serializers.Serializer):
    authEmail = serializers.EmailField()
    authPassword = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data["authEmail"], password=data["authPassword"])
        if not user:
            raise serializers.ValidationError("Incorrect email or password")
        if not user.is_active:
            raise serializers.ValidationError("Account is not active")
        return {"user": user}


class LoginByPhoneSerializer(serializers.Serializer):
    authPhone = serializers.CharField(required=True)
    authPassword = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = User.objects.get(phone=data["authPhone"])
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this phone number does not exist")
        if not user.check_password(data["authPassword"]):
            raise serializers.ValidationError("Incorrect phone or password")

        if not user.is_active:
            raise serializers.ValidationError("Account is not active")

        return {"user": user}
