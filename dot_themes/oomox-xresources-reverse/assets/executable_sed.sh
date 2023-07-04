#!/bin/sh
sed -i \
         -e 's/#0B1726/rgb(0%,0%,0%)/g' \
         -e 's/#dfdfdf/rgb(100%,100%,100%)/g' \
    -e 's/#0B1726/rgb(50%,0%,0%)/g' \
     -e 's/#9BA6AF/rgb(0%,50%,0%)/g' \
     -e 's/#0B1726/rgb(50%,0%,50%)/g' \
     -e 's/#dfdfdf/rgb(0%,0%,50%)/g' \
	"$@"
