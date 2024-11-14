#!/bin/sh

# Clean script
# Deletes all found generated files

# Switch to directory of the script

cd $(dirname $0)

# Find configuration script
# Only generated directory is actually needed

if [ -f "./config.sh" ]
then

  . "./config.sh"

elif [ -f "./config" ]
then

  . "./config"

else

  GENERATED_DIR="./.gen"

fi

GENERATED_LISTING="$GENERATED_DIR/generated_list.txt"

if [ -f $GENERATED_LISTING ]
then

  while read line
  do

    rm -rf "$line"

  done < "$GENERATED_LISTING"

fi

# Delete the generated directory itself after
# other content is cleared

rm -rf "$GENERATED_DIR"
