FROM php:8.1-cli

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

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

RUN npm install -g npm@latest

CMD ["npm", "run", "watch"]

CMD ["tail", "-f", "/dev/null"]

WORKDIR /diplom
