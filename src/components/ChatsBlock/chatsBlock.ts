import Block from "../../utils/Block";

import ChatBlock from "../ChatBlock/chatBlock";
import template from "./chatsBlock.hbs";
import { withStore } from "../../utils/Store";
import store from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import Modal from "../Modal/modal";
import AddUserToChatForm from "../AddUserToChat/addUserToChat";
import RemoveUserFromChatForm from "../RemoveUserFromChatForm/removeUserFromChatForm";
import MessageController from "../../controllers/MessageController";

class ChatsBlockBase extends Block<any> {
  constructor(props) {
    super(props);
  }

  init() {
    const chats = this.props.chats || [];
    console.log("____", chats);
    let chatsBlocks = [];
    if (Array.isArray(chats)) {
      chats.forEach((chat: any) => {
        const chatBlock = new ChatBlock({
          id: chat.id,
          name: chat.tile,
          avatarImg: chat.avatar,
          lastMessageAbstract: chat.last_message,
          lastMessageTime: chat.time,
          newMessagesCount: chat.unread_count,
          events: {
            click: () => {
              store.set("messages", []);
              MessageController.leave();
              ChatsController.setSelectedChatId(chat.id);
            },
          },
          selected: false,
          wrapperClassName: "",
        });
        chatsBlocks.push(chatBlock);
      });
    }
    this.children.chatsBlocks = chatsBlocks;
  }

  protected componentDidUpdate(oldProps: object, newProps: object): boolean {
    if (newProps.chats !== undefined) {
      let chatsBlocks: typeof Block[] = [];
      newProps.chats.forEach((chat: any) => {
        const chatBlock = new ChatBlock({
          id: chat.id,
          name: chat.title,
          avatarImg: chat.avatar,
          lastMessageAbstract:
            chat.last_message !== null ? chat.last_message.content : "",
          lastMessageTime: chat.time,
          newMessagesCount: chat.unread_count,
          events: {
            click: () => {
              this.onChatSelection(chat);
            },
          },
          selected: false,
          wrapperClassName:
            chat.id === this.props.selectedChatId
              ? "chat-block-wrapper-selected"
              : "",
        });
        chatsBlocks.push(chatBlock);
      });
      this.children.addModal = new Modal({
        content: new AddUserToChatForm({}),
        showModal: false,
      });
      this.children.removeModal = new Modal({
        content: new RemoveUserFromChatForm({}),
        showModal: false,
      });
      this.children.chatsBlocks = chatsBlocks;
    }
    return true;
  }

  getMessages(token: string = store.getState().token) {}

  onChatSelection(chat) {
    ChatsController.setSelectedChatId(chat.id);
    ChatsController.getChatToken(chat.id).then(({ token }) => {
      store.set("token", token);
      //this.getMessages(token);
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({ ...state }));

export const ChatsBlock = withChats(ChatsBlockBase as typeof Block);
