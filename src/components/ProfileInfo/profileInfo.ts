import Block from "../../utils/Block";
import template from "./profileInfo.hbs";

interface ProfileInfoProps {
  icon: string;
  label: string;
  value: string;
}

export default class ProfileInfo extends Block<ProfileInfoProps> {
  constructor(props: ProfileInfoProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
