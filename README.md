```shell
rebar get-deps
rebar co
erl -sname webpacman -pa ebin -pa deps/cowboy/ebin -pa deps/gproc/ebin -pa /deps/cowlib/ebin -pa /deps/ranch/ebin -pa /deps/jsx/ebin -boot start_sasl -s boot
```