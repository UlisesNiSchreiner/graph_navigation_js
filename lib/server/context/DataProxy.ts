export class DataProxy {
  data: Map<string, any> = new Map();

  putData(key: string, value: any) {
    this.data.set(key, value);
  }

  getData(key: string) {
    return this.data.get(key);
  }
}
