import { FC, MouseEventHandler } from "react";
import classnames from "classnames";
import styles from "./index.module.less";

type ButtonProps = {
  text: string | JSX.Element;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
};

const Button: FC<ButtonProps> = ({ text, active, onClick, className }) => (
  <div
    onClick={onClick}
    className={classnames(
      styles["button-wrap"],
      "flex items-center py-6 px-14 rounded-18 font-medium hover:text-black cursor-pointer",
      active ? "text-black bg-grey-96" : "text-grey-53",
      className,
    )}
  >
    <span>{text}</span>
  </div>
);

export default Button;
