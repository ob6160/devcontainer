FROM devimage

### xfce.Dockerfile

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        xfce4 \
        xfce4-goodies \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* /root/* \
    && echo "xpra start-desktop --start=xfce4-session --html=on --bind-tcp=0.0.0.0:6080; sleep infinity" > /usr/bin/startx  
