import LabeledInput from "../components/LabeledInput/labeledInput";
import Block from "./Block";

export const submitForm = (
  e: Event,
  children: {
    [key: string]: Block<LabeledInput>;
  },
  block: any
) => {
  e.preventDefault();

  const formResult: any = {};

  Object.keys(children).forEach((child: string) => {
    if (children[child] instanceof block) {
      (children[child] as typeof block).validate();
      formResult[(children[child] as typeof block).getName()] = (
        children[child] as typeof block
      ).getInputValue();
    }
  });

  console.log(formResult);
};
