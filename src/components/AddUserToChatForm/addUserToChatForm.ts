import Block from "../../utils/Block";
import Button from "../Button/button";
import LabeledInput from "../LabeledInput/labeledInput";
import template from "./addUserToChatForm.hbs";
import ChatsController from "../../controllers/ChatsController";
import { formData } from "../../utils/formData";

interface AddUserToChatFormProps {
  label: string;
  events?: {
    click?: (e: Event) => void;
  };
}
export default class AddUserToChatForm extends Block<AddUserToChatFormProps> {
  constructor(props: AddUserToChatFormProps) {
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
      label: "Add",
      events: {
        click: (e) => {
          this.submitAddUserForm(e, this.children);
        },
      },
    });
  }

  submitAddUserForm = (e: Event, children: any) => {
    const data = formData(e, children, LabeledInput);

    ChatsController.addUsersToChat(data);

    //ChatsController.addUsersToChat(userId, store.getState().selectedChatId);
  };

  render() {
    return this.compile(template, this.props);
  }
}
