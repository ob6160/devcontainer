FROM devimage

### chromium.Dockerfile

RUN apt-get update \
    && (apt-get install --no-install-recommends -y chromium \
        || apt-get install --no-install-recommends -y chromium-browser) \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* 