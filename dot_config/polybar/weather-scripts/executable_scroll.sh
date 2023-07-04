#!/bin/bash

zscroll --length 10 \
    --update-check true \
    --update-interval 30 \
    --scroll-padding " " \
    --delay 1 \
    "$HOME/.config/polybar/weather-scripts/description.sh" &
wait
