import Block from '../../utils/Block';
import template from './login.hbs';
import Button from '../../components/Button/button';
import Input from '../../components/Input/input';
interface LoginProps {
  title: string;
}
export default class Login extends Block {
  constructor(props: LoginProps) {
    super(props);
  }

  init() {
    this.children.inputLogin = new Input({
      name: 'login',
      type: 'text',
      label: 'Login',
    });
    this.children.inputPassword = new Input({
      name: 'password',
      type: 'password',
      label: 'Password',
    });
    this.children.button = new Button({
      label: 'Log in',
      events: () => console.log('Clicked!'),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
