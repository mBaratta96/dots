#!/bin/sh
cmusfm "$@" &
/usr/local/bin/cmus-notify "$@" &
