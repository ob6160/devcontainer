FROM devimage

### amplify.Dockerfile
ARG AMPLIFY_VERSION=3.2.0

RUN npm install -g @aws-amplify/cli@{AMPLIFY_VERSION}