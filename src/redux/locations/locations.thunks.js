import {createAsyncThunk} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import {fetchCollections, insertLocation} from '../../db/db';
import RNFS from 'react-native-fs';

export const addLocation = createAsyncThunk(
  'locations/addLocation',
  async ({title, location, imagePath}, {rejectWithValue}) => {
    const fileName = imagePath.split('/').pop();
    const newPath =
      (Platform.OS === 'android' ? 'file://' : '') +
      RNFS.DocumentDirectoryPath +
      `/${fileName}`;

    try {
      await RNFS.moveFile(imagePath, newPath);
      const dbResult = await insertLocation({
        title,
        location: 'Mock location',
        imagePath: newPath,
        lat: 15.6,
        lng: 12.3,
      });

      return {
        title,
        location,
        imagePath: newPath,
        id: dbResult.insertId.toString(),
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
      const dbResult = await fetchCollections();
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
