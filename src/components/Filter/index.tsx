import React, { FC, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useClickAway, useToggle } from 'ahooks';
import Button from '@/components/Button';
import './index.less';

type IItem = {
  label: string;
  value: string | number;
};
type FilterProps = {
  items: IItem[]; // 筛选按钮列表
  displayCount?: number; // 需要展示的数据,多出的折叠展示
  breakPoint?: 'md' | 'lg'; // 响应式断点
  onChange?: (item: IItem) => void;
};

const Filter: FC<FilterProps> = (props) => {
  const { items, displayCount = 0, onChange, breakPoint } = props;
  const [showMenu, { toggle, setLeft }] = useToggle();

  const [activeItem, setActiveItem] = useState<IItem>(items?.[0]);

  const moreRef = useRef<HTMLButtonElement>(null);

  useClickAway(() => {
    setLeft();
  }, moreRef);

  useEffect(() => {
    onChange?.(activeItem);
  }, [activeItem]);

  return (
    <div className="flex -mx-4 items-center filter-wrap">
      {items?.length
        ? items.map((item, index) =>
            displayCount === 0 ||
            (displayCount > 0 && index + 1 <= displayCount) ? (
              <div className="px-4">
                <Button
                  text={item.label}
                  activeText={activeItem.label}
                  onClick={() => setActiveItem(item)}
                />
              </div>
            ) : null,
          )
        : null}

      {displayCount > 0 ? (
        <div className="px-4 relative">
          <i
            onClick={toggle}
            ref={moreRef}
            className="iconfont icon-more p-6 text-24 text-grey-53 hover:text-black "
          />
          {showMenu ? (
            <div
              className={classnames(
                'absolute z-50 bg-black-95 rounded whitespace-no-wrap min-w-128 shadow-sm menu-wrap',
              )}
            >
              <div className="flex flex-col text-left py-12 text-16 leading-lg">
                {items?.length
                  ? items.slice(displayCount).map((item) => (
                      <div
                        className={classnames(
                          'px-28 lg:px-16 py-8 lg:py-1 hover:bg-white-15 text-white cursor-pointer',
                          {
                            'font-semibold': activeItem.label === item.label,
                          },
                        )}
                        onClick={() => setActiveItem(item)}
                      >
                        {item.label}
                      </div>
                    ))
                  : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
