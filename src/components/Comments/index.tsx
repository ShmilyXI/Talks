import React, { FC, useEffect, useRef, useState } from "react";
import { CommentData, CommentItem } from "@/types/CommunityTypes";
import { Icon } from "@components";
import { useClickAway, useToggle } from "ahooks";
import classnames from "classnames";
import dayjs from "dayjs";
import _ from "lodash";

type Props = {
  list: CommentItem[];
  className?: string;
  addClassName?: string;
  onSubmit?: (data: CommentData, callback: () => void) => void;
};
const Comments: FC<Props> = (props) => {
  const { list, className, addClassName, onSubmit = () => {} } = props;
  const [commentContent, setCommentContent] = useState(""); // 评论内容
  const [replyContent, setReplyContent] = useState(""); // 评论回复内容
  const [replyId, setReplyId] = useState<number>(); // 评论回复id
  const textareaRef = useRef(null); // 一级评论框ref
  const [isFocus, { setLeft: setIsFocusLeft, setRight: setIsFocusRight }] =
    useToggle();

  useClickAway(() => {
    setIsFocusLeft?.();
    setCommentContent("");
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
      <div
        className={classnames("flex flex-none pb-8", addClassName)}
        ref={textareaRef}
      >
        <div className="flex-none mr-16 self-start">
          <div className="avatar" id="comment-form-avatar-45265">
            <img
              src="https://tookapic.com/img/avatars/default.svg"
              width="32"
              height="32"
              alt=""
              className="avatar__photo is-loaded w-[32px] h-[32px] object-cover rounded-full"
            />
          </div>
        </div>

        <div className="flex-grow">
          <div>
            <textarea
              className={classnames(
                "bg-white input overflow-hidden break-words !resize-none",
              )}
              // placeholder="Type your comment here…"
              placeholder="在这里输入你的评论…"
              maxLength={4096}
              rows={1}
              cols={50}
              value={commentContent}
              name="comment"
              onFocus={() => setIsFocusRight()}
              onChange={(e) => setCommentContent(e.target?.value || "")}
              onKeyUp={function (e: any) {
                if (e.keyCode === 8) {
                  e.target.style.height = "inherit";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                } else {
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }
              }}
            ></textarea>
          </div>

          <div
            className={classnames("mt-8", {
              hidden: !isFocus,
            })}
          >
            <div className="flex justify-between items-center">
              <div>
                <button
                  className="button button--primary"
                  onClick={() => {
                    onSubmit(
                      {
                        content: commentContent,
                        commentLevel: 1,
                      },
                      () => {
                        setCommentContent("");
                        setIsFocusLeft();
                      },
                    );
                  }}
                >
                  {/* Publish */}
                  发布
                </button>
              </div>

              {/* <div className="text-12 leading-none text-right"> */}
              {/* Use @ to mention other users */}
              {/* 使用 @ 来提到其他用户 */}
              {/* </div> */}
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
          <div className={classnames("bg-inherit md:pt-0", addClassName)}>
            <div className="bg-inherit my-3">
              {list?.map((item) => (
                <div
                  className="bg-inherit thread thread--has-replies"
                  key={item.create_date}
                >
                  <div
                    className="comment bg-inherit flex py-6 relative"
                    id={`comment-${item.id}`}
                  >
                    <div className="flex-none mr-12 relative z-10">
                      <div className="avatar relative">
                        <img
                          src={
                            item.user_avatar_url ||
                            "https://tookapic.com/img/avatars/default.svg"
                          }
                          width="24"
                          height="24"
                          alt=""
                          className="avatar__photo is-loaded w-[24px] h-[24px] object-cover rounded-full"
                        />
                      </div>
                    </div>

                    <div className="comment__details bg-inherit flex-grow">
                      <div className="text-14 leading-md pt-2 text-grey-27 wysiwyg">
                        <div>
                          <a
                            href={`/${item.user_id}`}
                            className="autolink notranslate"
                          >
                            {item.display_name || item.username}
                          </a>
                          <div className="break-all">{item.content}</div>
                        </div>
                      </div>

                      <div
                        className={classnames(
                          "flex-wrap mt-8 -mx-4 text-12 leading-sm",
                          replyId && replyId === item.id ? "hidden" : "flex",
                        )}
                      >
                        <div className="px-4">
                          <a
                            href="https://tookapic.com/photos/661007#comment-460388"
                            className="text-grey-53"
                          >
                            <time
                              dateTime={item.create_date}
                              title={item.create_date}
                            >
                              {dayjs(item.create_date).fromNow()}
                            </time>
                          </a>
                        </div>

                        <button
                          type="button"
                          className={classnames(
                            "button-reset px-4 hover:underline",
                            { hidden: !item.like_count },
                          )}
                        >
                          {item.like_count}&nbsp; like
                        </button>

                        <div className="px-4 flex items-center">
                          <button
                            type="button"
                            className="button-reset inline-flex align-top"
                            title="喜欢"
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
                            title="回复"
                            onClick={() => setReplyId(item.id)}
                          >
                            <span className="flex">
                              <Icon
                                className="icon-huifu"
                                addClassName="text-16 text-grey-53 hover:text-grey-27"
                              />
                            </span>
                          </button>
                        </div>

                        {/* <div className="px-4 flex items-center">
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
                        </div> */}
                      </div>
                      <div
                        className={classnames("my-8", {
                          hidden:
                            _.isNil(replyId) ||
                            (replyId && replyId !== item.id),
                        })}
                      >
                        <textarea
                          className={classnames(
                            "bg-white input overflow-hidden break-words !resize-none",
                          )}
                          placeholder="Enter your reply…"
                          maxLength={4096}
                          rows={1}
                          cols={50}
                          value={replyContent}
                          name="comment-reply"
                          onChange={(e) =>
                            setReplyContent(e.target?.value || "")
                          }
                          onKeyUp={function (e: any) {
                            if (e.keyCode === 8) {
                              e.target.style.height = "inherit";
                              e.target.style.height = `${e.target.scrollHeight}px`;
                            } else {
                              e.target.style.height = `${e.target.scrollHeight}px`;
                            }
                          }}
                        ></textarea>

                        <div className="flex mt-8">
                          <button
                            type="submit"
                            className="button button--primary"
                            onClick={() => {
                              onSubmit(
                                {
                                  content: replyContent,
                                  commentLevel: 2,
                                  parentCommentId: item.id,
                                  parentCommentUserId: item.user_id,
                                },
                                () => {
                                  setReplyId(undefined);
                                  setReplyContent("");
                                },
                              );
                            }}
                          >
                            {/* Publish */}
                            发布
                          </button>

                          <button
                            type="button"
                            className="button button--cancel ml-8"
                            onClick={() => {
                              setReplyId(undefined);
                              setReplyContent("");
                            }}
                          >
                            {/* Cancel */}
                            取消
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-inherit thread">
                    <div className="thread__previous-replies hidden"></div>
                    {item?.children?.length
                      ? item?.children?.map((child) => (
                          <div
                            className="comment bg-inherit flex py-6 relative"
                            id={`comment-${child.id}`}
                            key={child.create_date}
                          >
                            <div className="flex-none mr-12 relative z-10">
                              <div className="avatar relative">
                                <img
                                  src={
                                    child.user_avatar_url ||
                                    "https://tookapic.com/img/avatars/default.svg"
                                  }
                                  width="24"
                                  height="24"
                                  alt=""
                                  className="avatar__photo is-loaded w-[24px] h-[24px] object-cover rounded-full"
                                />
                              </div>
                            </div>

                            <div className="comment__details bg-inherit flex-grow">
                              <div className="text-14 leading-md pt-2 text-grey-27 wysiwyg">
                                <div>
                                  {child?.replyUserInfo?.id ? (
                                    <>
                                      <a
                                        href={`/${child.user_id}`}
                                        className="autolink notranslate"
                                      >
                                        {child.display_name || child.username}
                                      </a>
                                      &nbsp; 回复 &nbsp;
                                      <a
                                        href={`/${child?.replyUserInfo?.id}`}
                                        className="autolink notranslate"
                                      >
                                        {child?.replyUserInfo?.display_name ||
                                          child?.replyUserInfo?.username}
                                      </a>
                                    </>
                                  ) : (
                                    <a
                                      href={`/${child.user_id}`}
                                      className="autolink notranslate"
                                    >
                                      {child.display_name || child.username}
                                    </a>
                                  )}
                                  <div className="break-all">
                                    {child.content}
                                  </div>
                                </div>
                              </div>

                              <div
                                className={classnames(
                                  "flex-wrap mt-8 -mx-4 text-12 leading-sm",
                                  replyId && replyId === child.id
                                    ? "hidden"
                                    : "flex",
                                )}
                              >
                                <div className="px-4">
                                  <a className="text-grey-53 cursor-pointer">
                                    <time
                                      dateTime={child.create_date}
                                      title={child.create_date}
                                    >
                                      {dayjs(child.create_date).fromNow()}
                                    </time>
                                  </a>
                                </div>

                                <button
                                  type="button"
                                  className={classnames(
                                    "button-reset px-4 hover:underline",
                                    { hidden: !child.like_count },
                                  )}
                                >
                                  {child.like_count}&nbsp; like
                                </button>

                                <div className="px-4 flex items-center">
                                  <button
                                    type="button"
                                    className="button-reset inline-flex align-top "
                                    title="喜欢"
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
                                    title="回复"
                                    onClick={() => {
                                      setReplyId(child.id);
                                    }}
                                  >
                                    <span className="flex">
                                      <Icon
                                        className="icon-huifu"
                                        addClassName="text-16 text-grey-53 hover:text-grey-27"
                                      />
                                    </span>
                                  </button>
                                </div>

                                {/* <div className="px-4 flex items-center">
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
                                </div> */}
                              </div>
                              <div
                                className={classnames("my-8", {
                                  hidden:
                                    _.isNil(replyId) ||
                                    (replyId && replyId !== child.id),
                                })}
                              >
                                <textarea
                                  className={classnames(
                                    "bg-white input overflow-hidden break-words !resize-none",
                                  )}
                                  placeholder="Enter your reply…"
                                  maxLength={4096}
                                  rows={1}
                                  cols={50}
                                  value={replyContent}
                                  name="comment-reply"
                                  onChange={(e) =>
                                    setReplyContent(e.target?.value || "")
                                  }
                                  onKeyUp={function (e: any) {
                                    if (e.keyCode === 8) {
                                      e.target.style.height = "inherit";
                                      e.target.style.height = `${e.target.scrollHeight}px`;
                                    } else {
                                      e.target.style.height = `${e.target.scrollHeight}px`;
                                    }
                                  }}
                                ></textarea>

                                <div className="flex mt-8">
                                  <button
                                    type="submit"
                                    className="button button--primary"
                                    onClick={() => {
                                      onSubmit(
                                        {
                                          content: replyContent,
                                          commentLevel: 2,
                                          parentCommentId: item.id,
                                          parentCommentUserId: item.user_id,
                                          replyCommentId: child.id,
                                          replyCommentUserId: child.user_id,
                                        },
                                        () => {
                                          setReplyId(undefined);
                                          setReplyContent("");
                                        },
                                      );
                                    }}
                                  >
                                    {/* Publish */}
                                    发布
                                  </button>

                                  <button
                                    type="button"
                                    className="button button--cancel ml-8"
                                    onClick={() => {
                                      setReplyId(undefined);
                                      setReplyContent("");
                                    }}
                                  >
                                    {/* Cancel */}
                                    取消
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
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

            <div className="text-14 leading-md">
              {/* No comments */}
              没有评论
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
