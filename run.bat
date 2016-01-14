erl ^
 -sname webpacman ^
 -pa ebin ^
 -pa ./deps/sync/ebin ^
 -pa ./deps/gproc/ebin ^
 -pa ./deps/ranch/ebin ^
 -pa ./deps/cowlib/ebin ^
 -pa ./deps/cowboy/ebin ^
 -pa ./deps/jsx/ebin ^
 -eval "application:ensure_all_started(webpacman)"