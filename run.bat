erl ^
 -sname webpackman ^
 -pa ebin ^
 -pa deps/cowboy/ebin ^
 -pa deps/gproc/ebin ^
 -pa /deps/cowlib/ebin ^
 -pa /deps/ranch/ebin ^
 -boot start_sasl ^
 -s boot