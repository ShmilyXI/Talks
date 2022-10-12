import classnames from "classnames";
import React, { useState, useEffect } from "react";
import { usePagination, useRequest, useToggle } from "ahooks";
import Api from "@/service/index";
import Filter from "../Filter";
import Icon from "@components/Icon";
import { useRouter } from "next/router";
import { IItem } from "@components/Menu";
import _ from "lodash";
import AddTalkModal from "@components/AddTalkModal";

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
  const [dataType, setDataType] = useState("active");

  const [showAddTalkModal, { toggle: toggleAddTalkModal, setLeft: setAddTalkModalLeft }] = useToggle(true); // 是否展示添加讨论弹窗

  const {
    data: talkData,
    loading: getTalkListLoading,
    run: runGetTalkList,
    pagination,
  } = usePagination(
    ({ current, pageSize, type = dataType }) => {
      return new Promise(async (resolve) => {
        const { data } = await Api.getTalkList({
          data: { pageIndex: current, pageSize, type },
        });
        resolve(data);
      }) as any;
    },
    { refreshDeps: [dataType] },
  );

  // 获取列表数据
  const getData = (pageIndex?: number, pageSize?: number) => {
    runGetTalkList({
      current: pageIndex || pagination.current,
      pageSize: pageSize || pagination.pageSize,
    });
  };
  // 路由跳转
  const goRoute = (path: string) => {
    router.push(path);
  };

  return (
    <div className="lg:max-w-744 md:pl-16">
      <div className="-mx-16 md:-mx-0 p-16 md:px-0 md:py-32 lg:py-48 shadow-navbar md:shadow-none">
        <div className="flex items-center">
          <h1 className="hidden md:block text-16 leading-normal sm:text-24 md:text-28 lg:text-32 sm:leading-xs">Talks </h1>
          <button type="button" className="hidden md:block button button--primary ml-16 md:ml-auto" onClick={toggleAddTalkModal}>
            Create new talk
          </button>
        </div>
        <div className="flex">
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
              setDataType(item.value);
            }}
          />
          <button type="button" className="block md:hidden button button--primary ml-16 md:ml-auto" onClick={toggleAddTalkModal}>
            Create new talk
          </button>
        </div>
      </div>

      <div className="pt-16 md:pt-0 md:pb-24 lg:pb-32 xl:pb-48">
        <div className="-my-12 md:-my-16">
          {/* 列表 */}
          {talkData?.list?.length
            ? talkData.list.map((item) => (
                <div className="flex items-start py-12 md:py-16" key={item.title}>
                  {/* 头像 */}
                  <div className="flex-none mr-24 md:mr-48 hidden sm:block">
                    <a href={`/userDetail?id=${item.user_id}`} target="_blank" className="avatar">
                      <img src={item?.user?.avatar_url} width="48" height="48" alt="" className="avatar__photo is-loaded w-[48px] h-[48px] object-cover rounded-full" />
                    </a>
                  </div>

                  {/* 内容 */}
                  <div className="flex-grow min-w-0 my-2 pl-16 md:pl-0">
                    <div className="text-18 leading-sm relative">
                      <a onClick={() => goRoute(`/talkDetail?id=${item.id}`)} target="_blank" className="block text-grey-53 hover:text-grey-53 cursor-pointer">
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
                      <a href={`/userDetail?id=${item.user_id}`} className="text-grey-53 truncate mr-8 hover:text-grey-53" target="_blank">
                        <span className="block">{item.user?.display_name}</span>
                      </a>

                      <time className="mr-8 truncate" title={item.create_time}>
                        {item.create_time}
                      </time>

                      <span className="mr-8">{item.comment_count || 0} replies</span>
                    </div>
                  </div>

                  {/* 参与回复人头像 */}
                  <div className="hidden md:flex ml-48 flex-none">
                    <div className="flex">
                      {item.commentList?.length
                        ? _.map(_.slice(item.commentList, 0, 3) as any, (comment) => (
                            <a
                              onClick={() => goRoute(`/userDetail?id=${comment.user_id}`)}
                              className="avatar border-2 border-white -ml-12 relative z-3 cursor-pointer"
                              target="_blank"
                              key={comment.user_id}
                            >
                              <img src={comment.user_avatar_url} width="28" height="28" alt="" className="avatar__photo is-loaded w-[28px] h-[28px] object-cover rounded-full" />
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
                onClick={() => {
                  console.log("pagination.current :>> ", pagination.current);
                  if (pagination.current <= 1) {
                    return;
                  }
                  getData(pagination.current - 1);
                }}
                className={classnames("button button--tertiary", {
                  "is-disabled": pagination.current <= 1,
                })}
              >
                <Icon className="icon-back" addClassName="mr-8" />
                Previous
              </span>
            </li>

            <li className="p-4">
              <span
                onClick={() => {
                  if (pagination.current * pagination.pageSize >= pagination.total) {
                    return;
                  }
                  getData(pagination.current + 1);
                }}
                className={classnames("button button--tertiary", {
                  "is-disabled": pagination.current * pagination.pageSize >= pagination.total,
                })}
              >
                Next
                <Icon className="icon-right" addClassName="ml-8" />
              </span>
            </li>
          </ul>
        </div>
      </div>
      {showAddTalkModal ? <AddTalkModal visible={showAddTalkModal} setModalLeft={setAddTalkModalLeft} /> : null}
    </div>
  );
};

export default Index;
