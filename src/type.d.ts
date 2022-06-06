declare module "rgbaster";
declare module "*.less" {
    const classes: {
        readonly [key: string]: string;
    };
    export default classes;
    declare module "*.less";
}
