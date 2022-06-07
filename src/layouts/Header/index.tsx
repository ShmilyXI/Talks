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

            <div className="hidden md:flex items-center py-16">
                <a
                    className="flex-none text-black"
                    onClick={() => {
                        goRoute("/");
                    }}
                >
                    <svg
                        className="icon text-26"
                        height="32"
                        viewBox="0 0 32 32"
                        width="32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m19.543 31.998h-12.424c-2.934 0-5.338-2.372-5.338-5.275v-18.418c0-2.434 1.561-4.464 3.871-5.025.125-1.81 1.686-3.247 3.527-3.247 1.81 0 3.34 1.218 3.559 2.934h6.524c.219-1.716 1.592-2.965 3.403-2.965 1.872 0 3.246 1.467 3.402 3.278 2.31.561 4.152 2.622 4.152 5.057v12.985c0 5.276-5.338 10.676-10.676 10.676zm0-2.685c3.902 0 7.991-3.995 7.991-7.835v-.842c-.811.53-1.717.686-2.653.686h-2.653s-2.685.156-2.685 2.778v2.623c0 .905-.343 1.779-.874 2.59zm-8.865-25.783c0-.749-.593-1.31-1.343-1.31-.717 0-1.342.561-1.342 1.31v.874c0 .718.625 1.311 1.342 1.311.75 0 1.343-.593 1.343-1.31zm13.298 0c0-.749-.593-1.31-1.311-1.31-.75 0-1.343.561-1.343 1.31v.874c0 .718.593 1.311 1.343 1.311.717 0 1.31-.593 1.31-1.31v-.875zm3.558 7.43h-2.466a11.612 11.612 0 0 0 -18.23 0h-2.372v15.7c0 1.436 1.186 2.653 2.653 2.653h7.117s2.654.032 2.654-2.59v-3.497c0-2.622 2.653-4.276 5.338-4.276h2.653c2.653 0 2.653-2.653 2.653-2.653v-5.338zm-5.619 5.338a6.18 6.18 0 0 0 -12.143 1.685c0 2.747 1.873 5.12 4.464 5.869v2.715a8.803 8.803 0 0 1 -7.117-8.584 8.834 8.834 0 0 1 17.45-1.685zm-9.926 1.685c0-.374.093-.718.187-1.061a1.998 1.998 0 0 0 3.59-1.155c0-.656-.312-1.218-.812-1.592a3.996 3.996 0 0 1 4.776 2.372c-2.622.78-4.65 2.685-5.275 5.057-1.436-.593-2.466-1.998-2.466-3.62z"></path>
                    </svg>
                </a>

                <div className="w-full ml-16 mr-8 flex items-center min-w-0">
                    <div className="text-black font-medium">Tookapic</div>

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
