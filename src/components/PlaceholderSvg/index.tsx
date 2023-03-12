import React from "react";

const PlaceholderSvg = ({
    width,
    height,
    className,
    ...otherProps
}: {
    width: number;
    height: number;
    className?: string;
}) => (
    <img
        src={`data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'${width}' height%3D'${height}'%2F%3E`}
        width={width}
        height={height}
        className={className}
        {...otherProps}
    />
);

export default PlaceholderSvg;
