

class Queue<T> {
  _oldestIndex = 1;
  _newestIndex = 1;
  _data: {
      [index: number] : T
  } = {};

  public size() {
    return this._newestIndex - this._oldestIndex;
  }
  public enqueue(data: T) {
    this._data[this._newestIndex] = data;
    this._newestIndex++;
  }
  public dequeue() {
    let oldestIndex = this._oldestIndex,
      newestIndex = this._newestIndex,
      deletedData: T;
    if (oldestIndex !== newestIndex) {
      deletedData = this._data[oldestIndex];
      delete this._data[oldestIndex];
      this._oldestIndex++;
      return deletedData;
    }
  }
}

export default Queue;
