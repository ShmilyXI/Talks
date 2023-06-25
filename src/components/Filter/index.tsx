import React, { FC, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useClickAway, useToggle } from "ahooks";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Menu from "@/components/Menu";
import { IItem } from "@/components/Menu";
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

type FilterProps = {
  value?: string;
  items: IItem[]; // 筛选按钮列表
  displayCount?: number; // 需要展示的数据,多出的折叠展示
  breakPoint?: "sm" | "md" | "lg" | "xl" | "2xl"; // 响应式断点
  onChange?: (item: IItem) => void;
  menuClassName?: string;
  selectClassName?: string;
  buttonClassName?: string; // 按钮className
};

const Filter: FC<FilterProps> = (props) => {
  const { value, items, displayCount = 0, onChange, breakPoint, menuClassName = "", selectClassName = "", buttonClassName = "" } = props;
  const navigate = useNavigate();
  const [showMenu, { toggle: toggleMenu, setLeft: setMenuLeft }] = useToggle();
  const [showSelect, { toggle: toggleSelect, setLeft: setSelectLeft }] = useToggle();
  const [activeItem, setActiveItem] = useState<IItem>(_.find(items, item => item.value === value) || items?.[0]);

  useEffect(() => {
    activeItem && onChange?.(activeItem);
  }, [activeItem]);

  return (
    <div className="w-full">
      <div
        className={classnames("relative", selectClassName, {
          [`${breakPoint}:hidden`]: breakPoint,
        })}
      >
        <Menu
          items={items}
          className="px-4"
          visible={showSelect}
          value={activeItem?.value}
          setLeft={setSelectLeft}
          align="right"
          onChange={(item) => {
            setActiveItem(item);
            setSelectLeft();
          }}
        >
          <button type="button" onClick={toggleSelect} className="select truncate relative">
            {activeItem?.label}
          </button>
        </Menu>
      </div>
      <div
        className={classnames("hidden", menuClassName, {
          [`${breakPoint}:block`]: breakPoint,
        })}
      >
        <div className={classnames(styles["filter-wrap"], "flex -mx-4 items-center")}>
          {items?.length
            ? items.map((item, index) =>
                displayCount === 0 || (displayCount > 0 && index + 1 <= displayCount) ? (
                  <div className="px-4 flex items-center" key={item.value || index}>
                    <Button
                      className={buttonClassName}
                      text={
                        <>
                          {`${item.label}`}
                          {item.href && <Icon className="icon-resonserate" addClassName="ml-1" />}
                        </>
                      }
                      active={item?.value === activeItem.value}
                      onClick={() => {
                        if (item.href) {
                          navigate(item.href);
                          return;
                        }
                        setActiveItem(item);
                      }}
                    />
                  </div>
                ) : null,
              )
            : null}

          {displayCount > 0 ? (
            <Menu
              items={items.slice(displayCount)}
              className="px-4"
              visible={showMenu}
              value={activeItem?.value}
              setLeft={setMenuLeft}
              onChange={(item) => {
                setActiveItem(item);
                setMenuLeft();
              }}
            >
              <Icon onClick={toggleMenu} className="icon-more" addClassName="p-6 text-32 text-grey-53 hover:text-black select-none" />
            </Menu>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Filter;
