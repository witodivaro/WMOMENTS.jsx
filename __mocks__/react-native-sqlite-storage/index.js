export default {
  enablePromise: () => {},
  openDatabase: (...args) => {
    return {
      transaction: (...args) =>
        Promise.resolve({
          executeSql: (query) => {
            return Promise.resolve([]);
          },
        }),
      cleanDb: () => Promise.resolve(),
      executeSql: (query) => {
        return Promise.resolve([]);
      },
    };
  },
};
