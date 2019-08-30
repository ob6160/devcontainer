### git.Dockerfile

RUN apt-get update && \ 
    apt-get install -y --no-install-recommends \ 
        make \
        libssl-dev \
        libghc-zlib-dev \
        libcurl4-gnutls-dev \
        libexpat1-dev \
        gettext \
        unzip 


RUN wget https://github.com/git/git/archive/v{GIT_VERSION}.tar.gz -O git.tar.gz && \
    tar -xf git.tar.gz && cd git-* && \
    make prefix=/usr/local all && \
    make prefix=/usr/local install && \
    rm -rf /usr/src/* && \
    git --version && \
    apt-get remove -y  make \
        libssl-dev \
        libghc-zlib-dev \
        libcurl4-gnutls-dev \
        libexpat1-dev && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*
