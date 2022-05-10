import React, { FC, MouseEventHandler, useRef, useState } from 'react';
import classnames from 'classnames';
import { useClickAway, useToggle } from 'ahooks';

type ButtonProps = {
  text: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
};
const Button: FC<ButtonProps> = ({ text, onClick, className }) => (
  <div
    onClick={onClick}
    className={classnames(
      'flex items-center py-6 px-14 rounded-18 font-medium bg-grey-96 text-black hover:text-blue-500 cursor-pointer',
      className,
    )}
  >
    <span>{text}</span>
  </div>
);

const Filter = () => {
  const [showMenu, { toggle, setLeft }] = useToggle();

  const moreRef = useRef<HTMLButtonElement>(null);

  useClickAway(() => {
    setLeft();
  }, moreRef);

  return (
    <div className="flex -mx-4 items-center">
      <div className="px-4">
        <Button text="Test1" />
      </div>
      <div className="px-4">
        <Button text="Test2" />
      </div>
      <div className="px-4">
        <Button text="Test3" />
      </div>
      <div className="px-4 relative">
        <i
          onClick={toggle}
          ref={moreRef}
          className="iconfont icon-more p-6 text-24 text-grey-53 hover:text-black "
        />
        {showMenu ? (
          <div
            className={classnames(
              'absolute z-50 bg-black-95 rounded whitespace-no-wrap min-w-128 shadow-sm',
            )}
            style={{
              position: 'absolute',
              transform: 'translate3d(5px,40px,0px)',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
          >
            <div className="flex flex-col text-left py-12 text-16 leading-lg">
              <div className="px-28 lg:px-16 py-8 lg:py-1 hover:bg-white-15 hover:text-blue-500 text-white cursor-pointer">
                Popular
              </div>
              <div className="px-28 lg:px-16 py-8 lg:py-1 hover:bg-white-15 hover:text-blue-500 text-white cursor-pointer">
                Featured
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Filter;
