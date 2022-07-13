import React, { FC, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useClickAway, useToggle } from "ahooks";
import { Button, Icon, Menu } from "@components";
import styles from "./index.module.less";
import { IItem } from "@components/Menu";

type FilterProps = {
    items: IItem[]; // 筛选按钮列表
    displayCount?: number; // 需要展示的数据,多出的折叠展示
    breakPoint?: "sm" | "md" | "lg" | "xl" | "2xl"; // 响应式断点
    onChange?: (item: IItem) => void;
    menuClassName?: string;
    selectClassName?: string;
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
    } = props;
    const [showMenu, { toggle: toggleMenu, setLeft: setMenuLeft }] =
        useToggle();
    const [showSelect, { toggle: toggleSelect, setLeft: setSelectLeft }] =
        useToggle();

    const [activeItem, setActiveItem] = useState<IItem>(items?.[0]);

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
                <Menu
                    items={items.slice(displayCount)}
                    className="px-4"
                    visible={showSelect}
                    value={activeItem?.value}
                    setLeft={setSelectLeft}
                    align='right'
                    onChange={(item) => {
                        setActiveItem(item);
                        setSelectLeft();
                    }}
                >
                    <button
                        type="button"
                        onClick={toggleSelect}
                        className="select truncate relative"
                    >
                        {activeItem?.label}
                    </button>
                </Menu>
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
                        <Menu
                            items={items.slice(displayCount)}
                            className="px-4"
                            visible={showMenu}
                            value={activeItem.value}
                            setLeft={setMenuLeft}
                            onChange={(item) => {
                                setActiveItem(item);
                                setMenuLeft();
                            }}
                        >
                            <Icon
                                onClick={toggleMenu}
                                className="icon-more"
                                addClassName="p-6 text-32 text-grey-53 hover:text-black select-none"
                            />
                        </Menu>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Filter;
