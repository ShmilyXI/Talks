import React, { FC, useCallback, useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
import classnames from "classnames";
import { Icon, PlaceholderSvg } from "@components";
import { useRequest, configResponsive, useResponsive, useUpdateLayoutEffect } from "ahooks";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { GalleryPhotoItem } from "@/types/PhotoTypes";
import dayjs from "dayjs";
import { UserLikedRequest } from "@/types/UserTypes";
import Api from "@/service";
import toast from "react-hot-toast";

type PhotoListProps = {
  getData: () => void;
  list: GalleryPhotoItem[];
  total?: number;
  isDetail?: boolean;
};

const BreakPoints = {
  xs: 352,
  sm: 576,
  grid: 696,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1304,
  xxxl: 1440,
};
configResponsive(BreakPoints);

const PhotoList: FC<PhotoListProps> = (props) => {
  const { getData = () => {}, list, total, isDetail } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const [photoList, setPhotoList] = useState<GalleryPhotoItem[]>([]); // 图片列表
  const [isMobile, setIsMobile] = useState(false);
  const [nowPointWidth, setNowPointWidth] = useState(800);
  const responsive = useResponsive();

  // 替换图片真实src
  const replaceImageSrc = useCallback((photo: Element) => {
    const src = photo.getAttribute("data-src") || "";
    photo.setAttribute("src", src);
  }, []);

  useUpdateLayoutEffect(() => {
    if (!photoList?.length) return;
    // 图片预显示背景主题色,加载完成后替换属性,展示真实图片
    const photos = document.querySelectorAll(".photo-item");
    _.forEach(photos, (photo) => {
      photo.addEventListener("load", () => replaceImageSrc(photo));
    });
    return () => {
      const photos = document.querySelectorAll(".photo-item");
      _.forEach(photos, (photo) => {
        photo.removeEventListener("load", () => replaceImageSrc(photo));
      });
    };
  }, [photoList, isMobile]);

  useEffect(() => {
    setPhotoList(list?.map((v) => ({ ...v, src: v?.url || "" })) || []);
  }, [list]);

  useEffect(() => {
    setIsMobile(!responsive.grid);
    // 设置图片容器宽度
    const offsetWidth = document.documentElement.offsetWidth;
    setNowPointWidth(offsetWidth);
  }, [responsive]);

  // 路由跳转
  const goRoute = (path: string) => {
    console.log("path", path);
    router.push(path);
  };

  // 用户点赞照片
  const onUserLiked = async (value: UserLikedRequest) => {
    try {
      const { likedId, likedStatus, likedType } = value;
      await Api.userLiked({
        data: {
          likedId,
          likedStatus,
          likedType,
        },
      });
      await toast.success(likedStatus === 1 ? "点赞成功!" : "取消点赞成功!");
      getData();
    } catch (error) {
      await toast.error("点赞失败,请重试!");
    }
  };

  return (
    <div className="d-container p-16 md:pt-0 md:px-32 md:pb-24 lg:pb-32 xl:pb-48">
      <div className="-m-16 grid:-mb-8 grid:-mx-0 grid:-mt-0">
        <PhotoAlbum
          layout="rows"
          defaultContainerWidth={nowPointWidth}
          rowConstraints={{
            maxPhotos: isMobile ? 1 : 3,
          }}
          breakpoints={[352, 576, 696, 768, 992, 1200, 1304, 1440]}
          photos={photoList}
          renderPhoto={(data: { photo: any; imageProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLImageElement> & React.ImgHTMLAttributes<HTMLImageElement> }) => {
            const item = data.photo;
            return (
              <div
                style={{
                  ...data.imageProps.style,
                  aspectRatio: "unset",
                }}
                className={classnames(
                  "story-list__item group",
                  // 'mt-8 grid:mt-0 grid:mb-8 w-full grid:w-auto',
                  data.imageProps.className,
                )}
              >
                <div className="relative bg-white w-full h-full">
                  {/* 小屏 */}
                  <div className={classnames("grid:hidden justify-between items-center px-16 py-8 story-list__header", isDetail ? "hidden" : "flex")}>
                    <div className="flex items-center min-w-0">
                      <div
                        className={classnames("flex-none mr-16", {
                          hidden: !item.avatarUrl,
                        })}
                      >
                        <div className="avatar">
                          <img src={item.avatarUrl} width="32" height="32" alt="" className="avatar__photo w-[32px] h-[32px] object-cover rounded-full" />
                        </div>
                      </div>
                      <div className="min-w-0 truncate">
                        <a className="font-medium story-list__user block text-14 leading-md cursor-pointer" onClick={() => goRoute(`/userDetail?id=${item.userId}`)}>
                          <span className="block truncate">{item.authorName}</span>
                        </a>
                      </div>

                      {/* <div
                                        className="flex-none leading-none ml-8"
                                        data-tooltip=""
                                        data-original-title="Paying member"
                                    >
                                        <svg
                                            className="icon text-14 text-grey-80"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M512 256c0-37.7-23.7-69.9-57.1-82.4 14.7-32.4 8.8-71.9-17.9-98.6-26.7-26.7-66.2-32.6-98.6-17.9C325.9 23.7 293.7 0 256 0s-69.9 23.7-82.4 57.1c-32.4-14.7-72-8.8-98.6 17.9-26.7 26.7-32.6 66.2-17.9 98.6C23.7 186.1 0 218.3 0 256s23.7 69.9 57.1 82.4c-14.7 32.4-8.8 72 17.9 98.6 26.6 26.6 66.1 32.7 98.6 17.9 12.5 33.3 44.7 57.1 82.4 57.1s69.9-23.7 82.4-57.1c32.6 14.8 72 8.7 98.6-17.9 26.7-26.7 32.6-66.2 17.9-98.6 33.4-12.5 57.1-44.7 57.1-82.4zm-144.8-44.25L236.16 341.74c-4.31 4.28-11.28 4.25-15.55-.06l-75.72-76.33c-4.28-4.31-4.25-11.28.06-15.56l26.03-25.82c4.31-4.28 11.28-4.25 15.56.06l42.15 42.49 97.2-96.42c4.31-4.28 11.28-4.25 15.55.06l25.82 26.03c4.28 4.32 4.26 11.29-.06 15.56z"></path>
                                        </svg>
                                    </div> */}
                    </div>

                    <div className="ml-16 flex items-center flex-none text-12 leading-sm">
                      <time dateTime={item.createDate} title={item.createDate}>
                        {dayjs(item?.createDate).fromNow()}
                      </time>
                    </div>
                  </div>
                  {/* 大屏 */}
                  <div
                    className="overflow-hidden w-full h-full relative story-list__photo grid:rounded-3"
                    style={{
                      backgroundColor: item.themeColor,
                    }}
                  >
                    <a className="block absolute pin z-3 cursor-pointer" onClick={() => goRoute(`/photoDetail?id=${item.id}`)}></a>
                    {/* 图片 */}
                    <img
                      {..._.omit(data.imageProps, "src")}
                      src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'100%' height%3D'100%'%2F%3E"
                      data-src={data.imageProps.src}
                      style={{
                        ..._.omit(data.imageProps.style, ["width", "height"]),
                        maxHeight: "80vh",
                      }}
                      className={classnames("photo-item is-loaded hidden grid:block w-full h-full object-cover", data.imageProps.className)}
                      loading="lazy"
                    />
                    {/* 小屏图片 */}
                    {/* <img
                                    src={item.placeholderSrc}
                                    className="block h-full w-full grid:hidden"
                                /> */}

                    <div className="story-list__overlay absolute pin z-1"></div>

                    {/* 遮罩 顶部*/}
                    <div className="story-list__overlay-item absolute pin-t pin-x z-5 px-8 pt-8 text-white text-12 leading-sm pointer-events-none text-shadow-grid flex justify-between">
                      <div className="flex items-center">
                        <div
                          className={classnames("flex-none mr-8", {
                            hidden: !item.avatarUrl || isDetail,
                          })}
                        >
                          <div className="avatar bg-black">
                            <img src={item.avatarUrl} width="32" height="32" className="avatar__photo is-loaded w-[32px] h-[32px] object-cover rounded-full" />
                          </div>
                        </div>

                        <div>
                          <div className="font-medium">
                            {isDetail ? (
                              <>
                                <div className="text-inherit break-words text-18">{item.title}</div>
                                <div className="text-inherit break-words">{item.shootingDate}</div>
                              </>
                            ) : (
                              <a className="pointer-events-auto text-inherit break-words cursor-pointer text-18" onClick={() => goRoute(`/userDetail?id=${item.userId}`)}>
                                {item.authorName}
                              </a>
                            )}
                          </div>

                          <div
                            className={classnames("opacity-75", {
                              hidden: !item.workCount,
                            })}
                          >
                            #&nbsp;
                            {item.workCount || 0}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 遮罩 底部*/}
                    <div className="story-list__overlay-item absolute pin-b pin-x z-5 px-8 pb-8 text-white text-12 leading-sm pointer-events-none flex justify-between">
                      <div className="flex items-center -mx-6">
                        <div className="mr-4 ml-4 leading-none">
                          <a
                            className="pointer-events-auto inline-flex align-top cursor-pointer"
                            onClick={() => {
                              onUserLiked({
                                likedId: item?.id,
                                likedStatus: item?.likedStatus === 1 ? 0 : 1,
                                likedType: 0,
                              });
                            }}
                          >
                            {item?.likedStatus === 1 ? (
                              <Icon className="icon-likefill" addClassName="text-16 text-red" />
                            ) : (
                              <Icon className="icon-like" addClassName="text-16 text-white" />
                            )}
                          </a>
                        </div>

                        <div className="mr-4 leading-none">
                          <a
                            className="pointer-events-auto inline-flex align-top cursor-pointer"
                            onClick={() => {
                              console.log("favor");
                            }}
                            title="favorite"
                          >
                            <Icon className="icon-favor" addClassName="text-white text-16" />
                          </a>
                        </div>

                        <div className="mr-4 leading-none flex items-center">
                          <a
                            className="pointer-events-auto cursor-pointer leading-none"
                            onClick={() => {
                              goRoute(`/photoDetail?id=${item.id}#comment`);
                            }}
                            title="comment"
                          >
                            <Icon className="icon-message" addClassName="text-white text-16" />
                          </a>

                          <span className="font-medium text-12 ml-3 leading-none text-white">{item.commentCount || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 小屏 详情信息 */}
                  <div className="p-16 story-list__footer grid:hidden">
                    <div className="flex items-center justify-between mb-16">
                      <div className="flex items-center text-12 leading-sm grid:text-14 grid:leading-md">
                        <span
                          className={classnames("flex-none mr-8", {
                            hidden: !item.workCount,
                          })}
                        >
                          #&nbsp;
                          {item.workCount}
                        </span>

                        <time className="flex-none" dateTime={item.shootingDate} title={item.shootingDate}>
                          {dayjs(item.shootingDate).format("YYYY-MM-DD HH:mm:ss")}
                        </time>
                      </div>

                      <div className="flex items-center -mx-8">
                        <div className="px-8 leading-none text-14">
                          <div className="px-8 leading-none text-14">
                            <a
                              className="inline-flex align-top cursor-pointer"
                              onClick={() => {
                                onUserLiked({
                                  likedId: item?.id,
                                  likedStatus: item?.likedStatus === 1 ? 0 : 1,
                                  likedType: 0,
                                });
                              }}
                            >
                              {item?.likedStatus === 1 ? (
                                <Icon className="icon-likefill" addClassName="text-22 text-red" />
                              ) : (
                                <Icon className="icon-like" addClassName="text-22 text-black" />
                              )}
                            </a>
                          </div>
                        </div>

                        <div className="px-8 leading-none text-14">
                          <a className="inline-flex align-top cursor-pointer" onClick={() => console.log("favor")}>
                            <Icon className="icon-favor" addClassName="text-black text-22" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="story-list__title text-black font-medium mb-8 text-14 leading-md grid:text-16 grid:leading-normal">{item.title}</div>

                    <div className="flex items-center -mx-6 mt-8 text-14 leading-md grid:text-16 grid:leading-normal">
                      <div className="px-6" data-controller="popovers--comments">
                        <a className="text-grey-53 cursor-pointer" onClick={() => goRoute(`/photoDetail?id=${item.id}#comment`)}>
                          {item.commentCount || 0}
                          &nbsp;
                          {t("common.comments")}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
          renderRowContainer={(data) => {
            return (
              <div {...data.rowContainerProps} className={classnames("story-list", "mt-8 grid:mt-0", data.rowContainerProps.className)}>
                {data.children}
              </div>
            );
          }}
          renderContainer={(data: any) => (
            <div
              {...data.containerProps}
              className={classnames(
                "story-list",
                // '-mt-24 grid:mt-0',
                data.containerProps.className,
              )}
            >
              {data.children}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default PhotoList;
