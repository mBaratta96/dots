#!/bin/bash
NETWORK_NAME="iwgetid -r"
NOT_CONNECTED_COLOR="#232a2d"

zscroll --length 10 \
    --scroll-padding " " \
    --delay 1 \
    --match-command "$NETWORK_NAME" \
    --match-text "^$" "--before-text '﬉ %{F$NOT_CONNECTED_COLOR}not connected'" \
    --match-text "[^\s]" "--before-text '﬉ '" \
    --update-check true \
    --update-interval 30 \
    --before-text "﬉ " \
    "$NETWORK_NAME" &
wait
