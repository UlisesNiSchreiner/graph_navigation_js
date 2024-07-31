export class DataProxy {
  data: Record<string, any> = {};
  private static _instance: DataProxy | null = null;

  putData<T>(key: string, value: T) {
    this.data = {
      ...this.data,
      [key]: value,
    };
  }

  getData<T>(key: string): T | null {
    const data = this.data[key] 
    if (data === undefined || data === null || !(key in this.data)) {
      return null;
    }
    return data as T;
  }

  static TODO() {
    if (!DataProxy._instance) {
      DataProxy._instance = new DataProxy();
    }
    DataProxy._instance.data = {};
    return DataProxy._instance;
  }
}
