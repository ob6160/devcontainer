### xfce.Dockerfile
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && \
    sudo sh -c 'echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    sudo apt-get update && \
    sudo apt-get install -y --no-install-recommends \
        xfce4 \
        xfce4-goodies \
        google-chrome-stable && \
    sudo apt-get clean -y && \
    sudo rm -rf /var/lib/apt/lists/* 
