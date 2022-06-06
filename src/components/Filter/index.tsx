import React, { FC, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useClickAway, useToggle } from "ahooks";
import { Button, Icon } from "@components";
import styles from "./index.module.less";

type IItem = {
    label: string;
    value: string | number;
};
type FilterProps = {
    items: IItem[]; // 筛选按钮列表
    displayCount?: number; // 需要展示的数据,多出的折叠展示
    breakPoint?: "sm" | "md" | "lg" | "xl" | "2xl"; // 响应式断点
    onChange?: (item: IItem) => void;
    menuClassName?: string;
    selectClassName?: string;
    isTextButton?: boolean;  // 是否是字体按钮
    buttonClassName?: string; // 按钮className
};

const Filter: FC<FilterProps> = (props) => {
    const {
        items,
        displayCount = 0,
        onChange,
        breakPoint,
        menuClassName = "",
        selectClassName = "",
        buttonClassName = "",
        isTextButton = false,
    } = props;
    const [showMenu, { toggle: toggleMenu, setLeft: setMenuLeft }] =
        useToggle();
    const [showSelect, { toggle: toggleSelect, setLeft: setSelectLeft }] =
        useToggle();

    const [activeItem, setActiveItem] = useState<IItem>(items?.[0]);

    const moreRef = useRef<HTMLButtonElement>(null);
    const selectRef = useRef<HTMLButtonElement>(null);

    useClickAway(() => {
        setMenuLeft();
    }, moreRef);

    useClickAway(() => {
        setSelectLeft();
    }, selectRef);

    useEffect(() => {
        onChange?.(activeItem);
    }, [activeItem]);

    return (
        <div>
            <div
                className={classnames("relative", selectClassName, {
                    [`${breakPoint}:hidden`]: breakPoint,
                })}
            >
                <button
                    type="button"
                    onClick={toggleSelect}
                    className="select truncate relative"
                    ref={selectRef}
                >
                    {activeItem.label}
                </button>

                <div
                    className={classnames(
                        "absolute z-50 bg-black-95 rounded whitespace-no-wrap min-w-128 shadow-sm",
                        { hidden: !showSelect },
                    )}
                    style={{
                        position: "absolute",
                        transform: "translate3d(0px, 8px, 0px)",
                        top: "85%",
                        right: 0,
                        willChange: "transform",
                    }}
                >
                    <div className="flex flex-col text-left py-12 text-16 leading-lg">
                        {items?.length
                            ? items.map((item) => (
                                  <div
                                      onClick={() => setActiveItem(item)}
                                      key={item.value}
                                      className={classnames(
                                          "px-28 lg:px-16 py-8 lg:py-1 hover:bg-white-15 text-white",
                                          {
                                              "font-semibold bg-sky-500/75":
                                                  activeItem.value ===
                                                  item.value,
                                          },
                                      )}
                                  >
                                      {item.label}
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>
            <div
                className={classnames("hidden", menuClassName, {
                    [`${breakPoint}:block`]: breakPoint,
                })}
            >
                <div
                    className={classnames(
                        styles["filter-wrap"],
                        "flex -mx-4 items-center",
                    )}
                >
                    {items?.length
                        ? items.map((item, index) =>
                              displayCount === 0 ||
                              (displayCount > 0 &&
                                  index + 1 <= displayCount) ? (
                                  <div className="px-4" key={item.value}>
                                      <Button
                                          className={buttonClassName}
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
                            <Icon
                                onClick={toggleMenu}
                                ref={moreRef}
                                className="icon-more"
                                addClassName="p-6 text-32 text-grey-53 hover:text-black"
                            />

                            {showMenu ? (
                                <div
                                    className={classnames(
                                        styles["menu-wrap"],
                                        "absolute z-50 bg-black-95 rounded whitespace-no-wrap min-w-128 shadow-sm",
                                    )}
                                >
                                    <div className="flex flex-col text-left py-12 text-16 leading-lg">
                                        {items?.length
                                            ? items
                                                  .slice(displayCount)
                                                  .map((item) => (
                                                      <div
                                                          className={classnames(
                                                              "px-28 lg:px-16 py-8 lg:py-1 hover:bg-white-15 text-white cursor-pointer",
                                                              {
                                                                  "font-semibold":
                                                                      activeItem.value ===
                                                                      item.value,
                                                              },
                                                          )}
                                                          onClick={() =>
                                                              setActiveItem(
                                                                  item,
                                                              )
                                                          }
                                                          key={item.value}
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
            </div>
        </div>
    );
};

export default Filter;
