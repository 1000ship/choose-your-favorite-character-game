var data = {};

const MemoryData = {
  setData: (key, value) => {
    data[key] = value;
  },

  getData: (key, defaultValue) => {
    return data[key] ?? defaultValue;
  },

  getWholeData: () => {
    return data;
  },

  clearData: () => {
    data = {};
  },

};

export default MemoryData;
