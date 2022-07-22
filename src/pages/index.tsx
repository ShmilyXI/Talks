import Filter from "@/components/Filter";
import Api from "@/service/index";
import { useRequest, usePagination } from "ahooks";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import { PhotoList } from "@components";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import toast from "react-hot-toast";
import { formatPrice } from "@/utils/common";
import { IItem } from "@components/Menu";

const Browse = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    data: photoData,
    loading: getGalleryPhotoListLoading,
    run: runGetGalleryPhotoList,
    pagination,
  } = usePagination(
    ({ current, pageSize }) =>
      new Promise(async (resolve) => {
        const { data } = await Api.getGalleryPhotoList({
          data: { pageIndex: current, pageSize },
        });
        resolve(data);
      }) as any,
  );

  const items: IItem[] = [
    { label: "全部", value: "1" },
    // { label: t("common.popular"), value: "2" },
    // { label: t("common.recent"), value: "3" },
    // { label: t("common.debuts"), value: "4" },
    // { label: t("common.finishers"), value: "5" },
    // { label: t("common.photosOfTheDay"), value: "6" },
    // { label: t("common.favorites"), value: "7" },
    // { label: t("common.liked"), value: "8" },
  ];

  // 获取列表数据
  const getData = () => {
    runGetGalleryPhotoList({
      current: pagination.current,
      pageSize: pagination.pageSize,
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
