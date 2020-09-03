var data = {};

const MemoryData = {
  setData: (key, value) => {
    data[key] = value;
    sessionStorage.setItem("CYFC", JSON.stringify(data))
  },

  getData: (key, defaultValue) => {
    data = JSON.parse(sessionStorage.getItem("CYFC"))
    return data[key] ?? defaultValue;
  },

  getWholeData: () => {
    data = JSON.parse(sessionStorage.getItem("CYFC"))
    return data;
  },

  clearData: () => {
    data = {};
    sessionStorage.setItem("CYFC", JSON.stringify(data))
  },

};

export default MemoryData;
