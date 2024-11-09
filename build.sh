#!/bin/bash

# Set working directory to script directory
cd $(dirname $0)

# VARIABLES
BUILD_DIR=build
WORKING_DIR=working
SOURCE_DIR=src
TEMPLATE_DIR=template
STATIC_DIR=static

# Set working directory relative to build
# directory
WORKING_DIR=$BUILD_DIR/$WORKING_DIR

# Reset all
rm -rf $BUILD_DIR
mkdir $BUILD_DIR
mkdir $WORKING_DIR

# Get a recursive list of all files in the
# source directory
find $SOURCE_DIR > $WORKING_DIR/lists.txt

# Substitute second literal
pre=$(cat $TEMPLATE_DIR/pre.htm)
substr="@s"
replacement=$(date +"%s")
echo $pre | sed -r s/$substr/$replacement/g > $WORKING_DIR/pre.htm
post=$(cat $TEMPLATE_DIR/post.htm)
echo $post | sed -r s/$substr/$replacement/g > $WORKING_DIR/post.htm

# Convert all markdown files to HTML using
# pandoc. Append pre and post HTML
# template files

# If file is HTML, just move it to the
# build direcoty
while read path
do
  REL=$(realpath -m --relative-to=$SOURCE_DIR $path)
  if [[ -d $path ]]
  then
    if [ ! -d $BUILD_DIR/$REL ]
    then
      mkdir $BUILD_DIR/$REL
    fi
  else
    if [[ $path == *.md ]]
    then
      cat $WORKING_DIR/pre.htm > $BUILD_DIR/$REL
      pandoc $path >> $BUILD_DIR/$REL
      cat $WORKING_DIR/post.htm >> $BUILD_DIR/$REL
      new_path=$BUILD_DIR/$REL
      mv $BUILD_DIR/$REL "${new_path%.*}.htm"
    else
      cp $path $BUILD_DIR/$REL
    fi
  fi
done < $WORKING_DIR/lists.txt

cp -r $STATIC_DIR $BUILD_DIR/$STATIC_DIR
