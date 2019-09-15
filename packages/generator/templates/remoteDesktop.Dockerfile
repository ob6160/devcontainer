FROM devimage

### remoteDesktop.Dockerfile

ARG XPRADISTRO={XPRADISTRO}

RUN curl https://xpra.org/gpg.asc | apt-key add - \
  && curl https://xpra.org/repos/${XPRADISTRO}/xpra.list > /etc/apt/sources.list.d/xpra.list \
&& curl https://xpra.org/repos/${XPRADISTRO}/xpra-beta.list >> /etc/apt/sources.list.d/xpra.list \
&& apt-get update \
&& apt-get install -y xpra \
&& apt-get install --no-install-recommends -y \
  xfwm4 \
  libgtk-3-0 \
  xvfb \
  dbus-x11 \
  nano \
  mc \
  htop \
  terminator \
  procps \  
  && touch /usr/bin/startx && chmod +x /usr/bin/startx \ 
  && echo "xpra --start=terminator --html=on --bind-tcp=0.0.0.0:6080; sleep infinity" > /usr/bin/startx \   
  && sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults \
  && sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* /root/* 