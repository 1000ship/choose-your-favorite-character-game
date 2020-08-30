function MemoryData() {
  this.data = {}

  this.setData = (key, value) => {
    this.data[key] = value
  }

  this.getData = (key) => {
    return this.data[key]
  }

  this.clearData = () => {
    this.data = {}
  }
}

export default MemoryData;
