FROM devimage

### amplify.Dockerfile
ARG AMPLIFY_VERSION={AMPLIFY_VERSION}

RUN npm install -g --unsafe-perm @aws-amplify/cli@{AMPLIFY_VERSION}
