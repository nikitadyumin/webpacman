#!/bin/sh

rm -rf ./deps

rebar compile

erl \
 -noshell \
 -name webpacman@localhost \
 -pa ebin \
 -pa deps/*/ebin \
 -eval "application:ensure_all_started(webpacman)"
