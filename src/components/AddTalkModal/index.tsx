import classnames from "classnames";
import _ from "lodash";
import React, { FC, useEffect, useState } from "react";
import Api from "@/service";
import toast from "react-hot-toast";
import Form, { Field } from "rc-field-form";
import { PhotoList } from "@/types/PhotoTypes";
import BaseEditor from "@/components/BaseEditor";
import { sleep } from "@/utils/common";

type Props = {
  visible: boolean;
  setModalLeft: () => void;
  value?: PhotoList;
};

const toastOption = {
  success: {
    duration: 2000,
  },
  error: {
    duration: 2000,
  },
};

const Index: FC<Props> = (props) => {
  const { visible, setModalLeft, value: defaultValue } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!defaultValue) return;
    form.setFieldsValue({
      ..._.pick(defaultValue, ["title", "content"]),
    });
  }, [defaultValue]);

  // 提交表单
  const onSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      if (defaultValue?.id) {
        toast.promise(
          Api.updateTalk({ data: { ...values, id: defaultValue.id } }),
          {
            loading: "Loading...",
            success: () => "修改成功!",
            error: (err) => `修改失败! ${err.toString()}`,
          },
          toastOption,
        );
      } else {
        toast.promise(
          Api.addTalk({ data: values }),
          {
            loading: "Loading...",
            success: () => "发布成功!",
            error: (err) => `发布失败! ${err.toString()}`,
          },
          toastOption,
        );
      }
      setLoading(false);
      await sleep(2000);
      setModalLeft();
      form.resetFields();
      location.reload();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      {visible && <style type="text/css">{"body,html { overflow: hidden; height: 100vh; }"}</style>}
      <div className={classnames("modal", { block: visible })}>
        <div className="modal-dialog modal-dialog--centered">
          <div className="modal-content max-w-832 p-16 md:p-24 w-full">
            <button
              type="button"
              className="modal__close z-30"
              onClick={() => {
                form.resetFields();
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
                title: "",
                content: "<p>正文内容</p>",
              }}
            >
              {(values, _form) => (
                <div className="story-form">
                  <div className="bg-white -m-16 md:-m-24 sm:rounded-6">
                    <div className={classnames("p-16 md:p-24")}>
                      <div className="w-full">
                        <div className="flex rounded-t-8 mb-16">
                          <div>
                            <div className="daisy-form-control w-full max-w-lg">
                              <label className="daisy-label">
                                <span className="daisy-label-text font-bold text-xl">标题</span>
                              </label>
                              <Field name="title" rules={[{ required: true, message: "请输入标题" }]}>
                                <input
                                  type="text"
                                  placeholder="请输入标题"
                                  maxLength={255}
                                  disabled={loading}
                                  className={classnames("daisy-input daisy-input-bordered daisy-input-sm w-full max-w-full text-black", {
                                    "daisy-input-error": _form.getFieldError("title")?.[0],
                                  })}
                                />
                              </Field>
                              <label
                                className={classnames("daisy-label", {
                                  hidden: !_form.getFieldError("title")?.[0],
                                })}
                              >
                                <span className="daisy-label-text-alt text-red text-12 leading-sm"> {_form.getFieldError("title")?.[0]}</span>
                              </label>
                            </div>

                            <div className="mt-16">
                              <label className="daisy-label">
                                <span className="daisy-label-text font-bold text-xl">正文内容</span>
                              </label>
                              <Field name="content" rules={[{ required: true, message: "请输入正文内容" }]}>
                                <BaseEditor toolbarConfig={{ excludeKeys: ["group-video", "uploadImage"] }} />
                              </Field>
                              <label
                                className={classnames("daisy-label", {
                                  hidden: !_form.getFieldError("content")?.[0],
                                })}
                              >
                                <span className="daisy-label-text-alt text-red text-12 leading-sm"> {_form.getFieldError("content")?.[0]}</span>
                              </label>
                            </div>
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
                          {defaultValue?.id ? "修改讨论" : "发布讨论"}
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
