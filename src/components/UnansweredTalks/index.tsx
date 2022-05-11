import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import Api from '@/service/index';

type UnansweredTalkItem = {
  avatar: string;
  answerCount: number;
  articleTitle: string;
  articleLink: string;
  author: string;
  authorLink: string;
};

const TopContributors = () => {
  const { data, error, loading }: any = useRequest(Api.getUnansweredTalkList);

  const [unansweredTalkList, setUnansweredTalkList] =
    useState<UnansweredTalkItem[]>(); // 文章列表

  useEffect(() => {
    setUnansweredTalkList(data?.list || []);
  }, [data]);

  return (
    <div>
      <h1 className="text-black text-18 md:text-24 leading-sm mb-8 mt-32 lg:mt-48">
        Unanswered Talks
      </h1>

      <p className="text-14 leading-md mb-16">
        Discussions with no comments. Be first to post a comment.
      </p>

      <ul className="list-reset -mt-8 -mb-12">
        {unansweredTalkList?.length
          ? unansweredTalkList.map((item) => (
              <li className="py-12">
                <div className="flex items-center">
                  <div className="flex-none mr-8">
                    <div className="avatar">
                      <img
                        src={item.avatar}
                        width="24"
                        height="24"
                        alt=""
                        className="avatar__photo is-loaded"
                      />
                    </div>
                  </div>

                  <div className="text-14 truncate">
                    <a
                      href={item.authorLink}
                      target="_blank"
                      className="text-black font-medium mr-2 hover:text-black"
                    >
                      {item.author}
                    </a>
                    posted
                  </div>
                </div>

                <div className="my-8">
                  <a
                    href={item.articleLink}
                    className="text-black block hover:text-black"
                  >
                    {item.articleTitle}
                  </a>
                </div>

                <div className="flex items-center text-12">
                  <i className="iconfont icon-comment text-16 mr-1 text-black" />
                  <a
                    href={`${item.articleLink}#comments`}
                    className="text-grey-53 hover:text-grey-53"
                  >
                    {item.answerCount} comments
                  </a>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TopContributors;
