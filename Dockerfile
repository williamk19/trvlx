# ==========================================================
# php
FROM php:8.1-fpm-alpine as php

ENV PHP_OPCACHE=1
ENV PHP_OPCACHE_ENABLE_CLI=0
ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS=5
ENV PHP_OPCACHE_REVALIDATE_FREQ=5

RUN delgroup dialout
RUN addgroup -g 10001 -S trvlx && adduser -u 10001 -S trvlx -G trvlx

RUN apk update
RUN apk add unzip libpq-dev libcurl oniguruma-dev
RUN docker-php-ext-install mysqli pdo pdo_mysql bcmath opcache

COPY --from=composer:2.4.2 /usr/bin/composer /usr/bin/composer

COPY ./docker/php/php.ini /usr/local/etc/php/php.ini
COPY ./docker/php/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

WORKDIR /var/www

COPY --chown=trvlx:trvlx . .

RUN mkdir -p /var/www/storage/framework
RUN mkdir -p /var/www/storage/framework/cache
RUN mkdir -p /var/www/storage/framework/testing
RUN mkdir -p /var/www/storage/framework/sessions
RUN mkdir -p /var/www/storage/framework/views

RUN chown -R trvlx:trvlx /var/www/storage

RUN chmod -R 755 /var/www/storage
RUN chmod -R 755 /var/www/bootstrap

RUN php artisan optimize
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

USER trvlx
EXPOSE 9000
CMD [ "php-fpm" ]
