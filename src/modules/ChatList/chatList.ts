import Block from "../../utils/Block";
import template from "./chatList.hbs";

import ChatBlock from "../../components/ChatBlock/chatBlock";

import { chatsData } from "../../mock/chatsData";
import ChatThread from "../../components/ChatThread/chatThread";
import { withStore } from "../../utils/Store";
import Button from "../../components/Button/button";
import AuthController from "../../controllers/AuthController";

interface ChatListProps {
  title: string;
}

export default class ChatListBase extends Block<ChatListProps> {
  selectedChatId: number | null;

  constructor(props: ChatListProps) {
    super(props);
    this.selectedChatId = null;
  }

  init() {
    console.log(this.props.state);
    this.children.chatBlock = new ChatBlock({
      name: "AA",
      avatarImg: "img",
      lastMessageAbstract: "Last message....",
      lastMessageTime: "12:30",
      newMessagesCount: 1,
      events: {
        click: () => this.setSelectedChatId(),
      },
      selected: false,
      wrapperClassName: "",
    });
    this.children.chatThread = new ChatThread({
      messages: this.getMessagesFromData(),
      selectedChatId: this.selectedChatId,
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
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state }));

export const ChatList = withUser(ChatListBase as typeof Block);
