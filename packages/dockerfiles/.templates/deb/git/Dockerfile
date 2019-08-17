USER ${USERNAME}

ENV GIT_VERION={GIT}

RUN sudo apt-get update && \ 
    sudo apt-get install -y --no-install-recommends \ 
        make \
        libssl-dev \
        libghc-zlib-dev \
        libcurl4-gnutls-dev \
        libexpat1-dev \
        gettext \
        unzip 

WORKDIR /usr/src

RUN sudo wget https://github.com/git/git/archive/v${GIT_VERION}.tar.gz -O git.tar.gz && \
    sudo tar -xf git.tar.gz && cd git-* && \
    sudo make prefix=/usr/local all && \
    sudo make prefix=/usr/local install && \
    git --version

WORKDIR $HOMEDIR