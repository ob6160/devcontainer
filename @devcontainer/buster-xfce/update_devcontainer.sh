replace="FROM devimages\/$npm_package_tagname\:$npm_package_version"

sed -i "" "1c \
    $replace
" .devimage/Dockerfile