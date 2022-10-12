import Block from "../../utils/Block";
import Button from "../Button/button";
import LabeledInput from "../LabeledInput/labeledInput";
import template from "./removeUserFromChatForm.hbs";
import ChatsController from "../../controllers/ChatsController";
import { formData } from "../../utils/formData";

interface RemoveUserFromChatFormProps {
  label: string;
  events?: {
    click?: (e: Event) => void;
  };
}
export default class RemoveUserFromChatForm extends Block<RemoveUserFromChatFormProps> {
  constructor(props: RemoveUserFromChatFormProps) {
    super(props);
  }

  init() {
    this.children.input = new LabeledInput({
      label: "",
      name: "login",
      value: "",
      type: "text",
    });
    this.children.button = new Button({
      label: "Remove user",
      events: {
        click: (e) => {
          this.submitRemoveUserForm(e, this.children);
        },
      },
    });
  }

  submitRemoveUserForm = (e: Event, children: any) => {
    const data = formData(e, children, LabeledInput);
    ChatsController.removeUserFromChat(data);
  };

  render() {
    return this.compile(template, this.props);
  }
}
