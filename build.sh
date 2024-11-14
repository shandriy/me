#!/bin/sh

# Sets directory to that in which the script is located

cd $(dirname $0)

# Search for configuration script and execute it
# Initilizes constant variables and paths

if [ -f "./config.sh" ]
then

  . "./config.sh"

elif [ -f "./config" ]
then

  . "./config"

else

  # If no configuration file has been found,
  # initalize global variables to defaults

  SOURCE_DIR="./.src"
  TEMPLATE_DIR="./.tmp"
  GENERATED_DIR="./.gen"

fi

# If generated files exist, delete all of them

GENERATED_LISTING="$GENERATED_DIR/generated_list.txt"
GENERATED_SOURCE_LISTING="$GENERATED_DIR/generated_source.txt"

if [ -f $GENERATED_LISTING ]
then

  # Loop over every file listed, and delete all

  while read line
  do

    rm -rf "$line"

  done < "$GENERATED_LISTING"

fi

# Reset the generated directory

rm -rf "$GENERATED_DIR"
mkdir "$GENERATED_DIR"

# Create files needed for the generated dir;
# Needed later in script

touch "$GENERATED_LISTING"
touch "$GENERATED_SOURCE_LISTING"

# Begin collecting a list of source files
# If the source directory does not exist, replace
# it with an empty one. If it is a file, replace it
# with an empty directory as well.

if [ ! -d "$SOURCE_DIR" ]
then

  rm -f "$SOURCE_DIR"
  mkdir "$SOURCE_DIR"

fi

find "$SOURCE_DIR" > "$GENERATED_SOURCE_LISTING"

# Loop other every path listed in the source directory

while read line
do

  # Get path relative to the source directory for output

  relative_path=$(realpath -m --relative-to="$SOURCE_DIR" "$line")
  output_path="./$relative_path"

  if [ "${relative_path##*.}" = "md" ]
  then

    markdown_contents=$(pandoc "$line" -f markdown-smart)
    echo $markdown_contents

  fi

done < "$GENERATED_SOURCE_LISTING"