import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'locations.db',
  location: 'default',
});

SQLite.enablePromise(false);

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imagePath TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL, date TEXT NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const insertLocation = ({title, imagePath, lat, lng, date}) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO locations (title, imagePath, lat, lng, date) VALUES (?, ?, ?, ?, ?);`,
        [title, imagePath, lat, lng, date],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchCollections = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM locations ORDER BY id DESC',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
