import Block from "../../utils/Block";
import template from "./chatThread.hbs";

interface ChatThreadProps {
  messages: {};
  selectedChatId: number | null;
  userId: number;
}
export default class ChatThread extends Block {
  constructor(props: ChatThreadProps) {
    super(props);
  }

  init() {}

  render() {
    return this.compile(template, this.props);
  }
}
