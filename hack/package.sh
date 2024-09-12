#!/usr/bin/env bash

EXT=${EXT:-gatekeeper}
INPUT=${INPUT:-charts/$EXT}
OUTPUT=${OUTPUT:-./tmp/$EXT}

if [ ! -d "$OUTPUT" ]; then
  mkdir -p "$OUTPUT"
fi

for name in $(ls $INPUT | grep -Ev ^charts$); do
  cp -R "$INPUT/$name" "$OUTPUT/$name"
done

for chart in $(ls $INPUT | grep -E ^charts$); do
  # shellcheck disable=SC2045
  for subchart in $(ls $INPUT/$chart); do
    if [ ! -d "$OUTPUT/$chart" ]; then
      mkdir -p "$OUTPUT/$chart"
    fi
    helm package "$INPUT/$chart/$subchart" -d "$OUTPUT/$chart"
  done
done

