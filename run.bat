erl ^
 -sname webpackman ^
 -pa ebin ^
 -pa ./deps/gproc/ebin ^
 -pa ./deps/ranch/ebin ^
 -pa ./deps/cowlib/ebin ^
 -pa ./deps/cowboy/ebin ^
 -pa ./deps/jsx/ebin ^
 -boot start_sasl ^
 -s boot