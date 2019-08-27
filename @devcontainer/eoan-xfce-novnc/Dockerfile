### base.Dockerfile
### Generator: https://github.com/zerdos/devcontainer/

FROM buildpack-deps:eoan

LABEL maintainer=zoltan.erdos@me.com

ARG DISTRO={DISTRO}
ARG USERNAME=developer
ARG SUPERVISORCONF=/etc/supervisor/supervisord.conf
ARG HOMEDIR=/home/$USERNAME
ARG APPSDIR=/opt/$USERNAME
ENV HOME ${HOMEDIR}

RUN groupadd --gid 1001 $USERNAME && \
    useradd --uid 1001 --gid $USERNAME --shell /bin/bash --create-home $USERNAME && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
      sudo \
      supervisor && \
    echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME && \
    chmod 0440 /etc/sudoers.d/$USERNAME && \
    mkdir /opt/developer && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* && \
    touch $SUPERVISORCONF && \
    chown -R $USERNAME:$USERNAME \
              ${HOMEDIR} \
              ${APPSDIR} \
              /usr/local/bin \
              /tmp && \
    chown $USERNAME:$USERNAME $SUPERVISORCONF && \
    echo "[supervisord]"                     >  $SUPERVISORCONF && \
    echo "logfile=$HOMEDIR/supervisord.log"  >> $SUPERVISORCONF && \
    echo "nodemon=false"                     >> $SUPERVISORCONF && \
    echo ""                                  >> $SUPERVISORCONF

USER ${USERNAME}

RUN sudo ln -fs /usr/share/zoneinfo/Europe/London /etc/localtime 
RUN sudo apt-get update && DEBIAN_FRONTEND=noninteractive sudo apt-get install --no-install-recommends  -y \
        curl \
		make \
		gcc \
		g++ \
		python2.7 \
		libx11-dev \
        tzdata \
		libxkbfile-dev \
		libsecret-1-dev \
		xz-utils \
		locales \
		apt-transport-https \
		dos2unix && \
	sudo sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    sudo dpkg-reconfigure --frontend=noninteractive locales && \
    sudo update-locale LANG=en_US.UTF-8 && \
	sudo dpkg-reconfigure -f noninteractive tzdata && \
	sudo apt-get autoremove -y && \
    sudo apt-get clean -y && \
    sudo rm -rf /var/lib/apt/lists/*
    ### git.Dockerfile
USER ${USERNAME}

ENV GIT_VERION=2.23.0

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
### node.Dockerfile
RUN sudo groupadd --gid 1000 node \
  && sudo useradd --uid 1000 --gid node --shell /bin/bash --create-home node

USER root

ENV NODE_VERSION 12.9.1

RUN ARCH= && dpkgArch="$(dpkg --print-architecture)" \
  && case "${dpkgArch##*-}" in \
    amd64) ARCH='x64';; \
    ppc64el) ARCH='ppc64le';; \
    s390x) ARCH='s390x';; \
    arm64) ARCH='arm64';; \
    armhf) ARCH='armv7l';; \
    i386) ARCH='x86';; \
    *) echo "unsupported architecture"; exit 1 ;; \
  esac \
  # gpg keys listed at https://github.com/nodejs/node#release-keys
  && set -ex \
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
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

ENV YARN_VERSION 1.17.3

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


USER ${USERNAME}

RUN sudo chown -R $USERNAME:$USERNAME /usr/local/lib/node_modules 
### cypress.Dockerfile
ARG CYPRESS_VERION=3.4.1

RUN sudo apt-get update && \
    sudo apt-get install --no-install-recommends -y \
    libgtk-3-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb && \
  sudo apt-get autoremove -y && \
  sudo apt-get clean -y && \
  sudo rm -rf /var/lib/apt/lists/* && \
  yarn global add cypress@$CYPRESS_VERION --no-cache && \
  yarn cache clean
  # docker.Dockerfile
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN sudo apt-get update && sudo apt-get install -y \
        docker.io && \ 
    sudo usermod -aG docker $USERNAME && \
    sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0-rc2/docker-compose-Linux-x86_64" -o /usr/local/bin/docker-compose && \
    sudo chmod +x /usr/local/bin/docker-compose && \
    sudo apt-get autoremove -y && \
    sudo apt-get clean -y  && \
    sudo rm -rf /var/lib/apt/lists/*
SHELL ["/bin/sh", "-c"]
### dotnet.Dockerfile
USER root

RUN apt-get update \
    && (apt-get install -y --no-install-recommends libicu57 libssl1.0.2 \
    || apt-get install -y --no-install-recommends libicu63 libssl1.1 )\
    && apt-get install -y --no-install-recommends \
        libc6 \
        libgcc1 \
        libgssapi-krb5-2 \
        liblttng-ust0 \
        libstdc++6 \
        zlib1g \
    && rm -rf /var/lib/apt/lists/*

# Install .NET Core SDK
ENV DOTNET_SDK_VERSION 2.2.401

RUN curl -SL --output dotnet.tar.gz https://dotnetcli.blob.core.windows.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-x64.tar.gz \
    && dotnet_sha512='08e1fcafa4f898c80ff5e88eeb40c7497b4f5651af3b8ec85f65a3daa2f1509a766d833477358d3ff83d179e014034ab0c48120847ef24736c8d1a5b67fec10b' \
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

ARG OCTO_TOOLS_VERSION=6.12.0

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libunwind-dev \
    && rm -rf /var/lib/apt/lists/*

USER ${USERNAME}



RUN mkdir -p ${HOME}/tmp/octo && \
    wget -O ${HOME}/tmp/octo.tar.gz https://download.octopusdeploy.com/octopus-tools/${OCTO_TOOLS_VERSION}/OctopusTools.${OCTO_TOOLS_VERSION}.debian.8-x64.tar.gz && \
    tar -xf ${HOME}/tmp/octo.tar.gz -C ${HOME}/tmp/octo/ && \
    sudo mv ${HOME}/tmp/octo /opt/ && \
    sudo ln -s /opt/octo/Octo /usr/local/bin/octo && \
    rm -rf ${HOME}/tmp

### xfce.Dockerfile
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && \
    sudo sh -c 'echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    sudo apt-get update && \
    sudo apt-get install -y --no-install-recommends \
        xfce4 \
        xfce4-goodies \
        google-chrome-stable && \
    sudo apt-get clean -y && \
    sudo rm -rf /var/lib/apt/lists/* 
### noVNC.Dockerfile
EXPOSE 6080

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN  sudo apt-get update && \
     sudo apt-get install -y --no-install-recommends \
            autocutsel \
            xfwm4 \
            libgtk-3-0 \
            xfonts-100dpi xfonts-75dpi xfonts-scalable \
            xvfb \
            dbus-x11 \
            nano \
            mc \
            htop \
            terminator \
            procps \  
            vnc4server && \
      git clone --depth 1 https://github.com/novnc/noVNC.git $APPSDIR/noVNC && \
      git clone --depth 1 https://github.com/novnc/websockify $APPSDIR/noVNC/utils/websockify && \
      rm -rf $APPSDIR/noVNC/.git && \
      rm -rf $APPSDIR/noVNC/utils/websockify/.git && \
      cp $APPSDIR/noVNC/vnc.html $APPSDIR/noVNC/index.html && \
      echo "[program:vncserver]"                                                              >> $SUPERVISORCONF && \
      echo "command=vncserver -SecurityTypes none -cleanstale -useold"                        >> $SUPERVISORCONF && \
      echo "autostart=true"                                                                   >> $SUPERVISORCONF && \
      echo ""                                                                                 >> $SUPERVISORCONF && \
      echo "[program:novnc]"                                                                  >> $SUPERVISORCONF && \
      echo "command=$APPSDIR/noVNC/utils/launch.sh --vnc localhost:5901 --listen 6080 --web"  >> $SUPERVISORCONF && \
      echo "autostart=true"                                                                   >> $SUPERVISORCONF && \
      echo ""                                                                                 >> $SUPERVISORCONF && \
    sudo sed -i -e '1 aautocutsel -fork' /etc/X11/Xvnc-session && \
    sudo sed -i -e 's/iconic/nowin/g' /etc/X11/Xvnc-session && \
    sudo sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults && \
    sudo sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults && \
    sudo sed -i -e '1 aterminator &' /etc/X11/Xvnc-session && \
    sudo apt-get autoremove -y && \
    sudo apt-get clean -y  && \
    sudo rm -rf /var/lib/apt/lists/*

SHELL [ "/bin/sh", "-c" ]
### zsh.Dockerfile
RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends zsh
RUN sh -c "$(wget -O- https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" && \
    echo "export LC_ALL=en_US.UTF-8" >>  ~/.zshrc && \
    echo "export LANG=en_US.UTF-8" >>  ~/.zshrc  && \
    sudo chsh -s /usr/bin/zsh $USERNAME
RUN sudo apt-get install -y --no-install-recommends \
      locales && \
    sudo apt-get clean -y && \
    sudo rm -rf /var/lib/apt/lists/*
ENV SHELL=/usr/bin/zsh
