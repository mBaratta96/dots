#!/bin/bash

NOT_CONNECTED_COLOR="#232a2d"
PLAYER="spotify,cmus"
PLAYERCTL_STATUS=$(playerctl --player=$PLAYER status 2>/dev/null)
CODE=$?

if [ $CODE -eq 0 ]; then
    echo "玲" 
else
    echo "%{F$NOT_CONNECTED_COLOR}玲"
fi
