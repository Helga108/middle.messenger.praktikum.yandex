import Block from "../../utils/Block";
import template from "./chatBlock.hbs";

interface ChatBlockProps {
  name: string;
  avatarImg: string;
  lastMessageAbstract: string;
  lastMessageTime: string;
  newMessagesCount: number;
  events: {};
  selected: boolean;
  wrapperClassName: string;
}
export default class ChatBlock extends Block {
  constructor(props: ChatBlockProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
