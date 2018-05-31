class BufferManager {

  constructor() {
    this.result = null;
  }

  save(buffer) {
    if (this.result === null) {
      this.result = buffer;
    } else {
      const size = this.result.length + buffer.length;

      this.result = Buffer.concat([this.result, buffer], size);
    }
  }

  getData() {
    return this.result;
  }

  clean() {
    this.result = null;
    return this;
  }
}

module.exports = BufferManager;