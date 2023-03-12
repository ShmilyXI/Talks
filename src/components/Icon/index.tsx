import React, { FC, memo } from "react";
import classnames from "classnames";

type IconProps = {
    className: string;
    addClassName?: string;
    [key: string]: any;
};

const Icon: FC<IconProps> = ({ className, addClassName, ...otherProps }) => (
    <svg
        className={classnames("icon", addClassName)}
        aria-hidden="true"
        {...otherProps}
    >
        <use xlinkHref={`#${className}`}></use>
    </svg>
);

export default memo(Icon);
