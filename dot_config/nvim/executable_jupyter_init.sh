#!/bin/bash

KERNEL_NAME=$1
python3 -m venv $KERNEL_NAME
source "${KERNEL_NAME}/bin/activate"
pip3 install wheel pynvim jupyter_client cairosvg plotly kaleido pnglatex pyperclip ipykernel pandas nbformat
python3 -m ipykernel install --user --name $KERNEL_NAME
deactivate
