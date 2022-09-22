import API, { ChatsAPI } from "../api/ChatsAPI";
import store from "../utils/Store";
import router from "../utils/Router";

export class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
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
