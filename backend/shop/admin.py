from django.contrib import admin
from .models import User, Role, UserRole, Product, Order, OrderItem

admin.site.register(User)
admin.site.register(Role)
admin.site.register(UserRole)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)