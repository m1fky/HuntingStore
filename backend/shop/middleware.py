from django.http import JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.deprecation import MiddlewareMixin

class JWTAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        auth = JWTAuthentication()
        header = auth.get_header(request)
        if header:
            try:
                user, _ = auth.authenticate(request)
                request.user = user
            except Exception:
                return JsonResponse({"error": "Invalid token"}, status=401)