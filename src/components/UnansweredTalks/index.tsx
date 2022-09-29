import React, { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import Api from "@/service/index";
import Icon from "@components/Icon";


const TopContributors = () => {
  const { data, error, loading } = useRequest(Api.getUnansweredList);

  return (
    <div>
      <h1 className="text-black text-18 md:text-24 leading-sm mb-8 mt-32 lg:mt-48">未答复的讨论</h1>

      <p className="text-14 leading-md mb-8">没有评论的讨论, 成为第一个发表评论的人。</p>

      <ul className="list-reset -mt-8 -mb-12">
        {data?.data?.length
          ? data.data.map((item) => (
              <li className="py-12" key={item.id}>
                <div className="my-8">
                  <a href={`/talkDetail?id=${item.id}`} className="text-black block hover:text-black font-medium">
                    {item.title}
                  </a>
                </div>

                <div className="flex items-center my-8">
                  <div className="flex-none mr-8">
                    <div className="avatar">
                      <img src={item.user.avatar_url} width="24" height="24" alt="" className="avatar__photo is-loaded w-[24px] h-[24px] object-cover rounded-full" />
                    </div>
                  </div>

                  <div className="text-14 truncate">
                    <a href={`/userDetail?id=${item.user_id}`} target="_blank" className="text-black mr-2 hover:text-black">
                      {item.user.display_name}
                    </a>
                  </div>
                  <div className="flex items-center text-12">
                    <Icon className="icon-comment" addClassName="text-16 mr-1 text-black" />
                    <a href={`/talkDetail?id=${item.id}#comments`} className="text-grey-53 hover:text-grey-53">
                      {item.comment_count}
                    </a>
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TopContributors;
