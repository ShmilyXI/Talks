import React, { FC, useEffect, useState } from "react";
import { Icon, PlaceholderSvg } from "@components";
import classnames from "classnames";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { useToggle } from "ahooks";
import dayjs from "dayjs";
import { BasePhotoInfo } from "@/types/PhotoTypes";
import _ from "lodash";

type Props = {
  list: BasePhotoInfo[];
  index: number;
  onChange?: (index: number) => void;
};
const PhotoViews: FC<Props> = (props) => {
  const { list, index: defaultIndex, onChange = () => {} } = props;

  const slides = list.map(({ url, width, height, title, description }) => ({
    src: url,
    key: `${url}-${_.random(1, 99)}`,
    // aspectRatio: width / height,
    title,
    description,
    srcSet: [
      {
        src: url,
        width,
        height,
      },
    ],
  }));
  return (
    <div className="bg-black w-full h-[70vh]">
      <Lightbox
        open
        key={defaultIndex}
        slides={slides}
        index={defaultIndex}
        plugins={[Inline, Fullscreen, Thumbnails, Zoom]}
        on={{
          view: onChange,
        }}
        carousel={{
          finite: true,
          preload: 3,
        }}
        animation={{ zoom: 500, fade: 200, swipe: 300 }}
        zoom={{
          zoomInMultiplier: 2,
          maxZoomPixelRatio: 5,
        }}
        thumbnails={{
          border: 0,
          imageFit: "cover",
        }}
      />
    </div>
  );
};

export default PhotoViews;
