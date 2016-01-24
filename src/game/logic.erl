%%%-------------------------------------------------------------------
%%% @author ndyumin
%%% @copyright (C) 2016, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 15. Янв. 2016 11:28
%%%-------------------------------------------------------------------
-module(logic).
-author("ndyumin").

%% API
-export([
  update_position/2,
  add_player/1
]).

-define(BONUS, 10).
-define(BONUS_RESTORE_TIME_MS, 5000).

add_player(Connection) ->
  gproc:send({r, l, players}, {add, Connection}),
  gproc:send({r, l, messenger}, {send_map, Connection}).

update_position(Connection, Position) ->
  gproc:send({r, l, map}, {get_at, Position, curry_update(Connection, Position)}).

curry_update(Connection, Position) ->
  fun (TileCode) -> update(Connection, Position, TileCode) end.

update(Connection, Position, TileCode) when TileCode == 140 -> % bonus
  gproc:send({r, l, map}, {set, Position, 100}),
  gproc:send({r, l, players}, {add_score, Connection, ?BONUS}),
  gproc:send({r, l, players}, {update, Connection, Position}),
  [MapPid | _] = gproc:lookup_pids({r, l, map}),
  erlang:send_after(?BONUS_RESTORE_TIME_MS, MapPid, {set, Position, 140});

update(Connection, Position, TileCode) when TileCode >= 100 andalso TileCode < 200 -> % generally traversable
gproc:send({r, l, players}, {update, Connection, Position});

update(_Connection, _Position, _TileCode) ->
  erlang:display(<<"illigal position">>).