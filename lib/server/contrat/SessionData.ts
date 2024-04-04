export default class SessionData {
  id: string = "";
  data: Record<string, any> = {};
  private static _instance: SessionData | null = null;

  setDataInSession<T>(key: string, value: T) {
    this.data = {
      ...this.data,
      [key]: value,
    };
  }

  getDataInSession(key: string): any {
    return this.data[key];
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
