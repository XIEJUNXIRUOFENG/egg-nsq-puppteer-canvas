#!/usr/bin/env bash
set -e

echo

echo "Enter new version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo $VERSION

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  # commit
  npm version $VERSION --message "build: release $VERSION" --git-tag-version false
  git add .
  git commit -m "build: build $VERSION"

  # tag
  git tag -a v$VERSION -m "release $VERSION"

  # push
  git push origin refs/tags/v$VERSION
  git push
fi
