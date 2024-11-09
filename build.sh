#!/bin/sh

# Set working directory to script directory
cd $(dirname $0)

# VARIABLES
BUILD_DIR=build
WORKING_DIR=working
SOURCE_DIR=src
TEMPLATE_DIR=template

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

# Convert all markdown files to HTML using
# pandoc. Append pre and post HTML
# template files

# If file is HTML, just move it to the
# build direcoty
while read path; do
  echo "$path"
done < $WORKING_DIR/lists.txt