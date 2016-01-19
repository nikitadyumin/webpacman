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

add_player(Connection) ->
  gproc:send({r, l, players}, {add, Connection}),
  gproc:send({r, l, messenger}, {send_map, Connection}),
  gproc:send({r, l, messenger}, {sendout_players}).

update_position(Connection, Position) ->
  gproc:send({r, l, map}, {get_at, Position,
    fun(Tile) ->
      if
        Tile == 140 -> % bonus
          gproc:send({r, l, map}, {set, Position, 100}),
          gproc:send({r, l, messenger}, {sendout_map}),
          gproc:send({r, l, players}, {add_score, Connection, ?BONUS}),
          gproc:send({r, l, players}, {update, Connection, Position}),
          gproc:send({r, l, messenger}, {sendout_players});
        Tile >= 100 andalso Tile < 200 -> % generally traversable
          gproc:send({r, l, players}, {update, Connection, Position}),
          gproc:send({r, l, messenger}, {sendout_players});
        true ->
          erlang:display(<<"illigal position">>)
      end
    end
  }).