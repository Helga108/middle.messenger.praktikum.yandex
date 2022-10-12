import BaseAPI from "./BaseAPI";

export interface ChatsData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  read() {
    return this.http.get("");
  }

  createChat(data: object) {
    return this.http.post("", data);
  }

  addUsersToChat(data: any) {
    return this.http.put("/users", data);
  }

  deleteUsersFromChat(data: any) {
    return this.http.delete("/users", data);
  }

  deleteChat(id: string) {
    return this.http.delete("", { chatId: id });
  }

  getChatToken(id: number) {
    return this.http.post(`/token/${id}`);
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new ChatsAPI();
