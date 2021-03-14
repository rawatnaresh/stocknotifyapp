import {useState, useMemo, useEffect} from 'react';
import {company} from '../data/company';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type addWatchlistType = {symbol: String; minAmount: Number; maxAmount: Number};
export const useFetchStockList = () => {
  const [state, setState] = useState({
    loading: true,
    listings: company,
    error: null,
  });
  useEffect(() => {
    // Fetch all the listing once
    // actions.getListings();
    // setState({loading: false, error: null, listings: company});
  });
  const actions = useMemo(
    () => ({
      getListings: () => {
        setTimeout(() => {
          setState({loading: false, error: null, listings: company});
        }, 3000);
      },
      addToWatchlist: async (data: addWatchlistType) => {
        const listings = state.listings;
        const foundItem = listings.findIndex(
          (item) => item.symbol === data.symbol,
        );

        listings[foundItem].watched = true;
        setState((prevState) => ({...prevState, listings}));

        const users = firestore().collection('users');
        const authUser = auth().currentUser;
        if (authUser) {
          const doc = await users.doc(authUser.uid).get();
          let watchlists = [];
          if (doc.data()?.watches) {
            watchlists = doc.data()?.watches;
          }
          const symbolIndex = watchlists.findIndex(
            (w: any) => w.symbol === data.symbol,
          );
          const newWatchlist = {
            maxPrice: data.maxAmount,
            minPrice: data.minAmount,
            symbol: data.symbol,
          };

          if (symbolIndex > -1) {
            watchlists[symbolIndex] = newWatchlist;
          } else {
            watchlists.push(newWatchlist);
          }
          await users
            .doc(authUser.uid)
            .set({watches: watchlists}, {merge: true});

          const notification = firestore().collection('notifications');
          await notification.doc().set({
            maxPrice: data.maxAmount,
            minPrice: data.minAmount,
            user: authUser.uid,
            symbol: data.symbol,
          });
        }
      },
      removeFromWatchlist: () => {
        // const listings = state.listings;
        // const foundItem = listings.findIndex((item) => item.id === id);
        // listings[foundItem].watched = false;
        // setState((prevState) => ({...prevState, listings}));
      },
      state,
    }),
    [state],
  );

  return actions;
};
