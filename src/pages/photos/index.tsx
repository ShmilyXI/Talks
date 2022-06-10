import Filter from "@/components/Filter";
import Api from "@/service/index";
import {
    useRequest,
    configResponsive,
    useResponsive,
    useUpdateLayoutEffect,
} from "ahooks";
import React, {
    LegacyRef,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { useRouter } from "next/router";
import PhotoAlbum from "react-photo-album";
import classnames from "classnames";
import { Icon, PlaceholderSvg } from "@components";
import _ from "lodash";

type PhotoItem = {
    title: string;
    description: string;
    src: string;
    width: number;
    height: number;
    placeholderSrc: string;
    avatar: string;
    author: string;
    date: string;
    dateStr: string;
    workCount: number;
    answerCount: number;
    subjectColor?: string; // 主题色
    id: string;
    userId: string;
};

const BreakPoints = {
    xs: 352,
    sm: 576,
    grid: 696,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1304,
    xxxl: 1440,
};
configResponsive(BreakPoints);

const Browse = () => {
    const router = useRouter();
    const { data, error, loading }: any = useRequest(Api.getGalleryPhotoList);
    const [photoList, setPhotoList] = useState<PhotoItem[]>([]); // 文章列表
    const [isMobile, setIsMobile] = useState(false);
    const responsive = useResponsive();
    const [nowPointWidth, setNowPointWidth] = useState(800);

    // 替换图片真实src
    const replaceImageSrc = useCallback((photo: Element) => {
        const src = photo.getAttribute("data-src") || "";
        photo.setAttribute("src", src);
    }, []);

    useUpdateLayoutEffect(() => {
        if (!photoList?.length) return;
        // 图片预显示背景主题色,加载完成后替换属性,展示真实图片
        const photos = document.querySelectorAll(".photo-item");
        _.forEach(photos, (photo) => {
            photo.addEventListener("load", () => replaceImageSrc(photo));
        });
        return () => {
            const photos = document.querySelectorAll(".photo-item");
            _.forEach(photos, (photo) => {
                photo.removeEventListener("load", () => replaceImageSrc(photo));
            });
        };
    }, [photoList, isMobile]);

    useEffect(() => {
        /* TODO: 图片主题色可以提取出来作为图片预加载的背景色,现在暂未实现,使用随机色值展示 */
        setPhotoList(data?.list || []);
    }, [data]);

    useEffect(() => {
        setIsMobile(!responsive.grid);
        // 设置图片容器宽度
        const offsetWidth = document.documentElement.offsetWidth;
        setNowPointWidth(offsetWidth);
    }, [responsive]);

    // 路由跳转
    const goRoute = (path: string) => {
        router.push(path);
    };

    return (
        <div>
            <div className="container p-16 md:px-32 md:py-24">
                <div className="container p-0 flex items-center justify-between">
                    <div className="min-w-0 flex-grow mr-8">
                        <Filter
                            breakPoint="md"
                            items={[
                                { label: "Test1", value: "1" },
                                { label: "Test2", value: "2" },
                                { label: "Test3", value: "3" },
                                { label: "Test4", value: "4" },
                                { label: "Test5", value: "5" },
                                { label: "Test6", value: "6" },
                                { label: "Test7", value: "7" },
                            ]}
                            onChange={(item) => {
                                console.log("item", item);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="container p-16 md:pt-0 md:px-32 md:pb-24 lg:pb-32 xl:pb-48">
                <div className="-m-16 grid:-mb-8 grid:-mx-0 grid:-mt-0">
                    <PhotoAlbum
                        layout="rows"
                        defaultContainerWidth={nowPointWidth}
                        rowConstraints={{
                            maxPhotos: isMobile ? 1 : 3,
                        }}
                        breakpoints={[
                            352, 576, 696, 768, 992, 1200, 1304, 1440,
                        ]}
                        photos={photoList}
                        renderPhoto={(data: {
                            photo: any;
                            imageProps: JSX.IntrinsicAttributes &
                                React.ClassAttributes<HTMLImageElement> &
                                React.ImgHTMLAttributes<HTMLImageElement>;
                        }) => {
                            const item = data.photo;
                            return (
                                <div
                                    style={{
                                        ...data.imageProps.style,
                                        aspectRatio: isMobile
                                            ? "unset"
                                            : data.imageProps.style
                                                  ?.aspectRatio,
                                    }}
                                    className={classnames(
                                        "story-list__item group",
                                        // 'mt-8 grid:mt-0 grid:mb-8 w-full grid:w-auto',
                                        data.imageProps.className,
                                    )}
                                >
                                    <div className="relative bg-white w-full h-full">
                                        {/* 小屏 */}
                                        <div className="flex grid:hidden justify-between items-center px-16 py-8 story-list__header">
                                            <div className="flex items-center min-w-0">
                                                <div className="flex-none">
                                                    <div className="avatar">
                                                        <img
                                                            src={item.avatar}
                                                            width="32"
                                                            height="32"
                                                            alt=""
                                                            className="avatar__photo"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="ml-16 min-w-0 truncate">
                                                    <a
                                                        className="font-medium story-list__user block text-14 leading-md cursor-pointer"
                                                        onClick={() =>
                                                            goRoute(
                                                                `/user?pid=${item.userId}`,
                                                            )
                                                        }
                                                    >
                                                        <span className="block truncate">
                                                            {item.author}
                                                        </span>
                                                    </a>
                                                </div>

                                                {/* <div
                                                    className="flex-none leading-none ml-8"
                                                    data-tooltip=""
                                                    data-original-title="Paying member"
                                                >
                                                    <svg
                                                        className="icon text-14 text-grey-80"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512"
                                                    >
                                                        <path d="M512 256c0-37.7-23.7-69.9-57.1-82.4 14.7-32.4 8.8-71.9-17.9-98.6-26.7-26.7-66.2-32.6-98.6-17.9C325.9 23.7 293.7 0 256 0s-69.9 23.7-82.4 57.1c-32.4-14.7-72-8.8-98.6 17.9-26.7 26.7-32.6 66.2-17.9 98.6C23.7 186.1 0 218.3 0 256s23.7 69.9 57.1 82.4c-14.7 32.4-8.8 72 17.9 98.6 26.6 26.6 66.1 32.7 98.6 17.9 12.5 33.3 44.7 57.1 82.4 57.1s69.9-23.7 82.4-57.1c32.6 14.8 72 8.7 98.6-17.9 26.7-26.7 32.6-66.2 17.9-98.6 33.4-12.5 57.1-44.7 57.1-82.4zm-144.8-44.25L236.16 341.74c-4.31 4.28-11.28 4.25-15.55-.06l-75.72-76.33c-4.28-4.31-4.25-11.28.06-15.56l26.03-25.82c4.31-4.28 11.28-4.25 15.56.06l42.15 42.49 97.2-96.42c4.31-4.28 11.28-4.25 15.55.06l25.82 26.03c4.28 4.32 4.26 11.29-.06 15.56z"></path>
                                                    </svg>
                                                </div> */}
                                            </div>

                                            <div className="ml-16 flex items-center flex-none text-12 leading-sm">
                                                <time
                                                    dateTime="2022-05-11T18:53:20+00:00"
                                                    title="2022-05-11T18:53:20+00:00"
                                                >
                                                    8h
                                                </time>
                                            </div>
                                        </div>
                                        {/* 大屏 */}
                                        <div
                                            className="overflow-hidden w-full h-full relative story-list__photo grid:rounded-3"
                                            style={{
                                                backgroundColor:
                                                    item.subjectColor,
                                            }}
                                        >
                                            <a
                                                className="block absolute pin z-3 cursor-pointer"
                                                onClick={() =>
                                                    goRoute(
                                                        `/photos/detail?pid=${item.id}`,
                                                    )
                                                }
                                            ></a>
                                            {/* 图片 */}
                                            <img
                                                {..._.omit(
                                                    data.imageProps,
                                                    "src",
                                                )}
                                                src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'100%' height%3D'100%'%2F%3E"
                                                data-src={data.imageProps.src}
                                                style={{
                                                    ..._.omit(
                                                        data.imageProps.style,
                                                        ["width", "height"],
                                                    ),
                                                    maxHeight: "80vh",
                                                }}
                                                className={classnames(
                                                    "photo-item is-loaded hidden grid:block w-full h-full object-cover",
                                                    data.imageProps.className,
                                                )}
                                                loading="lazy"
                                            />
                                            {/* 小屏图片 */}
                                            {/* <img
                                                src={item.placeholderSrc}
                                                className="block h-full w-full grid:hidden"
                                            /> */}

                                            <div className="story-list__overlay absolute pin z-1"></div>

                                            {/* 遮罩 顶部*/}
                                            <div className="story-list__overlay-item absolute pin-t pin-x z-5 px-8 pt-8 text-white text-12 leading-sm pointer-events-none text-shadow-grid flex justify-between">
                                                <div className="flex items-center">
                                                    <div className="flex-none mr-8">
                                                        <div className="avatar bg-black">
                                                            <img
                                                                src={
                                                                    item.avatar
                                                                }
                                                                width="32"
                                                                height="32"
                                                                className="avatar__photo is-loaded"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="font-medium">
                                                            <a
                                                                className="pointer-events-auto text-inherit break-words cursor-pointer"
                                                                onClick={() =>
                                                                    goRoute(
                                                                        `/user?pid=${item.userId}`,
                                                                    )
                                                                }
                                                            >
                                                                {item.author}
                                                            </a>
                                                        </div>

                                                        <div className="opacity-75">
                                                            {item.workCount}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 遮罩 底部*/}
                                            <div className="story-list__overlay-item absolute pin-b pin-x z-5 px-8 pb-8 text-white text-12 leading-sm pointer-events-none flex justify-between">
                                                <div className="flex items-center -mx-6">
                                                    <div className="mr-4 ml-4 leading-none">
                                                        <div className="pointer-events-auto">
                                                            <a
                                                                href="/"
                                                                target="_blank"
                                                                className="inline-flex align-top"
                                                            >
                                                                <Icon
                                                                    className="icon-like"
                                                                    addClassName="text-white text-16"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="mr-4 leading-none">
                                                        <a
                                                            href="/"
                                                            target="_blank"
                                                            className="inline-flex align-top pointer-events-auto"
                                                        >
                                                            <Icon
                                                                className="icon-favor"
                                                                addClassName="text-white text-16"
                                                            />
                                                        </a>
                                                    </div>

                                                    <div
                                                        className="mr-4 leading-none flex items-center"
                                                        data-controller="popovers--comments"
                                                    >
                                                        <a
                                                            href="/#comments"
                                                            target="_blank"
                                                            className="pointer-events-auto leading-none"
                                                        >
                                                            <Icon
                                                                className="icon-message"
                                                                addClassName="text-white text-16"
                                                            />
                                                        </a>

                                                        <span className="font-medium text-12 ml-3 leading-none text-white">
                                                            {item.answerCount}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 小屏 详情信息 */}
                                        <div className="p-16 story-list__footer grid:hidden">
                                            <div className="flex items-center justify-between mb-16">
                                                <div className="flex items-center text-12 leading-sm grid:text-14 grid:leading-md">
                                                    <span className="flex-none mr-8">
                                                        Day 1,916
                                                    </span>

                                                    <time
                                                        className="flex-none"
                                                        dateTime={item.date}
                                                        title={item.date}
                                                    >
                                                        {item.dateStr}
                                                    </time>
                                                </div>

                                                <div className="flex items-center -mx-8">
                                                    <div className="px-8 leading-none text-14">
                                                        <div className="px-8 leading-none text-14">
                                                            <a
                                                                href="/"
                                                                className="inline-flex align-top"
                                                                data-tooltip=""
                                                                data-original-title="Like"
                                                            >
                                                                <Icon
                                                                    className="icon-like"
                                                                    addClassName="text-black text-22"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="px-8 leading-none text-14">
                                                        <a
                                                            href="/"
                                                            className="inline-flex align-top"
                                                            data-tooltip=""
                                                            data-original-title="Favorite"
                                                        >
                                                            <Icon
                                                                className="icon-favor"
                                                                addClassName="text-black text-22"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="story-list__title text-black font-medium mb-8 text-14 leading-md grid:text-16 grid:leading-normal">
                                                {item.title}
                                            </div>

                                            <div className="story-list__excerpt text-grey-27 text-14 leading-md grid:text-16 grid:leading-normal">
                                                {item.description}
                                            </div>

                                            <div className="flex items-center -mx-6 mt-8 text-14 leading-md grid:text-16 grid:leading-normal">
                                                <div
                                                    className="px-6"
                                                    data-controller="popovers--comments"
                                                >
                                                    <a
                                                        className="text-grey-53 cursor-pointer"
                                                        onClick={() =>
                                                            goRoute(
                                                                `/talks/detail?${item.id}`,
                                                            )
                                                        }
                                                    >
                                                        {item.answerCount}
                                                        comments
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                        renderRowContainer={(data) => {
                            return (
                                <div
                                    {...data.rowContainerProps}
                                    className={classnames(
                                        "story-list",
                                        "mt-8 grid:mt-0",
                                        data.rowContainerProps.className,
                                    )}
                                >
                                    {data.children}
                                </div>
                            );
                        }}
                        renderContainer={(data: any) => (
                            <div
                                {...data.containerProps}
                                className={classnames(
                                    "story-list",
                                    // '-mt-24 grid:mt-0',
                                    data.containerProps.className,
                                )}
                            >
                                {data.children}
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default Browse;
