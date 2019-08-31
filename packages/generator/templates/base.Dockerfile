FROM {DISTRO}

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
&& touch /opt/supervisord.log && chmod 777 /opt/supervisord.log \
&& touch $SUPERVISORCONF \
&& echo "[supervisord]"                               >  $SUPERVISORCONF \
&& echo "logfile=/opt/supervisord.log"                >> $SUPERVISORCONF \
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
