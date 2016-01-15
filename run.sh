#!/bin/sh

erl \
 -name webpacman@localhost \
 -pa ebin \
 -pa deps/*/ebin \
 -eval "application:ensure_all_started(webpacman)"
