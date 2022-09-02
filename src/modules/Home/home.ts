import Block from '../../utils/Block';
import template from './home.hbs';

interface HomePageProps {
  title: string;
  views: { name: string; link: string }[];
}
export default class HomePage extends Block {
  constructor(props: HomePageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
