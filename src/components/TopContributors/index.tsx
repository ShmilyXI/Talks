import React, { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import Api from "@/service/index";
import Icon from "@components/Icon";

type ContributorItem = {
  avatar: string;
  name: string;
  link: string;
  answerCount: number;
};
const TopContributors = () => {
  const { data, error, loading } = useRequest(Api.getOutstandingContributors);

  return (
    <div>
      <h1 className="text-black text-18 md:text-24 leading-sm mb-8">杰出贡献者</h1>

      <p className="text-14 leading-md mb-16">在 Talks 上发起最多讨论的人。</p>

      <ol className="list-reset -mb-8">
        {data?.data?.length
          ? data.data.map((item) => (
              <li className="py-8 flex items-center" key={item.id}>
                <div className="flex-none mr-16">
                  <div className="avatar">
                    <img src={item.avatar_url} width="24" height="24" alt="" className="avatar__photo is-loaded w-[24px] h-[24px] object-cover rounded-full" />
                  </div>
                </div>

                <div className="min-w-0 mr-8 truncate">
                  <a href={`userDetail?id=${item.id}`} target="_blank" className="text-black hover:text-black">
                    <span className="block">{item.display_name}</span>
                  </a>
                </div>

                <div className="flex items-center text-14 ml-4">
                  <Icon className="icon-comment" addClassName="text-16 mr-1 text-black" />
                  <span>{item.talk_count}</span>
                </div>
              </li>
            ))
          : null}
      </ol>
    </div>
  );
};

export default TopContributors;
