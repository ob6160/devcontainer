EXPOSE 6080

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN  sudo apt-get update && \
     sudo apt-get install -y --no-install-recommends \
            autocutsel \
            xfwm4 \
            libgtk-3-0 \
            xfonts-100dpi xfonts-75dpi xfonts-scalable \
            xvfb \
            dbus-x11 \
            nano \
            mc \
            htop \
            terminator \
            procps \  
            vnc4server && \
      git clone --depth 1 https://github.com/novnc/noVNC.git $APPSDIR/noVNC && \
      git clone --depth 1 https://github.com/novnc/websockify $APPSDIR/noVNC/utils/websockify && \
      rm -rf $APPSDIR/noVNC/.git && \
      rm -rf $APPSDIR/noVNC/utils/websockify/.git && \
      cp $APPSDIR/noVNC/vnc.html $APPSDIR/noVNC/index.html && \
      echo "[program:vncserver]"                                                              >> $SUPERVISORCONF && \
      echo "command=vncserver -SecurityTypes none -cleanstale -useold"                        >> $SUPERVISORCONF && \
      echo "autostart=true"                                                                   >> $SUPERVISORCONF && \
      echo ""                                                                                 >> $SUPERVISORCONF && \
      echo "[program:novnc]"                                                                  >> $SUPERVISORCONF && \
      echo "command=$APPSDIR/noVNC/utils/launch.sh --vnc localhost:5901 --listen 6080 --web"  >> $SUPERVISORCONF && \
      echo "autostart=true"                                                                   >> $SUPERVISORCONF && \
      echo ""                                                                                 >> $SUPERVISORCONF && \
    sudo sed -i -e '1 aautocutsel -fork' /etc/X11/Xvnc-session && \
    sudo sed -i -e 's/iconic/nowin/g' /etc/X11/Xvnc-session && \
    sudo sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults && \
    sudo sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults && \
    sudo sed -i -e '1 aterminator &' /etc/X11/Xvnc-session && \
    sudo apt-get autoremove -y && \
    sudo apt-get clean -y  && \
    sudo rm -rf /var/lib/apt/lists/*

SHELL [ "/bin/sh", "-c" ]