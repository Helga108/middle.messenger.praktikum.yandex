import API, { UserAPI, UserData } from "../api/UserAPI";

import store from "../utils/Store";
import router from "../utils/Router";

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async updateProfile(data: UserData) {
    try {
      const userId = store.getState().user.id;
      await this.api.update(userId, data);
      await this.fetchUserById(userId);
      router.go("/settings");
    } catch (e) {
      console.error(e);
    }
  }

  async fetchUserById(id: string) {
    const user = await this.api.read(id);
    store.set("user", user);
  }

  async changePassword(passData: object) {
    try {
      await this.api.changePassword(passData);
      router.go("/settings");
    } catch (e) {
      console.error(e);
    }
  }

  async findUserByLogin(data: { login: string }) {
    try {
      const users: any = await this.api.search(data);
      if (users !== undefined && users.length > 0) {
        const user = users.filter((usr: { login: string }) => {
          return usr.login === data.login;
        });
        if (user.length > 0) {
          store.set("userIdToAdd", user[0].id);
          console.log(user[0].id);
          return user[0].id;
        } else {
          console.log("user not found");
        }
      }
      return;
    } catch (e) {
      console.error(e);
    }
  }
}

export default new UserController();
