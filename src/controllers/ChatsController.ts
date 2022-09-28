import API, { ChatsAPI } from "../api/ChatsAPI";
import store from "../utils/Store";
import router from "../utils/Router";

export class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async fetchChats() {
    const chats = await this.api.read();
    store.set("chats", chats);
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

  async addUsersToChat(userID: string, chatId: string) {
    const data = {
      users: [userID],
      chatId: chatId,
    };
    await this.api.addUsersToChat(data);
    store.set("userIdToAdd", "");
    this.fetchChats();
  }

  async removeUserFromChat(userId: string, chatId: string) {
    const data = {
      users: [userID],
      chatId: chatId,
    };
    await this.api.deleteUsersFromChat(data);
    store.set("userIdToDelete", "");
    this.fetchChats();
  }
  //   async signin(data: SigninData) {
  //     try {
  //       await this.api.signin(data);

  //       router.go("/messenger");
  //     } catch (e: any) {
  //       console.error(e);
  //     }
  //   }

  //   async signup(data: SignupData) {
  //     try {
  //       await this.api.signup(data);

  //       await this.fetchUser();

  //       router.go("/messenger");
  //     } catch (e: any) {
  //       console.error(e.message);
  //     }
  //   }

  //   async fetchUser() {
  //     const user = await this.api.read();
  //     store.set("user", user);
  //   }

  //   async logout() {
  //     try {
  //       await this.api.logout();

  //       router.go("/");
  //     } catch (e: any) {
  //       console.error(e.message);
  //     }
  //   }
}

export default new ChatsController();
