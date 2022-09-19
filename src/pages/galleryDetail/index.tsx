import Api from "@/service";
import { GetGalleryDetailResponse } from "@/types/GalleryTypes";
import Filter from "@components/Filter";
import PhotoList from "@components/PhotoList";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Storage } from "@/utils/storage";
import classNames from "classnames";
import { UserFavoriteRequest } from "@/types/UserTypes";
import toast from "react-hot-toast";

const Index = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [isLogin, setIsLogin] = useState(false); // 是否是登录状态
  const [dataType, setDataType] = useState("popular");
  const [photoList, setPhotoList] = useState([]);
  const [galleryDetailInfo, setGalleryDetailInfo] = useState<GetGalleryDetailResponse["data"]>();

  // 获取画廊详情信息
  const getPhotoInfo = async () => {
    const { data } = await Api.getGalleryDetail({ params: { id: +id, type: dataType } });
    const photoList = data?.photoList || [];
    setPhotoList(photoList);
    setGalleryDetailInfo(data);
  };

  useEffect(() => {
    if (!id) return;
    getPhotoInfo();
  }, [dataType, id]);

  useEffect(() => {
    if (sessionStorage) {
      const storage = new Storage(sessionStorage, "Talks");
      const _isLogin = storage?.getItem("token");
      setIsLogin(_isLogin);
    }
  }, []);

  // 用户收藏画廊
  const onUserGalleryFavorite = async (value: UserFavoriteRequest) => {
    try {
      const { favoriteId, favoriteStatus, favoriteType } = value;
      await Api.userPhotoFavorite({
        data: {
          favoriteId,
          favoriteStatus,
          favoriteType,
        },
      });
      await toast.success(favoriteStatus === 1 ? "收藏成功!" : "取消收藏成功!");
      getPhotoInfo();
    } catch (error) {
      await toast.error("收藏失败,请重试!");
    }
  };

  return (
    <div>
      <div className="container p-0 md:p-32 lg:py-48" data-controller="gallery" data-gallery-id="1498">
        <div className="container p-0">
          <div className="px-16 pt-16 md:p-0">
            <div className="flex flex-col md:flex-row md:items-center">
              <h1 className="text-24 md:text-28 lg:text-32 leading-xs break-words min-w-0 md:truncate">
                <span className="align-middle mr-4" data-target="gallery.title">
                  {galleryDetailInfo?.title}
                </span>

                {/* 锁 */}
                <span className="hidden -mt-2 align-middle" data-target="gallery.private" title="Private" data-tooltip>
                  <svg className="icon text-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zM264 392c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48zm32-168H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
                  </svg>
                </span>
              </h1>

              <div
                className={classNames("flex items-center mt-16 -mx-4 md:mt-0 md:ml-16", {
                  hidden: !isLogin,
                })}
              >
                <div className="px-4">
                  <button
                    type="button"
                    className="follow button button--follow is-public"
                    onClick={_.debounce(
                      () =>
                        onUserGalleryFavorite({
                          favoriteId: +id,
                          favoriteStatus: galleryDetailInfo?.favoriteStatus === 1 ? 0 : 1,
                          favoriteType: 1,
                        }),
                      500,
                    )}
                  >
                    {galleryDetailInfo?.favoriteStatus === 1 ? "Unfollow" : "Follow"}
                  </button>
                </div>
              </div>
            </div>

            <p className="md:max-w-568 text-14 leading-md md:text-16 md:leading-normal text-grey-27 mt-16 md:mt-8 break-words" data-target="gallery.body">
              {galleryDetailInfo?.description}
            </p>

            <div className="text-14 leading-xl mt-12 md:mt-4 flex items-center flex-wrap break-words">
              <span className="mr-8">{photoList?.length || 0} photos from 1 person. Curated by</span>
              <div className="flex items-center text-grey-27">
                <div className="avatar mr-8">
                  <img
                    src={
                      galleryDetailInfo?.user?.avatar_url ||
                      "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'24' height%3D'24'%2F%3E"
                    }
                    width="24"
                    height="24"
                    alt=""
                    className="avatar__photo w-[24px] h-[24px] object-cover"
                  />
                </div>

                <a href={`/userDetail?id=${galleryDetailInfo?.user_id}`} className="text-inherit">
                  {galleryDetailInfo?.user?.display_name || galleryDetailInfo?.user?.username}
                </a>
              </div>
            </div>
          </div>

          <Filter
            breakPoint="md"
            menuClassName="mt-24"
            items={[
              { label: "受欢迎的", value: "popular" },
              { label: "最近的", value: "recent" },
            ]}
            onChange={(item) => {
              if (!item.value) {
                return;
              }
              setDataType(item.value);
            }}
          />
        </div>
      </div>

      <PhotoList getData={getPhotoInfo} list={photoList} />
    </div>
  );
};

export default Index;
