#!/bin/bash
source ~/.config/polybar/weather-scripts/settings.sh
getData $1

if [ $ERROR -eq 0 ]; then
    if [ $DISPLAY_LABEL = "yes" ]; then
        DESCRIPTION=`echo "$RESPONSE" | jq .weather[0].description | tr -d '"' | sed 's/.*/\L&/; s/[a-z]*/\u&/g'`
    else
        DESCRIPTION=""
    fi
    OUTPUT="$ERR_MSG$COLOR_TEXT_BEGIN$DESCRIPTION$COLOR_TEXT_END"
    echo "$OUTPUT"
else
    echo ""
fi
