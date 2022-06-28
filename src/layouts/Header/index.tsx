import React, { useState, useEffect, useRef } from "react";
import Icon from "@components/Icon";
import { useClickAway, useToggle } from "ahooks";
import classnames from "classnames";
import { useRouter } from "next/router";
import _ from "lodash";
import { Storage } from "@/utils/storage";
import toast from "react-hot-toast";
import type { IItem } from "@/components/Menu";
import Menu from "@/components/Menu/index";
import { useTranslation } from "react-i18next";
import AddPhotoModal from "@components/AddPhotoModal";

const Index = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [activeMenuItem, setActiveMenuItem] = useState<IItem>();
    const [showMenu, { toggle: toggleMenu, setLeft: setMenuLeft }] =
        useToggle();
    const [showMMenu, { toggle: toggleMMenu, setLeft: setMMenuLeft }] =
        useToggle();
    const [showUserMenu, { toggle: toggleUserMenu, setLeft: setUserMenuLeft }] =
        useToggle();
    const [showWrap, { toggle: toggleWrap, setLeft: setWrapLeft }] =
        useToggle();
    const [
        showMInputTypeMenu,
        {
            toggle: toggleMInputTypeMenu,
            setLeft: setMInputTypeMenuLeft,
            setRight: setMInputTypeMenuRight,
        },
    ] = useToggle();
    const [
        showPCInputTypeMenu,
        {
            toggle: togglePCInputTypeMenu,
            setLeft: setPCInputTypeMenuLeft,
            setRight: setPCInputTypeMenuRight,
        },
    ] = useToggle();

    const [
        showAddPhotoModal,
        { toggle: toggleAddPhotoModal, setLeft: setAddPhotoModalLeft },
    ] = useToggle(false); // 是否展示添加照片弹窗

    const [searchValue, setSearchValue] = useState("");
    const [isLogin, setIsLogin] = useState(false); // 是否是登录状态
    const [userInfo, setUserInfo] = useState(); // 用户信息

    const moreRef = useRef<HTMLButtonElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (sessionStorage) {
            const storage = new Storage(sessionStorage, "Talks");
            const _isLogin = storage?.getItem("token");
            const _userInfo = storage?.getItem("userInfo") || {};
            setIsLogin(_isLogin);
            setUserInfo(_userInfo);
        }
    }, []);

    useEffect(() => {
        if (showWrap) {
            setSearchValue("");
            setPCInputTypeMenuLeft();
        }
    }, [showWrap]);

    useClickAway(() => {
        if (showMInputTypeMenu) {
            setWrapLeft();
            setSearchValue("");
            setMInputTypeMenuLeft();
        }
    }, [wrapRef, buttonRef]);

    useClickAway(() => {
        setMenuLeft();
    }, moreRef);

    const items: IItem[] = [
        {
            label: t("common.community"),
            value: "talks",
            className: "xl:hidden",
        },
        {
            label: "Prints",
            value: "prints",
            className: "xl:hidden",
        },
        {
            label: t("common.galleries"),
            value: "galleries",
        },
        {
            label: "Places",
            value: "places",
        },
        {
            label: "Tags",
            value: "tags",
        },
    ];

    // 路由跳转
    const goRoute = (path: string) => {
        router.push(path);
    };

    // menu搜索框查询
    const onSearch = (type: string) => {
        toast.success(`Search: type=${type}  value=${searchValue}`);
        setMInputTypeMenuLeft();
    };

    // 头部菜单item点击
    const onMenuItemClick = (item: IItem) => {
        toggleMenu();
        if (item.value) {
            goRoute(`/${item.value}`);
        }
    };
    return (
        <div
            className="d-d-container navbar bg-white px-0 md:px-32 z-60 shadow-navbar sticky pin-t md:relative md:shadow-none"
            id="top"
        >
            {/* mobile 弹窗 */}
            <div
                className={classnames(
                    "bg-black shadow-navbar pin-t pin-x absolute lg:hidden z-1",
                    { hidden: !showWrap },
                )}
                ref={wrapRef}
            >
                <div className="d-d-container px-0 flex items-center shadow-navbar-inner">
                    <button
                        type="button"
                        className="button-reset py-20 text-white text-24 leading-none lg:hidden text-center w-64"
                        onClick={setWrapLeft}
                    >
                        <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
                        </svg>
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
                                        ? setMInputTypeMenuRight()
                                        : setMInputTypeMenuLeft();
                                }}
                            />

                            <Icon
                                className="icon-search"
                                addClassName="absolute text-14 pin-l pin-y pin-t-center ml-16 text-grey-27"
                            />
                            <div
                                className={classnames(
                                    "search-dropdown bg-white leading-6 rounded shadow-popover absolute pin-x pin-t-full mt-8 overflow-hidden z-50",
                                    { hidden: !showMInputTypeMenu },
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
                                        {t("common.searchPhotos")}
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
                                        {t("common.searchPeople")}
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
                                        {t("common.searchGalleries")}
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
                                        {t("common.searchTalks")}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-d-container px-24 py-12 flex flex-col">
                    <div className="-mx-24 -my-12 relative">
                        <div className="navbar__popup overflow-y-auto">
                            <div className="px-24 py-12 flex flex-col">
                                <a
                                    className={classnames(
                                        "py-4 text-white font-medium",
                                    )}
                                    onClick={() => {
                                        setWrapLeft();
                                        setSearchValue("");
                                        goRoute("/");
                                    }}
                                >
                                    {t("common.browsePhotos")}
                                </a>

                                <a
                                    className={classnames(
                                        "py-4 text-white font-medium",
                                    )}
                                    onClick={() => {
                                        setWrapLeft();
                                        setSearchValue("");
                                        goRoute("/galleries");
                                    }}
                                >
                                    {t("common.browseGalleries")}
                                </a>

                                <a
                                    className={classnames(
                                        "group py-4 text-white font-medium hover:no-underline flex items-center",
                                    )}
                                    onClick={() => {
                                        setWrapLeft();
                                        setSearchValue("");
                                        goRoute("/talks");
                                    }}
                                >
                                    <span className="group-hover:underline">
                                        {t("common.community")}
                                    </span>
                                </a>

                                <a
                                    className={classnames(
                                        "py-4 text-white font-medium",
                                        {
                                            hidden: !isLogin,
                                        },
                                    )}
                                >
                                    Weekly themes
                                </a>

                                <a
                                    className={classnames(
                                        "py-4 text-white font-medium",
                                        {
                                            hidden: !isLogin,
                                        },
                                    )}
                                >
                                    Prints
                                </a>

                                <a
                                    className={classnames(
                                        "mt-16 py-4 text-grey-53",
                                        {
                                            hidden: !isLogin,
                                        },
                                    )}
                                >
                                    My Profile
                                </a>

                                <a
                                    className={classnames("py-4 text-grey-53", {
                                        hidden: !isLogin,
                                    })}
                                >
                                    My Likes
                                </a>

                                <a
                                    className={classnames("py-4 text-grey-53", {
                                        hidden: !isLogin,
                                    })}
                                >
                                    My Favorites
                                </a>

                                <a
                                    className={classnames("py-4 text-grey-53", {
                                        hidden: !isLogin,
                                    })}
                                >
                                    My Galleries
                                </a>

                                <a
                                    className={classnames("py-4 text-grey-53", {
                                        hidden: !isLogin,
                                    })}
                                >
                                    My Badges
                                </a>

                                <a
                                    className={classnames(
                                        "mt-16 py-4 text-grey-53",
                                        {
                                            hidden: !isLogin,
                                        },
                                    )}
                                >
                                    Membership
                                </a>

                                <a
                                    className={classnames("py-4 text-grey-53", {
                                        hidden: !isLogin,
                                    })}
                                >
                                    Orders
                                </a>
                            </div>
                        </div>

                        <div
                            className={classnames(
                                "absolute pin-b pin-r mb-24 mr-24 flex text-24 leading-none",
                                { hidden: !isLogin },
                            )}
                        >
                            <a
                                className={classnames(
                                    "text-grey-53 hover:text-grey-80 mr-24",
                                    { hidden: !isLogin },
                                )}
                            >
                                <svg
                                    className="icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M482.696 299.276l-32.61-18.827a195.168 195.168 0 0 0 0-48.899l32.61-18.827c9.576-5.528 14.195-16.902 11.046-27.501-11.214-37.749-31.175-71.728-57.535-99.595-7.634-8.07-19.817-9.836-29.437-4.282l-32.562 18.798a194.125 194.125 0 0 0-42.339-24.48V38.049c0-11.13-7.652-20.804-18.484-23.367-37.644-8.909-77.118-8.91-114.77 0-10.831 2.563-18.484 12.236-18.484 23.367v37.614a194.101 194.101 0 0 0-42.339 24.48L105.23 81.345c-9.621-5.554-21.804-3.788-29.437 4.282-26.36 27.867-46.321 61.847-57.535 99.595-3.149 10.599 1.47 21.972 11.046 27.501l32.61 18.827a195.168 195.168 0 0 0 0 48.899l-32.61 18.827c-9.576 5.528-14.195 16.902-11.046 27.501 11.214 37.748 31.175 71.728 57.535 99.595 7.634 8.07 19.817 9.836 29.437 4.283l32.562-18.798a194.08 194.08 0 0 0 42.339 24.479v37.614c0 11.13 7.652 20.804 18.484 23.367 37.645 8.909 77.118 8.91 114.77 0 10.831-2.563 18.484-12.236 18.484-23.367v-37.614a194.138 194.138 0 0 0 42.339-24.479l32.562 18.798c9.62 5.554 21.803 3.788 29.437-4.283 26.36-27.867 46.321-61.847 57.535-99.595 3.149-10.599-1.47-21.972-11.046-27.501zm-65.479 100.461l-46.309-26.74c-26.988 23.071-36.559 28.876-71.039 41.059v53.479a217.145 217.145 0 0 1-87.738 0v-53.479c-33.621-11.879-43.355-17.395-71.039-41.059l-46.309 26.74c-19.71-22.09-34.689-47.989-43.929-75.958l46.329-26.74c-6.535-35.417-6.538-46.644 0-82.079l-46.329-26.74c9.24-27.969 24.22-53.869 43.929-75.969l46.309 26.76c27.377-23.434 37.063-29.065 71.039-41.069V44.464a216.79 216.79 0 0 1 87.738 0v53.479c33.978 12.005 43.665 17.637 71.039 41.069l46.309-26.76c19.709 22.099 34.689 47.999 43.929 75.969l-46.329 26.74c6.536 35.426 6.538 46.644 0 82.079l46.329 26.74c-9.24 27.968-24.219 53.868-43.929 75.957zM256 160c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z" />
                                </svg>
                            </a>

                            <button
                                className={classnames(
                                    "button-reset text-grey-53 hover:text-grey-80",
                                    { hidden: !isLogin },
                                )}
                            >
                                <svg
                                    className="icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M388.5 46.3C457.9 90.3 504 167.8 504 256c0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 168 54 90.3 123.5 46.3c5.8-3.7 13.5-1.8 16.9 4.2l3.9 7c3.1 5.6 1.3 12.6-4.1 16C79.9 112 40 179.6 40 256c0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216 0-77-40.1-144.2-100.3-182.4-5.4-3.4-7.2-10.5-4.1-16l3.9-7c3.4-6.1 11.2-7.9 17-4.3zM272 276V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v264c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* mobile navbar */}
            <div className="flex items-center justify-between md:hidden">
                <button
                    type="button"
                    className="button-reset py-20 text-black text-24 leading-none text-center w-64"
                    onClick={toggleWrap}
                    ref={buttonRef}
                >
                    <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z" />
                    </svg>
                </button>

                <a
                    href="https://tookapic.com"
                    className={classnames(
                        "py-20 text-black text-24 leading-none text-center flex-1",
                        { hidden: !isLogin },
                    )}
                >
                    <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path d="M488 312.7V456c0 13.3-10.7 24-24 24H348c-6.6 0-12-5.4-12-12V356c0-6.6-5.4-12-12-12h-72c-6.6 0-12 5.4-12 12v112c0 6.6-5.4 12-12 12H112c-13.3 0-24-10.7-24-24V312.7c0-3.6 1.6-7 4.4-9.3l188-154.8c4.4-3.6 10.8-3.6 15.3 0l188 154.8c2.7 2.3 4.3 5.7 4.3 9.3zm83.6-60.9L488 182.9V44.4c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12V117l-89.5-73.7c-17.7-14.6-43.3-14.6-61 0L4.4 251.8c-5.1 4.2-5.8 11.8-1.6 16.9l25.5 31c4.2 5.1 11.8 5.8 16.9 1.6l235.2-193.7c4.4-3.6 10.8-3.6 15.3 0l235.2 193.7c5.1 4.2 12.7 3.5 16.9-1.6l25.5-31c4.2-5.2 3.4-12.7-1.7-16.9z" />
                    </svg>
                </a>

                <a
                    href="https://tookapic.com/messages"
                    className={classnames(
                        "py-20 text-black text-24 leading-none text-center flex-1 relative",
                        { hidden: !isLogin },
                    )}
                >
                    <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z" />
                    </svg>
                </a>

                <a
                    href="https://tookapic.com/notifications"
                    className={classnames(
                        "py-20 text-black text-24 leading-none text-center flex-1 relative",
                        { hidden: !isLogin },
                    )}
                >
                    <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M433.884 366.059C411.634 343.809 384 316.118 384 208c0-79.394-57.831-145.269-133.663-157.83A31.845 31.845 0 0 0 256 32c0-17.673-14.327-32-32-32s-32 14.327-32 32c0 6.75 2.095 13.008 5.663 18.17C121.831 62.731 64 128.606 64 208c0 108.118-27.643 135.809-49.893 158.059C-16.042 396.208 5.325 448 48.048 448H160c0 35.29 28.71 64 64 64s64-28.71 64-64h111.943c42.638 0 64.151-51.731 33.941-81.941zM224 480c-17.645 0-32-14.355-32-32h64c0 17.645-14.355 32-32 32zm175.943-64H48.048c-14.223 0-21.331-17.296-11.314-27.314C71.585 353.836 96 314.825 96 208c0-70.741 57.249-128 128-128 70.74 0 128 57.249 128 128 0 106.419 24.206 145.635 59.257 180.686C421.314 398.744 414.11 416 399.943 416z" />
                    </svg>
                </a>

                <div
                    className={classnames("flex-1 text-center", {
                        hidden: !isLogin,
                    })}
                >
                    <button
                        type="button"
                        className="button button--secondary text-accent text-24 leading-none px-10 py-6"
                    >
                        <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                    </button>
                </div>

                <a
                    href="https://tookapic.com/977197585"
                    className={classnames("w-64 p-16 text-center", {
                        hidden: !isLogin,
                    })}
                >
                    <span className="avatar">
                        <img
                            src={userInfo?.avatarUrl}
                            width="32"
                            height="32"
                            alt={userInfo?.name}
                            className="avatar__photo"
                        />
                    </span>
                </a>
            </div>

            {/* pc navbar */}
            <div className="hidden md:flex items-center py-16">
                <a
                    className="flex-none text-black"
                    title="go home"
                    onClick={() => {
                        goRoute("/");
                    }}
                >
                    <Icon className="icon-meiduan" addClassName="text-5xl" />
                </a>
                <div
                    className={classnames(
                        "w-full ml-8 mr-8 items-center min-w-0",
                        { hidden: isLogin, flex: !isLogin },
                    )}
                >
                    <div className="text-black font-medium">XIAO 521</div>
                </div>

                <div
                    className={classnames("flex-none items-center -mx-16", {
                        hidden: isLogin,
                        flex: !isLogin,
                    })}
                >
                    <Menu
                        items={items}
                        className="ml-8"
                        visible={showMMenu}
                        value={activeMenuItem?.value}
                        setLeft={setMMenuLeft}
                        onChange={(item) => {
                            setActiveMenuItem(item);
                            onMenuItemClick(item);
                            setMMenuLeft();
                        }}
                    >
                        <a
                            className="block py-4 px-16 leading-sm font-medium text-black hover:no-underline cursor-pointer"
                            onClick={toggleMMenu}
                        >
                            {t("common.browse")}
                        </a>
                    </Menu>
                    <a
                        onClick={() => {
                            goRoute("/");
                        }}
                        className="block py-4 px-16 ml-8 leading-sm font-medium text-grey-53 hover:text-black hover:no-underline"
                    >
                        {t("common.learnMore")}
                    </a>
                </div>

                <div
                    className={classnames(
                        "flex-none items-center justify-start ml-32 lg:ml-24 flex-grow",
                        { hidden: isLogin, flex: !isLogin },
                    )}
                >
                    <a
                        className="button button--secondary hidden sm:block md:ml-8 mr-16"
                        onClick={() => {
                            goRoute("/login?signIn=1");
                        }}
                    >
                        {t("common.login")}
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
                        {t("common.signUp")}
                    </a>
                </div>
                {/* <div className="hidden lg:block ml-20 truncate">
                        <a
                            href="https://tookapic.com/auth/register"
                            className="text-inherit"
                        >
                            Start your own 365 Project
                        </a>
                    </div> */}

                <div
                    className={classnames(
                        "w-full mx-24 xl:ml-48 xl:mr-42 relative",
                        { hidden: !isLogin },
                    )}
                >
                    <input
                        type="search"
                        name="searchValue"
                        className="block input input--pill pl-40"
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
                                ? setPCInputTypeMenuRight()
                                : setPCInputTypeMenuLeft();
                        }}
                    />

                    <Icon
                        className="icon-search"
                        addClassName="absolute text-14 pin-l pin-y pin-t-center ml-16 text-grey-27"
                    />
                    <div
                        className={classnames(
                            "search-dropdown bg-white rounded shadow-popover absolute pin-x pin-t-full mt-8 overflow-hidden z-50",
                            { hidden: !showPCInputTypeMenu },
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
                                {t("common.searchPhotos")}
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
                                {t("common.searchPeople")}
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
                                {t("common.searchGalleries")}
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
                                {t("common.searchTalks")}
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    className={classnames("flex-none items-center -mx-16", {
                        hidden: !isLogin,
                        flex: isLogin,
                    })}
                >
                    <a className="hidden lg:block py-4 px-16 leading-sm font-medium text-grey-53 hover:text-black hover:no-underline cursor-pointer">
                        Home
                    </a>

                    <a className="block py-4 px-16 leading-sm font-medium text-black hover:no-underline cursor-pointer">
                        Photos
                    </a>

                    <a className="block py-4 px-16 leading-sm font-medium text-grey-53 hover:text-black hover:no-underline cursor-pointer">
                        Themes
                    </a>

                    <a className="group hover:no-underline hidden xl:flex items-center py-4 px-16 leading-sm font-medium text-grey-53 hover:text-black cursor-pointer">
                        <span className="group-hover:text-black">
                            Community
                        </span>
                    </a>

                    <a className="hidden xl:block py-4 px-16 leading-sm font-medium text-grey-53 hover:text-black hover:no-underline cursor-pointer">
                        Prints
                    </a>

                    <Menu
                        items={items}
                        className="ml-8"
                        visible={showMenu}
                        value={activeMenuItem?.value}
                        setLeft={setMenuLeft}
                        onChange={(item) => {
                            setActiveMenuItem(item);
                            onMenuItemClick(item);
                            setMenuLeft();
                        }}
                    >
                        <a
                            className="block py-4 px-16 leading-sm font-medium text-grey-53 hover:text-black cursor-pointer"
                            onClick={toggleMenu}
                        >
                            <svg
                                className="icon text-24"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path d="M192 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-240 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" />
                            </svg>
                        </a>
                    </Menu>
                </div>

                <div
                    className={classnames(
                        "flex-none items-center justify-start ml-32 lg:ml-48 flex-grow",
                        { hidden: !isLogin, flex: isLogin },
                    )}
                >
                    <a className="group mr-16 relative cursor-pointer">
                        <svg
                            className="icon text-24 text-grey-27"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z" />
                        </svg>
                    </a>

                    <div className="sm:relative">
                        <a className="group block relative cursor-pointer">
                            <svg
                                className="icon text-24 text-grey-27"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M433.884 366.059C411.634 343.809 384 316.118 384 208c0-79.394-57.831-145.269-133.663-157.83A31.845 31.845 0 0 0 256 32c0-17.673-14.327-32-32-32s-32 14.327-32 32c0 6.75 2.095 13.008 5.663 18.17C121.831 62.731 64 128.606 64 208c0 108.118-27.643 135.809-49.893 158.059C-16.042 396.208 5.325 448 48.048 448H160c0 35.29 28.71 64 64 64s64-28.71 64-64h111.943c42.638 0 64.151-51.731 33.941-81.941zM224 480c-17.645 0-32-14.355-32-32h64c0 17.645-14.355 32-32 32zm175.943-64H48.048c-14.223 0-21.331-17.296-11.314-27.314C71.585 353.836 96 314.825 96 208c0-70.741 57.249-128 128-128 70.74 0 128 57.249 128 128 0 106.419 24.206 145.635 59.257 180.686C421.314 398.744 414.11 416 399.943 416z" />
                            </svg>
                        </a>
                    </div>

                    <button
                        type="button"
                        className="button button--secondary ml-16 lg:ml-24 text-16"
                        onClick={toggleAddPhotoModal}
                    >
                        <span className="xl:hidden"> Upload </span>

                        <span className="hidden xl:block"> Upload </span>
                    </button>

                    <div className="ml-16 lg:ml-24">
                        <Menu
                            items={[
                                { label: "My Profile", value: "profile" },
                                { label: "My Likes", value: "likes" },
                                { label: "My Favorites", value: "favorites" },
                                { label: "My Galleries", value: "galleries" },
                                { label: "My Badges", value: "badges" },
                                { label: "Orders", value: "orders" },
                                {
                                    label: "Settings",
                                    value: "settings",
                                    className: "text-grey-53 mt-16",
                                },
                                {
                                    label: "Logout",
                                    value: "logout",
                                    className: "text-grey-53",
                                },
                            ]}
                            align="right"
                            className="ml-8"
                            visible={showUserMenu}
                            setLeft={setUserMenuLeft}
                            onChange={(item) => {
                                setUserMenuLeft();
                            }}
                        >
                            <a
                                className="block avatar cursor-pointer"
                                onClick={toggleUserMenu}
                            >
                                <img
                                    src={userInfo?.avatarUrl}
                                    width="32"
                                    height="32"
                                    alt={userInfo?.name}
                                    className="avatar__photo"
                                />
                            </a>
                        </Menu>
                    </div>
                </div>
            </div>
            <AddPhotoModal
                visible={showAddPhotoModal}
                setModalLeft={setAddPhotoModalLeft}
            />
        </div>
    );
};

export default Index;
