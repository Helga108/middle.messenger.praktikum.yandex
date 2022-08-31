import Block from '../../utils/Block';
import template from './login.hbs';
import { Button } from '../../components/Button/button';

interface HomePageProps {
  title: string;
}

export class HomePage extends Block {
  constructor(props: HomePageProps) {
    super('div', props);
  }

  init() {
    this.children.button = new Button({
      label: 'Click me',
      events: {
        click: () => console.log('clicked'),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}