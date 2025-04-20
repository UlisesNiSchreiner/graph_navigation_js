export default class SessionData {
  id: string = "";
  data: Record<string, any> = {};
  private static _instance: SessionData | null = null;

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

  removeData(key: string): void {
    if (key in this.data) {
      delete this.data[key];
    }
  }

  static TODO() {
    if (!SessionData._instance) {
      SessionData._instance = new SessionData();
    }
    SessionData._instance.data = {};
    SessionData._instance.id = "dummy";
    return SessionData._instance;
  }
}
