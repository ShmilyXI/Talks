import Api from "@/service/index";
import { useRequest } from "ahooks";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PhotoList, Filter } from "@components";
import _ from "lodash";

type MilestoneItem = {
    avatarSrc: string;
    authorName: string;
    authorId: string;
    type: string;
    picCount?: number;
    level?: string;
};

const UserDetail = () => {
    const { data, error, loading }: any = useRequest(Api.getGalleryPhotoList);
    const {
        data: milestoneData,
        error: milestoneError,
        loading: milestoneLoading,
    }: any = useRequest(Api.getPhotoMilestoneList);
    const [milestoneList, setMilestoneList] = useState<MilestoneItem[]>(); // 里程碑列表

    useEffect(() => {
        setMilestoneList(milestoneData?.list || []);
    }, [milestoneData]);

    return (
        <div>
            {/* milestoneList */}
            <div
                className="container max-w-744 xl:min-w-744 xl:max-w-full pt-16 pb-24 grid:py-48 xl:py-80 flex justify-center"
                data-controller="profile"
            >
                <div className="grid:flex items-start relative w-full grid:w-auto">
                    <div className="flex-none relative w-80 grid:w-128">
                        <div className="avatar">
                            <img
                                src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'128' height%3D'128'%2F%3E"
                                width="128"
                                height="128"
                                alt=""
                                className="avatar__photo"
                                data-src="https://cdn.tookapic.com/avatars/2019/280/n/h/nhuOzlIWHNOIWCh16vaBXsFcaYXVvZUDs6GRfh2z.jpeg?fit=crop-center&amp;h=128&amp;q=85&amp;sharp=3&amp;w=128&amp;s=ed2ee5467a7079aa856048f1fd11c23e|https://cdn.tookapic.com/avatars/2019/280/n/h/nhuOzlIWHNOIWCh16vaBXsFcaYXVvZUDs6GRfh2z.jpeg?fit=crop-center&amp;h=144&amp;q=85&amp;sharp=3&amp;w=144&amp;s=d2dced7f92af9cff5481dd01a09e69ee"
                                data-target="lazyload.image"
                                data-default-src="https://tookapic.com/img/avatars/default.svg"
                            />
                        </div>

                        <div className="absolute flex flex-col items-end grid:items-start grid:flex-row pin-r pin-t grid:pin-b grid:pin-t-auto grid:pin-r-center h-80 grid:h-auto w-36 grid:w-108 -mr-16 grid:mr-0 grid:-mb-18 z-1">
                            <div className="flex-none grid:px-2 order-1 w-24 grid:w-36">
                                <a
                                    href="https://tookapic.com/badges"
                                    className="block"
                                    title="1K Photo Club"
                                    data-tooltip
                                >
                                    <img
                                        src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'32' height%3D'32'%2F%3E"
                                        width="32"
                                        height="32"
                                        alt=""
                                        className="block"
                                        data-src="https://tookapic.com/img/badges/1000-photo-club.svg"
                                        data-target="lazyload.image"
                                    />
                                </a>
                            </div>

                            <div className="flex-none pr-11 grid:px-2 grid:-mt-8 order-0 w-35 grid:w-36">
                                <a
                                    href="https://tookapic.com/badges"
                                    className="block"
                                    title="Last Call"
                                    data-tooltip
                                >
                                    <img
                                        src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'32' height%3D'32'%2F%3E"
                                        width="32"
                                        height="32"
                                        alt=""
                                        className="block"
                                        data-src="https://tookapic.com/img/badges/last-call.svg"
                                        data-target="lazyload.image"
                                    />
                                </a>
                            </div>

                            <div className="flex-none pr-11 grid:px-2 grid:-mt-8 order-2 w-35 grid:w-36">
                                <a
                                    href="https://tookapic.com/badges"
                                    className="block"
                                    title="Party Animal"
                                    data-tooltip
                                >
                                    <img
                                        src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'32' height%3D'32'%2F%3E"
                                        width="32"
                                        height="32"
                                        alt=""
                                        className="block"
                                        data-src="https://tookapic.com/img/badges/party-animal.svg"
                                        data-target="lazyload.image"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="grid:ml-24 md:ml-48 flex-grow mt-24 grid:mt-0 min-w-0">
                        <div className="flex items-center">
                            <h1 className="text-20 grid:text-28 lg:text-32 leading-xs break-words min-w-0">
                                Paweł Kadysz
                            </h1>

                            <div
                                className="flex-none leading-none ml-8 grid:ml-12"
                                title="Paying member"
                                data-tooltip
                            >
                                <svg
                                    className="icon text-16 grid:text-24 text-grey-80"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M512 256c0-37.7-23.7-69.9-57.1-82.4 14.7-32.4 8.8-71.9-17.9-98.6-26.7-26.7-66.2-32.6-98.6-17.9C325.9 23.7 293.7 0 256 0s-69.9 23.7-82.4 57.1c-32.4-14.7-72-8.8-98.6 17.9-26.7 26.7-32.6 66.2-17.9 98.6C23.7 186.1 0 218.3 0 256s23.7 69.9 57.1 82.4c-14.7 32.4-8.8 72 17.9 98.6 26.6 26.6 66.1 32.7 98.6 17.9 12.5 33.3 44.7 57.1 82.4 57.1s69.9-23.7 82.4-57.1c32.6 14.8 72 8.7 98.6-17.9 26.7-26.7 32.6-66.2 17.9-98.6 33.4-12.5 57.1-44.7 57.1-82.4zm-144.8-44.25L236.16 341.74c-4.31 4.28-11.28 4.25-15.55-.06l-75.72-76.33c-4.28-4.31-4.25-11.28.06-15.56l26.03-25.82c4.31-4.28 11.28-4.25 15.56.06l42.15 42.49 97.2-96.42c4.31-4.28 11.28-4.25 15.55.06l25.82 26.03c4.28 4.32 4.26 11.29-.06 15.56z" />
                                </svg>
                            </div>

                            <div className="ml-24 absolute pin-t pin-r grid:relative">
                                <div className="flex flex-col grid:flex-row items-end grid:items-center -my-4 grid:my-0 grid:-mx-4">
                                    <div className="py-4 grid:py-0 grid:px-4">
                                        <button
                                            type="button"
                                            className="follow button button--follow is-public"
                                            data-controller="buttons--follow"
                                            data-followable="user:1"
                                            data-action="buttons--follow#toggle"
                                            data-followable-type="public"
                                        >
                                            <span className="off">
                                                <span className="block">
                                                    Follow
                                                </span>
                                            </span>

                                            <span className="on on--private">
                                                <span className="block group-hover:hidden">
                                                    Pending
                                                </span>
                                                <span className="hidden group-hover:block">
                                                    Cancel
                                                </span>
                                            </span>

                                            <span className="on on--public">
                                                <span className="block group-hover:hidden">
                                                    Following
                                                </span>
                                                <span className="hidden group-hover:block">
                                                    Unfollow
                                                </span>
                                            </span>
                                        </button>
                                    </div>

                                    <div className="py-4 grid:py-0 grid:px-4">
                                        <button
                                            type="button"
                                            className="button button--secondary"
                                            data-controller="modal-trigger"
                                            data-selector="[data-modal='trial']"
                                        >
                                            Message
                                        </button>
                                    </div>

                                    <div
                                        className="py-4 grid:py-0 grid:px-4"
                                        data-controller="dropdown"
                                        data-dropdown-placement="bottom-end"
                                    >
                                        <button
                                            type="button"
                                            className="button-reset block leading-none"
                                            data-target="dropdown.trigger"
                                            data-action="dropdown#toggle"
                                        >
                                            <svg
                                                className="icon text-black text-22"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M482.696 299.276l-32.61-18.827a195.168 195.168 0 0 0 0-48.899l32.61-18.827c9.576-5.528 14.195-16.902 11.046-27.501-11.214-37.749-31.175-71.728-57.535-99.595-7.634-8.07-19.817-9.836-29.437-4.282l-32.562 18.798a194.125 194.125 0 0 0-42.339-24.48V38.049c0-11.13-7.652-20.804-18.484-23.367-37.644-8.909-77.118-8.91-114.77 0-10.831 2.563-18.484 12.236-18.484 23.367v37.614a194.101 194.101 0 0 0-42.339 24.48L105.23 81.345c-9.621-5.554-21.804-3.788-29.437 4.282-26.36 27.867-46.321 61.847-57.535 99.595-3.149 10.599 1.47 21.972 11.046 27.501l32.61 18.827a195.168 195.168 0 0 0 0 48.899l-32.61 18.827c-9.576 5.528-14.195 16.902-11.046 27.501 11.214 37.748 31.175 71.728 57.535 99.595 7.634 8.07 19.817 9.836 29.437 4.283l32.562-18.798a194.08 194.08 0 0 0 42.339 24.479v37.614c0 11.13 7.652 20.804 18.484 23.367 37.645 8.909 77.118 8.91 114.77 0 10.831-2.563 18.484-12.236 18.484-23.367v-37.614a194.138 194.138 0 0 0 42.339-24.479l32.562 18.798c9.62 5.554 21.803 3.788 29.437-4.283 26.36-27.867 46.321-61.847 57.535-99.595 3.149-10.599-1.47-21.972-11.046-27.501zm-65.479 100.461l-46.309-26.74c-26.988 23.071-36.559 28.876-71.039 41.059v53.479a217.145 217.145 0 0 1-87.738 0v-53.479c-33.621-11.879-43.355-17.395-71.039-41.059l-46.309 26.74c-19.71-22.09-34.689-47.989-43.929-75.958l46.329-26.74c-6.535-35.417-6.538-46.644 0-82.079l-46.329-26.74c9.24-27.969 24.22-53.869 43.929-75.969l46.309 26.76c27.377-23.434 37.063-29.065 71.039-41.069V44.464a216.79 216.79 0 0 1 87.738 0v53.479c33.978 12.005 43.665 17.637 71.039 41.069l46.309-26.76c19.709 22.099 34.689 47.999 43.929 75.969l-46.329 26.74c6.536 35.426 6.538 46.644 0 82.079l46.329 26.74c-9.24 27.968-24.219 53.868-43.929 75.957zM256 160c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z" />
                                            </svg>
                                        </button>

                                        <div
                                            className="absolute z-50 bg-black-95 rounded whitespace-no-wrap min-w-128 shadow-sm hidden"
                                            data-target="dropdown.menu"
                                        >
                                            <div className="flex flex-col text-left py-12 text-16 leading-lg">
                                                <button
                                                    type="button"
                                                    className="button-reset block w-full text-left px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white hover:no-underline"
                                                    data-controller="buttons--block"
                                                    data-action="click-&gt;buttons--block#toggle block:success-&gt;profile#refresh"
                                                    data-blockable="user:1"
                                                >
                                                    <span className="off">
                                                        Block
                                                    </span>

                                                    <span className="on">
                                                        Unblock
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid:mt-12 flex flex-wrap items-center -mx-8 text-14 grid:text-16">
                            <div className="flex items-center px-8">
                                <svg
                                    className="icon text-grey-90 mr-8 flex-none text-14"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                                </svg>
                                <a
                                    href="https://tookapic.com/places/poland/bialystok"
                                    className="text-grey-53"
                                >
                                    Białystok, Poland
                                </a>
                            </div>

                            <div className="flex items-center px-8">
                                <svg
                                    className="icon text-grey-90 mr-8 flex-none text-14"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" />
                                </svg>
                                <a
                                    href="http://tookapic.com"
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className="text-grey-53 min-w-0"
                                >
                                    tookapic.com
                                </a>
                            </div>
                        </div>

                        <div className="mt-8 grid:mt-16 text-grey-27 break-words text-14 grid:text-16 xl:max-w-568">
                            During my first 365 project I missed a community
                            focused around the idea of daily photo taking. So I
                            created one. That&#039;s how tookapic was born.
                            I&#039;m glad you&#039;re here! Welcome!
                        </div>

                        <div className="mt-8 grid:mt-16 flex flex-wrap -mx-8 text-14 grid:text-16">
                            <div className="px-8 whitespace-no-wrap">
                                <span className="mr-4">#7</span>
                                248/365
                            </div>

                            <div className="px-8 whitespace-no-wrap">
                                6 streak
                            </div>

                            <div className="px-8 whitespace-no-wrap">
                                <button
                                    type="button"
                                    className="block button-reset hover:underline"
                                    data-controller="modal-trigger"
                                    data-selector="[data-modal='relationships']"
                                >
                                    4K followers
                                </button>
                            </div>

                            <div className="px-8 whitespace-no-wrap hidden grid:block">
                                150.4K likes
                            </div>

                            <div className="px-8 whitespace-no-wrap hidden lg:block">
                                1.4M views
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container p-16 md:px-32 md:py-24">
                <div className="container p-0 flex items-center justify-between">
                    <div className="min-w-0 flex-grow mr-8">
                        <Filter
                            breakPoint="md"
                            items={[
                                { label: "Following", value: "1" },
                                { label: "Popular", value: "2" },
                                { label: "Recent", value: "3" },
                                { label: "Debuts", value: "4" },
                                { label: "Finishers", value: "5" },
                                { label: "Photos of the Day", value: "6" },
                                { label: "Favorites", value: "7" },
                                { label: "Liked", value: "8" },
                            ]}
                            onChange={(item) => {
                                console.log("item", item);
                            }}
                        />
                    </div>
                </div>
            </div>
            <PhotoList list={data?.list || []} />
        </div>
    );
};

export default UserDetail;
