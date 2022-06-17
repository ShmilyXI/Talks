import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import { Comments } from "@components";
import UnansweredTalks from "../UnansweredTalks";
import TopContributors from "../TopContributors";
import { CommentItem } from "@/pages/photoDetail";
import Api from "@/service";

type DetailInfo = {
    title: string;
    avatarSrc: string;
    authorId: string;
    authorName: string;
    date: string;
    content: string;
    commentList: CommentItem[];
};
const Detail = () => {
    const router = useRouter();
    const [detailInfo, setDetailInfo] = useState<DetailInfo>();
    const { data, error, loading }: any = useRequest(Api.getTalkDetailInfo);

    useEffect(() => {
        console.log('data', data)
        setDetailInfo(data?.data);
    }, [data]);

    // 路由跳转
    const goRoute = (path: string) => {
        router.push(path);
    };

    return (
        <div className="container max-w-1128 px-16">
            <div className="lg:flex lg:-mx-12">
                <div className="lg:px-12 lg:w-3/4">
                    <div className="lg:max-w-744 md:pl-16">
                        <div>
                            <div className="pt-16 pb-8 sm:py-24 md:py-32 lg:py-48">
                                <h1 className="text-24 md:text-28 lg:text-32 leading-xs break-words">
                                    {detailInfo?.title}
                                </h1>

                                <div className="mt-16 md:mt-24">
                                    <div className="flex flex-wrap -mx-10 md:-mx-12 text-14 md:text-16">
                                        <div className="px-10 md:px-12">
                                            <a
                                                href="/talks"
                                                className="block text-accent"
                                            >
                                                Back to Talks
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-16 sm:pt-0 md:pb-24 lg:pb-32 xl:pb-48">
                                <div className="md:pl-72 relative">
                                    <div className="flex items-center md:items-start">
                                        <div className="flex-none mr-16 md:mr-0">
                                            <div className="avatar md:absolute md:pin-t md:pin-l">
                                                <img
                                                    src={detailInfo?.avatarSrc}
                                                    width="48"
                                                    height="48"
                                                    alt=""
                                                    className="avatar__photo is-loaded"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:items-center flex-grow min-w-0">
                                            <div className="min-w-0 font-medium">
                                                <a
                                                    className="text-black block truncate cursor-pointer"
                                                    onClick={() =>
                                                        goRoute(
                                                            `/userDetail?pid=${detailInfo?.authorId}`,
                                                        )
                                                    }
                                                >
                                                    {detailInfo?.authorName}
                                                </a>
                                            </div>

                                            <div className="flex-none whitespace-no-wrap text-12 md:ml-8">
                                                <time
                                                    dateTime={detailInfo?.date}
                                                    title={detailInfo?.date}
                                                >
                                                    {/* 4 weeks ago */}
                                                    {dayjs(
                                                        detailInfo?.date,
                                                    ).format("YYYY/MM/DD")}
                                                </time>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="wysiwyg md:text-16 md:leading-normal lg:max-w-672 mt-16 md:mt-8">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    detailInfo?.content || "",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="bg-white mt-32">
                                    <div
                                        className="bg-inherit flex w-full"
                                        id="comments"
                                    >
                                        <div className="bg-inherit w-full ">
                                            <div className="text-18 leading-sm text-black font-medium mb-8">
                                                {
                                                    detailInfo?.commentList
                                                        ?.length
                                                }
                                                comments
                                            </div>

                                            <Comments
                                                addClassName="pt-16 md:pt-16"
                                                list={
                                                    detailInfo?.commentList ||
                                                    []
                                                }
                                            />
                                        </div>

                                        <div
                                            className="w-full self-start hidden"
                                            data-target="comments.blank"
                                        >
                                            <div className="rounded-6 bg-grey-96 text-grey-53 text-center p-64 md:py-128 lg:py-160">
                                                <div className="text-14 leading-md">
                                                    No comments
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-16 pt-32 sm:py-24 md:py-32 lg:py-48 lg:px-12 lg:w-1/4">
                    <div className="lg:sticky pin-t-16">
                        <TopContributors />
                        <UnansweredTalks />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
