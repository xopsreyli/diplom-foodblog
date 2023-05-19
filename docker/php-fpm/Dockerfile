FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo_mysql zip mbstring exif pcntl bcmath opcache

RUN apt-get install -y libicu-dev && docker-php-ext-install intl

WORKDIR /diplom