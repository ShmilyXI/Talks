import Api from "@/service";
import { useClickAway, useToggle } from "ahooks";
import { GalleryItem } from "@/types/GalleryTypes";
import classnames from "classnames";
import _ from "lodash";
import React, { FC, useEffect, useRef, useState } from "react";

type GalleryProps = {
  onChange?: (value?: number[]) => void;
  disabled?: boolean;
  value?: number[];
};

const Gallery: FC<GalleryProps> = (props) => {
  const { onChange = () => {}, disabled, value } = props;

  const [gallerySearchValue, setGallerySearchValue] = useState<string>(); // 画廊弹窗搜索值
  const [galleryLock, setGalleryLock] = useState(false); // 画廊弹窗私人锁
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]); // 画廊列表
  const [defaultGalleryList, setDefaultGalleryList] = useState<GalleryItem[]>([]); // 画廊默认列表
  const [gallerySelectKeys, setGallerySelectKeys] = useState<number[]>(); // 画廊元素选择id列表
  const galleryModalRef = useRef<HTMLDivElement>(null);

  const [showGalleryModal, { toggle: toggleGalleryModal, setLeft: setGalleryModalLeft }] = useToggle(); // 是否展示画廊选择弹窗

  useClickAway(() => {
    setGalleryModalLeft?.();
  }, galleryModalRef);

  useEffect(() => {
    onChange(gallerySelectKeys);
  }, [gallerySelectKeys]);

  useEffect(() => {
    if (!value?.length) return;
    setGallerySelectKeys(value);
  }, [value]);

  useEffect(() => {
    getGalleryData();
  }, []);

  const getGalleryData = async () => {
    const { data } = await Api.getGalleryList({
      data: { pageIndex: 1, pageSize: 999, type: "mine" },
    });
    const list = data?.list || [];
    setGalleryList(list);
    setDefaultGalleryList(list);
  };
  
  // 画廊弹窗搜索
  const searchGalleryList = (value: string) => {
    const items = defaultGalleryList.filter((v) => v?.title?.includes(value));
    setGalleryList(value ? items : defaultGalleryList);
  };

  // 画廊元素点击
  const onGalleryItemClick = (id: number) => {
    const list = _.cloneDeep(gallerySelectKeys || []);
    const index = list.indexOf(id);
    if (index >= 0) {
      // 存在
      list.splice(index, 1);
    } else {
      list.push(id);
    }
    setGallerySelectKeys(list);
  };

  return (
    <div ref={galleryModalRef} className="relative">
      <button
        type="button"
        className={classnames("button button--pill", {
          "is-active": gallerySelectKeys?.length,
        })}
        disabled={disabled}
        onClick={toggleGalleryModal}
      >
        <span className="off" title="Add to gallery">
          <svg className="icon button--pill__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M527.943 224H480v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h400a48.001 48.001 0 0 0 40.704-22.56l79.942-128c19.948-31.917-3.038-73.44-40.703-73.44zM54 112h134.118l64 64H426a6 6 0 0 1 6 6v42H152a48 48 0 0 0-41.098 23.202L48 351.449V117.993A5.993 5.993 0 0 1 54 112zm394 288H72l77.234-128H528l-80 128z" />
          </svg>
        </span>

        <span className="on items-center">
          <svg className="icon button--pill__icon ml-3 mr-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M527.943 224H480v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h400a48.001 48.001 0 0 0 40.704-22.56l79.942-128c19.948-31.917-3.038-73.44-40.703-73.44zM54 112h134.118l64 64H426a6 6 0 0 1 6 6v42H152a48 48 0 0 0-41.098 23.202L48 351.449V117.993A5.993 5.993 0 0 1 54 112zm394 288H72l77.234-128H528l-80 128z" />
          </svg>
          <span>{gallerySelectKeys?.length || 0}</span>
          <span
            className="py-2 px-8 leading-none text-green-75 hover:text-green-85"
            onClick={(e) => {
              e.stopPropagation();
              setGalleryModalLeft();
              setGallerySelectKeys([]);
            }}
          >
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
            </svg>
          </span>
        </span>
      </button>
      <div
        className={classnames("absolute bg-white shadow-popover text-left w-264 z-100 rounded overflow-hidden top-[40px]", {
          hidden: !showGalleryModal,
        })}
      >
        <div className="bg-white flex flex-col h-250">
          <div className="bg-inherit flex-none border-b border-grey-90 p-8 is-loading--transparent is-loading--md relative">
            <input
              className="input pr-40"
              maxLength={128}
              placeholder="Search or create new gallery"
              spellCheck={false}
              name="title"
              type="text"
              onChange={(e) => {
                setGallerySearchValue(e.target.value);
                searchGalleryList(e.target.value);
              }}
            />

            <button
              type="button"
              className={classnames("button-reset absolute pin-t pin-r mt-18 mr-18 w-18 text-left", {
                hidden: !gallerySearchValue,
              })}
              onClick={() => {
                setGalleryLock(!galleryLock);
              }}
            >
              <span className={classnames(galleryLock ? "on" : "off")}>
                <svg className="icon text-grey-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M423.5 0C339.5.3 272 69.5 272 153.5V224H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48h-48v-71.1c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v80c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-80C576 68 507.5-.3 423.5 0zM264 392c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
                </svg>
              </span>

              <span className={classnames(galleryLock ? "off" : "on")}>
                <svg className="icon text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zM264 392c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48zm32-168H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
                </svg>
              </span>
            </button>

            <div className="text-red text-12 leading-sm mt-8 hidden" data-target="form.error" data-field="title">
              错误信息xxx
            </div>
          </div>

          <div className="flex-grow relative overflow-y-auto">
            <div className={classnames("absolute pin flex-col align-center justify-center text-center", galleryList?.length ? "hidden" : "flex")}>
              <div className="text-14 leading-md text-black font-medium mb-12">No galleries found</div>

              <div className="w-168 mx-auto text-12 leading-sm">
                To create a new gallery enter its name and press enter.
                <span
                  className={classnames({
                    hidden: !galleryLock,
                  })}
                >
                  It will be only visible to you.
                </span>
              </div>
            </div>
            <div
              className={classnames("w-full self-start", {
                hidden: !galleryList?.length,
              })}
            >
              {galleryList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onGalleryItemClick(item.id);
                  }}
                >
                  <div
                    className={classnames("flex items-center p-8 border-b border-grey-90 cursor-pointer select-none", {
                      "bg-selection": gallerySelectKeys?.indexOf(item.id) >= 0,
                    })}
                  >
                    <div className="flex-none bg-grey-96 rounded w-[40px] h-[40px] mr-8 overflow-hidden">
                      <img
                        src={item.photoList?.[0]?.url || "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'40' height%3D'40'%2F%3E"}
                        width="40"
                        height="40"
                        alt=""
                        className="block w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="text-black flex items-center">
                        <span className="text-14 leading-md font-medium truncate min-w-0">{item.title}</span>
                      </div>

                      <div className="text-12 leading-sm">
                        {item.photoList?.length || 0}
                        &nbsp; photos
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
