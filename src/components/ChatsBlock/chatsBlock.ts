import Block from "../../utils/Block";

import ChatBlock from "../ChatBlock/chatBlock";
import template from "./chatsBlock.hbs";
import { withStore } from "../../utils/Store";
import store from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import Modal from "../Modal/modal";
import AddUserToChatForm from "../AddUserToChat/addUserToChat";

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
          lastMessageAbstract: chat.last_message,
          lastMessageTime: chat.time,
          newMessagesCount: chat.unread_count,
          events: {
            click: () => {
              ChatsController.setSelectedChatId(chat.id);
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
      this.children.chatsBlocks = chatsBlocks;
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({ ...state }));

export const ChatsBlock = withChats(ChatsBlockBase as typeof Block);
