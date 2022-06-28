import { IItem } from "@components/Menu";
import { useClickAway, useRafInterval, useToggle } from "ahooks";
import classnames from "classnames";
import _ from "lodash";
import React, { FC, useEffect, useRef, useState } from "react";
import { Menu } from "../";
import Gallery from "./gallery";
import Calendar from "./calendar";
import Mood from "./mood";
import Place from "./place";
import { useTranslation } from "react-i18next";

type Props = {
    visible: boolean;
    setModalLeft: () => void;
};
const Index: FC<Props> = (props) => {
    const { visible, setModalLeft } = props;
    const [tempImage, setTempImage] = useState<File | null | undefined>(); // 暂存图片base64
    const [progress, setProgress] = useState(0); // 上传进度
    const [isUploadDone, setIsUploadDone] = useState(false); // 是否上传完成
    const [formValues, setFormValues] = useState<any>(); // 表单值
    const [errorInfo, setErrorInfo] = useState<{ [key: string]: string }>({}); // 错误信息
    const [progressInterval, setProgressInterval] = useState<
        number | undefined
    >(undefined); // 进度更新间隔

    const { t } = useTranslation();

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
        setErrorInfo({});
    };

    // 校验字段
    const validateFields = (values: any): Promise<any> =>
        new Promise((resolve, reject) => {
            console.log("values", values);
            const _errorInfo: { [key: string]: string } = {};
            Object.keys(values).forEach((key) => {
                if (!values?.title) {
                    _errorInfo.title = t("photoModal.title_is_required");
                }
                if (!values?.date) {
                    _errorInfo.date = t("photoModal.date_is_required");
                }
                if (!values?.description) {
                    _errorInfo.description = t(
                        "photoModal.description_is_required",
                    );
                }
            });
            if (Object.keys(_errorInfo)?.length) {
                setErrorInfo(_errorInfo);
                reject(_errorInfo);
            } else {
                resolve(values);
            }
        });

    // 设置表单值
    const onFormValueChange = async (filedName: string, value?: any) => {
        const _formValues = { ...formValues, [filedName]: value };
        setFormValues(_formValues);
    };

    // 提交表单
    const onSubmit = async () => {
        const values = await validateFields(formValues);
        console.log("values", values);
    };

    return (
        <div>
            <div className={classnames("modal", { block: visible })}>
                <div className="modal-dialog modal-dialog--centered">
                    <div className="modal-content max-w-552 p-16 md:p-24 w-full">
                        <button
                            type="button"
                            className="modal__close z-30"
                            onClick={setModalLeft}
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
                                                key={tempImage?.name}
                                                onChange={(e) => {
                                                    console.log(
                                                        "e.target?.files",
                                                        e.target?.files,
                                                    );
                                                    setTempImage(
                                                        e.target?.files?.[0],
                                                    );
                                                    setProgressInterval(1);
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
                                                    {t("photoModal.drop")}
                                                </div>

                                                <div>
                                                    <span className="button button--primary">
                                                        {t("photoModal.browse")}
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
                                                        {t("photoModal.edit")}
                                                    </div>

                                                    <div className="text-12 md:text-14">
                                                        {t("photoModal.change")}
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
                                                            {t(
                                                                "photoModal.uploading",
                                                            )}
                                                            &nbsp;
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
                                                                {t(
                                                                    "photoModal.cancel",
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="on flex-col">
                                                        <div>
                                                            {t(
                                                                "photoModal.uploaded",
                                                            )}
                                                            !
                                                        </div>

                                                        <div>
                                                            <button
                                                                type="button"
                                                                className="button-reset text-black hover:underline"
                                                                onClick={
                                                                    cancelUpload
                                                                }
                                                            >
                                                                {t(
                                                                    "photoModal.remove",
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <input
                                                className="input story-form__input story-form__input--title"
                                                placeholder={t(
                                                    "photoModal.add_title",
                                                )}
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
                                                    {
                                                        hidden: !errorInfo?.title,
                                                    },
                                                )}
                                            >
                                                {errorInfo?.title}
                                            </div>

                                            <div className="my-16">
                                                <textarea
                                                    className="input story-form__input"
                                                    maxLength={20480}
                                                    rows={3}
                                                    placeholder={t(
                                                        "photoModal.description",
                                                    )}
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
                                                        {
                                                            hidden: !errorInfo?.description,
                                                        },
                                                    )}
                                                >
                                                    {t(
                                                        "photoModal.description_is_required",
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap -mb-8">
                                                <div className="mr-8 mb-8">
                                                    <Calendar
                                                        value={formValues?.date}
                                                        onChange={(value) =>
                                                            onFormValueChange(
                                                                "date",
                                                                value,
                                                            )
                                                        }
                                                        disabled={!isUploadDone}
                                                    />
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
                                                            onChange={() => {}}
                                                        />

                                                        <label className="button button--pill is-off">
                                                            <span
                                                                className="button--pill__icon"
                                                                title={t(
                                                                    "photoModal.comments_off",
                                                                )}
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
                                                                title={t(
                                                                    "photoModal.comments_on",
                                                                )}
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

                                                <div className="mr-8 mb-8">
                                                    <Place
                                                        value={
                                                            formValues?.place
                                                        }
                                                        onChange={(value) =>
                                                            onFormValueChange(
                                                                "place",
                                                                value,
                                                            )
                                                        }
                                                        disabled={!isUploadDone}
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                className={classnames(
                                                    "text-red text-12 leading-sm mt-8",
                                                    {
                                                        hidden: !errorInfo?.date,
                                                    },
                                                )}
                                            >
                                                {errorInfo?.date}
                                            </div>

                                            <button
                                                className="button button--primary w-full mt-16 md:mt-24"
                                                onClick={onSubmit}
                                                disabled={
                                                    !isUploadDone ||
                                                    !!Object.keys(errorInfo)
                                                        ?.length
                                                }
                                            >
                                                {t("photoModal.publish_photo")}
                                                {/* {t("photoModal.save_change")} */}
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
