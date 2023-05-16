FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    libonig-dev \
    libxml2-dev

RUN docker-php-ext-install pdo pdo_pgsql zip mbstring exif pcntl bcmath opcache

WORKDIR /diplom