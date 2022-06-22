import { Icon } from "@components";
import { useClickAway, useToggle } from "ahooks";
import classnames from "classnames";
import React, { FC, useRef, useState } from "react";
import { CommentItem } from "../../pages/photoDetail/index";

type Props = {
    list: CommentItem[];
    className?: string;
    addClassName?: string;
};
const Comments: FC<Props> = (props) => {
    const { list, className, addClassName } = props;
    const textareaRef = useRef(null);
    const [
        isFocus,
        {
            toggle: toggleIsFocus,
            setLeft: setIsFocusLeft,
            setRight: setIsFocusRight,
        },
    ] = useToggle();
    useClickAway(() => {
        setIsFocusLeft?.();
    }, textareaRef);
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

                <div className="flex-grow" ref={textareaRef}>
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
                            onFocus={() => setIsFocusRight()}
                        ></textarea>

                        <div
                            className={classnames(
                                "text-red text-12 leading-sm mt-8",
                                { hidden: true },
                            )}
                        >
                            错误信息xxxxx
                        </div>
                    </div>

                    <div
                        className={classnames("mt-8", {
                            hidden: !isFocus,
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
                                                                addClassName="text-16 text-red"
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
                                                            <Icon
                                                                className="icon-huifu"
                                                                addClassName="text-16 text-grey-53 hover:text-grey-27"
                                                            />
                                                        </span>
                                                    </button>
                                                </div>

                                                <div className="px-4 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="button-reset inline-flex align-top"
                                                    >
                                                        <span className="off">
                                                            <Icon
                                                                className="icon-earth"
                                                                addClassName="text-16 text-grey-53 hover:text-grey-27"
                                                            />
                                                        </span>

                                                        <span className="on">
                                                            <Icon
                                                                className="icon-earth"
                                                                addClassName="text-16 text-accent"
                                                            />
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
                                                                              <Icon
                                                                                  className="icon-huifu"
                                                                                  addClassName="text-16 text-grey-53 hover:text-grey-27"
                                                                              />
                                                                          </span>
                                                                      </button>
                                                                  </div>

                                                                  <div className="px-4 flex items-center">
                                                                      <button
                                                                          type="button"
                                                                          className="button-reset inline-flex align-top"
                                                                      >
                                                                          <span className="off">
                                                                              <Icon
                                                                                  className="icon-earth"
                                                                                  addClassName="text-16 text-grey-53 hover:text-grey-27"
                                                                              />
                                                                          </span>

                                                                          <span className="on">
                                                                              <Icon
                                                                                  className="icon-earth"
                                                                                  addClassName="text-16 text-accent"
                                                                              />
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
                            <Icon
                                className="icon-message"
                                addClassName="text-28 opacity-25"
                            />
                        </div>

                        <div className="text-14 leading-md">No comments</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;
