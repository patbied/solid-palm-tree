from django.urls import path
from base.views import user_views as views



urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/',views.registerUser,name='register'),

    path('profile/',views.getUserProfile,name='user-profile'),
    path('profile/update/',views.updateUserProfile,name='user-profile-update'),
    path('',views.getUsers,name='users'),
    path('update/<str:pk>/',views.updateUser,name='update-user'),
    path('delete/<str:pk>/',views.deleteUser,name='delete-user'),
    path('<str:pk>/',views.getUser,name='user'),
    
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
