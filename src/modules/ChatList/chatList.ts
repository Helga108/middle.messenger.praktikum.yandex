import Block from "../../utils/Block";
import template from "./chatList.hbs";
import Button from "../../components/Button/button";
import ChatBlock from "../../components/ChatBlock/chatBlock";
import { validationPatternsLib } from "../../utils/ValidationPatternsLib";
import { chatsData } from "../../mock/chatsData";

interface ChatListProps {
  title: string;
}
export default class ChatList extends Block {
  constructor(props: ChatListProps) {
    super(props);
  }

  init() {
    this.children.chatBlock = new ChatBlock({
      name: "AA",
      avatarImg: "img",
      lastMessageAbstract: "Last message....",
      lastMessageTime: 123123123,
      newMessagesCount: 1,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
