### cypress.Dockerfile
ARG CYPRESS_VERION={CYPRESS_VERION}

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
  