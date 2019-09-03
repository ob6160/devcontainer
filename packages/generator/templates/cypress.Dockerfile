FROM devimage

### cypress.Dockerfile
ARG CYPRESS_VERION={CYPRESS_VERION}
ENV CYPRESS_CACHE_FOLDER=/opt/cypress

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
&& yarn global add cypress@$CYPRESS_VERION stmux --no-cache \
&& yarn cache clean \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/* /root/* /tmp/* 
