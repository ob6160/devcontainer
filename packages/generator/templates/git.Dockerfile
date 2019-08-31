### git.Dockerfile

RUN apt-get update && \ 
    apt-get install -y --no-install-recommends \ 
        make \
        libssl-dev \
        libghc-zlib-dev \
        libcurl4-gnutls-dev \
        libexpat1-dev \
        gettext \
        gpg \
        unzip && \
curl -Lo git.tar.gz  https://github.com/git/git/archive/v{GIT_VERSION}.tar.gz && \
    tar -xf git.tar.gz && cd git-* && \
    make prefix=/usr/local all && \
    make prefix=/usr/local install && \
    rm -rf /usr/src/* && \
    git --version && \
    apt-get remove -y \
        make \
        gpg \
        libssl-dev \
        libghc-zlib-dev \
        libcurl4-gnutls-dev \
        libexpat1-dev && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /tmp/* git.tar.gz /var/lib/apt/lists/*