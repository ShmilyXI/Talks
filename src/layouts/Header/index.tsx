import React, { useState, useEffect, useRef } from "react";
import Icon from "@components/Icon";
import { useClickAway, useToggle } from "ahooks";
import classnames from "classnames";
import { useRouter } from "next/router";
import _ from "lodash";
import toast from "react-hot-toast";
import type { IItem } from "@/components/Menu";
import Menu from "@/components/Menu/index";

const items: IItem[] = [
    {
        label: "Photos",
        value: "photos",
    },
    {
        label: "Galleries",
        value: "galleries",
    },
    {
        label: "Community",
        value: "talks",
    },
];
const Header = () => {
    const router = useRouter();

    const [activeItem, setActiveItem] = useState<IItem>();
    const [showMenu, { toggle: toggleMenu, setLeft: setMenuLeft }] =
        useToggle();
    const [showWrap, { toggle: toggleWrap, setLeft: setWrapLeft }] =
        useToggle();
    const [
        showInputTypeMenu,
        {
            toggle: toggleInputTypeMenu,
            setLeft: setInputTypeMenuLeft,
            setRight: setInputTypeMenuRight,
        },
    ] = useToggle();

    const [searchValue, setSearchValue] = useState("");

    const moreRef = useRef<HTMLButtonElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useClickAway(() => {
        setMenuLeft();
    }, moreRef);

    useClickAway(() => {
        setWrapLeft();
        setSearchValue("");
        setInputTypeMenuLeft();
    }, [wrapRef, buttonRef]);

    // 路由跳转
    const goRoute = (path: string) => {
        router.push(path);
    };

    // menu搜索框查询
    const onSearch = (type: string) => {
        toast.success(`Search: type=${type}  value=${searchValue}`);
        setInputTypeMenuLeft();
    };

    // 头部菜单item点击
    const onMenuItemClick = (item: IItem) => {
        toggleMenu();
        if (item.value) {
            goRoute(`/${item.value}`);
        }
    };

    return (
        <div className="container navbar bg-white px-0 md:px-32 z-60 shadow-navbar sticky pin-t md:relative md:shadow-none">
            <div
                className={classnames(
                    "bg-black shadow-navbar pin-t pin-x absolute lg:hidden z-1",
                    { hidden: !showWrap },
                )}
                ref={wrapRef}
            >
                <div className="container px-0 flex items-center shadow-navbar-inner">
                    <button
                        type="button"
                        className="button-reset py-20 text-white text-24 leading-none lg:hidden text-center w-64"
                        onClick={setWrapLeft}
                    >
                        <Icon className="icon-close" addClassName="text-24" />
                    </button>

                    <div className="flex-grow py-16 pr-16">
                        <div className="relative">
                            <input
                                type="search"
                                name="searchValue"
                                className="block input input--pill input--invert pl-40"
                                autoComplete="off"
                                value={searchValue}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        onSearch("photos");
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e?.target?.value || "";
                                    setSearchValue(value);
                                    value
                                        ? setInputTypeMenuRight()
                                        : setInputTypeMenuLeft();
                                }}
                            />

                            <Icon
                                className="icon-search"
                                addClassName="absolute text-14 pin-l pin-y pin-t-center ml-16 text-grey-27"
                            />
                            <div
                                className={classnames(
                                    "search-dropdown bg-white leading-6 rounded shadow-popover absolute pin-x pin-t-full mt-8 overflow-hidden z-50",
                                    { hidden: !showInputTypeMenu },
                                )}
                            >
                                <div>
                                    <a
                                        onClick={() => {
                                            onSearch("photos");
                                        }}
                                        className="search-dropdown__category button-reset w-full text-grey-53 hover:no-underline hover:bg-grey-96 py-6 px-16 flex items-center is-selected"
                                    >
                                        <Icon
                                            className="icon-pic"
                                            addClassName="text-14 w-16 mr-8 text-black"
                                        />
                                        Search Photos
                                    </a>
                                </div>

                                <div className="border-t border-grey-90">
                                    <a
                                        onClick={() => {
                                            onSearch("people");
                                        }}
                                        className="search-dropdown__category button-reset w-full text-grey-53 hover:no-underline hover:bg-grey-96 py-6 px-16 flex items-center"
                                    >
                                        <Icon
                                            className="icon-people"
                                            addClassName="text-14 w-16 mr-8 text-black"
                                        />
                                        Search People
                                    </a>
                                </div>

                                <div className="border-t border-grey-90">
                                    <a
                                        onClick={() => {
                                            onSearch("galleries");
                                        }}
                                        className="search-dropdown__category button-reset w-full text-grey-53 hover:no-underline hover:bg-grey-96 py-6 px-16 flex items-center"
                                    >
                                        <Icon
                                            className="icon-file"
                                            addClassName="text-14 w-16 mr-8 text-black"
                                        />
                                        Search Galleries
                                    </a>
                                </div>

                                <div className="border-t border-grey-90">
                                    <a
                                        onClick={() => {
                                            onSearch("talks");
                                        }}
                                        className="search-dropdown__category button-reset w-full text-grey-53 hover:no-underline hover:bg-grey-96 py-6 px-16 flex items-center"
                                    >
                                        <Icon
                                            className="icon-community"
                                            addClassName="text-14 w-16 mr-8 text-black"
                                        />
                                        Search Talks
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container px-24 py-12 flex flex-col">
                    <a
                        className="py-4 text-white font-medium cursor-pointer"
                        onClick={() =>
                            toast.promise(
                                new Promise((resolve, reject) =>
                                    setTimeout(() => reject(), 3000),
                                ),
                                {
                                    loading: "加载中...",
                                    success: "哦吼,开发完了",
                                    error: "哦吼,还没开发",
                                },
                            )
                        }
                    >
                        What is Tookapic?
                    </a>

                    <a
                        className="mt-16 py-4 text-grey-53 cursor-pointer"
                        onClick={() => {
                            setWrapLeft();
                            setSearchValue("");
                            goRoute("/photos");
                        }}
                    >
                        Browse photos
                    </a>

                    <a
                        className="py-4 text-grey-53 cursor-pointer"
                        onClick={() => {
                            setWrapLeft();
                            setSearchValue("");
                            goRoute("/galleries");
                        }}
                    >
                        Browse galleries
                    </a>

                    <a
                        className="py-4 text-grey-53 cursor-pointer"
                        onClick={() => {
                            setWrapLeft();
                            setSearchValue("");
                            goRoute("/talks");
                        }}
                    >
                        Community
                    </a>
                </div>
            </div>

            <div className="flex items-center justify-between md:hidden">
                <button
                    type="button"
                    className="button-reset py-20 text-black text-24 leading-none text-center w-64"
                    onClick={toggleWrap}
                    ref={buttonRef}
                >
                    <Icon className="icon-menu" addClassName="text-28" />
                </button>

                <div className="flex-grow"></div>

                <a
                    className="flex-none button button--secondary mr-8"
                    onClick={() => {
                        goRoute("/login?signIn=1");
                    }}
                >
                    Log in
                </a>

                <a
                    className="flex-none button button--primary mr-16"
                    onClick={() => {
                        goRoute("/login");
                    }}
                >
                    Sign up
                </a>
            </div>

            <div className="hidden md:flex items-center py-8">
                <a
                    className="flex-none text-black cursor-pointer"
                    title='go home'
                    onClick={() => {
                        goRoute("/");
                    }}
                >
                    <Icon className="icon-meiduan" addClassName="text-5xl" />
                </a>

                <div className="w-full ml-8 mr-8 flex items-center min-w-0">
                    <div className="text-black font-medium">XIAO 521</div>

                    {/* <div className="hidden lg:block ml-20 truncate">
                        <a
                            href="https://tookapic.com/auth/register"
                            className="text-inherit"
                        >
                            Start your own 365 Project
                        </a>
                    </div> */}
                </div>

                <div className="flex flex-none items-center -mx-16">
                    <Menu
                        items={items}
                        className="ml-8"
                        visible={showMenu}
                        value={activeItem?.value}
                        setLeft={setMenuLeft}
                        onChange={(item) => {
                            setActiveItem(item);
                            setMenuLeft();
                            onMenuItemClick(item);
                        }}
                    >
                        <a
                            className="block py-4 px-16 leading-sm font-medium text-black hover:no-underline "
                            onClick={toggleMenu}
                        >
                            Browse
                        </a>
                    </Menu>
                    <a
                        onClick={() => {
                            goRoute("/");
                        }}
                        className="block py-4 px-16 ml-8 leading-sm font-medium text-grey-53 hover:text-black hover:no-underline"
                    >
                        Learn more
                    </a>
                </div>

                <div className="flex flex-none items-center justify-start ml-32 lg:ml-24 lg:ml-48 flex-grow">
                    <a
                        className="button button--secondary hidden sm:block md:ml-8 mr-16"
                        onClick={() => {
                            goRoute("/login?signIn=1");
                        }}
                    >
                        Log in
                    </a>

                    <a
                        className="leading-xl sm:hidden mr-24"
                        onClick={() => {
                            goRoute("/login");
                        }}
                    >
                        <Icon
                            className="icon-people"
                            addClassName="text-22 align-middle text-black"
                        />
                    </a>

                    <a
                        className="button button--primary"
                        onClick={() => {
                            goRoute("/login");
                        }}
                    >
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
