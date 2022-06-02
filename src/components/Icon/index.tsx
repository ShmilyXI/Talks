import React, { FC, memo } from "react";
import classnames from "classnames";

type IconProps = {
    className: string;
    addClassName?: string;
};

const Icon: FC<IconProps> = ({ className, addClassName }) => (
    <svg className={classnames("icon", addClassName)} aria-hidden="true">
        <use xlinkHref={`#${className}`}></use>
    </svg>
);

export default memo(Icon);
