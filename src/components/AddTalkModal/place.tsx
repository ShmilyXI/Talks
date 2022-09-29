import Api from "@/service";
import Menu, { IItem } from "@components/Menu";
import { useToggle } from "ahooks";
import classnames from "classnames";
import _ from "lodash";
import React, { FC, useCallback, useEffect, useState } from "react";

type PlaceProps = {
  value?: IItem;
  onChange?: (value?: IItem) => void;
  disabled?: boolean;
  isSetting?: boolean;
};

const Place: FC<PlaceProps> = (props) => {
  const { value, onChange = () => {}, disabled, isSetting } = props;

  const [addressList, setAddressList] = useState<IItem[]>(); // 地点列表

  const [showPlaceMenu, { toggle: togglePlaceMenu, setLeft: setPlaceMenuLeft, setRight: setPlaceMenuRight }] = useToggle(); // 是否展示地点筛选框

  const [showPlaceInput, { toggle: togglePlaceInput, setLeft: setPlaceInputLeft }] = useToggle(isSetting || value); // 是否展示地点输入框

  // 关键字查询
  const onKeywordChange = async (value: string) => {
    if (!value) {
      setAddressList([]);
      return;
    }
    const params = {
      key: "a9372fc90423fc38ce7c57aa18adf4ed",
      keywords: value,
    };
    const { data } = await Api.getPlaceByKeyword(params);
    const list = _.map(data?.pois || [], (item) => ({
      value: item.id,
      label: item.name,
      location: item.location,
      provincialName: item.pname,
      cityName: item.cityname,
      areaName: item.adname,
      className: "text-sm break-words whitespace-normal",
    }));
    setPlaceMenuRight();
    setAddressList(list);
  };

  return (
    <div className="relative" key={value?.value}>
      <input type="hidden" name="place" disabled={disabled} />

      <div>
        <div className={classnames(value?.value ? "hidden" : "block")}>
          <div className={classnames(showPlaceInput ? "on" : "off")}>
            <button className="button button--pill" type="button" onClick={togglePlaceInput} disabled={disabled}>
              <span className="button--pill__icon" title="Add place">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M192 0C85.903 0 0 86.014 0 192c0 71.117 23.991 93.341 151.271 297.424 18.785 30.119 62.694 30.083 81.457 0C360.075 285.234 384 263.103 384 192 384 85.903 297.986 0 192 0zm0 464C64.576 259.686 48 246.788 48 192c0-79.529 64.471-144 144-144s144 64.471 144 144c0 54.553-15.166 65.425-144 272zm-80-272c0-44.183 35.817-80 80-80s80 35.817 80 80-35.817 80-80 80-80-35.817-80-80z" />
                </svg>
              </span>
            </button>
          </div>

          <div className={classnames("relative", showPlaceInput ? "block" : "hidden")}>
            <Menu
              visible={showPlaceMenu}
              onChange={(item) => {
                console.log("item", item);
                onChange(item);
                if (!isSetting) {
                  setPlaceInputLeft();
                }
              }}
              setLeft={setPlaceMenuLeft}
              modalClassName="top-[-8px] left-[-5px] w-full"
              wrapClassName="py-2 max-h-[350px] overflow-auto"
              items={addressList}
            >
              <input
                type="text"
                className={classnames("input", !isSetting ? "py-5 pr-28" : "")}
                placeholder="Location"
                disabled={disabled}
                onChange={_.debounce((e) => {
                  const value = e.target.value || "";
                  onKeywordChange(value);
                }, 500)}
              />
            </Menu>
            <button
              type="button"
              className={classnames("button-reset py-2 px-8 leading-none text-grey-80 hover:text-grey-53 absolute pin-r pin-t-center", { hidden: isSetting })}
              disabled={disabled}
              onClick={() => {
                if (!isSetting) {
                  setPlaceInputLeft();
                }
                onChange();
              }}
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
              </svg>
            </button>
          </div>
        </div>

        <div className={classnames(value?.value ? "off" : "on")}>
          <button className={classnames("button button--pill  cursor-default !max-w-[300px]", { "is-active": !isSetting })} disabled={disabled}>
            <span className="button--pill__icon mr-6 flex-none">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M192 0C85.903 0 0 86.014 0 192c0 71.117 23.991 93.341 151.271 297.424 18.785 30.119 62.694 30.083 81.457 0C360.075 285.234 384 263.103 384 192 384 85.903 297.986 0 192 0zm0 464C64.576 259.686 48 246.788 48 192c0-79.529 64.471-144 144-144s144 64.471 144 144c0 54.553-15.166 65.425-144 272zm-80-272c0-44.183 35.817-80 80-80s80 35.817 80 80-35.817 80-80 80-80-35.817-80-80z" />
              </svg>
            </span>

            <span className="truncate">{value?.label}</span>

            <a
              type="button"
              className={classnames("button-reset py-2 px-8 leading-none cursor-pointer", !isSetting ? "text-green-75 hover:text-green-85 " : "")}
              onClick={() => {
                onChange();
                setAddressList([]);
              }}
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
              </svg>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Place;
