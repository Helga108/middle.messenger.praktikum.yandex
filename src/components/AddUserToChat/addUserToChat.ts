import Block from "../../utils/Block";
import AddUserToChatForm from "../AddUserToChatForm/addUserToChatForm";
import Button from "../Button/button";
import Modal from "../Modal/modal";
import template from "./addUserToChat.hbs";

interface AddUserToChatProps {
  label: string;
  events?: {
    click?: (e: Event) => void;
  };
}
export default class AddUserToChat extends Block<AddUserToChatProps> {
  constructor(props: AddUserToChatProps) {
    super(props);
  }

  init() {
    this.children.modal = new Modal({
      content: new AddUserToChatForm({ label: "" }),
      showModal: this.props.showModal,
    });
    this.children.button = new Button({
      label: "+",
      events: {
        click: () => {
          this.children.modal.setProps({ showModal: true });
          console.log(this.children.modal.props);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
