FROM devimage

### suffix.Dockerfie

ENV STARTCMD "${STARTCMD} || true && sleep infinity"
CMD ${STARTCMD}