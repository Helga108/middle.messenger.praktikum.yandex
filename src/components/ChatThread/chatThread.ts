import Block from "../../utils/Block";
import template from "./chatThread.hbs";
import MessageInput from "../MessageInput/messageInput";
import store, { withStore } from "../../utils/Store";

interface ChatThreadProps {
  messages: {};
  selectedChatId: number | null;
  userId: number;
}
class ChatThreadBase extends Block<ChatThreadProps> {
  constructor(props: ChatThreadProps) {
    super(props);
  }

  init() {
    this.children.messageInput = new MessageInput({
      label: "message input",
    });
  }

  // protected componentDidUpdate(oldProps: any, newProps: any): boolean {
  //   return true;
  // }

  render() {
    console.log("messages", [...(this.props.chatMessages || [])]);
    return this.compile(template, {
      ...this.props,
      isMine: this.props.selectedChatId === this.props.selectedChat?.id,
      selectedChatId: store.getState().selectedChatId,
    });
  }
}

const withMessages = withStore((state) => ({
  selectedChat: (state.chats || []).find(
    (chat: { id: number }) => chat.id === state.selectedChatId
  ),
  chatMessages: state.messages?.[state.selectedChatId],
}));

export const ChatThread = withMessages(ChatThreadBase as typeof Block);
