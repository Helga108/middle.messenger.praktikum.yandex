import Block from "../../utils/Block";
import template from "./chatList.hbs";

import ChatBlock from "../../components/ChatBlock/chatBlock";

import { chatsData } from "../../mock/chatsData";
import ChatThread from "../../components/ChatThread/chatThread";

interface ChatListProps {
  title: string;
}

export default class ChatList extends Block {
  selectedChatId: number | null;

  constructor(props: ChatListProps) {
    super(props);
    this.selectedChatId = null;
  }

  init() {
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
  }

  getUserIdFromData() {
    if (this.selectedChatId) {
      return (chatsData as any).chats[this.selectedChatId].userId;
    } else {
      return null;
    }
  }

  getMessagesFromData() {
    if (this.selectedChatId) {
      const msgs = (chatsData as any).chats[this.selectedChatId].messages;
      const userId = this.getUserIdFromData();
      const alteredMessages = msgs.map((msg: any) => {
        if (msg.authorId === userId) {
          msg.my = true;
        } else {
          msg.my = false;
        }
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
    (this.children.chatThread as Block).setProps({
      selectedChatId: 41231312,
      messages: this.getMessagesFromData(),
      userId: this.getUserIdFromData(),
    });
    (this.children.chatBlock as Block).setProps({
      selected: true,
      wrapperClassName: "chat-block-wrapper__selected",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
