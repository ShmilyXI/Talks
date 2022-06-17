import Filter from "@/components/Filter";
import Api from "@/service/index";
import { useRequest } from "ahooks";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import { PhotoList } from "@components";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { formatPrice } from "@/utils/common";
import { IItem } from "@components/Menu";

type MilestoneItem = {
    avatarSrc: string;
    authorName: string;
    authorId: string;
    type: string;
    picCount?: number;
    level?: string;
};

const Browse = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { data, error, loading }: any = useRequest(Api.getGalleryPhotoList);
    const {
        data: milestoneData,
        error: milestoneError,
        loading: milestoneLoading,
    }: any = useRequest(Api.getPhotoMilestoneList);
    const [milestoneList, setMilestoneList] = useState<MilestoneItem[]>(); // 里程碑列表

    const items: IItem[] = [
        { label: t("common.following"), value: "1" },
        { label: t("common.popular"), value: "2" },
        { label: t("common.recent"), value: "3" },
        { label: t("common.debuts"), value: "4" },
        { label: t("common.finishers"), value: "5" },
        { label: t("common.photosOfTheDay"), value: "6" },
        { label: t("common.favorites"), value: "7" },
        { label: t("common.liked"), value: "8" },
    ];

    useEffect(() => {
        setMilestoneList(milestoneData?.list || []);
    }, [milestoneData]);

    // 路由跳转
    const goRoute = (path: string) => {
        router.push(path);
    };

    return (
        <div>
            {/* milestoneList */}
            <div className="container pt-16 md:pt-24 px-0">
                <div className="user-suggestion lg:py-24">
                    <div className="user-suggestion__list flex overflow-x-auto">
                        {milestoneList?.length
                            ? milestoneList?.map((item, index) => (
                                  <div
                                      className={classnames(
                                          "pl-16 pr-12 flex-none text-center",
                                          {
                                              "md:pl-32": index === 0,
                                              "md:pr-32":
                                                  index ===
                                                  milestoneList.length - 1,
                                          },
                                      )}
                                      key={item.authorId}
                                  >
                                      <div className="w-52">
                                          <a className="avatar relative cursor-pointer">
                                              <img
                                                  src={item.avatarSrc}
                                                  width="48"
                                                  height="48"
                                                  alt=""
                                                  className="avatar__photo is-loaded"
                                              />

                                              {item.type === "debut" ? (
                                                  <span className="absolute pin-l-center pin-b rounded-8 text-12 leading-sm font-medium -mb-4 px-6 bg-suggestion-debut-bottom text-suggestion-debut-top">
                                                      <svg
                                                          className="icon mt-2 text-12 text-suggestion-debut-top"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 512 512"
                                                      >
                                                          <path d="M505.1 19.1C503.8 13 499 8.2 492.9 6.9 460.7 0 435.5 0 410.4 0 307.2 0 245.3 55.2 199.1 128H94.9c-18.2 0-34.8 10.3-42.9 26.5L2.6 253.3c-8 16 3.6 34.7 21.5 34.7h95.1c-5.9 12.8-11.9 25.5-18 37.7-3.1 6.2-1.9 13.6 3 18.5l63.6 63.6c4.9 4.9 12.3 6.1 18.5 3 12.2-6.1 24.9-12 37.7-17.9V488c0 17.8 18.8 29.4 34.7 21.5l98.7-49.4c16.3-8.1 26.5-24.8 26.5-42.9V312.8c72.6-46.3 128-108.4 128-211.1.1-25.2.1-50.4-6.8-82.6zM400 160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"></path>
                                                      </svg>
                                                  </span>
                                              ) : null}
                                              {item.type === "featured" ? (
                                                  <span className="absolute pin-l-center pin-b rounded-8 text-12 leading-sm font-medium -mb-4 px-6 bg-suggestion-featured-bottom text-suggestion-featured-top">
                                                      <svg
                                                          className="icon mt-2 text-12 text-suggestion-featured-top"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 576 512"
                                                      >
                                                          <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                                                      </svg>
                                                  </span>
                                              ) : null}
                                              {item.type === "pics" ? (
                                                  <span className="absolute pin-l-center pin-b rounded-8 text-12 leading-sm font-medium -mb-4 px-6 bg-black text-white">
                                                      {formatPrice(
                                                          item.picCount || 0,
                                                      )}
                                                      {/* TODO: 这里需要加个千分位切割 */}
                                                  </span>
                                              ) : null}
                                              {item.type === "level" ? (
                                                  <span className="absolute pin-l-center pin-b rounded-8 text-12 leading-sm font-medium -mb-4 px-6 bg-purple text-white">
                                                      {item.level}
                                                  </span>
                                              ) : null}
                                          </a>

                                          <div className="mt-8 text-12 truncate">
                                              {item.authorName}
                                          </div>
                                      </div>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>
            <div className="container p-16 md:px-32 md:py-24">
                <div className="container p-0 flex items-center justify-between">
                    <div className="min-w-0 flex-grow mr-8">
                        <Filter
                            breakPoint="md"
                            items={items}
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

export default Browse;
