// src/features/favorites/providerSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {mockCampaignData} from '../utils/mockCampaignData';

const providerSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: mockCampaignData, // Can be array of item IDs or full objects
    favoriteItems: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      console.log(action.payload);
      const item = state.items.find(item => item.id === action.payload);

      if (item && !state.favoriteItems.some(fav => fav.id === item.id)) {
        state.favoriteItems.push({...item, isfavorites: true});
      } else {
        console.log('hit');
        state.favoriteItems = state.favoriteItems.filter(
          fav => fav.id !== item.id,
        );
      }
      // ✅ Safe way to log (convert from proxy)
      console.log('Favorites:', JSON.parse(JSON.stringify(state.items)));
    },
    // removeFavorite: (state, action) => {
    //   state.items = state.favoriteItems.filter(
    //     item => item.id !== action.payload.id,
    //   );
    // },
  },
});

export const {addFavorite, removeFavorite} = providerSlice.actions;
export const providerReducer = providerSlice.reducer;
