import classnames from 'classnames';
import _ from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Api from '@/service';
import toast from 'react-hot-toast';
import Form, { Field } from 'rc-field-form';
import { PhotoList } from '@/types/PhotoTypes';
import BaseEditor from '@/components/BaseEditor';

type Props = {
  visible: boolean;
  setModalLeft: () => void;
  value?: PhotoList;
};

const Input = ({ value = '', ...props }) => <input value={value} {...props} />;
const Textarea = ({ value = '', ...props }) => (
  <textarea value={value} {...props} />
);

const Index: FC<Props> = (props) => {
  const { visible, setModalLeft, value: defaultValue } = props;
  const [tempFile, setTempFile] = useState<any>(); // 暂存上传的图片文件
  const [tempImage, setTempImage] = useState<any>(); // 暂存上传的图片展示
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (!defaultValue) return;
    setTempImage(defaultValue.url);
    setIsEdit(true);
    // 照片描述回显时,需要将<br/>替换为\r\n
    form.setFieldsValue({
      ..._.pick(defaultValue, ['title', 'mood']),
      shootingDate: defaultValue.shooting_date,
      galleryIds: defaultValue.gallery_ids,
      showComments: defaultValue.show_comments,
      description: defaultValue?.description?.replace(/<br\/>/g, '\r\n'),
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
      const description = values.description
        ?.replace(/\r\n/g, '<br/>')
        .replace(/\n/g, '<br/>')
        .replace(/\s/g, ' ');
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
      if (defaultValue?.id) {
        params.id = defaultValue.id;
        await Api.updatePhoto({ data: params });
        await toast.success('修改成功!');
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
          galleryIds: (values?.galleryIds || [])?.join(',') || '',
          photoExifInfo: photoData?.photoExifInfo,
        };
        await Api.publishPhoto({ data: params });
        await toast.success('发布成功!');
      }
      setLoading(false);
      form.resetFields();
      setTempFile(undefined);
      setTempImage(undefined);
      setModalLeft();
      location.reload();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      {visible && (
        <style type="text/css">
          {'body,html { overflow: hidden; height: 100vh; }'}
        </style>
      )}
      <div className={classnames('modal', { block: visible })}>
        <div className="modal-dialog modal-dialog--centered">
          <div className="modal-content max-w-936 p-16 md:p-24 w-full">
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
              <svg
                className="icon pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
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
                    <div className={classnames('p-16 md:p-24')}>
                      <div className="w-full">
                        <div className="flex rounded-t-8 mb-16">
                          <div>
                            <Field
                              name="title"
                              rules={[
                                { required: true, message: '请输入标题' },
                              ]}
                            >
                              <Input
                                className="input story-form__input story-form__input--title"
                                placeholder={t('photoModal.add_title')}
                                maxLength={255}
                                disabled={loading}
                              />
                            </Field>
                            <div
                              className={classnames(
                                'text-red text-12 leading-sm mt-8',
                                {
                                  hidden: !_form.getFieldError('title')?.[0],
                                },
                              )}
                            >
                              {_form.getFieldError('title')?.[0]}
                            </div>

                            <div className="mt-16">
                              <BaseEditor defaultHtml="<p>正文内容</p>" />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap -mb-8">
                          <div className="mr-8 mb-8">
                            {/* <Field name="galleryIds">
                            </Field> */}
                          </div>
                        </div>

                        <div
                          className={classnames(
                            'text-red text-12 leading-sm mt-8',
                            {
                              hidden: !_form.getFieldError('shootingDate'),
                            },
                          )}
                        >
                          {_form.getFieldError('shootingDate')}
                        </div>

                        <button
                          className="button button--primary w-full mt-4"
                          disabled={loading}
                          onClick={onSubmit}
                        >
                          {defaultValue?.id ? '修改讨论' : '发布讨论'}
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
