import React from "react";
import { Filter, Icon } from "@components";

const Index = () => {
  return (
    <div>
      <div className="d-container max-w-1128 px-16 pt-16 md:px-32 md:py-32 lg:py-48">
        <div className="flex items-center">
          <h1 className="hidden md:block text-16 leading-normal md:text-24 md:text-28 lg:text-32 md:leading-xs">画廊</h1>
        </div>

        <p className="hidden md:block md:max-w-568 text-grey-27 mt-8">
          画廊是社区手动选择的照片的集合。如果您关注画廊，则该画廊的新照片将出现在您的收藏画廊中。
        </p>

        <Filter
          breakPoint="md"
          menuClassName="mt-24"
          items={[
            { label: "精选", value: "1" },
            { label: "所有画廊", value: "2" },
            { label: "我关注的画廊", value: "3" },
            { label: "去我的画廊", value: "4" },
          ]}
          onChange={(item) => {
            console.log("item", item);
          }}
        />
      </div>

      <div className="d-container max-w-1128 p-16 md:pt-0 md:px-32 md:pb-24 lg:pb-32 xl:pb-48">
        <div>
          <div className="gallery-list flex flex-wrap items-start -mx-16 sm:-mx-12 -mb-16 sm:-mb-24">
            <div className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-16 sm:px-12 mb-16 sm:mb-24">
              <div className="relative">
                <div className="flex overflow-hidden rounded">
                  <div className="flex-grow relative overflow-hidden min-w-0 w-2/3" style={{ background: "#281915" }}>
                    <img
                      src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'570' height%3D'380'%2F%3E"
                      width="570"
                      height="380"
                      alt=""
                      className="gallery-list__photo"
                    />
                  </div>
                  <div className="flex flex-col ml-2 -my-1 flex-none w-1/3">
                    <div className="my-1 relative overflow-hidden" style={{ background: "#a5aea5" }}>
                      <img
                        // src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'180' height%3D'135'%2F%3E"
                        width="180"
                        height="135"
                        alt=""
                        className="gallery-list__photo"
                      />

                      <img
                        src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'87' height%3D'87'%2F%3E"
                        width="87"
                        height="87"
                        alt=""
                        className="block w-full h-auto"
                      />
                    </div>

                    <div className="my-1 relative overflow-hidden" style={{ background: "#2f2726" }}>
                      <img
                        // src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'180' height%3D'135'%2F%3E"
                        width="180"
                        height="135"
                        alt=""
                        className="gallery-list__photo"
                      />

                      <img
                        src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'87' height%3D'87'%2F%3E"
                        width="87"
                        height="87"
                        alt=""
                        className="block w-full h-auto"
                      />
                    </div>
                  </div>

                  <a href="https://tookapic.com/galleries/3450-pandemic-photography" className="absolute pin z-10"></a>
                </div>

                <div className="absolute pin-t pin-x z-20 pointer-events-none p-8 flex justify-between items-center">
                  <div className="pointer-events-auto">
                    <button type="button" className="follow inline-flex button-reset align-top is-public">
                      <span className="off">
                        <Icon className="icon-roundaddfill" addClassName="icon text-accent text-18" />
                      </span>

                      <span className="on on--private">
                        <Icon className="icon-timefill" addClassName="icon text-grey-80 text-18" />
                      </span>

                      <span className="on on--public">
                        <Icon className="icon-roundcheckfill" addClassName="icon text-grey-75 text-18" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-8 text-black">
                <a href="https://tookapic.com/galleries/3450-pandemic-photography" className="block text-inherit font-medium truncate min-w-0">
                  Pandemic Photography
                </a>
                <span className="hidden ml-8 -mt-2 text-black">
                  <Icon className="icon-unlock-fill" addClassName="icon text-12" />
                </span>
              </div>

              <div className="text-12 leading-sm truncate mt-1">
                63 photos. Curated by
                <a href="https://tookapic.com/pawelkadysz" className="text-grey-53">
                  Paweł Kadysz
                </a>
              </div>
            </div>
          </div>

          <div className="mt-28 text-center">
            <a className="button button--secondary block w-full">
              Load more…
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
