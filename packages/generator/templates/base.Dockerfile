### base.Dockerfile
### Generator: https://github.com/zerdos/devcontainer/

FROM buildpack-deps:{DISTRO}

LABEL maintainer=zoltan.erdos@me.com

ARG DISTRO={DISTRO}
ARG SUPERVISORCONF=/etc/supervisor/supervisord.conf

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      software-properties-common \
      apt-utils \
      supervisor && \
    touch $SUPERVISORCONF && \
    echo "[supervisord]"                               >  $SUPERVISORCONF && \
    echo "logfile=/home/$USERNAME/supervisord.log"     >> $SUPERVISORCONF && \
    echo "nodemon=false"                               >> $SUPERVISORCONF && \
    echo ""                                            >> $SUPERVISORCONF

RUN ln -fs /usr/share/zoneinfo/Europce/London /etc/localtime 
RUN apt-get update && DEBIAN_FRONTEND=noninteractive  apt-get install --no-install-recommends  -y \
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
        ntp \
		apt-transport-https \
		dos2unix && \
    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8 && \
	dpkg-reconfigure -f noninteractive tzdata && \
	apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*
    