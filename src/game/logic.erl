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


add_player(Connection) ->
  gproc:send({r, l, players}, {add, Connection}),
  gproc:send({r, l, messenger}, {send_map, Connection}),
  gproc:send({r, l, messenger}, {sendout_players}).

update_position(Connection, Position) ->
  gproc:send({r, l, map}, {get_at, Position,
    fun (Tile) ->
      case Tile of
        % a basic traversable tile type
        2 ->
          gproc:send({r, l, players}, {update, Connection, Position}),
          gproc:send({r, l, messenger}, {sendout_players});
        _ ->
          erlang:display(<<"illigal position">>)
      end
    end
  }).
