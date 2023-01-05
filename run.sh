#!/bin/sh

deno run\
        --allow-read\
        --allow-net\
        --allow-env\
        --allow-run=kostka\
        src/app.ts
