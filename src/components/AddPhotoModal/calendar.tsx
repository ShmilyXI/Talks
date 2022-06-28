import classnames from "classnames";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import flatpickr from "flatpickr";
import { useClickAway, useToggle } from "ahooks";

type CalendarProps = {
    value: string;
    disabled: boolean;
    onChange: (value?: string) => void;
};
const Calendar: FC<CalendarProps> = (props) => {
    const { value, disabled, onChange } = props;

    const calendarWrapRef = useRef<any>();
    const calendarRef = useRef<any>();
    const { t } = useTranslation();

    const [
        showModal,
        { toggle: toggleModal, setLeft: setModalLeft, setRight: setModalRight },
    ] = useToggle();

    useClickAway(() => {
        if (showModal) {
            setModalLeft();
        }
    }, [calendarWrapRef.current]);

    useEffect(() => {
        calendarWrapRef.current = document?.getElementById("calendar-wrap");
        calendarRef.current = document?.querySelector("#calendar-modal");

        flatpickr(calendarWrapRef.current, {
            wrap: true,
            inline: true,
            appendTo: calendarRef.current,
            enableTime: true,
            locale:'zh',
            nextArrow: ">",
            prevArrow: "<",
            time_24hr: true,
            onChange: (selectedDates: any, dateStr: string) => {
                onChange(dateStr);
            },
        });
    }, []);

    return (
        <div className="relative z-10 calendar">
            <div id="calendar-wrap">
                <button
                    data-input
                    className={classnames(
                        "button button--pill",
                        value ? "is-active" : "is-invalid",
                    )}
                    type="button"
                    disabled={disabled}
                    onClick={toggleModal}
                >
                    <span title="Select date">
                        <span className="button--pill__icon mr-6">
                            <svg
                                className="icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z" />
                            </svg>
                        </span>

                        <span className="pr-6">
                            {value || t("photoModal.no_date")}
                        </span>
                    </span>
                </button>
                <div
                    className={classnames("w-248 absolute bottom-[40px]", {
                        hidden: !showModal,
                    })}
                    id="calendar-modal"
                ></div>
            </div>
        </div>
    );
};

export default Calendar;
