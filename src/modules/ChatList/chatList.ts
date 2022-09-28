import Block from "../../utils/Block";
import template from "./chatList.hbs";

import { ChatsBlock } from "../../components/ChatsBlock/chatsBlock";

import { chatsData } from "../../mock/chatsData";
import ChatThread from "../../components/ChatThread/chatThread";
import store, { withStore } from "../../utils/Store";
import Button from "../../components/Button/button";
import AuthController from "../../controllers/AuthController";
import ChatsController from "../../controllers/ChatsController";

interface ChatListProps {
  title: string;
}

class ChatListBase extends Block<ChatListProps> {
  selectedChatId: number | null;

  constructor(props: ChatListProps) {
    super(props);
    this.selectedChatId = null;
  }

  public componentDidMount(): void {}

  init() {
    ChatsController.fetchChats();
    this.children.chatsBlocks = new ChatsBlock({});

    this.children.chatThread = new ChatThread({
      messages: this.getMessagesFromData(),
      selectedChatId: this.props.selectedChatId,
      userId: this.getUserIdFromData(),
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

  getUserIdFromData() {
    if (this.selectedChatId) {
      return (chatsData as any).chats[this.selectedChatId].userId;
    }
  }

  getMessagesFromData() {
    if (this.selectedChatId) {
      const msgs = (chatsData as any).chats[this.selectedChatId].messages;
      const userId = this.getUserIdFromData();
      const alteredMessages = msgs.map((msg: any) => {
        msg.my = msg.authorId === userId;
        return msg;
      });

      return alteredMessages;
    } else {
      return null;
    }
  }

  setSelectedChatId() {
    console.log("setting chat id");
    this.selectedChatId = 41231312;
    this.children.chatThread.setProps({
      selectedChatId: 41231312,
      messages: this.getMessagesFromData(),
      userId: this.getUserIdFromData(),
    });
    this.children.chatBlock.setProps({
      selected: true,
      wrapperClassName: "chat-block-wrapper-selected",
    });
  }

  render() {
    console.log("chatsstate", this.props);
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({ ...state }));

export const ChatList = withChats(ChatListBase as typeof Block);
