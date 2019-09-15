FROM buildpack-deps:disco

### base.Dockerfile
### Generator: https://github.com/zerdos/devcontainer/

LABEL maintainer=zoltan.erdos@me.com

ENV SUPERVISORCONF=/etc/supervisor/supervisord.conf \
    DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
&& apt-get install --no-install-recommends -y \
  software-properties-common \
  apt-utils \
  ssh-client \
  make \
  gcc \
  g++ \
  python2.7 \
  xz-utils \
  libx11-dev \
  dirmngr \
&& ln -fs /usr/share/zoneinfo/Europce/London /etc/localtime \
&& apt-get update &&  apt-get install --no-install-recommends  -y \
  curl \
  xz-utils \
  apt-transport-https \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/* \
&& touch /usr/bin/startx \
&& chmod +x /usr/bin/startx 
### git for Ubuntu

RUN add-apt-repository ppa:git-core/ppa && apt-get update \
&& apt-get install --no-install-recommends -y \
    git \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/* 

### node.Dockerfile


ENV NODE_VERSION=12.10.0 \
    YARN_VERSION=1.17.3

RUN buildDeps='xz-utils' \
    && ARCH= && dpkgArch="$(dpkg --print-architecture)" \
    && case "${dpkgArch##*-}" in \
      amd64) ARCH='x64';; \
      ppc64el) ARCH='ppc64le';; \
      s390x) ARCH='s390x';; \
      arm64) ARCH='arm64';; \
      armhf) ARCH='armv7l';; \
      i386) ARCH='x86';; \
      *) echo "unsupported architecture"; exit 1 ;; \
    esac \
    && set -ex \
    && apt-get update && apt-get install -y ca-certificates curl wget gnupg dirmngr $buildDeps --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && for key in \
      94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
      FD3A5288F042B6850C66B31F09FE44734EB7990E \
      71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
      DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
      C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
      B9AE9905FFD7803F25714661B63B535A4C206CA9 \
      77984A986EBC2AA786BC0F66B01FBB92821C587A \
      8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
      4ED778F539E3634C779C87C6D7062848A1AB005C \
      A48C2BEE680E841632CD4E44F07496B3EB3C1762 \
      B9E2F5981AA6E0CD28160D9FF13993A75599653C \
    ; do \
      gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" || \
      gpg --batch --keyserver hkp://ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
      gpg --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "$key" ; \
    done \
    && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz" \
    && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
    && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
    && grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
    && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
    && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
    && apt-get purge -y --auto-remove $buildDeps \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs



RUN set -ex \
  && for key in \
    6A010C5166006599AA17F08146C2130DFD2497F5 \
  ; do \
    gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" || \
    gpg --batch --keyserver hkp://ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
    gpg --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "$key" ; \
  done \
  && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
  && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz.asc" \
  && gpg --batch --verify yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
  && mkdir -p /opt \
  && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
  && ln -s /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
  && ln -s /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
  && rm yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz
### dotnet.Dockerfile

# Install .NET CLI dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libc6 \
        libgcc1 \
        libgssapi-krb5-2 \
        libicu-dev \
        liblttng-ust0 \
        libssl-dev \
        libstdc++6 \
        zlib1g \
    && rm -rf /var/lib/apt/lists/*

# Install .NET Core SDK
ENV DOTNET_SDK_VERSION 2.2.402

RUN curl -SL --output dotnet.tar.gz https://dotnetcli.blob.core.windows.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-x64.tar.gz \
    && dotnet_sha512='81937de0874ee837e3b42e36d1cf9e04bd9deff6ba60d0162ae7ca9336a78f733e624136d27f559728df3f681a72a669869bf91d02db47c5331398c0cfda9b44' \
    && echo "$dotnet_sha512 dotnet.tar.gz" | sha512sum -c - \
    && mkdir -p /usr/share/dotnet \
    && tar -zxf dotnet.tar.gz -C /usr/share/dotnet \
    && rm dotnet.tar.gz \
    && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet

# Configure web servers to bind to port 80 when present
ENV ASPNETCORE_URLS=http://+:80 \
    # Enable detection of running in a container
    DOTNET_RUNNING_IN_CONTAINER=true \
    # Enable correct mode for dotnet watch (only mode supported in a container)
    DOTNET_USE_POLLING_FILE_WATCHER=true \
    # Skip extraction of XML docs - generally not useful within an image/container - helps performance
    NUGET_XMLDOC_MODE=skip

# Trigger first run experience by running arbitrary cmd to populate local package cache
RUN dotnet help


### remoteDesktop.Dockerfile

RUN curl https://xpra.org/gpg.asc | apt-key add - \
  && curl https://xpra.org/repos/disco/xpra.list > /etc/apt/sources.list.d/xpra.list \
&& curl https://xpra.org/repos/disco/xpra-beta.list >> /etc/apt/sources.list.d/xpra.list \
&& apt-get update \
&& apt-get install -y xpra \
&& apt-get install --no-install-recommends -y \
  xfwm4 \
  libgtk-3-0 \
  xvfb \
  dbus-x11 \
  nano \
  mc \
  htop \
  terminator \
  procps \  
  && echo "xpra --start=terminator --html=on --bind-tcp=0.0.0.0:6080" > /usr/bin/startx \   
  && sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults \
  && sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*
### xfce.Dockerfile

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        chromium \
        xfce4 \
        xfce4-goodies \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && echo "xpra start-desktop --start=xfce4-session --html=on --bind-tcp=0.0.0.0:6080" > /usr/bin/startx  

### cypress.Dockerfile
ENV CYPRESS_CACHE_FOLDER /usr/local/share/cypress

RUN apt-get update \
&& apt-get install --no-install-recommends -y \
  libgtk-3-0 \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb \
&& yarn global add cypress@3.4.1 stmux \
&& yarn cache clean \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/* /tmp/* 

### zsh.Dockerfie
ARG ENTRY=/opt/devcontainer-entrypoint.sh

RUN apt-get update \ 
    && apt-get install --no-install-recommends -y \ 
        zsh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && git clone --depth 1 https://github.com/robbyrussell/oh-my-zsh.git /etc/skel/.oh-my-zsh \
    && git clone --depth 1 https://github.com/zsh-users/zsh-autosuggestions.git /etc/skel/.oh-my-zsh/plugins/zsh-autosuggestions \
    && git clone --depth 1 https://github.com/zsh-users/zsh-syntax-highlighting.git /etc/skel/.oh-my-zsh/plugins/zsh-syntax-highlighting \
    && cp /etc/skel/.oh-my-zsh/templates/zshrc.zsh-template  /etc/skel/.zshrc \
    && sed -i -e 's/robbyrussell/sunaku/g' /etc/skel/.zshrc \
    && sed -i -e 's/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/g' /etc/skel/.zshrc \
    && echo "sleep infinity" >> /usr/bin/startx 

CMD startx