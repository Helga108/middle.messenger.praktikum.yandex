import Block from '../../utils/Block';
import template from './input.hbs';

interface InputProps {
  name: string;
  label: string;
  type: string;
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
