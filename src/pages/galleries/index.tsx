import React, { useEffect, useState } from "react";
import { Filter, Icon } from "@/components";
import { useInfiniteScroll, usePagination } from "ahooks";
import Api from "@/service";
import { BaseUserInfo, UserFavoriteRequest } from "@/types/UserTypes";
import toast from "react-hot-toast";
import _ from "lodash";
import GalleryList from "@/components/GalleryList";
import { Storage } from "@/utils/storage";

const PAGE_SIZE = 20;
const Index = () => {
  const [dataType, setDataType] = useState("all");
  const [userInfo, setUserInfo] = useState<BaseUserInfo>();

  useEffect(() => {
    const storage = new Storage(localStorage, "Talks");
    const _userInfo = JSON.parse(storage.getItem("userInfo") || "{}");
    setUserInfo(_userInfo);
  }, []);

  const {
    data: galleryData,
    loading: getGalleryListLoading,
    loadMore,
    loadingMore,
    reload,
  } = useInfiniteScroll(
    (d) => {
      const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1;
      return new Promise(async (resolve) => {
        const { data } = await Api.getGalleryList({
          data: { pageIndex: page, pageSize: PAGE_SIZE, type: dataType },
        });
        resolve(data);
      }) as any;
    },
    {
      // manual: true,
      reloadDeps: [dataType],
    },
  );

  return (
    <div className="minScreenHeight">
      <div className="d-container max-w-1128 px-16 pt-16 md:px-32 md:py-32 lg:py-48">
        <div className="flex items-center">
          <h1 className="hidden md:block text-16 leading-normal md:text-24 md:text-28 lg:text-32 md:leading-xs">画廊</h1>
        </div>

        <p className="hidden md:block md:max-w-568 text-grey-27 mt-8">画廊是社区手动选择的照片的集合。如果您关注画廊，则该画廊的新照片将出现在您的收藏画廊中。</p>

        <Filter
          breakPoint="md"
          menuClassName="mt-24"
          items={[
            { label: "所有画廊", value: "all" },
            { label: "精选", value: "selected" },
            { label: "我收藏的画廊", value: "favorites" },
            { label: "去我的画廊", value: "mine", href: `/userDetail?id=${userInfo?.id}&type=2` },
          ]}
          onChange={(item) => {
            if (!item.value) {
              return;
            }
            setDataType(item.value);
          }}
        />
      </div>

      <GalleryList list={galleryData?.list || []} total={galleryData?.total} getData={reload} loadMore={loadMore} />
    </div>
  );
};

export default Index;
