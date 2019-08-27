### noVNC.Dockerfile
EXPOSE 6080

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN  sudo apt-get update && \
     sudo apt-get install -y --no-install-recommends \
            autocutsel \
            xfwm4 \
            libgtk-3-0 \
            xfonts-100dpi xfonts-75dpi xfonts-scalable \
            xvfb \
            novnc \
            websockify \
            dbus-x11 \
            nano \
            mc \
            htop \
            terminator \
            procps \  
            vnc4server && \
      sudo cp /usr/share/novnc/vnc.html /usr/share/novnc/index.html && \
      echo "[program:vncserver]"                                                >> $SUPERVISORCONF && \
      echo "command=vncserver -SecurityTypes none -cleanstale -useold"          >> $SUPERVISORCONF && \
      echo "autostart=true"                                                     >> $SUPERVISORCONF && \
      echo ""                                                                   >> $SUPERVISORCONF && \
      echo "[program:novnc]"                                                    >> $SUPERVISORCONF && \
      echo "command=websockify -D --web=/usr/share/novnc/ 6080 localhost:5901"  >> $SUPERVISORCONF && \
      echo "autostart=true"                                                     >> $SUPERVISORCONF && \
      echo ""                                                                   >> $SUPERVISORCONF && \
    sudo sed -i -e '1 aautocutsel -fork' /etc/X11/Xvnc-session && \
    sudo sed -i -e 's/iconic/nowin/g' /etc/X11/Xvnc-session && \
    sudo sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults && \
    sudo sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults && \
    sudo sed -i -e '1 aterminator &' /etc/X11/Xvnc-session && \
    sudo apt-get autoremove -y && \
    sudo apt-get clean -y  && \
    sudo rm -rf /var/lib/apt/lists/*

SHELL [ "/bin/sh", "-c" ]