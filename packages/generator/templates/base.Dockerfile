FROM buildpack-deps:{DISTRO}

LABEL maintainer=zoltan.erdos@me.com

ARG DISTRO={DISTRO}
ARG USERNAME=developer
ARG SUPERVISORCONF=/etc/supervisor/supervisord.conf
ARG HOMEDIR=/home/$USERNAME
ARG APPSDIR=/opt/$USERNAME
ENV HOME ${HOMEDIR}
ENV FORCE_TO_UPDATE 11

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