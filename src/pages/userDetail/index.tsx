import Api from "@/service/index";
import { useInfiniteScroll, useRequest } from "ahooks";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "umi";
import { PhotoList, Filter, Icon } from "@/components";
import _ from "lodash";
import { BaseUserInfo } from "@/types/UserTypes";
import classnames from "classnames";
import { PhotoList as PhotoListType } from "@/types/PhotoTypes";
import GalleryList from "@/components/GalleryList";

const PAGE_SIZE = 20;
const UserDetail = () => {
  const [routeParams] = useSearchParams();
  const id = routeParams.get("id");
  const _type = routeParams.get("type");

  const [userInfo, setUserInfo] = useState<BaseUserInfo>(); // 用户信息
  const [photoList, setPhotoList] = useState<PhotoListType[]>(); // 用户照片列表
  const [type, setType] = useState(_type || "1");

  const {
    data: galleryData,
    loading: getGalleryListLoading,
    loadMore,
    loadingMore,
    reload,
  } = useInfiniteScroll(
    (d) => {
      const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1;
      return new Promise(async (resolve) => {
        const { data } = await Api.getGalleryList({
          data: { pageIndex: page, pageSize: PAGE_SIZE, type: "user", user_id: id },
        });
        resolve(data);
      }) as any;
    },
    {
      // manual: true,
    },
  );

  const getUserInfo = async (id: number) => {
    const { data = {} }: any = await Api.getUserInfo({
      params: { id },
    });
    setUserInfo(data);
  };

  const getUserPhotoList = async (id: number) => {
    const { data = {} }: any = await Api.getUserPhotoList({
      params: { id },
    });
    setPhotoList(data?.list || []);
  };

  useEffect(() => {
    if (_.isNil(id)) return;
    if (!userInfo?.id) {
      getUserInfo(+id);
    }
    switch (type) {
      case "1":
        getUserPhotoList(+id);
        break;
      case "2":
        reload();
        break;
    }
  }, [id, type]);

  return (
    <div>
      <div className="d-container max-w-744 xl:min-w-744 xl:max-w-full pt-16 pb-24 grid:py-48 xl:py-80 flex justify-center">
        <div className="grid:flex items-start relative w-full grid:w-auto">
          <div className="relative w-[128px] h-[128px]">
            <div className="avatar">
              <img
                src={userInfo?.avatar_url || "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'128' height%3D'128'%2F%3E"}
                width="128"
                height="128"
                alt=""
                className="avatar__photo w-[128px] h-[128px] object-cover rounded-full"
              />
            </div>
            {/* 个人徽章 */}
            <div className="absolute flex flex-col items-end grid:items-start grid:flex-row pin-r top-[12px] md:top-[32px] grid:pin-b grid:pin-t-auto grid:pin-r-center grid:h-auto w-36 grid:w-108 -mr-16 grid:mr-0 grid:-mb-18 z-1">
              <div className="flex-none grid:px-2 order-1 grid:w-36 cursor-pointer">
                <img src="https://tookapic.com/img/badges/1000-photo-club.svg" width="32" height="32" alt="" className="block is-loaded" />
              </div>

              <div className="flex-none pr-11 grid:px-2 grid:-mt-8 order-0 w-35 grid:w-36 cursor-pointer">
                <img src="https://tookapic.com/img/badges/motor-mouth.svg" width="32" height="32" alt="" className="block is-loaded" />
              </div>

              <div className="flex-none md:pr-5 pr-11 grid:px-2 grid:-mt-8 w-35 order-2 grid:w-36 cursor-pointer">
                <img src="https://tookapic.com/img/badges/senior.svg" width="32" height="32" alt="" className="block is-loaded" />
              </div>
            </div>
          </div>

          <div className="grid:ml-24 md:ml-48 flex-grow mt-24 grid:mt-0 min-w-0">
            <div className="flex items-center">
              <h1 className="text-20 grid:text-28 lg:text-32 leading-xs break-words min-w-0">{userInfo?.display_name || userInfo?.username}</h1>

              {/* <div
                className="flex-none leading-none ml-8 grid:ml-12"
              >
                <svg
                  className="icon text-16 grid:text-24 text-grey-80"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M512 256c0-37.7-23.7-69.9-57.1-82.4 14.7-32.4 8.8-71.9-17.9-98.6-26.7-26.7-66.2-32.6-98.6-17.9C325.9 23.7 293.7 0 256 0s-69.9 23.7-82.4 57.1c-32.4-14.7-72-8.8-98.6 17.9-26.7 26.7-32.6 66.2-17.9 98.6C23.7 186.1 0 218.3 0 256s23.7 69.9 57.1 82.4c-14.7 32.4-8.8 72 17.9 98.6 26.6 26.6 66.1 32.7 98.6 17.9 12.5 33.3 44.7 57.1 82.4 57.1s69.9-23.7 82.4-57.1c32.6 14.8 72 8.7 98.6-17.9 26.7-26.7 32.6-66.2 17.9-98.6 33.4-12.5 57.1-44.7 57.1-82.4zm-144.8-44.25L236.16 341.74c-4.31 4.28-11.28 4.25-15.55-.06l-75.72-76.33c-4.28-4.31-4.25-11.28.06-15.56l26.03-25.82c4.31-4.28 11.28-4.25 15.56.06l42.15 42.49 97.2-96.42c4.31-4.28 11.28-4.25 15.55.06l25.82 26.03c4.28 4.32 4.26 11.29-.06 15.56z" />
                </svg>
              </div> */}

              <div className="ml-24 absolute pin-t pin-r grid:relative">
                <div className="flex flex-col grid:flex-row items-end grid:items-center -my-4 grid:my-0 grid:-mx-4">
                  {/* <div className="py-4 grid:py-0 grid:px-4">
                    <button
                      type="button"
                      className="follow button button--follow is-public"
                    >
                      <span className="off">
                        <span className="block">Follow</span>
                      </span>

                      <span className="on on--private">
                        <span className="block group-hover:hidden">
                          Pending
                        </span>
                        <span className="hidden group-hover:block">Cancel</span>
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
                  </div> */}

                  {/* <div className="py-4 grid:py-0 grid:px-4">
                    <button
                      type="button"
                      className="button button--secondary"
                      data-controller="modal-trigger"
                      data-selector="[data-modal='trial']"
                    >
                      Message
                    </button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="mt-8 grid:mt-12 flex flex-wrap items-center -mx-8 text-14 grid:text-16">
              <div className={classnames("items-center px-8", userInfo?.place ? "flex" : "hidden")}>
                <Icon className="icon-map" addClassName="text-grey mr-4 flex-none text-20" />
                <a className="text-grey-53 cursor-pointer">{userInfo?.place}</a>
              </div>

              <div className={classnames("items-center px-8", userInfo?.email ? "flex" : "hidden")}>
                <Icon className="icon-email" addClassName="text-grey mr-4 flex-none text-20" />
                <a href={`mailto:${userInfo?.email}`} target="_blank" className="text-grey-53 min-w-0">
                  {userInfo?.email}
                </a>
              </div>
            </div>

            <div
              className={classnames("mt-8 grid:mt-16 text-grey-27 break-words text-14 grid:text-16 xl:max-w-568", { hidden: !userInfo?.individual_resume })}
              dangerouslySetInnerHTML={{ __html: userInfo?.individual_resume }}
            >
              {/* {userInfo?.individual_resume} */}
            </div>

            <div className="mt-8 grid:mt-16 flex flex-wrap -mx-8 text-14 grid:text-16">
              <div className="px-8 whitespace-no-wrap">
                <span className="mr-4">#7</span>
                248/365
              </div>

              <div className="px-8 whitespace-no-wrap">6 streak</div>

              <div className="px-8 whitespace-no-wrap">
                <button type="button" className="block button-reset hover:underline" data-controller="modal-trigger" data-selector="[data-modal='relationships']">
                  4K followers
                </button>
              </div>

              <div className="px-8 whitespace-no-wrap hidden grid:block">150.4K likes</div>

              <div className="px-8 whitespace-no-wrap hidden lg:block">1.4M views</div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-container p-16 md:px-32 md:py-24">
        <div className="d-container p-0 flex items-center justify-between">
          <div className="min-w-0 flex-grow mr-8">
            <Filter
              breakPoint="md"
              value={type || "1"}
              items={[
                { label: "Photos", value: "1" },
                { label: "Galleries", value: "2" },
              ]}
              onChange={(item) => {
                setType(item.value);
              }}
            />
          </div>
        </div>
      </div>
      {type === "1" ? <PhotoList getData={() => getUserPhotoList(+id)} list={photoList} isDetail /> : null}
      {type === "2" ? <GalleryList list={galleryData?.list || []} total={galleryData?.total} getData={reload} loadMore={loadMore} /> : null}
    </div>
  );
};

export default UserDetail;