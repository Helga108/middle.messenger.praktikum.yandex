import API, { ChatsAPI } from "../api/ChatsAPI";
import store from "../utils/Store";
import router from "../utils/Router";
import UserController from "../controllers/UserController";

export class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async fetchChats() {
    const chats = await this.api.read();
    store.set("chats", chats);
  }

  async getChatToken(id: number) {
    const token = await this.api.getChatToken(id);
    return token;
  }

  async createChat(data: object) {
    await this.api.createChat(data);
    this.fetchChats();
  }

  async deleteChat(id: string) {
    await this.api.deleteChat(id);
    this.fetchChats();
  }

  setSelectedChatId(id: string) {
    store.set("selectedChatId", id);
  }

  async addUsersToChat(data) {
    const user = await UserController.findUserByLogin(data);
    const userData = { users: [user], chatId: store.getState().selectedChatId };
    await this.api.addUsersToChat(userData);
    store.set("userIdToAdd", "");
    this.fetchChats();
  }

  async removeUserFromChat(data) {
    const user = await UserController.findUserByLogin(data);
    const userData = { users: [user], chatId: store.getState().selectedChatId };
    await this.api.deleteUsersFromChat(userData);
    store.set("userIdToAdd", "");
    this.fetchChats();
  }
}

export default new ChatsController();
