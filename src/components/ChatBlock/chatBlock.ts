import Block from "../../utils/Block";
import template from "./chatBlock.hbs";
import Button from "../../components/Button/button";
import LabeledInput from "../../components/LabeledInput/labeledInput";

interface ChatBlockProps {
  name: string;
  avatarImg: string;
  lastMessageAbstract: string;
  lastMessageTime: number;
  newMessagesCount: number;
}
export default class ChatBlock extends Block {
  constructor(props: ChatBlockProps) {
    super(props);
  }

  init() {}

  render() {
    return this.compile(template, this.props);
  }
}
