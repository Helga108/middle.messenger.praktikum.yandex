import store from "../utils/Store";
import router from "../utils/Router";

class MessageController {
  private _ws: WebSocket;

  private _chatId: number;

  private _userId: number;

  private _token: string;

  private _ping: any;

  constructor() {
    this._handleOpen = this._handleOpen.bind(this);
    this._handleMessage = this._handleMessage.bind(this);
    this._handleError = this._handleError.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  _addEvents() {
    this._ws.addEventListener("open", this._handleOpen);
    this._ws.addEventListener("close", this._handleClose);
    this._ws.addEventListener("message", this._handleMessage);
    this._ws.addEventListener("error", this._handleError);
  }

  _handleOpen() {
    console.log("Соединение установлено");
    this._ping = setInterval(() => {
      this._ws.send("");
    }, 20000);
    this.getMessages({ offset: 0 });
  }

  _handleClose(e) {
    if (e.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${e.code} | Причина: ${e.reason}`);
  }

  _handleMessage(e) {
    console.log("Получены данные", e.data);
    const rawMessages = JSON.parse(e.data);
    console.log("+++++", rawMessages);
    const oldMessages = store.getState().messages || [];
    if (Array.isArray(rawMessages)) {
      const newMessages = rawMessages.map((msg: {}) => {
        if (msg.user_id === store.getState().user.id) {
          msg.my = true;
        }
        return msg;
      });
      store.set("messages", [...oldMessages, ...newMessages]);
    }
  }

  _handleError(e) {
    console.log("Ошибка", e.message);
  }

  connect(options) {
    this._userId = options.userId;
    this._chatId = options.chatId;
    this._token = options.token;
    this._ws = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${options.userId}/${options.chatId}/${options.token}`
    );
    this._addEvents();
  }

  getMessages(options) {
    this._ws.send(
      JSON.stringify({
        content: options.offset.toString(),
        type: "get old",
      })
    );
  }

  public sendMessage(message: string) {
    this._ws.send(
      JSON.stringify({
        content: message,
        type: "message",
      })
    );
  }

  private _clearEvents() {
    this._ws.removeEventListener("open", this._handleOpen);
    //this._ws.removeEventListener('message', this._handleMassage);
    this._ws.removeEventListener("error", this._handleError);
    this._ws.removeEventListener("close", this._handleClose);
  }

  public leave() {
    clearInterval(this._ping);
    this._ws.close();
    this._clearEvents();
  }
}

export default new MessageController();
