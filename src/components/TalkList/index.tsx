import classnames from 'classnames';
import React, { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import Api from '@/service/index';
import Filter from './Filter';

type articleItem = {
  avatar: string;
  avatarLink: string;
  tag: string;
  title: string;
  link: string;
  author: string;
  authorLink: string;
  date: string;
  answerCount: number;
  answerList: { avatar: string; link: string }[];
};

const Index = () => {
  const { data, error, loading }: any = useRequest(Api.getArticleLatestList);
  const [articleList, setArticleList] = useState<articleItem[]>(); // 文章列表
  useEffect(() => {
    setArticleList(data?.list || []);
  }, [data]);

  return (
    <div className="lg:max-w-744 md:pl-16">
      <div className="-mx-16 md:-mx-0 p-16 md:px-0 md:py-32 lg:py-48 shadow-navbar md:shadow-none">
        <div className="flex items-center justify-center md:justify-start">
          <h1 className="mb-2 md:block md:mb-0  text-16 leading-normal sm:text-24 md:text-28 lg:text-32 sm:leading-xs">
            Talks
          </h1>
        </div>
        {/* mobile */}
        <div className="w-full md:hidden">
          <div
            data-controller="dropdown"
            data-dropdown-placement="bottom-end"
            data-dropdown-offset="0,8px"
          >
            <button
              type="button"
              className="select truncate"
              data-target="dropdown.trigger"
              data-action="dropdown#toggle"
            >
              Active1
            </button>

            <div
              className="absolute z-50 bg-black-95 rounded whitespace-no-wrap min-w-128 shadow-sm hidden"
              data-target="dropdown.menu"
              x-placement="bottom-end"
              style={{
                position: 'absolute',
                transform: 'translate3d(0px, 8px, 0px)',
                top: 0,
                left: 0,
                willChange: 'transform',
              }}
              x-out-of-boundaries=""
            >
              <div className="flex flex-col text-left py-12 text-16 leading-lg">
                <a
                  href="https://tookapic.com/talks"
                  className="px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white font-medium hover:no-underline "
                >
                  Active
                </a>
                <a
                  href="https://tookapic.com/talks?stream=recent"
                  className="px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white hover:no-underline "
                >
                  Recent
                </a>
                <a
                  href="https://tookapic.com/talks?stream=unanswered"
                  className="px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white hover:no-underline "
                >
                  Unanswered
                </a>
                <a
                  href="https://tookapic.com/talks?stream=popular"
                  className="px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white hover:no-underline "
                >
                  Popular
                </a>
                <a
                  href="https://tookapic.com/talks?stream=featured"
                  className="px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white hover:no-underline "
                >
                  Featured
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* PC */}
        <div className="hidden md:block mt-24">
          <Filter />
        </div>
      </div>

      <div className="pt-16 md:pt-0 md:pb-24 lg:pb-32 xl:pb-48">
        <div className="-my-12 md:-my-16">
          {/* 列表 */}
          {articleList?.length
            ? articleList.map((item) => (
                <div className="flex items-start py-12 md:py-16">
                  {/* 头像 */}
                  <div className="flex-none mr-24 md:mr-48 hidden sm:block">
                    <a
                      href={item.avatarLink}
                      target="_blank"
                      className="avatar"
                    >
                      <img
                        src={item.avatar}
                        width="48"
                        height="48"
                        alt=""
                        className="avatar__photo is-loaded"
                      />
                    </a>
                  </div>

                  {/* 内容 */}
                  <div className="flex-grow min-w-0 my-2 pl-16 md:pl-0">
                    <div className="text-18 leading-sm relative">
                      <a
                        href={item.link}
                        target="_blank"
                        className="block text-grey-53 hover:text-grey-53"
                      >
                        {item.tag ? (
                          <span
                            className="inline-flex text-16 align-middle mr-4"
                            data-tooltip=""
                            title={item.tag}
                          >
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
                      <a
                        href={item.authorLink}
                        className="text-grey-53 truncate mr-8 hover:text-grey-53"
                        target="_blank"
                      >
                        <span className="block">{item.author}</span>
                      </a>

                      <time className="mr-8 truncate" title={item.date}>
                        {item.date}
                      </time>

                      <span className="mr-8">{item.answerCount} replies </span>
                    </div>
                  </div>

                  {/* 参与回复人头像 */}
                  <div className="hidden md:flex ml-48 flex-none">
                    <div className="flex">
                      {item.answerList?.length
                        ? item.answerList.map((a) => (
                            <a
                              href={a.link}
                              className="avatar border-2 border-white -ml-12 relative z-3"
                              target="_blank"
                            >
                              <img
                                src={a.avatar}
                                width="28"
                                height="28"
                                alt=""
                                className="avatar__photo is-loaded"
                              />
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
                className={classnames('button button--tertiary', {
                  'is-disabled': true,
                })}
              >
                <i className="iconfont icon-back mr-8" />
                Previous
              </span>
            </li>

            <li className="p-4">
              <span
                className={classnames('button button--tertiary', {
                  'is-disabled': false,
                })}
              >
                Next
                <i className="iconfont icon-right ml-8" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
