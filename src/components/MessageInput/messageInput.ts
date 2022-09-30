import Block from "../../utils/Block";
import Button from "../Button/button";
import template from "./messageInput.hbs";
import { formData } from "../../utils/formData";
import LabeledInput from "../LabeledInput/labeledInput";
import MessageController from "../../controllers/MessageController";

type MessageInputProps = {
  events?: {};
  label: string;
};

export default class MessageInput extends Block<MessageInputProps> {
  private _inputValue: string;

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

  handleSendMessage(e: Event, children) {
    const data = formData(e, children, LabeledInput);
    MessageController.sendMessage(data.message);
    //this.children.messageInputField.setProps({ value: "" });
  }

  render() {
    return this.compile(template, this.props);
  }
}
