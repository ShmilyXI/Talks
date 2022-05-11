import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import Api from '@/service/index';

type ContributorItem = {
  avatar: string;
  name: string;
  link: string;
  answerCount: number;
};
const TopContributors = () => {
  const { data, error, loading }: any = useRequest(Api.getTopContributorList);
  const [contributorList, setContributorList] = useState<ContributorItem[]>(); // 文章列表

  useEffect(() => {
    setContributorList(data?.list || []);
  }, [data]);

  return (
    <div>
      <h1 className="text-black text-18 md:text-24 leading-sm mb-8">
        Top Contributors
      </h1>

      <p className="text-14 leading-md mb-16">
        People who started the most discussions on Talks.
      </p>

      <ol className="list-reset -mb-8">
        {contributorList?.length
          ? contributorList.map((item) => (
              <li className="py-8 flex items-center">
                <div className="flex-none mr-16">
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

                <div className="min-w-0 mr-8 truncate">
                  <a
                    href={item.link}
                    target="_blank"
                    className="text-black hover:text-black"
                  >
                    <span className="block">{item.name}</span>
                  </a>
                </div>

                <div className="flex items-center text-14 ml-4">
                  <i className="iconfont icon-comment text-16 mr-1 text-black" />
                  <span>{item.answerCount}</span>
                </div>
              </li>
            ))
          : null}
      </ol>
    </div>
  );
};

export default TopContributors;
