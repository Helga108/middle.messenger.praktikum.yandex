import Block from "../../utils/Block";
import RemoveUserFromChatForm from "../RemoveUserFromChatForm/removeUserFromChatForm";
import Button from "../Button/button";

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
  
  //@ts-ignore
  componentDidUpdate(oldProps: any, newProps: any) {
    console.log(newProps);
    this.children.modal = new Modal({
      content: new RemoveUserFromChatForm({ label: "" }),
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
      content: new RemoveUserFromChatForm({ label: "" }),
      showModal: this.props.showModal,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
