#!/bin/bash

source ~/.config/polybar/weather-scripts/settings.sh

getData $1

if [ $ERROR -eq 0 ]; then
    TEMP=`echo $RESPONSE | jq .main.temp`
    if [ "$UNITS" = "metric" ]; then
        TEMP_ICON="糖"
    elif [ "$UNITS" = "imperial" ]; then
        TEMP_ICON="宅"
    else
        TEMP_ICON="洞"
    fi
        
    TEMP=`echo "$TEMP" | cut -d "." -f 1`
        
    if [ "$TEMP" -le $COLD_TEMP ]; then
        TEMP="%{F$COLOR_COLD}%{T$TEMP_FONT_CODE}%{T-}%{F-} $COLOR_TEXT_BEGIN$TEMP%{T$TEMP_FONT_CODE}$TEMP_ICON%{T-}$COLOR_TEXT_END"
    elif [ `echo "$TEMP >= $HOT_TEMP" | bc` -eq 1 ]; then
        TEMP="%{F$COLOR_HOT}%{T$TEMP_FONT_CODE}%{T-}%{F-} $COLOR_TEXT_BEGIN$TEMP%{T$TEMP_FONT_CODE}$TEMP_ICON%{T-}$COLOR_TEXT_END"
    else
        TEMP="%{F$COLOR_NORMAL_TEMP}%{T$TEMP_FONT_CODE}%{T-}%{F-} $COLOR_TEXT_BEGIN$TEMP%{T$TEMP_FONT_CODE}$TEMP_ICON%{T-}$COLOR_TEXT_END"
    fi
    echo "| $TEMP"
else
    echo "Error"
fi
