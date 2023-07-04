#!/bin/bash
NOT_CONNECTED_COLOR="#232a2d"
PLAYER="spotify,cmus"
PLAYERCTL_STATUS=$(playerctl --player=$PLAYER status 2>/dev/null)
CODE=$?

if [ $CODE -eq 0 ]; then
    if [ $PLAYERCTL_STATUS = "Paused" ]; then
        echo "契"
    elif [ $PLAYERCTL_STATUS = "Playing" ]; then
        echo ""
    else
        echo "Err"
    fi
else
    echo "%{F$NOT_CONNECTED_COLOR}"
fi 
