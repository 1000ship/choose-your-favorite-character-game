const MemoryData = {
  setData: (data: any) => sessionStorage.setItem("CYFC", JSON.stringify(data)),
  getData: () => JSON.parse(sessionStorage.getItem("CYFC") || "{}"),
  clearData: () => sessionStorage.setItem("CYFC", JSON.stringify({})),
}

export default MemoryData
