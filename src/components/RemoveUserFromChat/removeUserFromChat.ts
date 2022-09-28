import Block from "../../utils/Block";
import RemoveUserToChatForm from "../RemoveUserFromChatForm/removeUserFromChatForm";
import Button from "../Button/button";
import LabeledInput from "../LabeledInput/labeledInput";
import Modal from "../Modal/modal";
import template from "./removeUserFromChat.hbs";

interface RemoveUserFromChatProps {
  label: string;
  events?: {
    click?: (e: Event) => void;
  };
}
export default class RemoveUserFromChat extends Block<RemoveUserFromChatProps> {
  constructor(props: RemoveUserFromChatProps) {
    super(props);
  }

  componentDidUpdate(oldProps, newProps) {
    console.log(newProps);
    this.children.modal = new Modal({
      content: new LabeledInput({ label: "" }),
      showModal: this.props.showModal,
    });
    return true;
  }

  init() {
    this.children.button = new Button({
      label: "-",
      events: {
        click: () => {
          this.setProps({ showModal: true });
          console.log(this.props);
        },
      },
    });
    this.children.modal = new Modal({
      content: new RemoveUserToChatForm({}),
      showModal: this.props.showModal,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
