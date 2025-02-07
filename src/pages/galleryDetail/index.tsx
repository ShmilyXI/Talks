import Filter from "@/components/Filter";
import PhotoList from "@/components/PhotoList";
import Api from "@/service";
import { GetGalleryDetailResponse } from "@/types/GalleryTypes";
import { BaseUserInfo, UserFavoriteRequest } from "@/types/UserTypes";
import { Storage } from "@/utils/storage";
import { Form, Input, message, Modal } from "antd";
import classNames from "classnames";
import _ from "lodash";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "umi";

const Index = () => {
  const [routeParams] = useSearchParams();
  const id = routeParams.get("id");
  const [isLogin, setIsLogin] = useState(false); // 是否是登录状态
  const [dataType, setDataType] = useState("popular");
  const [userInfo, setUserInfo] = useState<BaseUserInfo>();
  const [photoList, setPhotoList] = useState([]);
  const [galleryDetailInfo, setGalleryDetailInfo] = useState<GetGalleryDetailResponse["data"]>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [form] = Form.useForm();

  // 获取画廊详情信息
  const getPhotoInfo = async () => {
    const { data } = await Api.getGalleryDetail({ id: +id, type: dataType });
    const photoList = data?.photoList || [];
    setPhotoList(photoList);
    setGalleryDetailInfo(data);
  };

  useEffect(() => {
    if (!id) return;
    getPhotoInfo();
  }, [dataType, id]);

  useEffect(() => {
    if (localStorage) {
      const storage = new Storage(localStorage, "Talks");
      const _isLogin = storage?.getItem("token");
      const _userInfo = JSON.parse(storage.getItem("userInfo") || "{}");
      setUserInfo(_userInfo);
      setIsLogin(_isLogin);
    }
  }, []);

  // 编辑
  const onEdit = async () => {
    if (_.isNil(galleryDetailInfo?.id)) return;
    setModalLoading(true);
    try {
      const values = await form.validateFields();
      await Api.updateGallery({ ...values, id: galleryDetailInfo?.id });
      message.success("修改成功!");
      setModalVisible(false);
      getPhotoInfo();
    } finally {
      setModalLoading(false);
    }
  };
  // 删除
  const onDelete = async () => {
    if (_.isNil(galleryDetailInfo?.id)) return;

    // 检查是否有关联照片
    if (photoList?.length > 0) {
      Modal.confirm({
        title: "确认删除",
        content: "该画廊已关联照片，确定要删除吗？",
        okText: "确定",
        cancelText: "取消",
        onOk: async () => {
          await Api.deleteGallery({ id: galleryDetailInfo?.id });
          message.success("删除成功!");
          const timer = setTimeout(() => {
            window.location.replace("/galleries");
          }, 1000);
          return () => clearTimeout(timer);
        },
      });
      return;
    }

    // 无关联照片直接删除
    await Api.deleteGallery({ id: galleryDetailInfo?.id });
    message.success("删除成功!");
    const timer = setTimeout(() => {
      window.location.replace("/galleries");
    }, 1000);
    return () => clearTimeout(timer);
  };

  // 用户收藏画廊
  const onUserGalleryFavorite = async (value: UserFavoriteRequest) => {
    try {
      const { favoriteId, favoriteStatus, favoriteType } = value;
      await Api.userPhotoFavorite({
        favoriteId,
        favoriteStatus,
        favoriteType,
      });
      await toast.success(favoriteStatus === 1 ? "收藏成功!" : "取消收藏成功!");
      getPhotoInfo();
    } catch (error) {
      await toast.error("收藏失败,请重试!");
    }
  };

  return (
    <div>
      <div className="container mx-auto p-0 md:p-[32px] lg:py-[48px]" data-controller="gallery" data-gallery-id="1498">
        <div className="container mx-auto p-0">
          <div className="px-[16px] pt-[16px] md:p-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <h1 className="text-[24px] md:text-[28px] lg:text-[32px] leading-tight break-words min-w-0 md:truncate">
                <span className="align-middle mr-[16px]" data-target="gallery.title">
                  {galleryDetailInfo?.title}
                </span>

                {/* 锁图标 */}
                <span className="hidden -mt-[8px] align-middle" data-target="gallery.private" title="Private" data-tooltip>
                  <svg className="w-[16px] h-[16px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zM264 392c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48zm32-168H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
                  </svg>
                </span>
              </h1>

              <div className="flex gap-[8px] md:gap-[12px]">
                <div
                  className={classNames("flex items-center", {
                    hidden: !isLogin,
                  })}
                >
                  <button
                    type="button"
                    className="inline-flex items-center px-[12px] md:px-[24px] py-[6px] md:py-[12px] text-sm font-medium rounded-md 
                               bg-purple hover:bg-[#7e84ff] text-white transition-colors duration-150
                               focus:outline-none active:shadow-[inset_0_-100px_0_rgba(0,0,0,0.1)]
                               w-full md:w-auto"
                    onClick={_.debounce(
                      () =>
                        onUserGalleryFavorite({
                          favoriteId: +id,
                          favoriteStatus: galleryDetailInfo?.favoriteStatus === 1 ? 0 : 1,
                          favoriteType: 1,
                        }),
                      500,
                    )}
                  >
                    {galleryDetailInfo?.favoriteStatus === 1 ? "取消收藏" : "收藏"}
                  </button>
                </div>

                <div
                  className={classNames("flex items-center", {
                    hidden: !isLogin || userInfo?.id !== galleryDetailInfo?.user_id,
                  })}
                >
                  <button
                    type="button"
                    className="inline-flex items-center px-[12px] md:px-[24px] py-[6px] md:py-[12px] text-sm font-medium rounded-md
                               bg-purple hover:bg-[#7e84ff] text-white transition-colors duration-150
                               focus:outline-none active:shadow-[inset_0_-100px_0_rgba(0,0,0,0.1)]
                               w-full md:w-auto"
                    onClick={() => {
                      setModalVisible(true);
                      form.setFieldsValue(galleryDetailInfo);
                    }}
                  >
                    编辑
                  </button>
                </div>

                <div
                  className={classNames("flex items-center", {
                    hidden: !isLogin || userInfo?.id !== galleryDetailInfo?.user_id,
                  })}
                >
                  <button
                    type="button"
                    className="inline-flex items-center px-[12px] md:px-[24px] py-[6px] md:py-[12px] text-sm font-medium rounded-md
                               bg-[#ed143d] hover:bg-[#fd849b] text-white transition-colors duration-150
                               focus:outline-none active:shadow-[inset_0_-100px_0_rgba(0,0,0,0.1)]
                               w-full md:w-auto"
                    onClick={() => {
                      onDelete();
                    }}
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>

            {/* 描述文本 */}
            <p className="md:max-w-[568px] text-[14px] leading-relaxed md:text-[16px] md:leading-normal text-[#888] mt-[16px] md:mt-[8px] break-words" data-target="gallery.body">
              {galleryDetailInfo?.description}
            </p>

            {/* 用户信息 */}
            <div className="text-[14px] leading-loose mt-[12px] md:mt-[4px] flex items-center flex-wrap break-words">
              <span className="mr-[8px]">{photoList?.length || 0} photos from 1 person. Curated by</span>
              <div className="flex items-center text-[#888]">
                <div className="mr-[8px] rounded-full bg-[#f5f5f5] inline-flex items-start">
                  <img
                    src={
                      galleryDetailInfo?.user?.avatar_url ||
                      "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'24' height%3D'24'%2F%3E"
                    }
                    width="24"
                    height="24"
                    alt=""
                    className="w-[24px] h-[24px] object-cover rounded-full"
                  />
                </div>

                <a href={`/userDetail?id=${galleryDetailInfo?.user_id}`} className="text-inherit hover:underline">
                  {galleryDetailInfo?.user?.display_name || galleryDetailInfo?.user?.username}
                </a>
              </div>
            </div>
          </div>

          <Filter
            breakPoint="md"
            menuClassName="my-[24px]"
            items={[
              { label: "受欢迎的", value: "popular" },
              { label: "最近的", value: "recent" },
            ]}
            onChange={(item) => {
              if (!item.value) {
                return;
              }
              setDataType(item.value);
            }}
          />
        </div>
      </div>

      <PhotoList getData={getPhotoInfo} list={photoList} />

      {/* Modal 部分 */}
      <Modal
        title="编辑"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        onOk={() => onEdit()}
        width={540}
        confirmLoading={modalLoading}
      >
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} className="p-[20px]">
          <Form.Item
            name="title"
            label="画廊名称"
            required
            rules={[
              {
                required: true,
                message: "请输入画廊名称",
              },
            ]}
          >
            <Input placeholder="请输入画廊名称" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Index;
