from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import status
from .models import User
from django.contrib.auth import authenticate
  
  
class HomeView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        if request.user:
            return Response(status=status.HTTP_200_OK)

class SignUpView(APIView):
    def post(self, request):
        user = User.objects.create_user(
            username=request.data['username'],
            password = request.data['password'],
            first_name = request.data['first_name'],
            last_name = request.data['last_name'],
            email = request.data['email'],
        )
        if user:
            auth_user = authenticate(username=request.data['username'], password=request.data['password'])
            if auth_user:
                refresh_token = RefreshToken.for_user(auth_user)
                access_token = AccessToken.for_user(auth_user)
                content={
                    'refresh': str(refresh_token),
                    'access': str(access_token)
                }
        else:
            content = {
                'error': 'error while signup'
            }
        return Response(content, status=status.HTTP_201_CREATED)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)