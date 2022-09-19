import Block from "../../utils/Block";
import template from "./chatThread.hbs";

interface ChatThreadProps {
  messages: {};
  selectedChatId: number | null;
  userId: number;
}
export default class ChatThread extends Block<ChatThreadProps> {
  constructor(props: ChatThreadProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
