import classnames from "classnames";
import React, { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import Api from "@/service/index";
import Filter from "../../../components/Filter";
import Icon from "@components/Icon";
import { useRouter } from "next/router";

type articleItem = {
  avatar: string;
  avatarLink: string;
  tag: string;
  title: string;
  author: string;
  authorId: string;
  authorLink: string;
  date: string;
  answerCount: number;
  answerList: { avatar: string; authorId: string }[];
};

const Index = () => {
  const router = useRouter();
  const { data, error, loading }: any = useRequest(Api.getArticleLatestList);
  const [articleList, setArticleList] = useState<articleItem[]>(); // 文章列表
  useEffect(() => {
    setArticleList(data?.list || []);
  }, [data]);

  // 路由跳转
  const goRoute = (path: string) => {
    router.push(path);
  };

  return (
    <div className="lg:max-w-744 md:pl-16">
      <div className="-mx-16 md:-mx-0 p-16 md:px-0 md:py-32 lg:py-48 shadow-navbar md:shadow-none">
        <div className="flex items-center justify-center md:justify-start">
          <h1 className="mb-2 md:block md:mb-0  text-16 leading-normal sm:text-24 md:text-28 lg:text-32 sm:leading-xs">Talks</h1>
        </div>
        <Filter
          items={[
            { label: "活跃的", value: "active" },
            { label: "最近的", value: "recent" },
            { label: "未答复", value: "unanswered" },
            { label: "受欢迎的", value: "popular" },
            { label: "精选", value: "featured" },
          ]}
          menuClassName="mt-24"
          selectClassName="w-full"
          breakPoint="md"
          displayCount={4}
          onChange={(item) => {
            console.log("item", item);
          }}
        />
      </div>

      <div className="pt-16 md:pt-0 md:pb-24 lg:pb-32 xl:pb-48">
        <div className="-my-12 md:-my-16">
          {/* 列表 */}
          {articleList?.length
            ? articleList.map((item) => (
                <div className="flex items-start py-12 md:py-16" key={item.title}>
                  {/* 头像 */}
                  <div className="flex-none mr-24 md:mr-48 hidden sm:block">
                    <a href={item.avatarLink} target="_blank" className="avatar">
                      <img src={item.avatar} width="48" height="48" alt="" className="avatar__photo is-loaded w-[48px] h-[48px] object-cover rounded-full" />
                    </a>
                  </div>

                  {/* 内容 */}
                  <div className="flex-grow min-w-0 my-2 pl-16 md:pl-0">
                    <div className="text-18 leading-sm relative">
                      <a onClick={() => goRoute(`/community/detail?authorId=${item.authorId}`)} target="_blank" className="block text-grey-53 hover:text-grey-53 cursor-pointer">
                        {item.tag ? (
                          <span className="inline-flex text-16 align-middle mr-4" data-tooltip="" title={item.tag}>
                            {/* <svg
                              className="icon text-yellow-95"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512"
                            >
                              <path d="M295.973 160H180.572L215.19 30.184C219.25 14.956 207.756 0 192 0H56C43.971 0 33.8 8.905 32.211 20.828l-31.996 240C-1.704 275.217 9.504 288 24.004 288h118.701L96.646 482.466C93.05 497.649 104.659 512 119.992 512c8.35 0 16.376-4.374 20.778-11.978l175.973-303.997c9.244-15.967-2.288-36.025-20.77-36.025z"></path>
                            </svg> */}
                            {item.tag}
                          </span>
                        ) : null}
                        {item.title}
                      </a>
                    </div>

                    <div className="flex flex-wrap text-12 items-center break-words mt-2">
                      <a href={item.authorLink} className="text-grey-53 truncate mr-8 hover:text-grey-53" target="_blank">
                        <span className="block">{item.author}</span>
                      </a>

                      <time className="mr-8 truncate" title={item.date}>
                        {item.date}
                      </time>

                      <span className="mr-8">{item.answerCount} replies</span>
                    </div>
                  </div>

                  {/* 参与回复人头像 */}
                  <div className="hidden md:flex ml-48 flex-none">
                    <div className="flex">
                      {item.answerList?.length
                        ? item.answerList.map((a) => (
                            <a
                              onClick={() => goRoute(`/community/detail?authorId=${item.authorId}`)}
                              className="avatar border-2 border-white -ml-12 relative z-3 cursor-pointer"
                              target="_blank"
                              key={a.authorId}
                            >
                              <img src={a.avatar} width="28" height="28" alt="" className="avatar__photo is-loaded w-[28px] h-[28px] object-cover rounded-full" />
                            </a>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              ))
            : null}

          {/* 分页切换 */}
          <ul className="mt-28 mb-24 md:mt-44 md:-mb-4 -mx-4 list-reset flex flex-wrap justify-between">
            <li className="p-4">
              <span
                className={classnames("button button--tertiary", {
                  "is-disabled": true,
                })}
              >
                <Icon className="icon-back" addClassName="mr-8" />
                Previous
              </span>
            </li>

            <li className="p-4">
              <span
                className={classnames("button button--tertiary", {
                  "is-disabled": false,
                })}
              >
                Next
                <Icon className="icon-right" addClassName="ml-8" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
