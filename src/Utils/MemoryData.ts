var data: any = {}

const MemoryData = {
  setData: (key: string, value: string) => {
    data[key] = value
    sessionStorage.setItem("CYFC", JSON.stringify(data))
  },

  getData: (key: string, defaultValue?: string) => {
    data = JSON.parse(sessionStorage.getItem("CYFC") || "{}")
    return data[key] ?? defaultValue
  },

  getWholeData: () => {
    data = JSON.parse(sessionStorage.getItem("CYFC") || "{}")
    return data
  },

  clearData: () => {
    data = {}
    sessionStorage.setItem("CYFC", JSON.stringify(data))
  },
}

export default MemoryData
