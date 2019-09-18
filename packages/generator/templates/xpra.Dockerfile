FROM devimage

### xpra.Dockerfile

RUN apt-get update \
&& apt-get install -y --no-install-recommends ca-certificates curl gnupg2 \
&& curl https://xpra.org/gpg.asc | apt-key add - \
&& curl https://xpra.org/repos/{XPRADISTRO}/xpra.list > /etc/apt/sources.list.d/xpra.list \
&& curl https://xpra.org/repos/{XPRADISTRO}/xpra-beta.list >> /etc/apt/sources.list.d/xpra.list \
&& apt-get update \   
&& apt-get install --no-install-recommends -y xpra xpra-html5 x264 python3 python-paramiko python-pyinotify python-xdg dbus dbus-x11 \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/*

ENV STARTCMD "${STARTCMD} && xpra start --html=on --bind-tcp=0.0.0.0:6080 --daemon=no"