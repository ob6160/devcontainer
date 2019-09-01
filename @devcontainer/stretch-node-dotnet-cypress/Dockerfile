FROM debian:stretch-slim

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
  dirmngr \
  supervisor \
&& touch /opt/supervisord.log && chmod 777 /opt/supervisord.log \
&& touch /opt/supervisord.pid && chmod 777 /opt/supervisord.pid \
&& touch $SUPERVISORCONF \
&& echo "[supervisord]"                               >  $SUPERVISORCONF \
&& echo "logfile=/opt/supervisord.log"                >> $SUPERVISORCONF \
&& echo "pidfile=/opt/supervisord.pid"                >> $SUPERVISORCONF \
&& echo "nodemon=true"                                >> $SUPERVISORCONF \
&& echo ""                                            >> $SUPERVISORCONF \
&& ln -fs /usr/share/zoneinfo/Europce/London /etc/localtime \
&& apt-get update &&  apt-get install --no-install-recommends  -y \
  curl \
  xz-utils \
  apt-transport-https \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/*

### git.Dockerfile

RUN apt-get update && \ 
    apt-get install --no-install-recommends -y \ 
    make \
    libssl-dev \
    libghc-zlib-dev \
    libcurl4-gnutls-dev \
    libexpat1-dev \
    gettext \
    gpg \
&& curl -Lo /usr/src/git.tar.gz  https://github.com/git/git/archive/v2.23.0.tar.gz \
&& tar -C /usr/src/ -xf /usr/src/git.tar.gz && cd /usr/src/git-* \
&& make prefix=/usr/local all \
&& make prefix=/usr/local install \
&& apt-get remove -y \
    make \
    libssl-dev \
    libghc-zlib-dev \
    libcurl4-gnutls-dev \
    libexpat1-dev \
    gettext \
    gpg \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /tmp/* /var/lib/apt/lists/* /usr/src/*
### node.Dockerfile


ENV NODE_VERSION=12.9.1 \
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
### cypress.Dockerfile
ARG CYPRESS_VERION=3.4.1

ENV CYPRESS_INSTALL_BINARY=$CYPRESS_VERION
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
&& yarn global add cypress@$CYPRESS_VERION --no-cache \
&& yarn cache clean \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/* /root/* /tmp/* 

### dotnet.Dockerfile

ARG OCTO_TOOLS_VERSION=6.12.0

ARG DOTNET_SDK_VERSION=2.2.401 

RUN apt-get update \
    && (apt-get install --no-install-recommends -y \
        libicu57 libssl1.0.2 \
    || apt-get install --no-install-recommends -y  \
        libicu63 libssl1.1 )\
    && apt-get install --no-install-recommends -y \
    libc6 \
    libgcc1 \
    libgssapi-krb5-2 \
    liblttng-ust0 \
    libstdc++6 \
    zlib1g \
    libunwind-dev \
    && rm -rf /var/lib/apt/lists/* \
    && curl -SL --output dotnet.tar.gz  https://dotnetcli.blob.core.windows.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-x64.tar.gz \
    && dotnet_sha512='08e1fcafa4f898c80ff5e88eeb40c7497b4f5651af3b8ec85f65a3daa2f1509a766d833477358d3ff83d179e014034ab0c48120847ef24736c8d1a5b67fec10b' \
    && echo "$dotnet_sha512 dotnet.tar.gz" | sha512sum -c - \
    && mkdir -p /usr/share/dotnet \
    && tar -zxf dotnet.tar.gz -C /usr/share/dotnet \
    && rm dotnet.tar.gz \
    && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet \
    && mkdir -p /tmp/octo \
    && curl -Lo /tmp/octo.tar.gz https://download.octopusdeploy.com/octopus-tools/${OCTO_TOOLS_VERSION}/OctopusTools.${OCTO_TOOLS_VERSION}.debian.8-x64.tar.gz \
    && tar -xf /tmp/octo.tar.gz -C /tmp/octo/ \
    && mv /tmp/octo /opt/ \
    && ln /opt/octo/Octo /usr/local/bin/octo \
    && rm -rf /tmp/* \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Configure web servers to bind to port 80 when present
ENV ASPNETCORE_URLS=http://+:80 \
    # Enable detection of running in a container
    DOTNET_RUNNING_IN_CONTAINER=true \
    # Enable correct mode for dotnet watch (only mode supported in a container)
    DOTNET_USE_POLLING_FILE_WATCHER=true \
    # Skip extraction of XML docs - generally not useful within an image/container - helps performance
    NUGET_XMLDOC_MODE=skip \
    # Opting out from telemetry
    DOTNET_CLI_TELEMETRY_OPTOUT=true


### noVNC.Dockerfile

EXPOSE 6080

RUN  apt-get update \
  && apt-get install --no-install-recommends -y \
  autocutsel \
  xfwm4 \
  libgtk-3-0 \
  xvfb \
  novnc \
  websockify \
  dbus-x11 \
  nano \
  mc \
  htop \
  terminator \
  procps \  
  vnc4server \
  &&  cp /usr/share/novnc/vnc.html /usr/share/novnc/index.html \
  &&  echo "[program:vncserver]"                                                >> $SUPERVISORCONF \
  &&  echo "command=vncserver -SecurityTypes none -cleanstale -useold"          >> $SUPERVISORCONF \
  &&  echo "autostart=true"                                                     >> $SUPERVISORCONF \
  &&  echo ""                                                                   >> $SUPERVISORCONF \
  &&  echo "[program:novnc]"                                                    >> $SUPERVISORCONF \
  &&  echo "command=websockify -D --web=/usr/share/novnc/ 6080 localhost:5901"  >> $SUPERVISORCONF \
  &&  echo "autostart=true"                                                     >> $SUPERVISORCONF \
  &&  echo ""                                                                   >> $SUPERVISORCONF \
  && sed -i -e '1 aautocutsel -fork' /etc/X11/Xvnc-session \
  && sed -i -e 's/iconic/nowin/g' /etc/X11/Xvnc-session \
  && sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults \
  && sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults \
  && sed -i -e '1 aterminator &' /etc/X11/Xvnc-session \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* /root/*

### zsh.Dockerfile
ARG ENTRY=/opt/devcontainer-entrypoint.sh

RUN apt-get update \ 
    && apt-get install --no-install-recommends -y \ 
        zsh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid 1000 dev \
    && useradd --uid 1000 --gid dev --shell /usr/bin/zsh --create-home developer \
    && curl -Lo /opt/install-oh-my-zsh.sh https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh \
    && chmod 555 /opt/install-oh-my-zsh.sh \
    && echo 'test -f ~/.zshrc || SHELL=/usr/bin/zsh sh /opt/install-oh-my-zsh.sh  \n\
            supervisord; \n\
            test -f ~/.zshrc && sleep 10 && sed -i -e '\''s/robbyrussell/sunaku/g'\'' ~/.zshrc \n\    
            trap : TERM INT; \n\
            sleep infinity & wait\n' >> $ENTRY \
    && chmod 555 $ENTRY

USER developer
WORKDIR /home/developer
ENV SHELL /usr/bin/zsh

CMD bash /opt/devcontainer-entrypoint.sh