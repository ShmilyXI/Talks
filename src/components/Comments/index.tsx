import { Icon } from "@components";
import classnames from "classnames";
import React, { FC } from "react";
import { CommentItem } from "../../pages/photoDetail/index";

type Props = {
    list: CommentItem[];
    className?: string;
    addClassName?: string;
};
const Comments: FC<Props> = (props) => {
    const { list, className, addClassName } = props;
    return (
        <div
            className={classnames(
                "flex flex-grow flex-col lg:overflow-y-scroll",
                className,
            )}
            id="story-comments"
        >
            {/* 用户评论区 未登录用户不展示 */}
            <div className={classnames("flex flex-none pb-8", addClassName)}>
                <div className="flex-none mr-16 mt-4">
                    <div className="avatar" id="comment-form-avatar-45265">
                        <img
                            src="https://tookapic.com/img/avatars/default.svg"
                            width="32"
                            height="32"
                            alt=""
                            className="avatar__photo is-loaded"
                        />
                    </div>
                </div>

                <div className="flex-grow">
                    <div>
                        <textarea
                            className={classnames(
                                "bg-white input overflow-hidden break-words !resize-none",
                                {
                                    "h-[36px]": true,
                                },
                            )}
                            placeholder="Type your comment here…"
                            maxLength={4096}
                            rows={1}
                            cols={50}
                            name="comment"
                        ></textarea>

                        <div
                            className={classnames(
                                "text-red text-12 leading-sm mt-8",
                                { hidden: true },
                            )}
                        >
                            错误信息
                        </div>
                    </div>

                    <div
                        className={classnames("mt-8", {
                            hidden: true,
                        })}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <button className="button button--primary">
                                    Publish
                                </button>
                            </div>

                            <div className="text-12 leading-none text-right">
                                Use @ to mention other users
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-inherit flex w-full" id="comments">
                <div
                    className={classnames("bg-inherit w-full", {
                        hidden: !list?.length,
                    })}
                >
                    <div
                        className={classnames(
                            "bg-inherit md:pt-0",
                            addClassName,
                        )}
                    >
                        <div className="bg-inherit my-3">
                            {list?.map((item) => (
                                <div
                                    className="bg-inherit thread thread--has-replies"
                                    key={item.date}
                                >
                                    <div
                                        className="comment bg-inherit flex py-6 relative"
                                        id="comment-460388"
                                    >
                                        <div className="flex-none mr-12 relative z-10">
                                            <div className="avatar relative">
                                                <img
                                                    src={item.avatarSrc}
                                                    width="24"
                                                    height="24"
                                                    alt=""
                                                    className="avatar__photo is-loaded"
                                                />
                                            </div>
                                        </div>

                                        <div className="comment__details bg-inherit flex-grow">
                                            <div className="text-14 leading-md pt-2 text-grey-27 wysiwyg">
                                                <div>
                                                    <a
                                                        href={`/${item.authorId}`}
                                                        className="autolink notranslate"
                                                    >
                                                        {item.authorName}
                                                    </a>
                                                    <div className="break-all">
                                                        {item.content}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap mt-8 -mx-4 text-12 leading-sm">
                                                <div className="px-4">
                                                    <a
                                                        href="https://tookapic.com/photos/661007#comment-460388"
                                                        className="text-grey-53"
                                                    >
                                                        <time
                                                            dateTime={item.date}
                                                            title={item.date}
                                                        >
                                                            4yrs
                                                        </time>
                                                    </a>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="button-reset px-4 hover:underline "
                                                >
                                                    {item.likes}
                                                    like
                                                </button>

                                                <div className="px-4 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="button-reset inline-flex align-top "
                                                    >
                                                        <span className="off">
                                                            <Icon
                                                                className="icon-like"
                                                                addClassName="text-12 text-grey-53 hover:text-grey-27"
                                                            />
                                                        </span>

                                                        <span className="on">
                                                            <Icon
                                                                className="icon-likefull"
                                                                addClassName="text-12 text-red"
                                                            />
                                                        </span>
                                                    </button>
                                                </div>

                                                <div className="px-4 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="button-reset inline-flex align-top"
                                                    >
                                                        <span className="flex">
                                                            <svg
                                                                className="icon text-12 text-grey-53 hover:text-grey-27"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 576 512"
                                                            >
                                                                <path d="M14.062 257.94L190.06 433.88c30.21 30.21 81.94 8.7 81.94-33.94v-78.28c146.59 8.54 158.53 50.199 134.18 127.879-13.65 43.56 35.07 78.89 72.19 54.46C537.98 464.768 576 403.8 576 330.05c0-170.37-166.04-197.15-304-201.3V48.047c0-42.72-51.79-64.09-81.94-33.94L14.062 190.06c-18.75 18.74-18.75 49.14 0 67.88zM48 224L224 48v128.03c143.181.63 304 11.778 304 154.02 0 66.96-40 109.95-76.02 133.65C501.44 305.911 388.521 273.88 224 272.09V400L48 224z"></path>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>

                                                <div className="px-4 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="button-reset inline-flex align-top"
                                                    >
                                                        <span className="off">
                                                            <svg
                                                                className="icon text-12 text-grey-53 hover:text-grey-27"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 496 512"
                                                            >
                                                                <path d="M403.31 322.49l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66V292c0-2.21-1.79-4-4-4H379c-1.78 0-3.35 1.18-3.84 2.88l-4.2 14.47a3.996 3.996 0 0 1-3.84 2.88h-3.8a3.99 3.99 0 0 1-3.69-2.46l-5.35-12.85a8.003 8.003 0 0 0-7.39-4.93H334.8c-1.66 0-3.29.52-4.64 1.48l-23.71 16.89a26.355 26.355 0 0 1-5.59 3.05l-39.34 15.74a7.996 7.996 0 0 0-5.03 7.43v10.21c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 7.07 4.69 11.31 4.69h10.34c1.31 0 2.61-.16 3.88-.48l21.27-5.32c9.12-2.28 18.77.39 25.42 7.04l13.01 13.01c3 3 7.07 4.69 11.31 4.69h15.16c4.24 0 8.31-1.69 11.31-4.69l9.57-9.57c3-3 4.69-7.07 4.69-11.31V333.8c-.01-4.24-1.7-8.31-4.7-11.31zM248 8C111.04 8 0 119.03 0 256s111.04 248 248 248 248-111.03 248-248S384.96 8 248 8zm0 448c-99.37 0-181.8-72.91-197.19-168h62.57c4.24 0 8.31-1.69 11.31-4.69l19.47-19.46c3.86-3.86 10.37-2.8 12.81 2.08l22.62 45.23c2.71 5.42 8.25 8.85 14.31 8.85h6.1c8.84 0 16-7.16 16-16v-9.37c0-4.24-1.69-8.31-4.69-11.31l-5.66-5.66c-3.12-3.12-3.12-8.19 0-11.31l5.66-5.66c3-3 7.07-4.69 11.31-4.69h.31c5.62 0 10.83-2.95 13.72-7.77l17.37-28.95c1.8-3 6.2-2.83 7.76.3a7.996 7.996 0 0 0 7.15 4.42H272c4.42 0 8-3.58 8-8V137.9c0-6.06-3.42-11.6-8.84-14.31l-10.83-5.41c-5.49-2.75-5.97-10.4-.86-13.81l50.16-38.53C389.83 91.88 448 167.23 448 256c0 110.28-89.72 200-200 200z"></path>
                                                            </svg>
                                                        </span>

                                                        <span
                                                            className="on"
                                                            data-tooltip=""
                                                            data-original-title="Translated"
                                                        >
                                                            <svg
                                                                className="icon text-12 text-accent"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 496 512"
                                                            >
                                                                <path d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm-11.34 240.23c-2.89 4.82-8.1 7.77-13.72 7.77h-.31c-4.24 0-8.31 1.69-11.31 4.69l-5.66 5.66c-3.12 3.12-3.12 8.19 0 11.31l5.66 5.66c3 3 4.69 7.07 4.69 11.31V304c0 8.84-7.16 16-16 16h-6.11c-6.06 0-11.6-3.42-14.31-8.85l-22.62-45.23c-2.44-4.88-8.95-5.94-12.81-2.08l-19.47 19.46c-3 3-7.07 4.69-11.31 4.69H50.81C49.12 277.55 48 266.92 48 256c0-110.28 89.72-200 200-200 21.51 0 42.2 3.51 61.63 9.82l-50.16 38.53c-5.11 3.41-4.63 11.06.86 13.81l10.83 5.41c5.42 2.71 8.84 8.25 8.84 14.31V216c0 4.42-3.58 8-8 8h-3.06c-3.03 0-5.8-1.71-7.15-4.42-1.56-3.12-5.96-3.29-7.76-.3l-17.37 28.95zM408 358.43c0 4.24-1.69 8.31-4.69 11.31l-9.57 9.57c-3 3-7.07 4.69-11.31 4.69h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.767 26.767 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a7.978 7.978 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.18 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v24.6z"></path>
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-inherit thread">
                                        <div className="thread__previous-replies hidden"></div>
                                        {item?.commentList?.length
                                            ? item?.commentList?.map(
                                                  (child) => (
                                                      <div
                                                          className="comment bg-inherit flex py-6 relative"
                                                          id="comment-460395"
                                                          key={child.date}
                                                      >
                                                          <div className="flex-none mr-12 relative z-10">
                                                              <div className="avatar relative">
                                                                  <img
                                                                      src={
                                                                          child.avatarSrc
                                                                      }
                                                                      width="24"
                                                                      height="24"
                                                                      alt=""
                                                                      className="avatar__photo is-loaded"
                                                                  />
                                                              </div>
                                                          </div>

                                                          <div className="comment__details bg-inherit flex-grow">
                                                              <div className="text-14 leading-md pt-2 text-grey-27 wysiwyg">
                                                                  <div>
                                                                      <a
                                                                          href={`/${child.authorId}`}
                                                                          className="autolink notranslate"
                                                                      >
                                                                          {
                                                                              child.authorName
                                                                          }
                                                                      </a>
                                                                      <div className="break-all">
                                                                          {
                                                                              child.content
                                                                          }
                                                                      </div>
                                                                  </div>
                                                              </div>

                                                              <div className="flex flex-wrap mt-8 -mx-4 text-12 leading-sm">
                                                                  <div className="px-4">
                                                                      <a className="text-grey-53 cursor-pointer">
                                                                          <time
                                                                              dateTime={
                                                                                  child.date
                                                                              }
                                                                              title={
                                                                                  child.date
                                                                              }
                                                                          >
                                                                              4yrs
                                                                          </time>
                                                                      </a>
                                                                  </div>

                                                                  <button
                                                                      type="button"
                                                                      className="button-reset px-4 hover:underline "
                                                                  >
                                                                      {
                                                                          child.likes
                                                                      }
                                                                      like
                                                                  </button>

                                                                  <div className="px-4 flex items-center">
                                                                      <button
                                                                          type="button"
                                                                          className="button-reset inline-flex align-top "
                                                                      >
                                                                          <span className="off">
                                                                              <Icon
                                                                                  className="icon-like"
                                                                                  addClassName="text-12 text-grey-53 hover:text-grey-27"
                                                                              />
                                                                          </span>

                                                                          <span className="on">
                                                                              <Icon
                                                                                  className="icon-likefull"
                                                                                  addClassName="text-12 text-red"
                                                                              />
                                                                          </span>
                                                                      </button>
                                                                  </div>

                                                                  <div className="px-4 flex items-center">
                                                                      <button
                                                                          type="button"
                                                                          className="button-reset inline-flex align-top"
                                                                      >
                                                                          <span className="flex">
                                                                              <svg
                                                                                  className="icon text-12 text-grey-53 hover:text-grey-27"
                                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                                  viewBox="0 0 576 512"
                                                                              >
                                                                                  <path d="M14.062 257.94L190.06 433.88c30.21 30.21 81.94 8.7 81.94-33.94v-78.28c146.59 8.54 158.53 50.199 134.18 127.879-13.65 43.56 35.07 78.89 72.19 54.46C537.98 464.768 576 403.8 576 330.05c0-170.37-166.04-197.15-304-201.3V48.047c0-42.72-51.79-64.09-81.94-33.94L14.062 190.06c-18.75 18.74-18.75 49.14 0 67.88zM48 224L224 48v128.03c143.181.63 304 11.778 304 154.02 0 66.96-40 109.95-76.02 133.65C501.44 305.911 388.521 273.88 224 272.09V400L48 224z"></path>
                                                                              </svg>
                                                                          </span>
                                                                      </button>
                                                                  </div>

                                                                  <div className="px-4 flex items-center">
                                                                      <button
                                                                          type="button"
                                                                          className="button-reset inline-flex align-top"
                                                                      >
                                                                          <span className="off">
                                                                              <svg
                                                                                  className="icon text-12 text-grey-53 hover:text-grey-27"
                                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                                  viewBox="0 0 496 512"
                                                                              >
                                                                                  <path d="M403.31 322.49l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66V292c0-2.21-1.79-4-4-4H379c-1.78 0-3.35 1.18-3.84 2.88l-4.2 14.47a3.996 3.996 0 0 1-3.84 2.88h-3.8a3.99 3.99 0 0 1-3.69-2.46l-5.35-12.85a8.003 8.003 0 0 0-7.39-4.93H334.8c-1.66 0-3.29.52-4.64 1.48l-23.71 16.89a26.355 26.355 0 0 1-5.59 3.05l-39.34 15.74a7.996 7.996 0 0 0-5.03 7.43v10.21c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 7.07 4.69 11.31 4.69h10.34c1.31 0 2.61-.16 3.88-.48l21.27-5.32c9.12-2.28 18.77.39 25.42 7.04l13.01 13.01c3 3 7.07 4.69 11.31 4.69h15.16c4.24 0 8.31-1.69 11.31-4.69l9.57-9.57c3-3 4.69-7.07 4.69-11.31V333.8c-.01-4.24-1.7-8.31-4.7-11.31zM248 8C111.04 8 0 119.03 0 256s111.04 248 248 248 248-111.03 248-248S384.96 8 248 8zm0 448c-99.37 0-181.8-72.91-197.19-168h62.57c4.24 0 8.31-1.69 11.31-4.69l19.47-19.46c3.86-3.86 10.37-2.8 12.81 2.08l22.62 45.23c2.71 5.42 8.25 8.85 14.31 8.85h6.1c8.84 0 16-7.16 16-16v-9.37c0-4.24-1.69-8.31-4.69-11.31l-5.66-5.66c-3.12-3.12-3.12-8.19 0-11.31l5.66-5.66c3-3 7.07-4.69 11.31-4.69h.31c5.62 0 10.83-2.95 13.72-7.77l17.37-28.95c1.8-3 6.2-2.83 7.76.3a7.996 7.996 0 0 0 7.15 4.42H272c4.42 0 8-3.58 8-8V137.9c0-6.06-3.42-11.6-8.84-14.31l-10.83-5.41c-5.49-2.75-5.97-10.4-.86-13.81l50.16-38.53C389.83 91.88 448 167.23 448 256c0 110.28-89.72 200-200 200z"></path>
                                                                              </svg>
                                                                          </span>

                                                                          <span className="on">
                                                                              <svg
                                                                                  className="icon text-12 text-accent"
                                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                                  viewBox="0 0 496 512"
                                                                              >
                                                                                  <path d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm-11.34 240.23c-2.89 4.82-8.1 7.77-13.72 7.77h-.31c-4.24 0-8.31 1.69-11.31 4.69l-5.66 5.66c-3.12 3.12-3.12 8.19 0 11.31l5.66 5.66c3 3 4.69 7.07 4.69 11.31V304c0 8.84-7.16 16-16 16h-6.11c-6.06 0-11.6-3.42-14.31-8.85l-22.62-45.23c-2.44-4.88-8.95-5.94-12.81-2.08l-19.47 19.46c-3 3-7.07 4.69-11.31 4.69H50.81C49.12 277.55 48 266.92 48 256c0-110.28 89.72-200 200-200 21.51 0 42.2 3.51 61.63 9.82l-50.16 38.53c-5.11 3.41-4.63 11.06.86 13.81l10.83 5.41c5.42 2.71 8.84 8.25 8.84 14.31V216c0 4.42-3.58 8-8 8h-3.06c-3.03 0-5.8-1.71-7.15-4.42-1.56-3.12-5.96-3.29-7.76-.3l-17.37 28.95zM408 358.43c0 4.24-1.69 8.31-4.69 11.31l-9.57 9.57c-3 3-7.07 4.69-11.31 4.69h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.767 26.767 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a7.978 7.978 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.18 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v24.6z"></path>
                                                                              </svg>
                                                                          </span>
                                                                      </button>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  ),
                                              )
                                            : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    className={classnames("w-full self-start", {
                        hidden: list?.length,
                    })}
                >
                    <div className="rounded-6  text-grey-53 text-center px-16 pt-24 pb-32 md:py-24 md:px-32 md:pb-48 md:pt-24 lg:py-72 lg:px-24">
                        <div className="mb-16">
                            <svg
                                className="icon text-24 opacity-25"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                            >
                                <path d="M288 32C129 32 0 125.1 0 240c0 49.3 23.7 94.5 63.3 130.2-8.7 23.3-22.1 32.7-37.1 43.1C15.1 421-6 433 1.6 456.5c5.1 15.4 20.9 24.7 38.1 23.3 57.7-4.6 111.2-19.2 157-42.5 28.7 6.9 59.4 10.7 91.2 10.7 159.1 0 288-93 288-208C576 125.1 447.1 32 288 32zm0 368c-32.5 0-65.4-4.4-97.3-14-32.3 19-78.7 46-134.7 54 32-24 56.8-61.6 61.2-88.4C79.1 325.6 48 286.7 48 240c0-70.9 86.3-160 240-160s240 89.1 240 160c0 71-86.3 160-240 160zm-64-160c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm112 0c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm112 0c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48z"></path>
                            </svg>
                        </div>

                        <div className="text-14 leading-md">No comments</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;
