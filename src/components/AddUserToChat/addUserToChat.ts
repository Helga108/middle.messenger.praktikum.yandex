import Block from "../../utils/Block";
import AddUserToChatForm from "../AddUserToChatForm/addUserToChatForm";
import Button from "../Button/button";
import LabeledInput from "../LabeledInput/labeledInput";
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

  componentDidUpdate(oldProps, newProps) {
    console.log(newProps);
    this.children.modal = new Modal({
      content: new LabeledInput({ label: "" }),
      showModal: newProps.showModal,
    });
    return true;
  }

  init() {
    this.children.button = new Button({
      label: "+",
      events: {
        click: () => {
          this.setProps({ showModal: true });
          console.log(this.props);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
