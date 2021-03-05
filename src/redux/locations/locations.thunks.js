import {createAsyncThunk} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import {fetchCollections, insertLocation} from '../../db/db';
import RNFS from 'react-native-fs';

export const addLocation = createAsyncThunk(
  'locations/addLocation',
  async ({title, location, imagePath}, {rejectWithValue}) => {
    const fileName = imagePath ? imagePath.split('/').pop() : null;
    const newPath = fileName
      ? (Platform.OS === 'android' ? 'file://' : '') +
        RNFS.DocumentDirectoryPath +
        `/${fileName}`
      : `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png`;

    const now = new Date().toISOString();

    try {
      if (fileName) {
        await RNFS.moveFile(imagePath, newPath);
      }
      const dbResult = await insertLocation({
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
      console.log('lol error: ', error);
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
