import Icon from "@/components/Icon";
import { useClickAway, useToggle } from "ahooks";
import classnames from "classnames";
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./index.module.less";

export type IItem = {
  label: string | JSX.Element;
  value?: string;
  href?: string;
  className?: string;
};

type MenuProps = {
  items: IItem[];
  value?: string;
  onChange: (item: IItem) => void;
  setLeft?: () => void;
  visible: boolean;
  children: JSX.Element;
  className?: string;
  align?: "left" | "right";
  modalClassName?: string;
  wrapClassName?: string;
};

const Menu: FC<MenuProps> = (props) => {
  const { items, onChange, value, visible, children, className, setLeft, align = "left", modalClassName, wrapClassName } = props;
  const menuRef = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    if (!visible) return;
    setLeft?.();
  }, menuRef);

  return (
    <div className={classnames("relative", className)} ref={menuRef}>
      {children}
      {visible ? (
        <div
          className={classnames(
            modalClassName,
            styles["menu-wrap"],
            {
              "left-0": align === "left",
              "right-0": align === "right",
            },
            "absolute z-50 bg-black-95 rounded whitespace-no-wrap min-w-128 shadow-sm",
          )}
        >
          <div className={classnames("flex flex-col text-left py-12 text-16 leading-lg", wrapClassName)}>
            {items?.length ? (
              items.map((item, i) => (
                <div
                  className={classnames(
                    "px-16 py-1 hover:bg-white-15 text-white cursor-pointer",
                    {
                      "font-semibold": value === item.value,
                    },
                    item.className,
                  )}
                  onClick={() => {
                    onChange?.(item);
                  }}
                  key={item.value || i}
                >
                  {item.label}
                </div>
              ))
            ) : (
              <div className="h-[350px] flex justify-center items-center text-16 text-white leading-lg">No Data</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Menu;
