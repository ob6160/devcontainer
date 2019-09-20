FROM buildpack-deps:{DISTRO}

### base.Dockerfile
### Generator: https://github.com/zerdos/devcontainer/
ENV STARTCMD "echo ENV STARTCMD is running"

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
  wget \
  unzip \
  qt5-default \
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
