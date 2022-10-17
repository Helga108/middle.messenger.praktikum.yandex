import Block from "../../utils/Block";
import Button from "../Button/button";
import template from "./modal.hbs";

interface ModalProps {
  content: any;
  events?: {
    click?: (e: Event) => void;
  };
  showModal: boolean;
}
export default class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super(props);
  }

  init() {
    this.children.closeModalButton = new Button({
      label: "x",
      events: {
        click: () => {
          const modal = document.getElementById("myModal");
          this.setProps({ showModal: false });
          modal?.classList.remove("show-modal");
          console.log("closing modal");
        },
      },
      className: [],
    });
    this.toggle(this.props);
  }
  
  //@ts-ignore
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.toggle(newProps)
    return true;
  }

  toggle(props: any) {
    if (props.showModal) {
      const modal = document.getElementById("myModal");
      modal?.classList.add("show-modal");
    } else {
      const modal = document.getElementById("myModal");
      modal?.classList.remove("show-modal");
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
