/* eslint-disable indent */
import { Dispatch as ReactDispatch } from 'react';
import ICoinListItem from './types/ICoinListItem';

export interface Store {
  watchlist: ICoinListItem[];
}

interface AddToWatchlist {
  type: 'addToWatchlist';
  coinListItem: ICoinListItem;
}

interface RemoveFromWatchlist {
  type: 'removeFromWatchlist';
  coinListItem: ICoinListItem;
}

export type Actions = AddToWatchlist | RemoveFromWatchlist;

export type Dispatch = ReactDispatch<Actions>;

export const reducer = (state: Store, action: Actions): Store => {
  switch (action.type) {
    case 'addToWatchlist': {
      const j = {
        ...state,
        watchlist: [...state.watchlist, action.coinListItem],
      };
      return j;
      break;
    }
    case 'removeFromWatchlist': {
      const coin = state.watchlist.find(
        (coin) => coin.id === action.coinListItem.id
      );
      let newWatchlist;
      if (coin) {
        const index = state.watchlist.indexOf(coin);
        newWatchlist = state.watchlist.filter(
          (coin_, index_) => index_ !== index
        );
      }
      return {
        ...state,
        watchlist: newWatchlist || state.watchlist,
      };
    }
  }
};
