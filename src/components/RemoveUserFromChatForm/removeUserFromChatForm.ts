import Block from "../../utils/Block";
import Button from "../Button/button";
import LabeledInput from "../LabeledInput/labeledInput";
import template from "./removeUserFromChatForm.hbs";
import ChatsController from "../../controllers/ChatsController";
import { formData } from "../../utils/formData";
import UserController from "../../controllers/UserController";
import store from "../../utils/Store";

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
    UserController.findUserByLogin(data);
    ChatsController.removeUserFromChat(
      store.getState().userIdToDelete,
      store.getState().selectedChatId
    );

    //ChatsController.addUsersToChat(userId, store.getState().selectedChatId);
  };

  render() {
    return this.compile(template, this.props);
  }
}
