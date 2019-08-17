docker run --rm -it \
    --name img \
    --volume $(pwd):/home/user/src:ro \ # for the build context and dockerfile, can be read-only since we won't modify it
    --workdir /home/user/src \ # set the builder working directory
    --volume "${HOME}/.docker:/root/.docker:ro" \ # for credentials to push to docker hub or a registry
    --security-opt seccomp=unconfined --security-opt apparmor=unconfined \ # required by runc
    r.j3ss.co/img build -t user/myimage .