#!/bin/sh

cd $(dirname $0)

# Config

SOURCE_DIR=./md
TEMPLATE_DIR=./src
GENERATED_DIR=./gen
FILE_BUILD=./every.sh

# Custom variables

SECONDS=$(date +"%s")

song_of_the_day_name="Guess featuring billie eilish"
song_of_the_day_album="Brat but it's completely different but also still brat"
song_of_the_day_artist="Charli xcx"
song_of_the_day_spotify="https://open.spotify.com/track/0IsIY8pfu1yaGkPUD7pkDx?si=f5bab50966014e4f"
song_of_the_day_youtube="https://youtu.be/huGd4efgdPA?si=HFG69GFPU-jB_Fek"

FOOTER_TEXT=$(cat ./src/footer-text.htm)