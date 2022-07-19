import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon, Menu, PlaceholderSvg, PhotoViews, Comments } from "@components";
import classnames from "classnames";
import dayjs from "dayjs";
import { useToggle, useRequest } from "ahooks";
import { useTranslation } from "react-i18next";
import Api from "@/service";
import { BasePhotoInfo, PhotoDetailInfoResponse } from "@/types/PhotoTypes";
import classNames from "classnames";
import _ from "lodash";
import toast from "react-hot-toast";
import { Storage } from "@/utils/storage";
import { CommentData, CommentItem } from "@/types/CommunityTypes";

type Mood = Record<string, { text: string; icon: string }>;

// Mood Location  View
const MoodEnum: Mood = {
  Awesome: { text: "Awesome", icon: "icon-emoji" },
  Good: { text: "Good", icon: "icon-emoji" },
  Meh: { text: "Meh", icon: "icon-emoji" },
  Bad: { text: "Bad", icon: "icon-emoji" },
  Terrible: { text: "Terrible", icon: "icon-emoji" },
};

const Index = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { t } = useTranslation();
  const [showMenu, { toggle: toggleMenu, setLeft: setMenuLeft }] = useToggle();
  const [curPhotoInfo, setCurPhotoInfo] = useState<BasePhotoInfo>(); // 当前图片信息
  const [photoList, setPhotoList] = useState<BasePhotoInfo[]>(); // 图片列表
  const [commentList, setCommentList] = useState<CommentItem[]>([]); // 评论列表
  const [photoDetailInfo, setPhotoDetailInfo] =
    useState<PhotoDetailInfoResponse["data"]>(); // 图片详情信息

  // 获取图片详情信息
  const getPhotoInfo = async (id: number) => {
    const { data } = await Api.getPhotoDetailInfo({ params: { id } });
    const list = data?.list || [];
    const index = data?.index || 0;
    setCurPhotoInfo(list?.[index]);
    setPhotoList(list);
    setPhotoDetailInfo(data);
  };

  // 获取图片评论列表
  const getCommentList = async (id: number) => {
    const { data } = await Api.getPhotoCommentList({ params: { id } });
    console.log("data.list :>> ", data.list);
    setCommentList(data?.list || []);
  };

  useEffect(() => {
    const _id = +id;
    if (!_id) return;
    getPhotoInfo(_id);
    getCommentList(_id);
  }, [id]);

  // 评论提交
  const onCommentSubmit = async (value: CommentData, callback: () => void) => {
    if (!_.trim(value?.content)) {
      toast.error("请输入评论内容");
      return;
    }
    const data = {
      ...value,
      content: _.trim(value?.content),
      photoId: curPhotoInfo.id,
      type: 1,
    };
    await Api.addPhotoComment({ data });
    await toast.success("评论成功!");
    callback();
    getCommentList(curPhotoInfo.id);
  };

  return (
    <div>
      <div className="story lg:flex">
        {/* mobile 头部 */}
        <div className="shadow-navbar flex justify-between items-center lg:hidden px-16 md:px-32 py-8 md:py-16 relative z-1">
          <div className="flex items-center min-w-0">
            <div className="flex-none">
              <div className="avatar">
                <img
                  src={curPhotoInfo?.avatarUrl}
                  width="32"
                  height="32"
                  alt=""
                  className="avatar__photo w-[32px] h-[32px] object-cover rounded-full"
                />
              </div>
            </div>

            <div className="ml-16 min-w-0 truncate">
              <a className="font-medium text-black block text-14 leading-md cursor-pointer">
                <span className="block truncate">
                  {curPhotoInfo?.authorName}
                </span>
              </a>
            </div>
          </div>

          <div className="ml-16 flex items-center flex-none text-12 leading-sm">
            <time
              dateTime={curPhotoInfo?.updateDate}
              title={curPhotoInfo?.updateDate}
            >
              {dayjs(curPhotoInfo?.updateDate).fromNow()}
            </time>
          </div>
        </div>
        {/* pc */}
        <div className="flex-grow lg:overflow-y-scroll" id="story-details">
          <PhotoViews
            list={photoList || []}
            index={photoDetailInfo?.index}
            onChange={(index) => {
              console.log("index", index);
              const item = photoList?.[index];
              if (+item?.id) {
                getCommentList(+item?.id);
              }
              item && setCurPhotoInfo(item);
            }}
          />

          <div className="d-container md:max-w-552 py-16 md:py-32 lg:py-48 relative shadow-footer md:shadow-none">
            <div className="flex lg:hidden items-center justify-between mb-16 lg:mb-24">
              <div className="flex items-center text-12 leading-sm lg:text-14 lg:leading-md">
                {/* <div className="mr-8 text-grey-53">Day 23</div> */}

                <time
                  className="lg:hidden"
                  dateTime={curPhotoInfo?.updateDate}
                  title={curPhotoInfo?.updateDate}
                >
                  <span className="sm:hidden">
                    {dayjs(curPhotoInfo?.updateDate).format("YYYY-MM-DD HH:mm")}
                  </span>

                  <span className="hidden sm:block">
                    {dayjs(curPhotoInfo?.updateDate).format("YYYY-MM-DD HH:mm")}
                  </span>
                </time>
              </div>

              <div className="flex lg:hidden">
                <div className="flex items-center -mx-8">
                  <div className="px-8 leading-none">
                    <button
                      type="button"
                      className="button-reset inline-flex align-top "
                    >
                      <span className="off">
                        <Icon
                          className="icon-like"
                          addClassName="text-22 text-black"
                        />
                      </span>

                      <span className="on">
                        <Icon
                          className="icon-likefill"
                          addClassName="text-22 text-red"
                        />
                      </span>
                    </button>
                  </div>

                  <div className="px-8 leading-none">
                    <button
                      type="button"
                      className="button-reset inline-flex align-top "
                    >
                      <span className="off">
                        <Icon
                          className="icon-favor"
                          addClassName="text-22 text-black"
                        />
                      </span>

                      <span className="on">
                        <Icon
                          className="icon-favorfill"
                          addClassName="text-22 text-red"
                        />
                      </span>
                    </button>
                  </div>

                  {/* 画廊icon */}
                  {/* <div className="px-8 leading-none">
                    <button
                      type="button"
                      className="button-reset inline-flex align-top is-active"
                    >
                      <span className="off">
                        <Icon
                          className="icon-file"
                          addClassName="text-22 text-black"
                        />
                      </span>

                      <span className="on">
                        <Icon
                          className="icon-file"
                          addClassName="text-22 text-green-75"
                        />
                      </span>
                    </button>
                  </div> */}

                  {/* 翻译icon */}
                  {/* <div className="px-8 leading-none">
                    <button
                      type="button"
                      className="button-reset inline-flex align-top"
                    >
                      <span className="off">
                        <Icon
                          className="icon-earth"
                          addClassName="text-22 scale-125 text-black"
                        />
                      </span>

                      <span className="on">
                        <Icon
                          className="icon-earth"
                          addClassName="text-22 scale-125 text-accent"
                        />
                      </span>
                    </button>
                  </div> */}

                  {/* <div className="pl-12 pr-8 leading-none lg:hidden relative">
                    <Menu
                      items={[
                        {
                          label: "关注",
                          value: "follow",
                        },
                      ]}
                      align="right"
                      visible={showMenu}
                      value={"follow"}
                      onChange={() => {
                        console.log("onChange");
                      }}
                    >
                      <button
                        type="button"
                        className="inline-flex button-reset align-top"
                        onClick={() => toggleMenu()}
                      >
                        <Icon
                          className="icon-moreandroid"
                          addClassName="text-20 text-black"
                        />
                      </button>
                    </Menu>
                  </div> */}
                </div>
              </div>
            </div>
            {/* 图片标题 */}
            <div className="font-medium text-black mb-8 md:mb-16 ">
              <h1
                className="story__title text-14 md:text-16 lg:text-18 leading-normal"
                data-target="translations.title"
              >
                {curPhotoInfo?.title}
              </h1>
            </div>

            {/* 图片详情 */}
            <div
              className="wysiwyg wysiwyg--story mb-8 sm:mb-16"
              data-target="translations.body"
            >
              <div>{curPhotoInfo?.description}</div>
              <p>
                {curPhotoInfo?.tags?.length
                  ? curPhotoInfo?.tags.map((tag) => (
                      <a
                        className="autolink notranslate autolink--tag mr-1"
                        href={tag}
                        key={`${tag}-${_.random(1, 99)}`}
                      >
                        # {tag}
                      </a>
                    ))
                  : null}
              </p>
            </div>

            {/* 图片扩展信息 */}
            <div className="flex flex-wrap -mx-8 text-12 leading-sm lg:text-14 lg:leading-md">
              <div
                className={classnames(
                  "items-center px-8",
                  curPhotoInfo?.mood ? "flex" : "hidden",
                )}
              >
                <Icon
                  className={MoodEnum?.[curPhotoInfo?.mood!]?.icon}
                  addClassName="text-14 lg:text-16 mr-4"
                />
                <span>{MoodEnum?.[curPhotoInfo?.mood!]?.text}</span>
              </div>

              <div
                className={classNames(
                  "items-center px-8",
                  curPhotoInfo?.place ? "flex" : "hidden",
                )}
              >
                <Icon className="icon-map" addClassName="text-14 lg:text-16" />
                <a
                  className="text-inherit ml-4 cursor-pointer"
                  onClick={() =>
                    console.log("location-->", curPhotoInfo?.place)
                  }
                >
                  <span className="block lg:truncate lg:max-w-200">
                    {curPhotoInfo?.place}
                  </span>
                </a>
              </div>

              <div
                className={classNames(
                  "items-center px-8",
                  curPhotoInfo?.viewCount ? "flex" : "hidden",
                )}
              >
                <Icon
                  className="icon-browse"
                  addClassName="text-14 lg:text-16"
                />
                <span className="ml-4">{curPhotoInfo?.viewCount}</span>
              </div>
            </div>

            {/* 画廊状态 */}
            {/* <div className="hidden lg:block">
              {curPhotoInfo?.galleries?.length ? (
                <div className="mt-24 md:mt-48">
                  <div className="text-14 leading-md lg:text-18 lg:leading-sm text-black font-medium mb-16 md:mb-24">
                    {t("common.featuredIn")}&nbsp;
                    <a
                      href="https://tookapic.com/photos/661007/galleries"
                      className="text-black underline hover:no-underline"
                    >
                      {curPhotoInfo?.galleries?.length}
                      {t("common.gallery")}
                    </a>
                  </div>

                  <div className="gallery-list-fade">
                    <div className="-mx-16 px-16 md:-mx-32 md:px-32 overflow-x-auto hide-scrollbar">
                      <div className="gallery-list flex items-start -mx-8 lg:-mx-12">
                        <div className="group flex-none w-280 lg:w-288 px-8 lg:px-12 ">
                          <div className="relative">
                            <div className="flex overflow-hidden rounded">
                              <div
                                className="flex-grow relative overflow-hidden min-w-0 w-2/3 "
                                style={{
                                  background: "#CCC8BC",
                                }}
                              >
                                <img
                                  src="https://cdn.tookapic.com/photos/2020/125/p/u/puIvsIa9F7qL1yGo3T2YFa7oIzbvgQjpEdnYzzbs.jpeg?dpr=2&amp;fit=crop-center&amp;h=380&amp;q=80&amp;w=570&amp;s=eb54efd691307478c41fe7cf6f0b1921"
                                  width="570"
                                  height="380"
                                  alt=""
                                  className="gallery-list__photo is-loaded"
                                />
                              </div>

                              <div className="flex flex-col ml-2 -my-1 flex-none w-1/3">
                                <div
                                  className="my-1 relative overflow-hidden "
                                  style={{
                                    background: "#CE9663",
                                  }}
                                >
                                  <img
                                    src="https://cdn.tookapic.com/photos/2020/130/o/l/olfqZ3RuXzg2MoP7cXW7WHOUjBfZ1M3pZZnciOYG.jpeg?dpr=2&amp;fit=crop-center&amp;h=135&amp;q=85&amp;sharp=3&amp;w=180&amp;s=1d177612a2e85a0eaa39640291b3c37e"
                                    width="180"
                                    height="135"
                                    alt=""
                                    className="gallery-list__photo is-loaded"
                                  />
                                  <PlaceholderSvg
                                    width={87}
                                    height={87}
                                    className="block w-full h-auto"
                                  />
                                </div>

                                <div
                                  className="my-1 relative overflow-hidden "
                                  style={{
                                    background: "#9D886E",
                                  }}
                                >
                                  <img
                                    src="https://cdn.tookapic.com/photos/2020/134/D/q/DqPFP50cX9E9BFAM3ioshSxe3SPohMh47HDVN4jf.jpeg?dpr=2&amp;fit=crop-center&amp;h=135&amp;q=85&amp;sharp=3&amp;w=180&amp;s=66e751ca12a20cdf2c26f287cf238805"
                                    width="180"
                                    height="135"
                                    alt=""
                                    className="gallery-list__photo is-loaded"
                                  />

                                  <PlaceholderSvg
                                    width={87}
                                    height={87}
                                    className="block w-full h-auto"
                                  />
                                </div>
                              </div>

                              <a
                                href="https://tookapic.com/galleries/2209-sunrise"
                                className="absolute pin z-10"
                              ></a>
                            </div>

                            <div className="absolute pin-t pin-x z-20 pointer-events-none p-8 flex justify-between items-center">
                              <div className="pointer-events-auto">
                                <button
                                  type="button"
                                  className="follow inline-flex button-reset align-top is-public "
                                >
                                  <span className="off">
                                    <Icon
                                      className="icon-roundaddfill"
                                      addClassName="icon text-accent text-18"
                                    />
                                  </span>

                                  <span className="on on--private">
                                    <Icon
                                      className="icon-timefill"
                                      addClassName="icon text-grey-80 text-18"
                                    />
                                  </span>

                                  <span className="on on--public">
                                    <Icon
                                      className="icon-roundcheckfill"
                                      addClassName="icon text-grey-75 text-18"
                                    />
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center mt-10 lg:mt-8 text-black">
                            <a
                              href="https://tookapic.com/galleries/2209-sunrise"
                              className="block text-inherit font-medium truncate min-w-0 text-14 lg:text-16"
                            >
                              Sunrise
                            </a>

                            <span className="ml-8 text-black">
                              <Icon
                                className="icon-unlock-fill"
                                addClassName="text-14"
                              />
                            </span>
                          </div>

                          <div className="text-12 leading-sm truncate mt-2 lg:mt-1">
                            163 photos. Curated by&nbsp;
                            <a
                              href="https://tookapic.com/shadoke"
                              className="text-grey-53"
                            >
                              Iwona- shadoke
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-24 md:mt-48">
                  <div className="text-14 leading-md lg:text-18 lg:leading-sm text-black font-medium mb-8">
                    {t("common.noFeatured")}
                  </div>

                  <a className="text-14 lg:text-16 cursor-pointer">
                    {t("common.savePhoto")}
                  </a>
                </div>
              )}
            </div> */}

            {/* 相机信息 */}
            <div className="hidden lg:block mt-48">
              <div className="text-14 leading-md lg:text-18 lg:leading-sm text-black font-medium mb-16 lg:mb-24">
                {t("common.exif")}
              </div>

              <div className="flex flex-wrap -mx-8 -my-8 lg:-my-12 break-words">
                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                  <div className="text-12 lg:text-14 leading-md lg:mb-8">
                    {t("common.brand")}
                  </div>

                  <div className="text-14 lg:text-16 text-black">
                    {curPhotoInfo?.exifData?.brand || "无"}
                  </div>
                </div>

                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                  <div className="text-12 lg:text-14 leading-md lg:mb-8">
                    {t("common.model")}
                  </div>

                  <div className="text-14 lg:text-16 text-black">
                    {curPhotoInfo?.exifData?.model || "无"}
                  </div>
                </div>

                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                  <div className="text-12 lg:text-14 leading-md lg:mb-8">
                    {t("common.aperture")}
                  </div>

                  <div className="text-14 lg:text-16 text-black">
                    {curPhotoInfo?.exifData?.aperture || "无"}
                  </div>
                </div>

                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                  <div className="text-12 lg:text-14 leading-md lg:mb-8">
                    {t("common.focalLength")}
                  </div>

                  <div className="text-14 lg:text-16 text-black">
                    {curPhotoInfo?.exifData?.focalLength || "无"}
                  </div>
                </div>

                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                  <div className="text-12 lg:text-14 leading-md lg:mb-8">
                    {t("common.shutterSpeed")}
                  </div>

                  <div className="text-14 lg:text-16 text-black">
                    {curPhotoInfo?.exifData?.shutterSpeed || "无"}
                  </div>
                </div>

                <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                  <div className="text-12 lg:text-14 leading-md lg:mb-8">
                    ISO
                  </div>

                  <div className="text-14 lg:text-16 text-black">
                    {curPhotoInfo?.exifData?.iso || "无"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 评论 底部内容 区 */}
        <div className="flex-none lg:w-384 lg:flex flex-col lg:overflow-hidden">
          <div
            className="flex-none relative p-16 md:p-24 story__meta z-1 hidden lg:block"
            data-target="story.meta"
          >
            <div className="flex items-center">
              <div className="flex-none">
                <div className="avatar">
                  <img
                    src={curPhotoInfo?.avatarUrl}
                    width="48"
                    height="48"
                    alt=""
                    className="avatar__photo is-loaded w-[48px] h-[48px] object-cover rounded-full"
                  />
                </div>
              </div>

              <div className="ml-16 flex-grow min-w-0">
                <div className="flex items-center">
                  <div className="text-16 min-w-0">
                    <a
                      href={`/${curPhotoInfo?.userId}`}
                      className="text-black font-medium block truncate"
                    >
                      <span className="block">{curPhotoInfo?.authorName}</span>
                    </a>
                  </div>
                </div>

                <div className="text-14 leading-md truncate">
                  <time
                    dateTime="2022-06-07T13:46:45+00:00"
                    title="2022-06-07T13:46:45+00:00"
                  >
                    {t("common.published")}&nbsp;
                    {dayjs(curPhotoInfo?.updateDate).fromNow()}
                  </time>
                </div>
              </div>
            </div>

            {/* 评论按钮区 */}
            <div className="flex items-center justify-between mt-24 -mb-4">
              <div className="flex items-center -mx-8">
                <div className="px-8 leading-none">
                  <button
                    type="button"
                    className="button-reset inline-flex align-top "
                  >
                    <span className="off">
                      <Icon
                        className="icon-like"
                        addClassName="text-black text-22"
                      />
                    </span>

                    <span className="on">
                      <Icon
                        className="icon-likefill"
                        addClassName="text-red text-22"
                      />
                    </span>
                  </button>
                </div>

                <div className="px-8 leading-none">
                  <button
                    type="button"
                    className="button-reset inline-flex align-top "
                  >
                    <span className="off">
                      <Icon
                        className="icon-favor"
                        addClassName="text-black text-22"
                      />
                    </span>

                    <span className="on">
                      <Icon
                        className="icon-favorfill"
                        addClassName="text-yellow-400 text-22"
                      />
                    </span>
                  </button>
                </div>

                {/* 画廊icon */}
                {/* <div className="px-8 leading-none">
                  <button
                    type="button"
                    className="button-reset inline-flex align-top is-active"
                  >
                    <span className="off">
                      <Icon
                        className="icon-file"
                        addClassName="text-22 text-black"
                      />
                    </span>

                    <span className="on">
                      <Icon
                        className="icon-file"
                        addClassName="text-22 text-green-75"
                      />
                    </span>
                  </button>
                </div> */}

                {/* 翻译icon */}
                {/* <div className="px-8 leading-none">
                  <button
                    type="button"
                    className="button-reset inline-flex align-top"
                  >
                    <span className="off">
                      <Icon
                        className="icon-earth"
                        addClassName="icon text-22 scale-125 text-black"
                      />
                    </span>

                    <span className="on">
                      <Icon
                        className="icon-earth"
                        addClassName="icon text-22 scale-125 text-accent"
                      />
                    </span>
                  </button>
                </div> */}

                <div className="pl-12 pr-8 leading-none lg:hidden">
                  <button
                    type="button"
                    className="inline-flex button-reset align-top"
                  >
                    <Icon
                      className="icon-moreandroid"
                      addClassName="text-24 text-black"
                    />
                  </button>
                  <div
                    className="absolute z-50 bg-black-95 rounded whitespace-no-wrap min-w-128 shadow-sm "
                    style={{
                      position: "absolute",
                      transform: "translate3d(0px, 5px, 0px)",
                      top: "0px",
                      left: "0px",
                      willChange: "transform",
                    }}
                  >
                    <div className="flex flex-col text-left py-12 text-16 leading-lg">
                      <button
                        type="button"
                        className="follow button-reset block w-full text-left px-28 lg:px-16 py-8 lg:py-1 hover:bg-white-15 text-grey-53 hover:no-underline is-public "
                      >
                        <span className="off">
                          <span className="block">Follow</span>
                        </span>

                        <span className="on on--private">
                          <span className="block">Pending</span>
                        </span>

                        <span className="on on--public">
                          <span className="block">Following</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-14 leading-none flex -mr-8 cursor-default">
                <div
                  className={classNames(
                    "items-center px-8",
                    curPhotoInfo?.viewCount ? "flex" : "hidden",
                  )}
                >
                  <Icon
                    className="icon-browse"
                    addClassName="text-22 text-black"
                  />
                  <span className="ml-8">{curPhotoInfo?.viewCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 评论列表 */}
          <Comments
            className="bg-grey-99"
            addClassName="p-16 md:p-24 md:px-32 lg:px-24"
            list={commentList}
            onSubmit={onCommentSubmit}
          />

          {/* mobile 底部区域 */}
          {/* <div className="p-16 md:p-32 lg:hidden">
            <div className="text-14 leading-md lg:text-18 lg:leading-sm text-black font-medium mb-8">
              {t("common.noFeatured")}
            </div>

            <a className="text-14 lg:text-16 cursor-pointer">
              {t("common.savePhoto")}
            </a>
          </div> */}

          {/* mobile 设备参数 */}
          <div className="p-16 md:p-32 lg:hidden">
            <div className="text-14 leading-md lg:text-18 lg:leading-sm text-black font-medium mb-16 lg:mb-24">
              {t("common.exif")}
            </div>

            <div className="flex flex-wrap -mx-8 -my-8 lg:-my-12 break-words">
              <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                <div className="text-12 lg:text-14 leading-md lg:mb-8">
                  {t("common.brand")}
                </div>

                <div className="text-14 lg:text-16 text-black">
                  {curPhotoInfo?.exifData?.brand || "无"}
                </div>
              </div>

              <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                <div className="text-12 lg:text-14 leading-md lg:mb-8">
                  {t("common.model")}
                </div>

                <div className="text-14 lg:text-16 text-black">
                  {curPhotoInfo?.exifData?.model || "无"}
                </div>
              </div>

              <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                <div className="text-12 lg:text-14 leading-md lg:mb-8">
                  {t("common.aperture")}
                </div>

                <div className="text-14 lg:text-16 text-black">
                  {curPhotoInfo?.exifData?.aperture || "无"}
                </div>
              </div>

              <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                <div className="text-12 lg:text-14 leading-md lg:mb-8">
                  {t("common.focalLength")}
                </div>

                <div className="text-14 lg:text-16 text-black">
                  {curPhotoInfo?.exifData?.focalLength || "无"}
                </div>
              </div>

              <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                <div className="text-12 lg:text-14 leading-md lg:mb-8">
                  {t("common.shutterSpeed")}
                </div>

                <div className="text-14 lg:text-16 text-black">
                  {curPhotoInfo?.exifData?.shutterSpeed || "无"}
                </div>
              </div>

              <div className="p-8 lg:py-12 w-1/2 md:w-1/3">
                <div className="text-12 lg:text-14 leading-md lg:mb-8">ISO</div>

                <div className="text-14 lg:text-16 text-black">
                  {curPhotoInfo?.exifData?.iso || "无"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
