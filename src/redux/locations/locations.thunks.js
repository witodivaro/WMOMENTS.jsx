import {createAsyncThunk} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import * as DBActions from '../../db/db';
import RNFS from 'react-native-fs';
import {clearNewLocation} from '../new-location/new-location.slice';

export const addLocation = createAsyncThunk(
  'locations/addLocation',
  async ({title, location, imagePath}, {rejectWithValue, dispatch}) => {
    const fileName = imagePath ? imagePath.split('/').pop() : null;
    const newPath = fileName
      ? (Platform.OS === 'android' ? 'file://' : '') +
        RNFS.DocumentDirectoryPath +
        `/${fileName}`
      : 'https://vetdom.ru/local/templates/vetdom-services/img/not-found.png';

    const now = new Date().toISOString();

    dispatch(clearNewLocation());

    try {
      if (fileName) {
        await RNFS.moveFile(imagePath, newPath);
      }

      const dbResult = await DBActions.insertLocation({
        title,
        imagePath: newPath,
        lat: location.lat,
        lng: location.lng,
        date: now,
      });

      return {
        title,
        lat: location.lat,
        lng: location.lng,
        imagePath: newPath,
        id: dbResult.insertId.toString(),
        date: now,
      };
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const removeLocation = createAsyncThunk(
  'locations/removeLocation',
  async ({id}, {rejectWithValue}) => {
    try {
      await DBActions.removeLocation({id});

      return {
        id,
      };
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const fetchLocationsFromDB = createAsyncThunk(
  'locations/fetchLocationsFromDB',
  async (_, {rejectWithValue}) => {
    try {
      const dbResult = await DBActions.fetchCollections();
      const items = [];
      for (let i = 0; i < dbResult.rows.length; i++) {
        items.push(dbResult.rows.item(i));
      }
      return {
        items,
      };
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
