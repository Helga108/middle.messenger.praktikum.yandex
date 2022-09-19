import Block from "../../utils/Block";
import template from "./chatBlock.hbs";

interface ChatBlockProps {
  name: string;
  avatarImg: string;
  lastMessageAbstract: string;
  lastMessageTime: string;
  newMessagesCount: number;
  events: {
    click: () => void;
  };
  selected: boolean;
  wrapperClassName: string;
}
export default class ChatBlock extends Block<ChatBlockProps> {
  constructor(props: ChatBlockProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
