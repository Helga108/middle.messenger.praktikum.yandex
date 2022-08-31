import Block from '../../utils/Block';

import template from './button.hbs';

interface ButtonProps {
  label: string;
  events: any;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props)
  }

  render() {
    return template({label: this.props.label})
  }
}