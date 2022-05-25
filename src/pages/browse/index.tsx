import Filter from '@/components/Filter';
import Api from '@/service/index';
import { useRequest } from 'ahooks';
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import classnames from 'classnames';
import _ from 'lodash';

type GalleryItem = {
  title: string;
  description: string;
  src: string;
  width: number;
  height: number;
  placeholderSrc: string;
  avatar: string;
  author: string;
  date: string;
  dateStr: string;
  workCount: number;
  answerCount: number;
};

const Browse = () => {
  const { data, error, loading }: any = useRequest(Api.getGalleryPhotoList);
  const [photoList, setPhotoList] = useState<GalleryItem[]>([]); // 文章列表

  const storyListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setPhotoList(data?.list || []);
  }, [data]);

  useEffect(() => {
    console.log('storyListRef.current', storyListRef.current);
    const items = storyListRef.current?.querySelectorAll('.story-list__item');
  }, []);

  const photos = [
    {
      src: 'https://via.placeholder.com/400x600',
      width: 400,
      height: 600,
    },
    {
      src: 'https://via.placeholder.com/600x400',
      width: 600,
      height: 400,
    },
    {
      src: 'https://via.placeholder.com/200x900',
      width: 200,
      height: 900,
    },
    {
      src: 'https://via.placeholder.com/1080x560',
      width: 1080,
      height: 560,
    },
  ];

  return (
    <div>
      <div className="container p-16 md:px-32 md:py-24">
        <div className="container p-0 flex items-center justify-between">
          <div className="min-w-0 flex-grow mr-8">
            <Filter
              breakPoint="xl"
              items={[
                { label: 'Test1', value: '1' },
                { label: 'Test2', value: '2' },
                { label: 'Test3', value: '3' },
                { label: 'Test4', value: '4' },
                { label: 'Test5', value: '5' },
                { label: 'Test6', value: '6' },
                { label: 'Test7', value: '7' },
              ]}
              onChange={(item) => {
                console.log('item', item);
              }}
            />
          </div>
        </div>
      </div>
      <div className="container p-16 md:pt-0 md:px-32 md:pb-24 lg:pb-32 xl:pb-48">
        <div className="-m-16 grid:-mb-8 grid:-mx-0 grid:-mt-0">
          <PhotoAlbum
            layout="rows"
            photos={photoList}
            renderPhoto={(data: {
              photo: any;
              imageProps: JSX.IntrinsicAttributes &
                React.ClassAttributes<HTMLImageElement> &
                React.ImgHTMLAttributes<HTMLImageElement>;
            }) => {
              const item = data.photo;
              return (
                <div
                  style={data.imageProps.style}
                  className={classnames(
                    'story-list__item group',
                    // ' mt-8 grid:mt-0 grid:mb-8 w-full grid:w-auto',
                    data.imageProps.className,
                  )}
                >
                  <div className="relative bg-white w-full h-full">
                    {/* 小屏 */}
                    <div className="flex grid:hidden justify-between items-center px-16 py-8 story-list__header">
                      <div className="flex items-center min-w-0">
                        <div className="flex-none">
                          <div className="avatar">
                            <img
                              src={item.avatar}
                              width="32"
                              height="32"
                              alt=""
                              className="avatar__photo"
                            />
                          </div>
                        </div>

                        <div className="ml-16 min-w-0 truncate">
                          <a
                            href="https://tookapic.com/lido"
                            className="font-medium story-list__user block text-14 leading-md"
                          >
                            <span className="block truncate">
                              {item.author}
                            </span>
                          </a>
                        </div>

                        <div
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
                        </div>
                      </div>

                      <div className="ml-16 flex items-center flex-none text-12 leading-sm">
                        <time
                          dateTime="2022-05-11T18:53:20+00:00"
                          title="2022-05-11T18:53:20+00:00"
                        >
                          8h
                        </time>
                      </div>
                    </div>
                    {/* 大屏 */}
                    <div className="overflow-hidden w-full h-full relative story-list__photo grid:rounded-3">
                      <a
                        href="/"
                        target="_blank"
                        className="block absolute pin z-3"
                      ></a>
                      {/* 图片 */}
                      <img
                        {...data.imageProps}
                        style={{
                          ..._.omit(data.imageProps.style, ['width', 'height']),
                        }}
                        className={classnames(
                          'is-loaded hidden grid:block w-full h-full',
                          data.imageProps.className,
                        )}
                        loading="lazy"
                      />
                      {/* 图片纯色展位图 */}
                      <img
                        src={item.placeholderSrc}
                        className="block h-full w-full grid:hidden"
                      />

                      <div className="story-list__overlay absolute pin z-1"></div>

                      {/* 遮罩 顶部*/}
                      <div className="story-list__overlay-item absolute pin-t pin-x z-5 px-8 pt-8 text-white text-12 leading-sm pointer-events-none text-shadow-grid flex justify-between">
                        <div className="flex items-center">
                          <div className="flex-none mr-8">
                            <div className="avatar bg-black">
                              <img
                                src={item.avatar}
                                width="32"
                                height="32"
                                className="avatar__photo is-loaded"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="font-medium">
                              <a
                                href="/"
                                className="pointer-events-auto text-inherit break-words"
                              >
                                {item.author}
                              </a>
                            </div>

                            <div className="opacity-75">{item.workCount}</div>
                          </div>
                        </div>
                      </div>

                      {/* 遮罩 底部*/}
                      <div className="story-list__overlay-item absolute pin-b pin-x z-5 px-8 pb-8 text-white text-12 leading-sm pointer-events-none flex justify-between">
                        <div className="flex items-center -mx-6">
                          <div className="px-6 leading-none">
                            <div className="pointer-events-auto">
                              <a
                                href="/"
                                target="_blank"
                                className="inline-flex align-top"
                              >
                                <i className="iconfont icon-like text-white text-16" />
                              </a>
                            </div>
                          </div>

                          <div className="px-6 leading-none">
                            <a
                              href="/"
                              target="_blank"
                              className="inline-flex align-top pointer-events-auto"
                            >
                              <i className="iconfont icon-favor text-white text-16" />
                            </a>
                          </div>

                          <div
                            className="px-6 leading-none flex items-center"
                            data-controller="popovers--comments"
                          >
                            <a
                              href="/#comments"
                              target="_blank"
                              className="pointer-events-auto leading-none"
                            >
                              <i className="iconfont icon-message text-white text-16" />
                            </a>

                            <span className="font-medium text-12 leading-none ml-6 text-white">
                              {item.answerCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 小屏 详情信息 */}
                    <div className="p-16 story-list__footer grid:hidden">
                      <div className="flex items-center justify-between mb-16">
                        <div className="flex items-center text-12 leading-sm grid:text-14 grid:leading-md">
                          <span className="flex-none mr-8"> Day 1,916 </span>

                          <time
                            className="flex-none"
                            dateTime={item.date}
                            title={item.date}
                          >
                            {item.dateStr}
                          </time>
                        </div>

                        <div className="flex items-center -mx-8">
                          <div className="px-8 leading-none text-14">
                            <div className="px-8 leading-none text-14">
                              <a
                                href="/"
                                className="inline-flex align-top"
                                data-tooltip=""
                                data-original-title="Like"
                              >
                                <i className="iconfont icon-like text-black text-22" />
                              </a>
                            </div>
                          </div>

                          <div className="px-8 leading-none text-14">
                            <a
                              href="/"
                              className="inline-flex align-top"
                              data-tooltip=""
                              data-original-title="Favorite"
                            >
                              <i className="iconfont icon-favor text-black text-22" />
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="story-list__title text-black font-medium mb-8 text-14 leading-md grid:text-16 grid:leading-normal">
                        {item.title}
                      </div>

                      <div className="story-list__excerpt text-grey-27 text-14 leading-md grid:text-16 grid:leading-normal">
                        {item.description}
                      </div>

                      <div className="flex items-center -mx-6 mt-8 text-14 leading-md grid:text-16 grid:leading-normal">
                        <div
                          className="px-6"
                          data-controller="popovers--comments"
                        >
                          <a
                            href="https://tookapic.com/photos/893165#comments"
                            data-target="popovers--comments.trigger counters--comment.count"
                            data-action="click-&gt;popovers--comments#toggle"
                            data-story-id="893165"
                            data-format="word"
                            className="text-grey-53"
                          >
                            {item.answerCount} comments
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
            renderContainer={(data: any) => (
              <div
                {...data.containerProps}
                className={classnames(
                  'story-list',
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
    </div>
  );
};

export default Browse;
