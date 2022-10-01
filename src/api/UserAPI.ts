import BaseAPI from "./BaseAPI";

export interface SigninData {
  login: string;
  password: string;
}

export interface UserData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  read(id: string): Promise<User> {
    return this.http.get(`/${id}`);
  }

  create = undefined;

  update(id: string, data: UserData) {
    return this.http.put("/profile", data);
  }

  changePassword(passData: object) {
    return this.http.put("/password", passData);
  }

  search(login: { login: string }) {
    return this.http.post("/search", login);
  }

  delete = undefined;
}

export default new UserAPI();
