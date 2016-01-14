#!/bin/sh

erl \
 -sname webpacman\
 -pa ebin \
 -pa deps/*/ebin \
 -eval "application:ensure_all_started(webpacman)"
