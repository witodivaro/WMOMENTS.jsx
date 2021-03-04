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
        'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imagePath TEXT NOT NULL, location TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
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

export const insertLocation = ({title, imagePath, location, lat, lng}) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO locations (title, imagePath, location, lat, lng) VALUES (?, ?, ?, ?, ?);`,
        [title, imagePath, location, lat, lng],
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
