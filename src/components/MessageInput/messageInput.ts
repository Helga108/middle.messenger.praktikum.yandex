import Block from "../../utils/Block";
import Button from "../Button/button";
import template from "./messageInput.hbs";
import { formData } from "../../utils/formData";
import LabeledInput from "../LabeledInput/labeledInput";
import MessageController from "../../controllers/MessageController";
import store from "../../utils/Store";

type MessageInputProps = {
  events?: {
    click?: (e: Event) => void;
  };
  label: string;
};

export default class MessageInput extends Block<MessageInputProps> {
  constructor(props: MessageInputProps) {
    super(props);
  }

  init() {
    this.children.buttonSend = new Button({
      label: ">",
      events: {
        click: (e) => {
          this.handleSendMessage(e, this.children);
        },
      },
    });
    this.children.messageInputField = new LabeledInput({
      name: "message",
      label: "",
      type: "text",
      value: "",
    });
  }

  handleSendMessage(e: Event, children: any) {
    const data = formData(e, children, LabeledInput);
    MessageController.sendMessage(
      store.getState().selectedChatId,
      data.message
    );
    (this.children.messageInputField as Block<any>).setProps({ value: "" });
  }

  render() {
    return this.compile(template, this.props);
  }
}
