import React, { useEffect, useState } from "react";
import Filter from "@components/Filter";
import Menu, { IItem } from "@components/Menu";
import Form, { Field } from "rc-field-form";
import toast from "react-hot-toast";
import classnames from "classnames";
import { Storage } from "@/utils/storage";
import Api from "@/service";
import { useRouter } from "next/router";
import _ from "lodash";
import Place from "@components/AddPhotoModal/place";

const Index = () => {
  const [tempFile, setTempFile] = useState<any>(); // 暂存上传的图片文件
  const [tempImage, setTempImage] = useState<any>(); // 暂存上传的图片展示
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    const storage = new Storage(sessionStorage, "Talks");
    const _userInfo = JSON.parse(storage.getItem("userInfo") || "{}");
    const place = {
      value: _userInfo?.place_id,
      label: _userInfo?.place,
      location: _userInfo?.location,
      provincialName: _userInfo?.provincial_name,
      cityName: _userInfo?.city_name,
      areaName: _userInfo?.area_name,
    };
    form.setFieldsValue({
      displayName: _userInfo?.display_name,
      place,
      email: _userInfo?.email,
      userName: _userInfo?.username,
      // 个人简介回显时,需要将<br/>替换为\r\n
      individualResume: _userInfo?.individual_resume?.replace(/<br\/>/g, "\r\n"),
    });
    setUserInfo(_userInfo);
  }, []);

  const items: IItem[] = [
    { label: "Profile", value: "1" },
    { label: "Preferences", value: "2" },
    { label: "Social", value: "3" },
    { label: "Exports", value: "4" },
    { label: "Billing", value: "5" },
    { label: "Blocking", value: "6" },
  ];

  // 提交
  const onSubmit = async () => {
    if (!tempFile && !userInfo?.avatar_url) {
      toast.error("请上传头像!");
      return;
    }
    const values = await form.validateFields();
    console.log("values", values);
    setLoading(true);
    try {
      // 如果已经存在头像,且没有上传新的头像,则不需要上传
      let avatarUrl = userInfo?.avatar_url;
      if (tempFile) {
        const { data: _avatarUrl } = await Api.uploadAvatar({
          data: tempFile,
        });
        avatarUrl = _avatarUrl;
      }
      // 个人简介保存时,需要将\r\n替换为<br/>
      const individualResume = values.individualResume?.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/\s/g, " ");
      const { data } = await Api.updateUserInfo({
        data: {
          ...values,
          place: values?.place?.label,
          placeId: values?.place?.value,
          location: values?.place?.location,
          provincialName: values?.place?.provincialName,
          cityName: values?.place?.cityName,
          areaName: values?.place?.areaName,
          individualResume,
          avatarUrl,
        },
      });
      form.resetFields();
      setTempFile(undefined);
      setTempImage(undefined);
      console.log("data", data);
      const storage = new Storage(sessionStorage, "Talks");
      storage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      await toast.success("提交成功!");
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
    if (file.size > 1024 * 1024 * 10) {
      toast.error("文件大小不能超过10M");
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
      <div className="d-container p-0 md:py-32 lg:py-48 shadow-navbar md:shadow-none">
        <div className="hidden md:block">
          <div className="d-container max-w-744">
            <h1 className="text-28 lg:text-32 leading-xs text-center">Settings</h1>
          </div>
        </div>

        {/* 暂时只有个人信息更新选项,其他的先隐藏 */}
        <div className="d-container max-w-744 py-16 md:py-0 hidden">
          <div className="md:mt-24">
            <Filter
              breakPoint="md"
              items={items}
              onChange={(item) => {
                console.log("item", item);
              }}
            />
          </div>
        </div>
      </div>
      <div className="d-container max-w-552 p-16 md:pt-0 sm:pb-24 md:pb-24 lg:pb-32 xl:pb-48">
        <Form form={form}>
          {(values, _form) => (
            <>
              <input accept="image/jpeg,image/jpg,image/png" className="hidden" id="avatar" type="file" key={tempFile?.get("name")} disabled={loading} onChange={onFileChange} />
              <div className="flex flex-col sm:flex-row items-center mb-24">
                <div className="flex-none">
                  <label className="avatar" htmlFor="avatar">
                    <img
                      src={tempImage || userInfo?.avatar_url || "https://tookapic.com/img/avatars/default.png"}
                      width={96}
                      height={96}
                      title="重新上传头像"
                      className="avatar__photo object-cover w-[96px] h-[96px]"
                    />
                  </label>
                </div>

                <div className="mt-24 sm:mt-0 sm:ml-32 text-center sm:text-left">
                  <div>
                    <label htmlFor="avatar" className="button button--secondary">
                      上传头像
                    </label>
                  </div>

                  <div className="mt-8 text-12 leading-sm">至少256x256像素的PNG或JPG文件</div>
                </div>
              </div>

              <div className="flex flex-wrap -mx-12">
                <div className="mb-16 px-12 w-full sm:w-1/2">
                  <div className="text-14 leading-md mb-8">显示名称</div>
                  <Field name="displayName" rules={[{ required: true, message: "请输入显示名称" }]}>
                    <input className="input" disabled={loading} maxLength={64} type="text" />
                  </Field>
                  <div
                    className={classnames("text-red text-12 leading-sm mt-8", {
                      hidden: !_form.getFieldError("displayName")?.[0],
                    })}
                  >
                    {_form.getFieldError("displayName")?.[0]}
                  </div>
                </div>

                <div className="mb-16 px-12 w-full sm:w-1/2">
                  <div className="text-14 leading-md mb-8">位置</div>
                  <Field name="place">
                    <Place isSetting disabled={loading} />
                  </Field>

                  <div
                    className={classnames("text-red text-12 leading-sm mt-8", {
                      hidden: !_form.getFieldError("place")?.[0],
                    })}
                  >
                    {_form.getFieldError("place")?.[0]}
                  </div>
                </div>

                <div className="mb-16 px-12 w-full sm:w-1/2">
                  <div className="text-14 leading-md mb-8">用户名</div>
                  <Field name="userName" rules={[{ required: true, message: "请输入用户名" }]}>
                    <input className="input" disabled={loading} maxLength={32} type="text" />
                  </Field>
                  <div
                    className={classnames("text-red text-12 leading-sm mt-8", {
                      hidden: !_form.getFieldError("userName")?.[0],
                    })}
                  >
                    {_form.getFieldError("userName")?.[0]}
                  </div>
                </div>

                <div className="mb-16 px-12 w-full sm:w-1/2">
                  <div className="text-14 leading-md mb-8">电子邮件</div>
                  <Field
                    name="email"
                    rules={[
                      { required: true, message: "请输入电子邮件" },
                      {
                        validator(rule, value) {
                          if (!/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(value)) {
                            return Promise.reject(new Error("请输入正确的电子邮件"));
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <input className="input" disabled={loading} maxLength={80} type="text" />
                  </Field>
                  <div
                    className={classnames("text-red text-12 leading-sm mt-8", {
                      hidden: !_form.getFieldError("email")?.[0],
                    })}
                  >
                    {_form.getFieldError("email")?.[0]}
                  </div>
                </div>

                <div className="mb-16 px-12 w-full" data-controller="characters-left">
                  <div className="flex justify-between items-center mb-8">
                    <div className="text-14 leading-md">个人简介</div>

                    <div className="text-12 leading-sm italic"></div>
                  </div>
                  <Field name="individualResume">
                    <textarea className="input" disabled={loading} maxLength={200} rows={3} cols={50}></textarea>
                  </Field>
                  <div
                    className={classnames("text-red text-12 leading-sm mt-8", {
                      hidden: !_form.getFieldError("individualResume")?.[0],
                    })}
                  >
                    {_form.getFieldError("individualResume")?.[0]}
                  </div>
                </div>
              </div>

              <div className="md:flex items-center justify-between flex-row-reverse text-center">
                {/* <div className="text-14 break-words">
                  您的个人资料 :&nbsp;
                  <a href={`/userDetail/${userInfo?.username}`}>
                    userDetail/{userInfo?.username}
                  </a>
                </div> */}

                <div className="mt-16 md:mt-0">
                  <button className="button button--primary w-full md:w-auto" disabled={loading} onClick={onSubmit}>
                    <>
                      <span
                        className={classnames("animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full mr-1", {
                          hidden: !loading,
                        })}
                        role="status"
                        aria-label="loading"
                      ></span>
                      保存更改
                    </>
                  </button>
                </div>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Index;
