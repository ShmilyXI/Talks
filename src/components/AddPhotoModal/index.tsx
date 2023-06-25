import { Button, DatePicker, Image, Form, Input, Modal, Segmented, Select, Switch, Upload, UploadFile, Space, Divider, InputRef } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import { AppstoreOutlined, PictureOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { RcFile } from "antd/es/upload";
import Api from "@/service";
import { GalleryItem } from "@/types/GalleryTypes";
import { Storage } from "@/utils/storage";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import { IItem } from "../Menu";
import toast from "react-hot-toast";

type AddPhotoModalProps = {
  visible: boolean;
  data?: any;
  onClose?: () => void;
};
const Index: FC<AddPhotoModalProps> = (props) => {
  const { visible, data, onClose } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]); // 画廊列表
  const [placeList, setAddressList] = useState<IItem[]>(); // 地点列表
  const [placeItem, setPlaceItem] = useState<any>();
  const [galleryName, setGalleryName] = useState("");

  const [loading, setLoading] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log("values: ", values);
      // 照片描述保存时,需要将\r\n替换为<br/>
      // const description = values.description?.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/\s/g, " ");
      let params = {
        ...(_.omit(values, ["files"]) as any),
        ..._.pick(placeItem, ["location", "provincialName", "cityName", "areaName"]),
        place: placeItem?.label,
        placeId: placeItem?.value,
        showComments: values?.showComments ? 0 : 1,
      };
      console.log("params", params);
      if (data?.id) {
        params.id = data.id;
        await Api.updatePhoto({ data: params });
        await toast.success("修改成功!");
      } else {
        const formData = new FormData();
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];
          formData.append("files", file.originFileObj as any);
        }
        const { data: photosData } = await Api.uploadPhoto({
          data: formData as any,
        });
        params = {
          ...params,
          photosData,
        };
        await Api.publishPhoto({ data: params });
        await toast.success("发布成功!");
      }
      setLoading(false);
      form.resetFields();
      onClose?.();
    } catch (error) {
      setLoading(false);
    }
  };

  // 地址关键字查询
  const onAddressSearch = async (value: string) => {
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
    setAddressList(list);
  };

  // 画廊名称改变
  const onGalleryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGalleryName(event.target.value);
  };

  // 新增画廊元素
  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (!galleryName) return;
    const storage = new Storage(localStorage, "Talks");
    const _userInfo = JSON.parse(storage.getItem("userInfo") || "{}");
    const item = {
      id: uuid(),
      title: galleryName,
      user_id: _userInfo.id,
      // user: {
      //   username: _userInfo.username,
      //   display_name: _userInfo.display_name,
      //   avatar_url: _userInfo.avatar_url,
      //   telephone: _userInfo.telephone,
      // },
    };
    setGalleryList([...galleryList, item]);
    const newGalleryList = form.getFieldValue("newGalleryList") || [];
    form.setFieldValue("newGalleryList", [...newGalleryList, item]);
    setGalleryName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // 预览
  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.thumbUrl as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  // 获取画廊列表
  const getGalleryData = async () => {
    const { data } = await Api.getGalleryList({
      data: { pageIndex: 1, pageSize: 999, type: "mine" },
    });
    const list = data?.list || [];
    setGalleryList(list);
  };

  useEffect(() => {
    if (visible) {
      getGalleryData();
    }
  }, [visible]);

  return (
    <Modal open={visible} onCancel={onClose} onOk={onSubmit} width={540} confirmLoading={loading}>
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} className="p-5">
        <Form.Item noStyle name="newGalleryList" />
        <Form.Item
          name="type"
          initialValue="photo"
          wrapperCol={{ span: 24 }}
          className="flex justify-center"
          getValueFromEvent={(value) => {
            if (value === "photo" && fileList?.length > 1) {
              form.setFieldValue("files", fileList.slice(0, 1));
            }
            return value;
          }}
        >
          <Segmented
            size="large"
            options={[
              {
                label: "照片",
                value: "photo",
                icon: <PictureOutlined rev={undefined} />,
              },
              {
                label: "画廊",
                value: "gallery",
                icon: <AppstoreOutlined rev={undefined} />,
              },
            ]}
          />
        </Form.Item>
        <Form.Item noStyle dependencies={["type"]}>
          {({ getFieldValue }) => {
            return (
              <Form.Item
                name="files"
                getValueFromEvent={(value) => {
                  setFileList(value.fileList);
                  return value.fileList;
                }}
                wrapperCol={{ span: 24 }}
                className="flex justify-center"
                rules={[
                  {
                    required: true,
                    message: "请上传相片",
                  },
                ]}
              >
                <Upload listType="picture-card" onPreview={handlePreview} accept="image/*" multiple={getFieldValue("type") === "gallery"}>
                  {getFieldValue("type") === "photo" && fileList?.length >= 1 ? null : (
                    <div className="flex flex-col items-center">
                      <PlusOutlined rev={undefined} className="text-2xl" />
                      <div>上传</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            );
          }}
        </Form.Item>
        <Form.Item label="标题" required name="title" rules={[{ required: true, message: "请输入标题" }]}>
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item label="日期" required name="shootingDate" rules={[{ required: true, message: "请选择拍摄日期" }]} initialValue={dayjs()}>
          <DatePicker placeholder="请选择日期" showTime className="w-full" />
        </Form.Item>
        <Form.Item noStyle dependencies={["type"]}>
          {({ getFieldValue }) => (
            <Form.Item
              label="画廊"
              required={getFieldValue("type") === "gallery"}
              name="gallery"
              rules={[{ required: getFieldValue("type") === "gallery", message: "请选择画廊" }]}
            >
              <Select
                placeholder="请选择画廊"
                showSearch
                optionFilterProp="label"
                mode="multiple"
                options={_.map(galleryList, (item) => ({ label: item.title, value: item.id }))}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider className="my-2" />
                    <div className="px-2 pb-1 w-full flex justify-between">
                      <Input className="flex-1 mr-4" placeholder="输入以新增画廊" ref={inputRef} value={galleryName} onChange={onGalleryNameChange} />
                      <Button type="text" icon={<PlusOutlined rev={undefined} />} onClick={addItem}>
                        Add Gallery
                      </Button>
                    </div>
                  </>
                )}
              />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item label="评论" name="showComments" initialValue={true}>
          <Switch />
        </Form.Item>
        <Form.Item
          label="位置"
          name="place"
          getValueFromEvent={(value, record) => {
            setPlaceItem(record);
            return value;
          }}
        >
          <Select placeholder="请输入位置查询" options={placeList} showSearch onSearch={onAddressSearch} filterOption={false} />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <Input.TextArea rows={3} placeholder="描述你的一天..." />
        </Form.Item>
      </Form>
      <Image
        width={300}
        style={{ display: "none" }}
        src={previewImage}
        preview={{
          visible: previewOpen,
          src: previewImage,
          onVisibleChange: (value) => {
            setPreviewOpen(value);
          },
        }}
      />
    </Modal>
  );
};

export default Index;
