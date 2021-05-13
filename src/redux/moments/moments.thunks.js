import { createAsyncThunk } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import * as DBActions from '../../db/db';
import RNFS from 'react-native-fs';
import { clearNewMoment } from '../new-moment/new-moment.slice';

export const addMoment = createAsyncThunk(
  'moments/addMoment',
  async ({ title, location, imagePath }, { rejectWithValue, dispatch }) => {
    const fileName = imagePath ? imagePath.split('/').pop() : null;
    const newPath = fileName
      ? (Platform.OS === 'android' ? 'file://' : '') +
        RNFS.DocumentDirectoryPath +
        `/${fileName}`
      : '';

    const now = new Date().toISOString();

    dispatch(clearNewMoment());

    try {
      if (fileName) {
        await RNFS.moveFile(imagePath, newPath);
      }

      const dbResult = await DBActions.insertMoment({
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

export const removeMoment = createAsyncThunk(
  'moments/removeMoment',
  async ({ id }, { rejectWithValue }) => {
    try {
      await DBActions.removeMoment({ id });

      return {
        id,
      };
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const fetchMomentsFromDB = createAsyncThunk(
  'moments/fetchMomentsFromDB',
  async (_, { rejectWithValue }) => {
    try {
      const dbResult = await DBActions.fetchMoments();
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
