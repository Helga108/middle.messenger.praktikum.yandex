import Block from "../../utils/Block";
import template from "./chatList.hbs";

import { ChatsBlock } from "../../components/ChatsBlock/chatsBlock";

import { chatsData } from "../../mock/chatsData";
import { ChatThread } from "../../components/ChatThread/chatThread";
import store, { withStore } from "../../utils/Store";
import Button from "../../components/Button/button";
import AuthController from "../../controllers/AuthController";
import ChatsController from "../../controllers/ChatsController";
import MessageController from "../../controllers/MessageController";

interface ChatListProps {
  title: string;
}

class ChatListBase extends Block<ChatListProps> {
  selectedChatId: number | null;

  constructor(props: ChatListProps) {
    super(props);
    this.selectedChatId = null;
  }

  componentDidUpdate(oldProps, newProps) {
    this.children.chatThread.setProps(newProps);
    if (newProps.selectedChatId) {
      this.children.chatThread = new ChatThread({
        messages: this.getMessages(),
        selectedChatId: newProps.selectedChatId,
        userId: 233,
      });
    }
    return true;
  }

  init() {
    ChatsController.fetchChats();
    this.children.chatsBlocks = new ChatsBlock({});
    this.children.chatThread = new ChatThread({
      messages: this.getMessages(),
      selectedChatId: this.props.selectedChatId,
      userId: store.getState().userId,
    });
    this.children.button = new Button({
      label: "logout",
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
    this.children.createChat = new Button({
      label: "+",
      events: {
        click: () => {
          ChatsController.createChat({ title: "new chat" });
        },
      },
    });
  }

  getMessages() {
    if (store.getState().selectedChatId !== undefined) {
      MessageController.connect({
        userId: store.getState().user.id,
        chatId: store.getState().selectedChatId,
        token: store.getState().token,
      });
      // MessageController.getMessages({ offset: 0 });
    }
  }

  render() {
    console.log("chatsstate", this.props);
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({ ...state }));

export const ChatList = withChats(ChatListBase as typeof Block);
