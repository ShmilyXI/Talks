import React, { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import Api from "@/service/index";
import { usePagination } from "ahooks";
import { useRouter } from "next/router";
import { PhotoList } from "@components";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { IItem } from "@components/Menu";

const Browse = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [selectItem, setSelectItem] = useState<IItem>();
  const [isFirst, setIsFirst] = useState(true);
  const [dataType, setDataType] = useState("all");

  useEffect(() => {
    if (selectItem?.value) {
      getData(selectItem.value);
    }
    return () => {
      setSelectItem(undefined);
    };
  }, [selectItem]);

  const {
    data: photoData,
    loading: getGalleryPhotoListLoading,
    run: runGetGalleryPhotoList,
    pagination,
  } = usePagination(({ current, pageSize, type = dataType }) => {
    if (isFirst) {
      setIsFirst(false);
      return;
    }
    return new Promise(async (resolve) => {
      const { data } = await Api.getGalleryPhotoList({
        data: { pageIndex: current, pageSize, type },
      });
      resolve(data);
    }) as any;
  });

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

  // 获取列表数据
  const getData = (type: string = dataType, pageIndex?: number, pageSize?: number) => {
    setDataType(type);
    runGetGalleryPhotoList({
      current: pageIndex || pagination.current,
      pageSize: pageSize || pagination.pageSize,
      type,
    });
  };

  return (
    <div>
      <div className="d-container p-16 md:px-32 md:py-24">
        <div className="d-container p-0 flex items-center justify-between">
          <div className="min-w-0 flex-grow mr-8">
            <Filter
              breakPoint="md"
              items={items}
              onChange={(item) => {
                console.log("item", item);
                setSelectItem(item);
              }}
            />
          </div>
        </div>
      </div>
      <PhotoList getData={getData} list={photoData?.list || []} total={photoData?.total} />
    </div>
  );
};

export default Browse;
