import { PhotoList } from "@/components";
import Filter from "@/components/Filter";
import { IItem } from "@/components/Menu";
import Api from "@/service/index";
import { usePagination } from "ahooks";
import { Empty, Spin } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "umi";

const Browse = () => {
  const { t } = useTranslation();
  const [routeParams] = useSearchParams();
  const _type = routeParams.get("type");
  const [dataType, setDataType] = useState<string>(_type || "all");

  const {
    data: photoData,
    loading: getGalleryPhotoListLoading,
    run: runGetGalleryPhotoList,
    pagination,
  } = usePagination(
    ({ current, pageSize, type = dataType }) => {
      return new Promise(async (resolve) => {
        const { data } = await Api.getGalleryPhotoList({
          pageIndex: current,
          pageSize,
          type: type || dataType,
        });
        resolve(data);
      }) as any;
    },
    {
      refreshDeps: [dataType],
    },
  );

  // 获取列表数据
  const getData = (pageIndex?: number, pageSize?: number) => {
    runGetGalleryPhotoList({
      current: pageIndex || pagination.current,
      pageSize: pageSize || pagination.pageSize,
    });
  };

  const items: IItem[] = [
    { label: "全部", value: "all" },
    { label: t("common.popular"), value: "popular" },
    { label: t("common.recent"), value: "recent" },
    // { label: t("common.debuts"), value: "4" },
    // { label: t("common.finishers"), value: "5" },
    { label: t("common.photosOfTheDay"), value: "today" },
    { label: t("common.favorites"), value: "favorites" },
    { label: t("common.liked"), value: "liked" },
  ];

  return (
    <div>
      <div className="d-container p-16 md:px-32 md:py-24">
        <div className="d-container p-0 flex items-center justify-between">
          <div className="min-w-0 flex-grow mr-8">
            <Filter
              breakPoint="md"
              value={_type || ""}
              items={items}
              onChange={(item) => {
                setDataType(item.value);
              }}
            />
          </div>
        </div>
      </div>
      {getGalleryPhotoListLoading ? (
        <Spin size="large" className="flex justify-center items-center h-[350px]" />
      ) : photoData?.list?.length ? (
        <PhotoList getData={getData} list={photoData?.list || []} total={photoData?.total} />
      ) : (
        <Empty className="h-[350px] flex flex-col justify-center items-center" />
      )}
    </div>
  );
};

export default Browse;
