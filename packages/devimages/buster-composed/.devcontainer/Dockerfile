FROM devimages/buster-composed:1.7.2

RUN groupadd dev \
  && useradd -g dev --shell /usr/bin/zsh --create-home dev \
  && mkdir -p /run/user/1000 \
  && chown -R dev:dev /run/user/1000 \
  && mkdir -p  /tmp/.X11-unix \
  && chown -R dev:dev /tmp/.X11-unix 

USER dev
WORKDIR /home/dev

RUN mkdir workspace