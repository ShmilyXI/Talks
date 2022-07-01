import React, { FC, useEffect, useState } from "react";
import { Icon, PlaceholderSvg } from "@components";
import classnames from "classnames";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

import { useToggle } from "ahooks";
import dayjs from "dayjs";
import { BasePhotoInfo } from "@/types/PhotoTypes";
import _ from "lodash";

type Props = {
  list: BasePhotoInfo[];
  index: number;
  onChange?: (index: number) => void;
};
const PhotoViews: FC<Props> = (props) => {
  const { list, index: defaultIndex, onChange = () => {} } = props;
  const [
    showLightBox,
    { setRight: setLightBoxRight, setLeft: setLightBoxLeft },
  ] = useToggle();
  const [showIndex, setShowIndex] = useState(0); // 展示中的index

  useEffect(() => {
    if (_.isNil(defaultIndex)) return;
    console.log("defaultIndex", defaultIndex);
    setShowIndex(defaultIndex);
  }, [defaultIndex]);

  // 上一页
  const onPrev = () => {
    const index = showIndex - 1 < 0 ? list.length - 1 : showIndex - 1;
    setShowIndex(index);
    onChange(index);
  };

  // 下一页
  const onNext = () => {
    const index = showIndex + 1 > list.length - 1 ? 0 : showIndex + 1;
    setShowIndex(index);
    onChange(index);
  };

  // 切换图片
  const togglePhoto = (index: number) => {
    setShowIndex(index);
    onChange(index);
  };

  const slides = list.map(({ src, width, height, title, description }) => ({
    src,
    key: `${src}-${_.random(1, 99)}`,
    // aspectRatio: width / height,
    title,
    description,
    srcSet: [
      {
        src,
        width,
        height,
      },
    ],
  }));
  return (
    <div className="bg-black lg:py-48">
      <Lightbox
        open={showLightBox}
        close={() => setLightBoxLeft()}
        index={showIndex}
        slides={slides}
        on={{
          view: setShowIndex,
        }}
        plugins={[Captions, Zoom]}
        animation={{ zoom: 500 }}
        zoom={{
          zoomInMultiplier: 2,
          maxZoomPixelRatio: 5,
        }}
      />

      <div className="flex justify-between items-stretch">
        {/* 上一页 */}
        <div
          className="flex-none hidden lg:flex items-center select-none"
          onClick={onPrev}
        >
          {/* <div className="w-12 p-48"></div> */}
          <a className="flex items-center text-grey-27 hover:text-grey-53 text-24 leading-none p-48 h-full cursor-pointer">
            <Icon className="icon-back" />
          </a>
        </div>

        {/* 主图 */}
        <div className="d-container w-full p-0 text-center">
          <div className="story__photo text-center">
            <div
              className="lg:inline-block align-top md:rounded overflow-hidden relative "
              style={{ background: "#472C0A" }}
              onClick={setLightBoxRight}
            >
              <img
                src={list?.[showIndex]?.src}
                width={list?.[showIndex]?.width}
                height={list?.[showIndex]?.height}
                className="w-full lg:w-auto align-top cursor-zoom-in is-loaded"
              />
              <div className="absolute pin-t pin-r mt-16 mr-16 md:mt-32 md:mr-32 z-10 text-22 leading-none">
                <div className="block">
                  <Icon
                    className="icon-favor"
                    addClassName="text-white align-top"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block mt-24 text-14 leading-md text-grey-27">
            {`${list[showIndex]?.title}  ${dayjs(
              list[showIndex]?.updateDate,
            ).format("YYYY-MM-DD")}`}
          </div>
        </div>

        {/* 下一页 */}
        <div
          className="flex-none hidden lg:flex items-center select-none"
          onClick={onNext}
        >
          <a className="flex items-center text-grey-27 hover:text-grey-53 text-24 leading-none p-48 h-full cursor-pointer">
            <Icon className="icon-right" />
          </a>
        </div>
      </div>

      {/* 略缩图列表 */}

      <div className="lg:mt-48 overflow-x-auto hide-scrollbar">
        {/* <div className="flex md:justify-center -mx-4 md:-mx-12 py-16 lg:py-0 text-center"> */}
        <div className="flex justify-center py-16 lg:py-0 text-center">
          {list?.length
            ? list.map((item, index) => (
                <div
                  className={classnames(
                    "group flex-none content-box w-72 pr-4 md:px-12",
                  )}
                  key={item.src}
                >
                  <div
                    className="overflow-hidden rounded-2"
                    onClick={() => togglePhoto(index)}
                  >
                    <div
                      className={classnames(
                        "lg:opacity-50 group-hover:opacity-100 transition-opacity",
                        {
                          "!opacity-100": index === showIndex,
                        },
                      )}
                      style={{
                        background: item.themeColor,
                      }}
                    >
                      <a className="block relative overflow-hidden cursor-pointer">
                        <img
                          src={item.src}
                          width={item.width}
                          height={item.height}
                          className={classnames(
                            "block w-auto h-full max-w-none absolute pin-y pin-l-center lg:filter-grayscale group-hover:filter-none transition-filter is-loaded",
                            {
                              "!filter-none": index === showIndex,
                            },
                          )}
                        />
                        <PlaceholderSvg
                          width={72}
                          height={72}
                          className="block w-full h-auto invisible"
                        />
                      </a>
                    </div>
                  </div>

                  <div
                    className={classnames(
                      "text-12 leading-sm truncate mt-16 lg:opacity-0 group-hover:opacity-100",
                      {
                        "!opacity-100": index === showIndex,
                      },
                    )}
                  >
                    {item.title}
                  </div>
                </div>
              ))
            : null}
          {/* 
            <div className="group flex-none content-box w-72 pl-4 pr-16 md:px-12">
                <div className="overflow-hidden rounded-2">
                    <div className="bg-grey-27 opacity-50">
                        <img
                            src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39; width%3D&#39;72&#39; height%3D&#39;72&#39;%2F%3E"
                            width="72"
                            height="72"
                            alt=""
                            className="block w-full h-auto"
                        />
                    </div>
                </div>

                <div className="text-12 leading-sm truncate mt-16 opacity-50 lg:opacity-0 group-hover:opacity-50">
                    <span
                        style={{ verticalAlign: "inherit" }}
                    >
                        <span
                            style={{
                                verticalAlign: "inherit",
                            }}
                        >
                            3年
                        </span>
                    </span>
                </div>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default PhotoViews;
