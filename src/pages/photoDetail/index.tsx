import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon, Menu, PlaceholderSvg, PhotoViews, Comments } from "@components";
import classnames from "classnames";
import dayjs from "dayjs";
import { useToggle, useRequest } from "ahooks";
import { useTranslation } from "react-i18next";
import Api from "@/service";

type Mood = Record<string, { text: string; icon: string }>;

type LinkTag = { name: string; link: string };

export type CommentItem = {
    avatarSrc: string;
    authorName: string;
    authorId: number;
    content: string;
    date: string;
    likes: number;
    commentList?: CommentItem[];
};

export type PhotoItem = {
    src: string;
    width: number;
    height: number;
    backgroundColor: string;
    timeSpan: string;
    date: string;
};
type DetailInfo = {
    id: string;
    authorName: string;
    authorId: number;
    avatarSrc: string;
    title: string;
    descriptionBody: string;
    linkTags: LinkTag[];
    mood: string;
    location: {
        name: string;
        value: string;
    };
    view: number;
    galleries: any[];
    exifData: {
        brand: string;
        model: string;
        aperture: string;
        focalLength: string;
        shutterSpeed: string;
        iso: string;
    };
    date: string;
    photoList: PhotoItem[];
};

// Mood Location  View
const MoodEnum: Mood = {
    awesome: { text: "Awesome", icon: "icon-awesome" },
    good: { text: "Good", icon: "icon-good" },
    meh: { text: "Meh", icon: "icon-meh" },
    bad: { text: "Bad", icon: "icon-bad" },
    terrible: { text: "Terrible", icon: "icon-terrible" },
};

const Index = () => {
    const router = useRouter();
    const { pid } = router.query;
    const { t } = useTranslation();
    const [showMenu, { toggle: toggleMenu, setLeft: setMenuLeft }] =
        useToggle();
    const [detailInfo, setDetailInfo] = useState<DetailInfo>();
    const [commentList, setCommentList] = useState<CommentItem[]>([]);

    const { data, error, loading }: any = useRequest(Api.getPhotoDetailInfo);
    const {
        data: commentData,
        error: commentError,
        loading: commentLoading,
    }: any = useRequest(Api.getPhotoDetailComments);

    useEffect(() => {
        setDetailInfo(data?.data || {});
    }, [data]);
    useEffect(() => {
        setCommentList(commentData?.list || []);
    }, [commentData]);

    return (
        <div>
            <div className="story lg:flex">
                {/* mobile 头部 */}
                <div className="shadow-navbar flex justify-between items-center lg:hidden px-16 md:px-32 py-8 md:py-16 relative z-1">
                    <div className="flex items-center min-w-0">
                        <div className="flex-none">
                            <div className="avatar">
                                <img
                                    src={detailInfo?.avatarSrc}
                                    width="32"
                                    height="32"
                                    alt=""
                                    className="avatar__photo"
                                />
                            </div>
                        </div>

                        <div className="ml-16 min-w-0 truncate">
                            <a className="font-medium text-black block text-14 leading-md cursor-pointer">
                                <span className="block truncate">
                                    {detailInfo?.authorName}
                                </span>
                            </a>
                        </div>

                        <div className="flex-none leading-none ml-8">
                            <svg
                                className="icon text-14 text-grey-80"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path d="M512 256c0-37.7-23.7-69.9-57.1-82.4 14.7-32.4 8.8-71.9-17.9-98.6-26.7-26.7-66.2-32.6-98.6-17.9C325.9 23.7 293.7 0 256 0s-69.9 23.7-82.4 57.1c-32.4-14.7-72-8.8-98.6 17.9-26.7 26.7-32.6 66.2-17.9 98.6C23.7 186.1 0 218.3 0 256s23.7 69.9 57.1 82.4c-14.7 32.4-8.8 72 17.9 98.6 26.6 26.6 66.1 32.7 98.6 17.9 12.5 33.3 44.7 57.1 82.4 57.1s69.9-23.7 82.4-57.1c32.6 14.8 72 8.7 98.6-17.9 26.7-26.7 32.6-66.2 17.9-98.6 33.4-12.5 57.1-44.7 57.1-82.4zm-144.8-44.25L236.16 341.74c-4.31 4.28-11.28 4.25-15.55-.06l-75.72-76.33c-4.28-4.31-4.25-11.28.06-15.56l26.03-25.82c4.31-4.28 11.28-4.25 15.56.06l42.15 42.49 97.2-96.42c4.31-4.28 11.28-4.25 15.55.06l25.82 26.03c4.28 4.32 4.26 11.29-.06 15.56z"></path>
                            </svg>
                        </div>
                    </div>

                    <div className="ml-16 flex items-center flex-none text-12 leading-sm">
                        <time
                            dateTime="2022-06-07T13:46:45+00:00"
                            title="2022-06-07T13:46:45+00:00"
                        >
                            16h
                        </time>
                    </div>
                </div>
                {/* pc */}
                <div
                    className="flex-grow lg:overflow-y-scroll"
                    id="story-details"
                >
                    {detailInfo?.photoList?.length ? (
                        <PhotoViews list={detailInfo?.photoList || []} />
                    ) : null}

                    <div className="container md:max-w-552 py-16 md:py-32 lg:py-48 relative shadow-footer md:shadow-none">
                        <div className="flex lg:hidden items-center justify-between mb-16 lg:mb-24">
                            <div className="flex items-center text-12 leading-sm lg:text-14 lg:leading-md">
                                <div className="mr-8 text-grey-53">Day 23</div>

                                <time
                                    className="lg:hidden"
                                    dateTime={detailInfo?.date}
                                    title={detailInfo?.date}
                                >
                                    <span className="sm:hidden">
                                        {dayjs(detailInfo?.date).format(
                                            "YYYY/MM/DD",
                                        )}
                                    </span>

                                    <span className="hidden sm:block">
                                        {dayjs(detailInfo?.date).format(
                                            "YYYY/MM/DD",
                                        )}
                                    </span>
                                </time>
                            </div>

                            <div className="flex lg:hidden">
                                <div className="flex items-center -mx-8">
                                    <div className="px-8 leading-none">
                                        <button
                                            type="button"
                                            className="button-reset inline-flex align-top "
                                            data-controller="buttons--like"
                                            data-likeable="story:661007"
                                            data-action="buttons--like#toggle"
                                        >
                                            <span
                                                className="off"
                                                data-tooltip=""
                                                data-original-title="Like"
                                            >
                                                <svg
                                                    className="icon text-22 text-black"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 576 512"
                                                >
                                                    <path d="M403.7 24c-42.8 0-83.9 25.7-115.7 54.7C256.2 49.8 215.1 24 172.3 24 80.8 24 24 80.6 24 171.7c0 73.2 62.4 132.4 68.1 137.7l170.3 168.2c14.1 13.9 37.1 14 51.2 0l170.2-167.8.5-.5c15.9-15.5 67.7-71.1 67.7-137.6C552 80.6 495.2 24 403.7 24zm57.7 263L291.2 454.7c-1.8 1.8-4.5 1.8-6.3 0L114.3 286.4C85.8 259.6 56 214 56 171.7 56 98.2 98.4 56 172.3 56c45.1 0 85.4 37 115.7 67.4C303.8 107.6 351.7 56 403.7 56 477.6 56 520 98.2 520 171.7c0 42.4-28.2 85.2-58.6 115.3z"></path>
                                                </svg>
                                            </span>

                                            <span
                                                className="on"
                                                data-tooltip=""
                                                data-original-title="Liked"
                                            >
                                                <svg
                                                    className="icon text-22 text-red"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 576 512"
                                                >
                                                    <path d="M414.9 24C361.8 24 312 65.7 288 89.3 264 65.7 214.2 24 161.1 24 70.3 24 16 76.9 16 165.5c0 72.6 66.8 133.3 69.2 135.4l187 180.8c8.8 8.5 22.8 8.5 31.6 0l186.7-180.2c2.7-2.7 69.5-63.5 69.5-136C560 76.9 505.7 24 414.9 24z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>

                                    <div className="px-8 leading-none">
                                        <button
                                            type="button"
                                            className="button-reset inline-flex align-top "
                                            data-controller="buttons--favorite"
                                            data-favorite="661007"
                                            data-action="buttons--favorite#toggle"
                                        >
                                            <span
                                                className="off"
                                                data-tooltip=""
                                                data-original-title="Favorite"
                                            >
                                                <svg
                                                    className="icon text-22 text-black"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 576 512"
                                                >
                                                    <path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM405.8 317.9l27.8 162L288 403.5 142.5 480l27.8-162L52.5 203.1l162.7-23.6L288 32l72.8 147.5 162.7 23.6-117.7 114.8z"></path>
                                                </svg>
                                            </span>

                                            <span
                                                className="on"
                                                data-tooltip=""
                                                data-original-title="Favorited"
                                            >
                                                <svg
                                                    className="icon text-22 text-yellow-95"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 576 512"
                                                >
                                                    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>

                                    <div className="px-8 leading-none">
                                        <button
                                            type="button"
                                            className="button-reset inline-flex align-top is-active"
                                            data-action="click->story-galleries#toggle"
                                            data-target="story-galleries.trigger"
                                        >
                                            <span
                                                className="off"
                                                data-tooltip=""
                                                data-original-title="Save to gallery"
                                            >
                                                <svg
                                                    className="icon text-22 text-black"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 576 512"
                                                >
                                                    <path d="M527.95 224H480v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h385.057c28.068 0 54.135-14.733 68.599-38.84l67.453-112.464C588.24 264.812 565.285 224 527.95 224zM48 96h146.745l64 64H432c8.837 0 16 7.163 16 16v48H171.177c-28.068 0-54.135 14.733-68.599 38.84L32 380.47V112c0-8.837 7.163-16 16-16zm493.695 184.232l-67.479 112.464A47.997 47.997 0 0 1 433.057 416H44.823l82.017-136.696A48 48 0 0 1 168 256h359.975c12.437 0 20.119 13.568 13.72 24.232z"></path>
                                                </svg>
                                            </span>

                                            <span
                                                className="on"
                                                data-tooltip=""
                                                data-original-title="Saved"
                                            >
                                                <svg
                                                    className="icon text-22 text-green-75"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 576 512"
                                                >
                                                    <path d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>

                                    <div className="px-8 leading-none">
                                        <button
                                            type="button"
                                            className="button-reset inline-flex align-top"
                                            data-action="click->translations#toggle"
                                            data-translatable="story:661007"
                                        >
                                            <span
                                                className="off"
                                                data-tooltip=""
                                                data-original-title="Translate"
                                            >
                                                <svg
                                                    className="icon text-22 text-black"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 496 512"
                                                >
                                                    <path d="M248 8C111.04 8 0 119.03 0 256s111.04 248 248 248 248-111.03 248-248S384.96 8 248 8zm0 32c18.88 0 37.09 2.68 54.55 7.25l-51.93 43.78c-7.12 4.72-11.19 12.94-10.69 21.44.53 8.53 5.62 16.19 13.25 20.02l10.81 5.41v64.19c-1.75-.55-3.56-.88-5.44-.94-7.12 0-14.47 3.56-18.25 9.91L222.62 240c-8.53 0-16.59 3.33-22.62 9.38l-5.66 5.66c-4.53 4.53-7.03 10.56-7.03 16.97s2.5 12.44 7.03 16.97l5.66 5.66V304h-22.12l-22.59-45.23a23.997 23.997 0 0 0-17.66-12.95c-7.38-1.23-15.38 1.28-20.78 6.72L97.38 272H32.81c-.39-5.3-.81-10.6-.81-16 0-119.1 96.9-216 216-216zM37.56 304h59.81c8.53 0 16.59-3.33 22.62-9.38l11.62-11.61 17.62 35.31c5.47 10.91 16.44 17.67 28.62 17.67H200c17.66 0 32-14.36 32-32v-9.38c0-8.34-3.34-16.53-9.22-22.47l.16-.16c11.19 0 21.72-5.97 27.44-15.53l10.84-18.06c3.16 1.03 6.75 1.59 10.78 1.59 13.22 0 24-10.77 24-24v-78.11c0-12.16-6.72-23.09-17.56-28.56l59.07-49.67C412.01 93.76 464 168.84 464 256c0 22.71-3.57 44.58-10.09 65.16-1.32-1.77-2.38-3.7-3.96-5.29l-4.88-4.88V308c0-19.85-16.15-36-36-36H403c-5.5 0-10.79 1.27-15.55 3.57a40.04 40.04 0 0 0-16.56-3.57H358.8c-8.37 0-16.39 2.57-23.21 7.42l-23.72 16.9-38.25 15.14c-15.28 6.11-25.14 20.69-25.14 37.14v10.21c0 10.68 4.16 20.73 11.71 28.28L272.11 399c9.06 9.06 21.12 14.06 33.94 14.06h10.34c3.92 0 7.84-.48 11.64-1.43l18.39-4.6 10.91 10.91c5.38 5.38 11.89 9.13 18.93 11.45C340.34 456.03 296.06 472 248 472c-102.59 0-188.53-71.95-210.44-168zM409 399.49c-.87.14-1.68.51-2.57.51h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.78 26.78 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a8.05 8.05 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.17 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v18.75A216.64 216.64 0 0 1 409 399.49z"></path>
                                                </svg>
                                            </span>

                                            <span
                                                className="on"
                                                data-tooltip=""
                                                data-original-title="Translated"
                                            >
                                                <svg
                                                    className="icon text-22 text-accent"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 496 512"
                                                >
                                                    <path d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm-11.34 240.23c-2.89 4.82-8.1 7.77-13.72 7.77h-.31c-4.24 0-8.31 1.69-11.31 4.69l-5.66 5.66c-3.12 3.12-3.12 8.19 0 11.31l5.66 5.66c3 3 4.69 7.07 4.69 11.31V304c0 8.84-7.16 16-16 16h-6.11c-6.06 0-11.6-3.42-14.31-8.85l-22.62-45.23c-2.44-4.88-8.95-5.94-12.81-2.08l-19.47 19.46c-3 3-7.07 4.69-11.31 4.69H50.81C49.12 277.55 48 266.92 48 256c0-110.28 89.72-200 200-200 21.51 0 42.2 3.51 61.63 9.82l-50.16 38.53c-5.11 3.41-4.63 11.06.86 13.81l10.83 5.41c5.42 2.71 8.84 8.25 8.84 14.31V216c0 4.42-3.58 8-8 8h-3.06c-3.03 0-5.8-1.71-7.15-4.42-1.56-3.12-5.96-3.29-7.76-.3l-17.37 28.95zM408 358.43c0 4.24-1.69 8.31-4.69 11.31l-9.57 9.57c-3 3-7.07 4.69-11.31 4.69h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.767 26.767 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a7.978 7.978 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.18 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v24.6z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>

                                    <div
                                        className="pl-12 pr-8 leading-none lg:hidden relative"
                                        data-controller="dropdown"
                                        data-dropdown-placement="bottom-end"
                                    >
                                        <Menu
                                            items={[
                                                {
                                                    label: t("common.follow"),
                                                    value: "follow",
                                                },
                                            ]}
                                            align="right"
                                            visible={showMenu}
                                            value={"follow"}
                                            onChange={() => {
                                                console.log("onChange");
                                            }}
                                        >
                                            <button
                                                type="button"
                                                className="inline-flex button-reset align-top"
                                                onClick={() => toggleMenu()}
                                            >
                                                <svg
                                                    className="icon text-24 text-black"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 64 512"
                                                >
                                                    <path d="M32 224c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM0 136c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32zm0 240c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32z"></path>
                                                </svg>
                                            </button>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 图片标题 */}
                        <div className="font-medium text-black mb-8 md:mb-16 ">
                            <h1
                                className="story__title text-14 md:text-16 lg:text-18 leading-normal"
                                data-target="translations.title"
                            >
                                {detailInfo?.title}
                            </h1>
                        </div>

                        {/* 图片详情 */}
                        <div
                            className="wysiwyg wysiwyg--story mb-8 sm:mb-16"
                            data-target="translations.body"
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: detailInfo?.descriptionBody || "",
                                }}
                            />
                            <p>
                                {detailInfo?.linkTags?.length
                                    ? detailInfo?.linkTags.map((tag) => (
                                          <a
                                              className="autolink notranslate autolink--tag mr-1"
                                              href={tag.link}
                                              key={tag.name}
                                          >
                                              {tag.name}
                                          </a>
                                      ))
                                    : null}
                            </p>
                        </div>

                        {/* 图片扩展信息 */}
                        <div className="flex  flex-wrap -mx-8 text-12 leading-sm lg:text-14 lg:leading-md">
                            <div className="flex items-center px-8">
                                <svg
                                    className="icon text-14 lg:text-16 mr-8"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 496 512"
                                >
                                    <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 464c-119.1 0-216-96.9-216-216S128.9 40 248 40s216 96.9 216 216-96.9 216-216 216zm90.2-146.2C315.8 352.6 282.9 368 248 368s-67.8-15.4-90.2-42.2c-5.7-6.8-15.8-7.7-22.5-2-6.8 5.7-7.7 15.7-2 22.5C161.7 380.4 203.6 400 248 400s86.3-19.6 114.8-53.8c5.7-6.8 4.8-16.9-2-22.5-6.8-5.6-16.9-4.7-22.6 2.1zM168 240c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z"></path>
                                </svg>
                                <span>
                                    {detailInfo?.mood &&
                                        MoodEnum?.[detailInfo?.mood]?.text}
                                </span>
                            </div>

                            <div className="flex items-center px-8">
                                <svg
                                    className="icon text-14 lg:text-16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path d="M192 96c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64zm0-256C85.961 0 0 85.961 0 192c0 77.413 26.97 99.031 172.268 309.67 9.534 13.772 29.929 13.774 39.465 0C357.03 291.031 384 269.413 384 192 384 85.961 298.039 0 192 0zm0 473.931C52.705 272.488 32 256.494 32 192c0-42.738 16.643-82.917 46.863-113.137S149.262 32 192 32s82.917 16.643 113.137 46.863S352 149.262 352 192c0 64.49-20.692 80.47-160 281.931z"></path>
                                </svg>
                                <a
                                    className="text-inherit ml-8 cursor-pointer"
                                    onClick={() =>
                                        console.log(
                                            "location-->",
                                            detailInfo?.location?.value,
                                        )
                                    }
                                >
                                    <span className="block lg:truncate lg:max-w-200">
                                        {detailInfo?.location?.name}
                                    </span>
                                </a>
                            </div>

                            <div className="flex items-center px-8">
                                <svg
                                    className="icon text-14 lg:text-16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                >
                                    <path d="M569.354 231.631C512.969 135.948 407.808 72 288 72 168.14 72 63.004 135.994 6.646 231.63a47.999 47.999 0 0 0 0 48.739C63.032 376.053 168.192 440 288 440c119.86 0 224.996-63.994 281.354-159.631a48.002 48.002 0 0 0 0-48.738zM416 228c0 68.483-57.308 124-128 124s-128-55.517-128-124 57.308-124 128-124 128 55.517 128 124zm125.784 36.123C489.837 352.277 393.865 408 288 408c-106.291 0-202.061-56.105-253.784-143.876a16.006 16.006 0 0 1 0-16.247c29.072-49.333 73.341-90.435 127.66-115.887C140.845 158.191 128 191.568 128 228c0 85.818 71.221 156 160 156 88.77 0 160-70.178 160-156 0-36.411-12.833-69.794-33.875-96.01 53.76 25.189 98.274 66.021 127.66 115.887a16.006 16.006 0 0 1-.001 16.246zM224 224c0-10.897 2.727-21.156 7.53-30.137v.02c0 14.554 11.799 26.353 26.353 26.353 14.554 0 26.353-11.799 26.353-26.353s-11.799-26.353-26.353-26.353h-.02c8.981-4.803 19.24-7.53 30.137-7.53 35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64z"></path>
                                </svg>
                                <span className="ml-8">{detailInfo?.view}</span>
                            </div>
                        </div>

                        {/* 画廊状态 */}
                        <div className="hidden lg:block">
                            {detailInfo?.galleries?.length ? (
                                <div className="mt-24 md:mt-48">
                                    <div className="text-14 leading-md lg:text-18 lg:leading-sm text-black font-medium mb-16 md:mb-24">
                                        {t("common.featuredIn")}&nbsp;
                                        <a
                                            href="https://tookapic.com/photos/661007/galleries"
                                            className="text-black underline hover:no-underline"
                                        >
                                            {detailInfo?.galleries?.length}
                                            {t("common.gallery")}
                                        </a>
                                    </div>

                                    <div className="gallery-list-fade">
                                        <div className="-mx-16 px-16 md:-mx-32 md:px-32 overflow-x-auto hide-scrollbar">
                                            <div className="gallery-list flex items-start -mx-8 lg:-mx-12">
                                                <div className="group flex-none w-280 lg:w-288 px-8 lg:px-12 ">
                                                    <div className="relative">
                                                        <div className="flex overflow-hidden rounded">
                                                            <div
                                                                className="flex-grow relative overflow-hidden min-w-0 w-2/3 "
                                                                style={{
                                                                    background:
                                                                        "#CCC8BC",
                                                                }}
                                                            >
                                                                <img
                                                                    src="https://cdn.tookapic.com/photos/2020/125/p/u/puIvsIa9F7qL1yGo3T2YFa7oIzbvgQjpEdnYzzbs.jpeg?dpr=2&amp;fit=crop-center&amp;h=380&amp;q=80&amp;w=570&amp;s=eb54efd691307478c41fe7cf6f0b1921"
                                                                    width="570"
                                                                    height="380"
                                                                    alt=""
                                                                    className="gallery-list__photo is-loaded"
                                                                />
                                                            </div>

                                                            <div className="flex flex-col ml-2 -my-1 flex-none w-1/3">
                                                                <div
                                                                    className="my-1 relative overflow-hidden "
                                                                    style={{
                                                                        background:
                                                                            "#CE9663",
                                                                    }}
                                                                >
                                                                    <img
                                                                        src="https://cdn.tookapic.com/photos/2020/130/o/l/olfqZ3RuXzg2MoP7cXW7WHOUjBfZ1M3pZZnciOYG.jpeg?dpr=2&amp;fit=crop-center&amp;h=135&amp;q=85&amp;sharp=3&amp;w=180&amp;s=1d177612a2e85a0eaa39640291b3c37e"
                                                                        width="180"
                                                                        height="135"
                                                                        alt=""
                                                                        className="gallery-list__photo is-loaded"
                                                                    />
                                                                    <PlaceholderSvg
                                                                        width={
                                                                            87
                                                                        }
                                                                        height={
                                                                            87
                                                                        }
                                                                        className="block w-full h-auto"
                                                                    />
                                                                </div>

                                                                <div
                                                                    className="my-1 relative overflow-hidden "
                                                                    style={{
                                                                        background:
                                                                            "#9D886E",
                                                                    }}
                                                                >
                                                                    <img
                                                                        src="https://cdn.tookapic.com/photos/2020/134/D/q/DqPFP50cX9E9BFAM3ioshSxe3SPohMh47HDVN4jf.jpeg?dpr=2&amp;fit=crop-center&amp;h=135&amp;q=85&amp;sharp=3&amp;w=180&amp;s=66e751ca12a20cdf2c26f287cf238805"
                                                                        width="180"
                                                                        height="135"
                                                                        alt=""
                                                                        className="gallery-list__photo is-loaded"
                                                                    />

                                                                    <img
                                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'87' height%3D'87'%2F%3E"
                                                                        width="87"
                                                                        height="87"
                                                                        alt=""
                                                                        className="block w-full h-auto"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <a
                                                                href="https://tookapic.com/galleries/2209-sunrise"
                                                                className="absolute pin z-10"
                                                            ></a>
                                                        </div>

                                                        <div className="absolute pin-t pin-x z-20 pointer-events-none p-8 flex justify-between items-center">
                                                            <div className="pointer-events-auto">
                                                                <button
                                                                    type="button"
                                                                    className="follow inline-flex button-reset align-top is-public "
                                                                >
                                                                    <span className="off">
                                                                        <svg
                                                                            className="icon text-accent text-18"
                                                                            viewBox="0 0 512 512"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path
                                                                                d="m214.31509 420.68953c-3.42241-3.42241-4.02806-12.6723-4.02806-61.51953v-57.49145h-57.49145c-48.84723 0-58.097122-.60565-61.519534-4.02806-3.29834-3.29834-4.028063-10.88849-4.028063-41.8974 0-33.4318.549292-38.36643 4.687639-42.11157 4.065186-3.67896 12.234008-4.24226 61.519518-4.24226h56.83189v-57.52921c0-70.903276-3.84564-65.50984 46.70999-65.50984 48.93735 0 45.5693-4.925858 45.5693 66.64615v56.3929h56.3929c71.57202 0 66.64615-3.36805 66.64615 45.5693 0 50.55562 5.39343 46.70999-65.50984 46.70999h-57.52921v57.27727c0 52.23391-.41275 57.65081-4.68764 61.51953-6.769 6.12585-77.47069 6.30707-83.56359.21429z"
                                                                                fill="#fff"
                                                                                strokeWidth="2.563313"
                                                                            ></path>
                                                                            <path d="m256 8c-137 0-248 111-248 248s111 248 248 248 248-111 248-248-111-248-248-248zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12z"></path>
                                                                        </svg>
                                                                    </span>

                                                                    <span className="on on--private">
                                                                        <svg
                                                                            className="icon text-grey-80 text-18"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 512 512"
                                                                        >
                                                                            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm57.1 350.1L224.9 294c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v137.7l63.5 46.2c5.4 3.9 6.5 11.4 2.6 16.8l-28.2 38.8c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
                                                                        </svg>
                                                                    </span>

                                                                    <span className="on on--public">
                                                                        <svg
                                                                            className="icon text-green-75 text-18"
                                                                            viewBox="0 0 512 512"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path
                                                                                d="m137.37347 341.68837c-61.398927-67.00619-70.285904-77.86224-70.285904-85.85897 0-7.46969 3.714494-13.08264 20.18636-30.5035 13.119014-13.8748 22.378734-21.34932 26.448424-21.34932 4.45998 0 20.07738 14.98454 54.26982 52.0707l48.00783 52.07072 96.87101-105.70341c53.27906-58.13688 98.95974-106.429677 101.51259-107.317311 7.22473-2.512032 18.52954 5.409361 35.63055 24.966691 11.44968 13.09424 15.69932 20.20982 15.69932 26.28689 0 7.01206-19.14068 29.22924-120.77502 140.18746-105.9593 115.67993-121.78731 131.85484-129.02706 131.85484-7.1497 0-17.64092-10.24636-78.53792-76.70479z"
                                                                                fill="#fff"
                                                                                strokeWidth="2.851473"
                                                                            ></path>
                                                                            <path d="m504 256c0 136.967-111.033 248-248 248s-248-111.033-248-248 111.033-248 248-248 248 111.033 248 248zm-276.686 131.314 184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0l-150.059 150.058-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                                                        </svg>
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center mt-10 lg:mt-8 text-black">
                                                        <a
                                                            href="https://tookapic.com/galleries/2209-sunrise"
                                                            className="block text-inherit font-medium truncate min-w-0 text-14 lg:text-16"
                                                            data-target="gallery.title"
                                                        >
                                                            Sunrise
                                                        </a>

                                                        <span
                                                            className="hidden ml-8 -mt-2 text-black"
                                                            data-target="gallery.private"
                                                            data-tooltip=""
                                                            data-original-title="Private"
                                                        >
                                                            <svg
                                                                className="icon text-12"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 448 512"
                                                            >
                                                                <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zM264 392c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48zm32-168H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                                                            </svg>
                                                        </span>
                                                    </div>

                                                    <div className="text-12 leading-sm truncate mt-2 lg:mt-1">
                                                        163 photos. Curated by
                                                        <a
                                                            href="https://tookapic.com/shadoke"
                                                            className="text-grey-53"
                                                            data-card=""
                                                            data-card-id="c332"
                                                        >
                                                            Iwona- shadoke
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-24 md:mt-48">
                                    <div className="text-14 leading-md lg:text-18 lg:leading-sm text-black font-medium mb-8">
                                        {t("common.noFeatured")}
                                    </div>

                                    <a className="text-14 lg:text-16 cursor-pointer">
                                        {t("common.savePhoto")}
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* 相机信息 */}
                        <div className="hidden lg:block mt-48">
                            <div className="text-14 leading-md lg:text-18 lg:leading-sm text-black font-medium mb-16 lg:mb-24">
                                {t("common.exif")}
                            </div>

                            <div className="flex flex-wrap -mx-8 -my-8 lg:-my-12 break-words">
                                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                    <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                        {t("common.brand")}
                                    </div>

                                    <div className="text-14 lg:text-16 text-black">
                                        {detailInfo?.exifData?.brand}
                                    </div>
                                </div>

                                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                    <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                        {t("common.model")}
                                    </div>

                                    <div className="text-14 lg:text-16 text-black">
                                        {detailInfo?.exifData?.model}
                                    </div>
                                </div>

                                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                    <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                        {t("common.aperture")}
                                    </div>

                                    <div className="text-14 lg:text-16 text-black">
                                        {detailInfo?.exifData?.aperture}
                                    </div>
                                </div>

                                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                    <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                        {t("common.focalLength")}
                                    </div>

                                    <div className="text-14 lg:text-16 text-black">
                                        {detailInfo?.exifData?.focalLength}
                                    </div>
                                </div>

                                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                    <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                        {t("common.shutterSpeed")}
                                    </div>

                                    <div className="text-14 lg:text-16 text-black">
                                        {detailInfo?.exifData?.shutterSpeed}
                                    </div>
                                </div>

                                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                    <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                        ISO
                                    </div>

                                    <div className="text-14 lg:text-16 text-black">
                                        {detailInfo?.exifData?.iso}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 评论 底部内容 区 */}
                <div className="flex-none lg:w-384 lg:flex flex-col lg:overflow-hidden">
                    <div
                        className="flex-none relative p-16 md:p-24 story__meta z-1 hidden lg:block"
                        data-target="story.meta"
                    >
                        <div className="flex items-center">
                            <div className="flex-none">
                                <div className="avatar">
                                    <img
                                        src={detailInfo?.avatarSrc}
                                        width="48"
                                        height="48"
                                        alt=""
                                        className="avatar__photo is-loaded"
                                    />
                                </div>
                            </div>

                            <div className="ml-16 flex-grow min-w-0">
                                <div className="flex items-center">
                                    <div className="text-16 min-w-0">
                                        <a
                                            href={`/${detailInfo?.authorId}`}
                                            className="text-black font-medium block truncate"
                                        >
                                            <span className="block">
                                                {detailInfo?.authorName}
                                            </span>
                                        </a>
                                    </div>

                                    <div
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
                                    </div>
                                </div>

                                <div className="text-14 leading-md truncate">
                                    <time
                                        dateTime="2022-06-07T13:46:45+00:00"
                                        title="2022-06-07T13:46:45+00:00"
                                    >
                                        {t("common.published")} 16 小时前
                                    </time>
                                </div>
                            </div>
                        </div>

                        {/* 评论按钮区 */}
                        <div className="flex items-center justify-between mt-24 -mb-4">
                            <div className="flex items-center -mx-8">
                                <div className="px-8 leading-none">
                                    <button
                                        type="button"
                                        className="button-reset inline-flex align-top "
                                    >
                                        <span className="off">
                                            <Icon
                                                className="icon-like"
                                                addClassName="text-black text-22"
                                            />
                                        </span>

                                        <span className="on">
                                            <Icon
                                                className="icon-likefill"
                                                addClassName="text-red text-22"
                                            />
                                        </span>
                                    </button>
                                </div>

                                <div className="px-8 leading-none">
                                    <button
                                        type="button"
                                        className="button-reset inline-flex align-top "
                                    >
                                        <span className="off">
                                            <Icon
                                                className="icon-favor"
                                                addClassName="text-black text-22"
                                            />
                                        </span>

                                        <span className="on">
                                            <Icon
                                                className="icon-favorfill"
                                                addClassName="text-yellow-400 text-22"
                                            />
                                        </span>
                                    </button>
                                </div>

                                <div className="px-8 leading-none">
                                    <button
                                        type="button"
                                        className="button-reset inline-flex align-top is-active"
                                        data-action="click->story-galleries#toggle"
                                        data-target="story-galleries.trigger"
                                    >
                                        <span
                                            className="off"
                                            data-tooltip=""
                                            data-original-title="Save to gallery"
                                        >
                                            <svg
                                                className="icon text-22 text-black"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 576 512"
                                            >
                                                <path d="M527.95 224H480v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h385.057c28.068 0 54.135-14.733 68.599-38.84l67.453-112.464C588.24 264.812 565.285 224 527.95 224zM48 96h146.745l64 64H432c8.837 0 16 7.163 16 16v48H171.177c-28.068 0-54.135 14.733-68.599 38.84L32 380.47V112c0-8.837 7.163-16 16-16zm493.695 184.232l-67.479 112.464A47.997 47.997 0 0 1 433.057 416H44.823l82.017-136.696A48 48 0 0 1 168 256h359.975c12.437 0 20.119 13.568 13.72 24.232z"></path>
                                            </svg>
                                        </span>

                                        <span
                                            className="on"
                                            data-tooltip=""
                                            data-original-title="Saved"
                                        >
                                            <svg
                                                className="icon text-22 text-green-75"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 576 512"
                                            >
                                                <path d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>

                                <div className="px-8 leading-none">
                                    <button
                                        type="button"
                                        className="button-reset inline-flex align-top"
                                        data-action="click->translations#toggle"
                                        data-translatable="story:661007"
                                    >
                                        <span
                                            className="off"
                                            data-tooltip=""
                                            data-original-title="Translate"
                                        >
                                            <svg
                                                className="icon text-22 text-black"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 496 512"
                                            >
                                                <path d="M248 8C111.04 8 0 119.03 0 256s111.04 248 248 248 248-111.03 248-248S384.96 8 248 8zm0 32c18.88 0 37.09 2.68 54.55 7.25l-51.93 43.78c-7.12 4.72-11.19 12.94-10.69 21.44.53 8.53 5.62 16.19 13.25 20.02l10.81 5.41v64.19c-1.75-.55-3.56-.88-5.44-.94-7.12 0-14.47 3.56-18.25 9.91L222.62 240c-8.53 0-16.59 3.33-22.62 9.38l-5.66 5.66c-4.53 4.53-7.03 10.56-7.03 16.97s2.5 12.44 7.03 16.97l5.66 5.66V304h-22.12l-22.59-45.23a23.997 23.997 0 0 0-17.66-12.95c-7.38-1.23-15.38 1.28-20.78 6.72L97.38 272H32.81c-.39-5.3-.81-10.6-.81-16 0-119.1 96.9-216 216-216zM37.56 304h59.81c8.53 0 16.59-3.33 22.62-9.38l11.62-11.61 17.62 35.31c5.47 10.91 16.44 17.67 28.62 17.67H200c17.66 0 32-14.36 32-32v-9.38c0-8.34-3.34-16.53-9.22-22.47l.16-.16c11.19 0 21.72-5.97 27.44-15.53l10.84-18.06c3.16 1.03 6.75 1.59 10.78 1.59 13.22 0 24-10.77 24-24v-78.11c0-12.16-6.72-23.09-17.56-28.56l59.07-49.67C412.01 93.76 464 168.84 464 256c0 22.71-3.57 44.58-10.09 65.16-1.32-1.77-2.38-3.7-3.96-5.29l-4.88-4.88V308c0-19.85-16.15-36-36-36H403c-5.5 0-10.79 1.27-15.55 3.57a40.04 40.04 0 0 0-16.56-3.57H358.8c-8.37 0-16.39 2.57-23.21 7.42l-23.72 16.9-38.25 15.14c-15.28 6.11-25.14 20.69-25.14 37.14v10.21c0 10.68 4.16 20.73 11.71 28.28L272.11 399c9.06 9.06 21.12 14.06 33.94 14.06h10.34c3.92 0 7.84-.48 11.64-1.43l18.39-4.6 10.91 10.91c5.38 5.38 11.89 9.13 18.93 11.45C340.34 456.03 296.06 472 248 472c-102.59 0-188.53-71.95-210.44-168zM409 399.49c-.87.14-1.68.51-2.57.51h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.78 26.78 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a8.05 8.05 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.17 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v18.75A216.64 216.64 0 0 1 409 399.49z"></path>
                                            </svg>
                                        </span>

                                        <span
                                            className="on"
                                            data-tooltip=""
                                            data-original-title="Translated"
                                        >
                                            <svg
                                                className="icon text-22 text-accent"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 496 512"
                                            >
                                                <path d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm-11.34 240.23c-2.89 4.82-8.1 7.77-13.72 7.77h-.31c-4.24 0-8.31 1.69-11.31 4.69l-5.66 5.66c-3.12 3.12-3.12 8.19 0 11.31l5.66 5.66c3 3 4.69 7.07 4.69 11.31V304c0 8.84-7.16 16-16 16h-6.11c-6.06 0-11.6-3.42-14.31-8.85l-22.62-45.23c-2.44-4.88-8.95-5.94-12.81-2.08l-19.47 19.46c-3 3-7.07 4.69-11.31 4.69H50.81C49.12 277.55 48 266.92 48 256c0-110.28 89.72-200 200-200 21.51 0 42.2 3.51 61.63 9.82l-50.16 38.53c-5.11 3.41-4.63 11.06.86 13.81l10.83 5.41c5.42 2.71 8.84 8.25 8.84 14.31V216c0 4.42-3.58 8-8 8h-3.06c-3.03 0-5.8-1.71-7.15-4.42-1.56-3.12-5.96-3.29-7.76-.3l-17.37 28.95zM408 358.43c0 4.24-1.69 8.31-4.69 11.31l-9.57 9.57c-3 3-7.07 4.69-11.31 4.69h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.767 26.767 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a7.978 7.978 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.18 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v24.6z"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>

                                <div
                                    className="pl-12 pr-8 leading-none lg:hidden"
                                    data-controller="dropdown"
                                    data-dropdown-placement="bottom-end"
                                >
                                    <button
                                        type="button"
                                        className="inline-flex button-reset align-top"
                                        data-target="dropdown.trigger"
                                        data-action="dropdown#toggle"
                                    >
                                        <svg
                                            className="icon text-24 text-black"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 64 512"
                                        >
                                            <path d="M32 224c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM0 136c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32zm0 240c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32z"></path>
                                        </svg>
                                    </button>

                                    <div
                                        className="absolute z-50 bg-black-95 rounded whitespace-no-wrap min-w-128 shadow-sm hidden"
                                        data-target="dropdown.menu"
                                        style={{
                                            position: "absolute",
                                            transform:
                                                "translate3d(0px, 5px, 0px)",
                                            top: "0px",
                                            left: "0px",
                                            willChange: "transform",
                                        }}
                                        x-out-of-boundaries=""
                                        x-placement="bottom-end"
                                    >
                                        <div className="flex flex-col text-left py-12 text-16 leading-lg">
                                            <button
                                                type="button"
                                                className="follow button-reset block w-full text-left px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-grey-53 hover:no-underline is-public "
                                                data-controller="buttons--follow"
                                                data-followable="user:34397"
                                                data-action="buttons--follow#toggle"
                                                data-followable-type="public"
                                            >
                                                <span className="off">
                                                    <span className="block">
                                                        Follow
                                                    </span>
                                                </span>

                                                <span className="on on--private">
                                                    <span className="block">
                                                        Pending
                                                    </span>
                                                </span>

                                                <span className="on on--public">
                                                    <span className="block">
                                                        Following
                                                    </span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-14 leading-none flex -mr-8 cursor-default">
                                <div className="flex items-center px-8">
                                    <svg
                                        className="icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512"
                                    >
                                        <path d="M569.354 231.631C512.969 135.948 407.808 72 288 72 168.14 72 63.004 135.994 6.646 231.63a47.999 47.999 0 0 0 0 48.739C63.032 376.053 168.192 440 288 440c119.86 0 224.996-63.994 281.354-159.631a48.002 48.002 0 0 0 0-48.738zM416 228c0 68.483-57.308 124-128 124s-128-55.517-128-124 57.308-124 128-124 128 55.517 128 124zm125.784 36.123C489.837 352.277 393.865 408 288 408c-106.291 0-202.061-56.105-253.784-143.876a16.006 16.006 0 0 1 0-16.247c29.072-49.333 73.341-90.435 127.66-115.887C140.845 158.191 128 191.568 128 228c0 85.818 71.221 156 160 156 88.77 0 160-70.178 160-156 0-36.411-12.833-69.794-33.875-96.01 53.76 25.189 98.274 66.021 127.66 115.887a16.006 16.006 0 0 1-.001 16.246zM224 224c0-10.897 2.727-21.156 7.53-30.137v.02c0 14.554 11.799 26.353 26.353 26.353 14.554 0 26.353-11.799 26.353-26.353s-11.799-26.353-26.353-26.353h-.02c8.981-4.803 19.24-7.53 30.137-7.53 35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64z"></path>
                                    </svg>
                                    <span className="ml-8">
                                        {detailInfo?.view}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 评论列表 */}
                    <Comments
                        className="bg-grey-99"
                        addClassName="p-16 md:p-24 md:px-32 lg:px-24"
                        list={commentList}
                    />

                    {/* mobile 底部区域 */}
                    <div className="p-16 md:p-32 lg:hidden">
                        <div className="text-14 leading-md lg:text-18 lg:leading-sm text-black font-medium mb-8">
                            {t("common.noFeatured")}
                        </div>

                        <a className="text-14 lg:text-16 cursor-pointer">
                            {t("common.savePhoto")}
                        </a>
                    </div>

                    {/* mobile 设备参数 */}
                    <div className="p-16 md:p-32 lg:hidden">
                        <div className="text-14 leading-md lg:text-18 lg:leading-sm text-black font-medium mb-16 lg:mb-24">
                            {t("common.exif")}
                        </div>

                        <div className="flex flex-wrap -mx-8 -my-8 lg:-my-12 break-words">
                            <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                    {t("common.brand")}
                                </div>

                                <div className="text-14 lg:text-16 text-black">
                                    {detailInfo?.exifData?.brand}
                                </div>
                            </div>

                            <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                    {t("common.model")}
                                </div>

                                <div className="text-14 lg:text-16 text-black">
                                    {detailInfo?.exifData?.model}
                                </div>
                            </div>

                            <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                    {t("common.aperture")}
                                </div>

                                <div className="text-14 lg:text-16 text-black">
                                    {detailInfo?.exifData?.aperture}
                                </div>
                            </div>

                            <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                    {t("common.focalLength")}
                                </div>

                                <div className="text-14 lg:text-16 text-black">
                                    {detailInfo?.exifData?.focalLength}
                                </div>
                            </div>

                            <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                    {t("common.shutterSpeed")}
                                </div>

                                <div className="text-14 lg:text-16 text-black">
                                    {detailInfo?.exifData?.shutterSpeed}
                                </div>
                            </div>

                            <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                                <div className="text-12 lg:text-14 leading-md lg:mb-8">
                                    ISO
                                </div>

                                <div className="text-14 lg:text-16 text-black">
                                    {detailInfo?.exifData?.iso}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
