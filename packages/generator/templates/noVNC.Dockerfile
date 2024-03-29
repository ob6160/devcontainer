FROM devimage

### noVNC.Dockerfile

RUN  apt-get update \
  && apt-get install --no-install-recommends -y \
  autocutsel \
  xfwm4 \
  libgtk-3-0 \
  xvfb \
  novnc \
  websockify \
  dbus-x11 \
  nano \
  mc \
  htop \
  terminator \
  procps \  
  vnc4server \
  &&  cp /usr/share/novnc/vnc.html /usr/share/novnc/index.html \
  # &&  echo "[program:vncserver]"                                                >> $SUPERVISORCONF \
  # &&  echo "command=vncserver -SecurityTypes none -cleanstale -useold"          >> $SUPERVISORCONF \
  # &&  echo "autostart=true"                                                     >> $SUPERVISORCONF \
  # &&  echo ""                                                                   >> $SUPERVISORCONF \
  # &&  echo "[program:novnc]"                                                    >> $SUPERVISORCONF \
  # &&  echo "command=websockify -D --web=/usr/share/novnc/ 6080 localhost:5901"  >> $SUPERVISORCONF \
  # &&  echo "autostart=true"                                                     >> $SUPERVISORCONF \
  # &&  echo ""                                                                   >> $SUPERVISORCONF \
  && sed -i -e '1 aautocutsel -fork' /etc/X11/Xvnc-session \
  && sed -i -e 's/iconic/nowin/g' /etc/X11/Xvnc-session \
  && sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults \
  && sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults \
  && sed -i -e '1 aterminator &' /etc/X11/Xvnc-session \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* /root/*

  ENV STARTCMD  "websockify --web=/usr/share/novnc/ 6080 localhost:5901 --wrap-mode=ignore -- vncserver -geometry 1024x768 :1"