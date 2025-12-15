FROM nginx:alpine

# پوشه public را در مسیر Nginx کپی کنیم
COPY public /usr/share/nginx/html

# src را هم برای live reload نگه می‌داریم اگر لازم باشد
COPY src /usr/share/nginx/html/src

# Nginx بصورت پیشفرض روی پورت 80 اجرا می‌شود
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

