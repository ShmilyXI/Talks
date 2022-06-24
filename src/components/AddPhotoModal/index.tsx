import { IItem } from "@components/Menu";
import { useClickAway, useRafInterval, useToggle } from "ahooks";
import classnames from "classnames";
import _ from "lodash";
import React, { useState } from "react";
import { Menu } from "../";
import Gallery from "./gallery";
import Mood from "./mood";

const Index = () => {
    const [tempImage, setTempImage] = useState<File | null | undefined>(); // 暂存图片base64
    const [progress, setProgress] = useState(0); // 上传进度
    const [isUploadDone, setIsUploadDone] = useState(false); // 是否上传完成
    const [formValues, setFormValues] = useState<any>(); // 表单值
    const [placeSearchValue, setPlaceSearchValue] = useState<string>(); // 地点搜索值

    const [progressInterval, setProgressInterval] = useState<
        number | undefined
    >(1); // 进度更新间隔

    const [showModal, { toggle: toggleModal, setLeft: setModalLeft }] =
        useToggle(true);

    const [
        showPlaceMenu,
        {
            toggle: togglePlaceMenu,
            setLeft: setPlaceMenuLeft,
            setRight: setPlaceMenuRight,
        },
    ] = useToggle(); // 是否展示地点筛选框
    const [
        showPlaceInput,
        { toggle: togglePlaceInput, setLeft: setPlaceInputLeft },
    ] = useToggle(); // 是否展示地点输入框

    useRafInterval(() => {
        if (progress + 1 > 100) {
            setProgressInterval(undefined);
            setIsUploadDone(true);
            return;
        }
        setProgress(progress + 1);
    }, progressInterval);

    // 取消上传
    const cancelUpload = () => {
        setProgressInterval(undefined);
        setProgress(0);
        setTempImage(undefined);
        setIsUploadDone(false);
    };

    // 设置表单值
    const onFormValueChange = (filedName: string, value?: any) => {
        const _formValues = { ...formValues, [filedName]: value };
        setFormValues(_formValues);
    };

    return (
        <div>
            <div className={classnames("modal", { block: showModal })}>
                <div className="modal-dialog modal-dialog--centered">
                    <div className="modal-content max-w-552 p-16 md:p-24 w-full">
                        <button
                            type="button"
                            className="modal__close z-30"
                            onClick={toggleModal}
                        >
                            <svg
                                className="icon pointer-events-none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                            >
                                <path d="M231.6 256l130.1-130.1c4.7-4.7 4.7-12.3 0-17l-22.6-22.6c-4.7-4.7-12.3-4.7-17 0L192 216.4 61.9 86.3c-4.7-4.7-12.3-4.7-17 0l-22.6 22.6c-4.7 4.7-4.7 12.3 0 17L152.4 256 22.3 386.1c-4.7 4.7-4.7 12.3 0 17l22.6 22.6c4.7 4.7 12.3 4.7 17 0L192 295.6l130.1 130.1c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17L231.6 256z" />
                            </svg>
                        </button>

                        <div>
                            <div className="story-form">
                                <div className="bg-white -m-16 md:-m-24 sm:rounded-6">
                                    <div
                                        className={classnames(
                                            tempImage ? "on" : "off",
                                        )}
                                    >
                                        <label className="w-full bg-grey-96 sm:rounded-6 relative cursor-pointer select-none">
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/jpeg"
                                                onChange={(e) => {
                                                    setTempImage(
                                                        e.target?.files?.[0],
                                                    );
                                                    setProgressInterval(200);
                                                }}
                                            />

                                            <img
                                                src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'552' height%3D'343'%2F%3E"
                                                width="552"
                                                height="343"
                                                alt=""
                                                className="block w-full invisible"
                                            />

                                            <div className="absolute pin flex items-center justify-center flex-col text-center pointer-events-none">
                                                <div>
                                                    <svg
                                                        className="icon text-grey-80 text-24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 640 512"
                                                    >
                                                        <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zm-139.9 63.7l-10.8 10.8c-9.6 9.6-25.2 9.3-34.5-.5L320 266.1V392c0 13.3-10.7 24-24 24h-16c-13.3 0-24-10.7-24-24V266.1l-32.4 34.5c-9.3 9.9-24.9 10.1-34.5.5l-10.8-10.8c-9.4-9.4-9.4-24.6 0-33.9l92.7-92.7c9.4-9.4 24.6-9.4 33.9 0l92.7 92.7c9.4 9.4 9.4 24.6.1 33.9z" />
                                                    </svg>
                                                </div>

                                                <div className="text-14 leading-md my-24">
                                                    Drop your photo here, or
                                                    click to browse your drive.
                                                </div>

                                                <div>
                                                    <span className="button button--primary">
                                                        Browse…
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    <div
                                        className={classnames(
                                            "p-16 md:p-24",
                                            tempImage ? "off" : "on",
                                        )}
                                    >
                                        <div className="w-full">
                                            <div className="bg-grey-96 flex items-center -mx-16 -mt-16 mb-16 md:-mx-24 md:-mt-24 md:mb-24 p-16 md:p-24 rounded-t-8">
                                                <div className="flex-none w-84 md:w-108 rounded overflow-hidden mr-16 md:mr-32 relative">
                                                    <div className="story-form__preview"></div>

                                                    <div className="story-form__progress absolute pin-y pin-r bg-grey-96 opacity-95 w-full z-10"></div>
                                                </div>
                                                <div
                                                    className={classnames(
                                                        "flex-grow text-14 leading-md",
                                                        { hidden: true },
                                                    )}
                                                >
                                                    <div className="text-black">
                                                        Edit photo
                                                    </div>

                                                    <div className="text-12 md:text-14">
                                                        You can change photo
                                                        details below
                                                    </div>
                                                </div>
                                                <div
                                                    className={classnames(
                                                        "flex-grow text-14 leading-md",
                                                        { hidden: false },
                                                    )}
                                                >
                                                    <div className="off flex-col">
                                                        <div>
                                                            Uploading&nbsp;
                                                            <span>
                                                                {progress} B
                                                            </span>
                                                            &nbsp; (
                                                            <span>
                                                                &nbsp;{progress}
                                                                %
                                                            </span>
                                                            )
                                                        </div>

                                                        <div className="text-12 md:text-14">
                                                            <button
                                                                type="button"
                                                                className="button-reset text-black hover:underline"
                                                                onClick={
                                                                    cancelUpload
                                                                }
                                                            >
                                                                Cancel upload
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="on flex-col">
                                                        <div>Uploaded!</div>

                                                        <div>
                                                            <button
                                                                type="button"
                                                                className="button-reset text-black hover:underline"
                                                                onClick={
                                                                    cancelUpload
                                                                }
                                                            >
                                                                Remove photo
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <input
                                                className="input story-form__input story-form__input--title"
                                                placeholder="Add title"
                                                maxLength={255}
                                                disabled={!isUploadDone}
                                                name="title"
                                                type="text"
                                                onChange={(e) => {
                                                    onFormValueChange(
                                                        "title",
                                                        e.target.value,
                                                    );
                                                }}
                                            />

                                            <div
                                                className={classnames(
                                                    "text-red text-12 leading-sm mt-8",
                                                    { hidden: true },
                                                )}
                                            >
                                                错误信息xxxx
                                            </div>

                                            <div className="my-16">
                                                <textarea
                                                    className="input story-form__input"
                                                    maxLength={20480}
                                                    rows={3}
                                                    placeholder="Describe your day…"
                                                    spellCheck="true"
                                                    disabled={!isUploadDone}
                                                    name="body"
                                                    cols={50}
                                                    onChange={(e) => {
                                                        onFormValueChange(
                                                            "description",
                                                            e.target.value,
                                                        );
                                                    }}
                                                ></textarea>

                                                <div
                                                    className={classnames(
                                                        "text-red text-12 leading-sm mt-8",
                                                        { hidden: true },
                                                    )}
                                                >
                                                    错误信息xxxx
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap -mb-8">
                                                <div className="mr-8 mb-8">
                                                    <div className="relative z-10">
                                                        <button
                                                            className={classnames(
                                                                "button button--pill",
                                                                formValues?.date
                                                                    ? "is-active"
                                                                    : "is-invalid",
                                                            )}
                                                            type="button"
                                                            disabled={
                                                                !isUploadDone
                                                            }
                                                        >
                                                            <span title="Select date">
                                                                <span className="button--pill__icon mr-6">
                                                                    <svg
                                                                        className="icon"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 448 512"
                                                                    >
                                                                        <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z" />
                                                                    </svg>
                                                                </span>

                                                                <span className="pr-6">
                                                                    {formValues?.date ||
                                                                        "No date"}
                                                                </span>
                                                            </span>
                                                        </button>

                                                        <input
                                                            disabled
                                                            data-action="change-&gt;stories--create#onDateChanged change-&gt;calendar#onDateChanged change-&gt;story--date#onDateChanged"
                                                            data-controller="story--calendar"
                                                            data-target="stories--create.calendar story--date.input"
                                                            data-story--calendar-append-to="stories--create-popover"
                                                            name="taken_at"
                                                            type="hidden"
                                                        />

                                                        <div
                                                            className="w-248 hidden"
                                                            data-target="calendar.popover"
                                                            id="stories--create-popover"
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="mr-8 mb-8">
                                                    <Mood
                                                        value={formValues?.mood}
                                                        onChange={(value) =>
                                                            onFormValueChange(
                                                                "mood",
                                                                value,
                                                            )
                                                        }
                                                        disabled={!isUploadDone}
                                                    />
                                                </div>

                                                <div className="mr-8 mb-8">
                                                    <Gallery
                                                        onChange={(value) =>
                                                            onFormValueChange(
                                                                "gallery",
                                                                value,
                                                            )
                                                        }
                                                        disabled={!isUploadDone}
                                                    />
                                                </div>

                                                <div className="mr-8 mb-8">
                                                    <div
                                                        className="checkbox-button"
                                                        onClick={() => {
                                                            onFormValueChange(
                                                                "commentable",
                                                                !formValues?.commentable,
                                                            );
                                                        }}
                                                    >
                                                        <input
                                                            checked={
                                                                !!formValues?.commentable
                                                            }
                                                            name="is_commentable"
                                                            type="checkbox"
                                                        />

                                                        <label className="button button--pill is-off">
                                                            <span
                                                                className="button--pill__icon"
                                                                title="Comments off"
                                                            >
                                                                <svg
                                                                    className="icon"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 640 512"
                                                                >
                                                                    <path d="M320 80c114.7 0 208 71.8 208 160 0 25.3-7.9 49.1-21.5 70.4l37.9 29.6c20.1-29.6 31.6-63.7 31.6-100 0-114.9-114.6-208-256-208-48.2 0-93 11-131.5 29.8l43 33.6C258.4 85.6 288.3 80 320 80zm0 320c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C133.7 314.1 112 282.2 112 240c0-16.6 3.3-32.7 9.5-47.8L82.8 162c-12 24.1-18.8 50.4-18.8 78 0 47.6 19.9 91.2 52.9 126.3-14.9 39.4-45.9 72.8-46.4 73.2-6.6 7-8.4 17.2-4.6 26S78.4 480 88 480c61.5 0 110-25.7 139.1-46.3C256 442.8 287.2 448 320 448c37.5 0 73-6.7 105.1-18.5l-46.2-36.2c-18.7 4.3-38.5 6.7-58.9 6.7zm314 71L481.6 351.8l-6.8-5.3L36 3.5C29.1-2 19-.9 13.5 6l-10 12.5C-2 25.4-.9 35.5 6 41l598 467.5c6.9 5.5 17 4.4 22.5-2.5l10-12.5c5.5-6.9 4.4-17-2.5-22.5z" />
                                                                </svg>
                                                            </span>
                                                        </label>

                                                        <label className="button button--pill is-on">
                                                            <span
                                                                className="button--pill__icon"
                                                                title="Comments on"
                                                            >
                                                                <svg
                                                                    className="icon"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                >
                                                                    <path d="M288 32C129 32 0 125.1 0 240c0 49.3 23.7 94.5 63.3 130.2-8.7 23.3-22.1 32.7-37.1 43.1C15.1 421-6 433 1.6 456.5c5.1 15.4 20.9 24.7 38.1 23.3 57.7-4.6 111.2-19.2 157-42.5 28.7 6.9 59.4 10.7 91.2 10.7 159.1 0 288-93 288-208C576 125.1 447.1 32 288 32zm0 368c-32.5 0-65.4-4.4-97.3-14-32.3 19-78.7 46-134.7 54 32-24 56.8-61.6 61.2-88.4C79.1 325.6 48 286.7 48 240c0-70.9 86.3-160 240-160s240 89.1 240 160c0 71-86.3 160-240 160z" />
                                                                </svg>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="mr-8 mb-8 min-w-0">
                                                    <div className="relative">
                                                        <input
                                                            type="hidden"
                                                            name="place"
                                                            disabled={
                                                                !isUploadDone
                                                            }
                                                        />

                                                        <div>
                                                            <div
                                                                className={classnames(
                                                                    formValues
                                                                        ?.place
                                                                        ?.value
                                                                        ? "on"
                                                                        : "off",
                                                                )}
                                                            >
                                                                <div
                                                                    className={classnames(
                                                                        showPlaceInput
                                                                            ? "on"
                                                                            : "off",
                                                                    )}
                                                                >
                                                                    <button
                                                                        className="button button--pill"
                                                                        type="button"
                                                                        onClick={
                                                                            togglePlaceInput
                                                                        }
                                                                    >
                                                                        <span
                                                                            className="button--pill__icon"
                                                                            title="Add place"
                                                                        >
                                                                            <svg
                                                                                className="icon"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 384 512"
                                                                            >
                                                                                <path d="M192 0C85.903 0 0 86.014 0 192c0 71.117 23.991 93.341 151.271 297.424 18.785 30.119 62.694 30.083 81.457 0C360.075 285.234 384 263.103 384 192 384 85.903 297.986 0 192 0zm0 464C64.576 259.686 48 246.788 48 192c0-79.529 64.471-144 144-144s144 64.471 144 144c0 54.553-15.166 65.425-144 272zm-80-272c0-44.183 35.817-80 80-80s80 35.817 80 80-35.817 80-80 80-80-35.817-80-80z" />
                                                                            </svg>
                                                                        </span>
                                                                    </button>
                                                                </div>

                                                                <div
                                                                    className={classnames(
                                                                        "relative",
                                                                        showPlaceInput
                                                                            ? "off"
                                                                            : "on",
                                                                    )}
                                                                >
                                                                    <Menu
                                                                        visible={
                                                                            showPlaceMenu
                                                                        }
                                                                        onChange={(
                                                                            item,
                                                                        ) => {
                                                                            onFormValueChange(
                                                                                "place",
                                                                                item,
                                                                            );
                                                                            setPlaceInputLeft();
                                                                        }}
                                                                        setLeft={
                                                                            setPlaceMenuLeft
                                                                        }
                                                                        modalClassName="top-[-8px] left-[-5px] w-full"
                                                                        wrapClassName="py-2"
                                                                        items={[
                                                                            {
                                                                                label: "111",
                                                                                value: "1",
                                                                            },
                                                                            {
                                                                                label: "222",
                                                                                value: "2",
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            className="input py-5 pr-28"
                                                                            placeholder="Location"
                                                                            disabled={
                                                                                !isUploadDone
                                                                            }
                                                                            value={
                                                                                placeSearchValue ||
                                                                                ""
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) => {
                                                                                const value =
                                                                                    e
                                                                                        .target
                                                                                        .value ||
                                                                                    "";
                                                                                setPlaceSearchValue(
                                                                                    e
                                                                                        .target
                                                                                        .value ||
                                                                                        "",
                                                                                );
                                                                                if (
                                                                                    value
                                                                                ) {
                                                                                    setPlaceMenuRight();
                                                                                } else {
                                                                                    setPlaceMenuLeft();
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Menu>
                                                                    <button
                                                                        type="button"
                                                                        className="button-reset py-2 px-8 leading-none text-grey-80 hover:text-grey-53 absolute pin-r pin-t-center"
                                                                        onClick={() => {
                                                                            setPlaceSearchValue(
                                                                                "",
                                                                            );
                                                                            setPlaceInputLeft();
                                                                        }}
                                                                    >
                                                                        <svg
                                                                            className="icon"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 320 512"
                                                                        >
                                                                            <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div
                                                                className={classnames(
                                                                    formValues
                                                                        ?.place
                                                                        ?.value
                                                                        ? "off"
                                                                        : "on",
                                                                )}
                                                            >
                                                                <div className="button button--pill is-active cursor-default">
                                                                    <span className="button--pill__icon mr-6 flex-none">
                                                                        <svg
                                                                            className="icon"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 384 512"
                                                                        >
                                                                            <path d="M192 0C85.903 0 0 86.014 0 192c0 71.117 23.991 93.341 151.271 297.424 18.785 30.119 62.694 30.083 81.457 0C360.075 285.234 384 263.103 384 192 384 85.903 297.986 0 192 0zm0 464C64.576 259.686 48 246.788 48 192c0-79.529 64.471-144 144-144s144 64.471 144 144c0 54.553-15.166 65.425-144 272zm-80-272c0-44.183 35.817-80 80-80s80 35.817 80 80-35.817 80-80 80-80-35.817-80-80z" />
                                                                        </svg>
                                                                    </span>

                                                                    <span className="truncate">
                                                                        {
                                                                            formValues
                                                                                ?.place
                                                                                ?.label
                                                                        }
                                                                    </span>

                                                                    <button
                                                                        type="button"
                                                                        className="button-reset py-2 px-8 leading-none text-green-75 hover:text-green-85"
                                                                        onClick={() => {
                                                                            setPlaceSearchValue(
                                                                                "",
                                                                            );
                                                                            onFormValueChange(
                                                                                "place",
                                                                            );
                                                                            // setPlaceInputLeft();
                                                                        }}
                                                                    >
                                                                        <svg
                                                                            className="icon"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 320 512"
                                                                        >
                                                                            <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-14 leading-md text-red mt-16 hidden">
                                                错误信息 xxxx1
                                            </div>

                                            <div className="text-red text-12 leading-sm mt-8 hidden">
                                                错误信息 xxxx2
                                            </div>

                                            <button
                                                className="button button--primary w-full mt-16 md:mt-24"
                                                type="submit"
                                                // disabled
                                            >
                                                Publish photo
                                                {/* Save changes  */}
                                            </button>
                                        </div>
                                    </div>
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
