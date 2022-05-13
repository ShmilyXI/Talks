import { FC, MouseEventHandler } from 'react';
import classnames from 'classnames';
import './index.less';

type ButtonProps = {
  text: string;
  activeText?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
};

const Button: FC<ButtonProps> = ({ text, activeText, onClick, className }) => (
  <div
    onClick={onClick}
    className={classnames(
      'flex items-center py-6 px-14 rounded-18 font-medium bg-grey-96  hover:text-black cursor-pointer button-wrap',
      activeText === text ? 'text-black' : 'text-grey-53',
      className,
    )}
  >
    <span>{text}</span>
  </div>
);

export default Button;
