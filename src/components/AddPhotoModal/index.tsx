import classnames from "classnames";
import _ from "lodash";
import React, { FC, useEffect, useState } from "react";
import Gallery from "./gallery";
import Calendar from "./calendar";
import Mood from "./mood";
import Place from "./place";
import { useTranslation } from "react-i18next";
import Api from "@/service";
import toast from "react-hot-toast";
import Form, { Field } from "rc-field-form";
import { Checked } from "@/components";
import { useRouter } from "next/router";
import { PhotoList } from "@/types/PhotoTypes";

type Props = {
  visible: boolean;
  setModalLeft: () => void;
  value?: PhotoList;
};

const Input = ({ value = "", ...props }) => <input value={value} {...props} />;
const Textarea = ({ value = "", ...props }) => <textarea value={value} {...props} />;

const Index: FC<Props> = (props) => {
  const { visible, setModalLeft, value: defaultValue } = props;
  const [tempFile, setTempFile] = useState<any>(); // 暂存上传的图片文件
  const [tempImage, setTempImage] = useState<any>(); // 暂存上传的图片展示
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!defaultValue) return;
    setTempImage(defaultValue.url);
    setIsEdit(true);
    // 照片描述回显时,需要将<br/>替换为\r\n
    form.setFieldsValue({
      ..._.pick(defaultValue, ["title", "mood"]),
      shootingDate: defaultValue.shooting_date,
      galleryIds: defaultValue.gallery_ids,
      showComments: defaultValue.show_comments,
      description: defaultValue?.description?.replace(/<br\/>/g, "\r\n"),
      place: {
        label: defaultValue.place,
        value: defaultValue.place,
      },
    });
  }, [defaultValue]);

  // 提交表单
  const onSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      // 照片描述保存时,需要将\r\n替换为<br/>
      const description = values.description?.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/\s/g, " ");
      console.log("values", values);
      let params = {
        ...values,
        description,
        place: values?.place?.label,
        placeId: values?.place?.value,
        location: values?.place?.location,
        provincialName: values?.place?.provincialName,
        cityName: values?.place?.cityName,
        areaName: values?.place?.areaName,
        showComments: values?.showComments ? 0 : 1,
      };
      console.log("123", 123);
      if (defaultValue?.id) {
        params.id = defaultValue.id;
        await Api.updatePhoto({ data: params });
        await toast.success("修改成功!");
      } else {
        const { data: photoData } = await Api.uploadPhoto({
          data: tempFile,
        });

        params = {
          ...params,
          url: photoData?.imgUrl,
          width: photoData?.width,
          height: photoData?.height,
          themeColor: photoData?.themeColor,
          galleryIds: (values?.galleryIds || [])?.join(",") || "",
          photoExifInfo: photoData?.photoExifInfo,
        };
        await Api.publishPhoto({ data: params });
        await toast.success("发布成功!");
      }
      setLoading(false);
      form.resetFields();
      setTempFile(undefined);
      setTempImage(undefined);
      setModalLeft();
      router.reload();
    } catch (error) {
      setLoading(false);
    }
  };

  // 图片组件变更
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > 1024 * 1024 * 20) {
      toast.error("文件大小不能超过20M");
      return;
    }
    const formData = new FormData();
    formData.set("UploadForm[file]", file);
    formData.set("name", file.name);
    formData.set("size", `${file.size}`);
    formData.set("type", file.type);
    setTempFile(formData);
    const reader = new FileReader();
    // 创建文件读取对象
    reader.readAsDataURL(file);
    // 监听文件读取结束后事件
    reader.onloadend = (e) => {
      setTempImage(e?.target?.result);
    };
  };

  return (
    <div>
      <div className={classnames("modal", { block: visible })}>
        <div className="modal-dialog modal-dialog--centered">
          <div className="modal-content max-w-552 p-16 md:p-24 w-full">
            <button
              type="button"
              className="modal__close z-30"
              onClick={() => {
                form.resetFields();
                setTempFile(undefined);
                setTempImage(undefined);
                setLoading(false);
                setModalLeft();
              }}
            >
              <svg className="icon pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M231.6 256l130.1-130.1c4.7-4.7 4.7-12.3 0-17l-22.6-22.6c-4.7-4.7-12.3-4.7-17 0L192 216.4 61.9 86.3c-4.7-4.7-12.3-4.7-17 0l-22.6 22.6c-4.7 4.7-4.7 12.3 0 17L152.4 256 22.3 386.1c-4.7 4.7-4.7 12.3 0 17l22.6 22.6c4.7 4.7 12.3 4.7 17 0L192 295.6l130.1 130.1c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17L231.6 256z" />
              </svg>
            </button>

            <Form
              form={form}
              initialValues={{
                title: undefined,
                description: undefined,
                galleryIds: undefined,
                shootingDate: undefined,
                mood: undefined,
                place: undefined,
                showComments: false,
              }}
            >
              {(values, _form) => (
                <div className="story-form">
                  <div className="bg-white -m-16 md:-m-24 sm:rounded-6">
                    <div className={classnames(tempFile || isEdit ? "on" : "off")}>
                      <label className="w-full bg-grey-96 sm:rounded-6 relative cursor-pointer select-none">
                        <input type="file" className="hidden" accept="image/jpeg" key={tempFile?.get("name")} onChange={onFileChange} disabled={loading} />
                        <img
                          src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'521' height%3D'300'%2F%3E"
                          width="521"
                          height="300"
                          alt=""
                          className="block w-full invisible"
                        />

                        <div className="absolute pin flex items-center justify-center flex-col text-center pointer-events-none">
                          <div>
                            <svg className="icon text-grey-80 text-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                              <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zm-139.9 63.7l-10.8 10.8c-9.6 9.6-25.2 9.3-34.5-.5L320 266.1V392c0 13.3-10.7 24-24 24h-16c-13.3 0-24-10.7-24-24V266.1l-32.4 34.5c-9.3 9.9-24.9 10.1-34.5.5l-10.8-10.8c-9.4-9.4-9.4-24.6 0-33.9l92.7-92.7c9.4-9.4 24.6-9.4 33.9 0l92.7 92.7c9.4 9.4 9.4 24.6.1 33.9z" />
                            </svg>
                          </div>

                          <div className="text-14 leading-md my-24">{t("photoModal.drop")}</div>

                          <div>
                            <span className="button button--primary">{t("photoModal.browse")}</span>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className={classnames("p-16 md:p-24", tempFile || isEdit ? "off" : "on")}>
                      <div className="w-full">
                        <div className="flex rounded-t-8 mb-16">
                          <div className="bg-grey-96 flex-none w-[120px] h-[120px] p-8 md:p-12 rounded overflow-hidden mr-16 md:mr-32 relative">
                            <div className="story-form__preview relative w-full h-full">
                              <input
                                type="file"
                                className={classnames("w-full h-full opacity-0 absolute", isEdit || loading ? "cursor-default" : "cursor-pointer")}
                                accept="image/jpeg"
                                key={tempFile?.get("name")}
                                onChange={onFileChange}
                                title={!(isEdit || loading) ? "重新选择图片" : ""}
                                disabled={loading || isEdit}
                              />
                              <img
                                src={tempImage || "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'120' height%3D'120'%2F%3E"}
                                className="block w-full h-full object-cover"
                              />
                            </div>

                            {/* <div className="story-form__progress absolute pin-y pin-r bg-grey-96 opacity-95 w-full z-10"></div> */}
                          </div>
                          <div>
                            <Field name="title" rules={[{ required: true, message: "请输入标题" }]}>
                              <Input className="input story-form__input story-form__input--title" placeholder={t("photoModal.add_title")} maxLength={255} disabled={loading} />
                            </Field>

                            <div
                              className={classnames("text-red text-12 leading-sm mt-8", {
                                hidden: !_form.getFieldError("title")?.[0],
                              })}
                            >
                              {_form.getFieldError("title")?.[0]}
                            </div>

                            <div className="mt-16">
                              <Field name="description">
                                <Textarea
                                  className="input story-form__input"
                                  maxLength={20480}
                                  rows={3}
                                  placeholder={t("photoModal.description")}
                                  spellCheck="true"
                                  disabled={loading}
                                  cols={50}
                                />
                              </Field>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap -mb-8">
                          <div className="mr-8 mb-8">
                            <Field
                              name="shootingDate"
                              rules={[
                                {
                                  required: true,
                                  message: "请选择照片的拍摄时间",
                                },
                              ]}
                            >
                              <Calendar disabled={loading} />
                            </Field>
                          </div>

                          <div className="mr-8 mb-8">
                            <Field name="galleryIds">
                              <Gallery disabled={loading} />
                            </Field>
                          </div>

                          <div className="mr-8 mb-8">
                            <Field name="mood">
                              <Mood disabled={loading} />
                            </Field>
                          </div>

                          <div className="mr-8 mb-8">
                            <Field name="showComments">
                              <Checked disabled={loading}>
                                <button className="button button--pill is-off" disabled={loading}>
                                  <span className="button--pill__icon" title={t("photoModal.comments_off")}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                      <path d="M320 80c114.7 0 208 71.8 208 160 0 25.3-7.9 49.1-21.5 70.4l37.9 29.6c20.1-29.6 31.6-63.7 31.6-100 0-114.9-114.6-208-256-208-48.2 0-93 11-131.5 29.8l43 33.6C258.4 85.6 288.3 80 320 80zm0 320c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C133.7 314.1 112 282.2 112 240c0-16.6 3.3-32.7 9.5-47.8L82.8 162c-12 24.1-18.8 50.4-18.8 78 0 47.6 19.9 91.2 52.9 126.3-14.9 39.4-45.9 72.8-46.4 73.2-6.6 7-8.4 17.2-4.6 26S78.4 480 88 480c61.5 0 110-25.7 139.1-46.3C256 442.8 287.2 448 320 448c37.5 0 73-6.7 105.1-18.5l-46.2-36.2c-18.7 4.3-38.5 6.7-58.9 6.7zm314 71L481.6 351.8l-6.8-5.3L36 3.5C29.1-2 19-.9 13.5 6l-10 12.5C-2 25.4-.9 35.5 6 41l598 467.5c6.9 5.5 17 4.4 22.5-2.5l10-12.5c5.5-6.9 4.4-17-2.5-22.5z" />
                                    </svg>
                                  </span>
                                </button>

                                <button className="button button--pill is-on" disabled={loading}>
                                  <span className="button--pill__icon" title={t("photoModal.comments_on")}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                      <path d="M288 32C129 32 0 125.1 0 240c0 49.3 23.7 94.5 63.3 130.2-8.7 23.3-22.1 32.7-37.1 43.1C15.1 421-6 433 1.6 456.5c5.1 15.4 20.9 24.7 38.1 23.3 57.7-4.6 111.2-19.2 157-42.5 28.7 6.9 59.4 10.7 91.2 10.7 159.1 0 288-93 288-208C576 125.1 447.1 32 288 32zm0 368c-32.5 0-65.4-4.4-97.3-14-32.3 19-78.7 46-134.7 54 32-24 56.8-61.6 61.2-88.4C79.1 325.6 48 286.7 48 240c0-70.9 86.3-160 240-160s240 89.1 240 160c0 71-86.3 160-240 160z" />
                                    </svg>
                                  </span>
                                </button>
                              </Checked>
                            </Field>
                          </div>

                          <div className="mr-8 mb-8">
                            <Field name="place">
                              <Place disabled={loading} />
                            </Field>
                          </div>
                        </div>

                        <div
                          className={classnames("text-red text-12 leading-sm mt-8", {
                            hidden: !_form.getFieldError("shootingDate"),
                          })}
                        >
                          {_form.getFieldError("shootingDate")}
                        </div>

                        <button className="button button--primary w-full mt-4" disabled={loading} onClick={onSubmit}>
                          {defaultValue?.id ? t("photoModal.save_change") : t("photoModal.publish_photo")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
