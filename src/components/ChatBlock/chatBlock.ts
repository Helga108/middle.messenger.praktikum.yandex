import Block from "../../utils/Block";
import Button from "../Button/button";
import template from "./chatBlock.hbs";
import ChatsController from "../../controllers/ChatsController";
import AddUserToChat from "../AddUserToChat/addUserToChat";
import RemoveUserFromChat from "../RemoveUserFromChat/removeUserFromChat";

interface ChatBlockProps {
  id: string;
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

  init() {
    this.children.buttonDelete = new Button({
      label: "x",
      events: {
        click: async () => {
          await ChatsController.deleteChat(this.props.id);
        },
      },
    });
    this.children.buttonAdd = new AddUserToChat({
      label: "add",
    });
    this.children.buttonRemove = new RemoveUserFromChat({ label: "remove" });
  }

  render() {
    return this.compile(template, this.props);
  }
}
