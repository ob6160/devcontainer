FROM ubuntu:eoan

### base.Dockerfile
### Generator: https://github.com/zerdos/devcontainer/

LABEL maintainer=zoltan.erdos@me.com

ENV SUPERVISORCONF=/etc/supervisor/supervisord.conf \
    DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
&& apt-get install --no-install-recommends -y \
  software-properties-common \
  apt-utils \
  dirmngr \
  supervisor \
&& touch $SUPERVISORCONF \
&& echo "[supervisord]"                               >  $SUPERVISORCONF \
&& echo "logfile=/home/$USERNAME/supervisord.log"     >> $SUPERVISORCONF \
&& echo "nodemon=false"                               >> $SUPERVISORCONF \
&& echo ""                                            >> $SUPERVISORCONF \
&& ln -fs /usr/share/zoneinfo/Europce/London /etc/localtime \
&& apt-get update &&  apt-get install --no-install-recommends  -y \
  curl \
  xz-utils \
  apt-transport-https \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/*

### HAS REALLY BAD INPACT FOR THE IMAGE SIZE!
###    
### upgrade.Dockerfile

USER root

ENV DEV_VERSION=2019-7-31

RUN apt-get update && apt-get dist-upgrade -y && \
	apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/*### git for Ubuntu

RUN add-apt-repository ppa:git-core/ppa && apt-get update \
&& apt-get install --no-install-recommends -y \
    git \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/* 

### node.Dockerfile

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update \
  && apt-get install --no-install-recommends -y \
  nodejs yarn \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* 
### cypress.Dockerfile

ENV CYPRESS_INSTALL_BINARY=0
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

# docker.Dockerfile

RUN apt-get update && apt-get install --no-install-recommends -y \
    docker-compose \
    docker.io \ 
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/*

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


### xfce.Dockerfile

RUN curl -L https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install --no-install-recommends -y \
        xfce4 \
        xfce4-goodies \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* /root/*

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
  && sed -i -e '1 axterm &' /etc/X11/Xvnc-session \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* /root/*

### zsh.Dockerfile

RUN apt-get update \ 
    && apt-get install --no-install-recommends -y \ 
        zsh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid 1000 dev \
    && useradd --uid 1000 --gid dev --shell /bin/zsh --create-home developer

USER developer
RUN curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh

CMD [ "supervisord" ]