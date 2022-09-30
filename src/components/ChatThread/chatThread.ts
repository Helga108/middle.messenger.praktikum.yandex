import Block from "../../utils/Block";
import template from "./chatThread.hbs";
import MessageInput from "../MessageInput/messageInput";
import { withStore } from "../../utils/Store";

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

  render() {
    return this.compile(template, this.props);
  }
}

const withMessages = withStore((state) => ({ ...state }));

export const ChatThread = withMessages(ChatThreadBase as typeof Block);
