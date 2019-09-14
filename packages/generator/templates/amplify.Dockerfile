FROM devimage

### amplify.Dockerfile
ARG AMPLIFY_VERSION=3.2.0

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
  dirmngr 

RUN npm install -g @aws-amplify/cli@{AMPLIFY_VERSION}