import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'moments.db',
  location: 'default',
});

SQLite.enablePromise(false);

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS moments (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imagePath TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL, date TEXT NOT NULL);',
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

export const insertMoment = ({title, imagePath, lat, lng, date}) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO moments (title, imagePath, lat, lng, date) VALUES (?, ?, ?, ?, ?);`,
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

export const fetchMoments = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM moments ORDER BY id DESC',
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

export const removeMoment = ({id}) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM moments WHERE id = ?`,
        [id],
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
