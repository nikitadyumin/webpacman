#!/bin/sh

erl \
 -sname webpackman\
 -pa ebin\
 -pa deps/*/ebin \
 -boot start_sasl \
 -s boot
