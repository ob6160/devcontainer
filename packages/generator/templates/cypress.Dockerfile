FROM devimage

### cypress.Dockerfile
# RUN apt-get update \
# && apt-get install --no-install-recommends -y \
#   libgtk-3-0 \
#   libnotify-dev \
#   libgconf-2-4 \
#   libnss3 \
#   libxss1 \
#   libasound2 \
#   libxtst6 \
#   xauth \
#   xvfb \
# && 
RUN yarn global add cypress@{CYPRESS_VERION} stmux \
&& yarn cache clean \
&& mv /root/.cache /etc/skel/ -y \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/* /tmp/* 

RUN ls -la /root
