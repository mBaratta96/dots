#!/bin/sh
sed -i \
         -e 's/#0a0e14/rgb(0%,0%,0%)/g' \
         -e 's/#B3B1AD/rgb(100%,100%,100%)/g' \
    -e 's/#000000/rgb(50%,0%,0%)/g' \
     -e 's/#cc0304/rgb(0%,50%,0%)/g' \
     -e 's/#000000/rgb(50%,0%,50%)/g' \
     -e 's/#ff0000/rgb(0%,0%,50%)/g' \
	"$@"
