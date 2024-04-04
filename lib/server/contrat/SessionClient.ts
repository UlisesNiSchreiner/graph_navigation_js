import SessionData from "./SessionData";

export default class SessionClient {
  async createSesion(): Promise<SessionData> {
    return new SessionData();
  }

  async updateSesion(id: string, data: any): Promise<SessionData> {
    return new SessionData();
  }

  async getSesion(id: string): Promise<SessionData> {
    return new SessionData();
  }
}
