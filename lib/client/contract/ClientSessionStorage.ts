export default class ClientSessionStorage {
  sessionStorageKey: string = ''

  constructor(sessionStorageKey: string) {
    this.sessionStorageKey = sessionStorageKey;
  }
  
  async putSessionId(sessionId: string): Promise<void> {}
  async getSessionId(): Promise<string> {
    return "";
  }

  async deleteSessionId(): Promise<void> {}
}
