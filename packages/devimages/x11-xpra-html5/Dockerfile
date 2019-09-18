FROM debian:buster-slim

RUN apt-get update \
&& apt-get install -y --no-install-recommends ca-certificates curl gnupg2 \
&& curl https://xpra.org/gpg.asc | apt-key add - \
&& curl https://xpra.org/repos/buster/xpra.list > /etc/apt/sources.list.d/xpra.list \
&& curl https://xpra.org/repos/buster/xpra-beta.list >> /etc/apt/sources.list.d/xpra.list \
&& apt-get update \   
&& apt-get install --no-install-recommends -y xpra xpra-html5 x264 python3 \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/*


CMD bash -c "xpra start --html=on --bind-tcp=0.0.0.0:14500 --daemon=no"