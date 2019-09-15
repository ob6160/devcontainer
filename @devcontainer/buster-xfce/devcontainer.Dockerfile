FROM devimages/buster-xfce:latest

ARG GID
ARG UID

RUN echo "$UID"

RUN groupadd --gid ${GID} dev \
  && useradd --uid ${UID} --gid dev --shell /usr/bin/zsh --create-home dev \
  && mkdir -p /run/user/${UID} \
  && chown -R dev:dev /run/user/${UID}