import Icon from "@components/Icon";
import { useToggle, useSetState } from "ahooks";
import classnames from "classnames";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import "./index.less";

interface State {
    [key: string]: any;
}

const Login = () => {
    const router = useRouter();
    console.log("router", router);
    const { signIn } = router.query;

    const [
        showSignIn,
        {
            toggle: toggleSignIn,
            setLeft: setSignInLeft,
            setRight: setSignInRight,
        },
    ] = useToggle(false);
    const [showSwitch, { setLeft: setSwitchLeft, setRight: setSwitchRight }] =
        useToggle(false);

    const [state, setState] = useSetState<State>({ formValue: {} });
    const timer = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (signIn === "1") {
            setSignInRight();
        } else {
            setSignInLeft();
        }
        return () => {
            clearTimeout(timer.current);
            setState({});
        };
    }, [signIn]);

    const onSubmit = () => {
        console.log("submit--->", state.formValue);
        toast.success(`success login! ${JSON.stringify(state.formValue)}`);
        router.push("/photos");
    };

    const transformForm = () => {
        setState({ formValue: {} });
        toggleSignIn();
        setSwitchRight();
        timer.current = setTimeout(() => {
            setSwitchLeft();
        }, 1000);
    };

    const onInputChange = (data: any) => {
        const name = data.target?.name || "";
        if (!name) return;
        const value = data.target?.value;
        setState({
            formValue: {
                ...state.formValue,
                [name]: value,
            },
        });
    };
    console.log("showSignIn", showSignIn);

    return (
        <div className="login-wrap w-full h-screen flex justify-center items-center text-xs m-0 box-border select-none px-6">
            <div className="main hidden md:flex justify-center relative w-[1000px] min-w-[1000px] h-[600px] min-h-[600px] rounded-xl overflow-hidden scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-100">
                <div
                    className={classnames(
                        "container flex justify-center items-center absolute top-0 w-[600px] h-full a-container",
                        {
                            "is-txl": showSignIn,
                        },
                    )}
                >
                    <div className="form flex justify-center items-center flex-col w-full h-full">
                        <h2 className="form_title title text-4xl font-bold leading-[2]">
                            Create Account
                        </h2>
                        <div className="flex justify-center items-center">
                            <Icon
                                className="icon-instagram"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                            <Icon
                                className="icon-facebook"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                            <Icon
                                className="icon-twitter"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                        </div>
                        <span className="mt-8 mb-3">
                            or use email for registration
                        </span>
                        <input
                            className="form__input w-4/6 h-10 my-4 pl-6 text-sm tracking-wide border-none outline-none rounded-lg"
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={state.formValue?.name || ""}
                            onChange={onInputChange}
                        />
                        <input
                            className="form__input w-4/6 h-10 my-4 pl-6 text-sm tracking-wide border-none outline-none rounded-lg"
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={state.formValue?.email || ""}
                            onChange={onInputChange}
                        />
                        <input
                            className="form__input w-4/6 h-10 my-4 pl-6 text-sm tracking-wide border-none outline-none rounded-lg"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={state.formValue?.password || ""}
                            onChange={onInputChange}
                        />
                        <button
                            className="form__button login-button w-[180px] h-[50px] rounded-[25px] mt-12 font-bold text-sm tracking-widest border-none outline-none"
                            onClick={onSubmit}
                        >
                            SIGN UP
                        </button>
                    </div>
                </div>
                <div
                    className={classnames(
                        "container flex justify-center items-center absolute top-0 w-[600px] h-full b-container",
                        {
                            "is-txl": showSignIn,
                            "is-z200": showSignIn,
                        },
                    )}
                >
                    <div className="form  flex justify-center items-center flex-col w-full h-full">
                        <h2 className="form_title title text-4xl font-bold leading-[2]">
                            Sign in to Website
                        </h2>
                        <div className="flex justify-center items-center">
                            <Icon
                                className="icon-instagram"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                            <Icon
                                className="icon-facebook"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                            <Icon
                                className="icon-twitter"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                        </div>
                        <span className="mt-8 mb-3">
                            or use your email account
                        </span>
                        <input
                            className="form__input w-4/6 h-10 my-4 pl-6 text-sm tracking-wide border-none outline-none rounded-lg"
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={state.formValue?.email || ""}
                            onChange={onInputChange}
                        />
                        <input
                            className="form__input w-4/6 h-10 my-4 pl-6 text-sm tracking-wide border-none outline-none rounded-lg"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={state.formValue?.password || ""}
                            onChange={onInputChange}
                        />
                        <a className="form__link text-base mt-6 hover:no-underline cursor-pointer">
                            Forgot your password?
                        </a>
                        <button
                            className="form__button login-button w-[180px] h-[50px] rounded-[25px] mt-12 font-bold text-sm tracking-widest border-none outline-none"
                            onClick={onSubmit}
                        >
                            SIGN IN
                        </button>
                    </div>
                </div>
                <div
                    className={classnames(
                        "switch flex justify-center items-center absolute top-0 left-0 h-full w-[400px] p-[50px] z-[200] overflow-hidden",
                        {
                            "is-txr": showSignIn,
                            "is-gx": showSwitch,
                        },
                    )}
                >
                    <div
                        className={classnames(
                            "switch__circle absolute w-[500px] h-[500px] rounded-[50%] -bottom-[60%] -left-[60%]",
                            {
                                "is-txr": showSignIn,
                            },
                        )}
                    ></div>
                    <div
                        className={classnames(
                            "switch__circle switch__circle--t absolute w-[300px] h-[300px] rounded-[50%] -top-[30%] left-[60%]",
                            {
                                "is-txr": showSignIn,
                            },
                        )}
                    ></div>
                    <div
                        className={classnames(
                            "switch__container flex justify-center items-center flex-col absolute w-[400px] px-[50px] py-[55px]",
                            {
                                "is-hidden": showSignIn,
                            },
                        )}
                    >
                        <h2 className="title text-4xl font-bold leading-[2]">
                            Welcome Back !
                        </h2>
                        <p className="switch__description text-sm tracking-wider text-center leading-relaxed">
                            To keep connected with us please login with your
                            personal info
                        </p>
                        <button
                            className="switch__button login-button w-[180px] h-[50px] rounded-[25px] mt-12 font-bold text-sm tracking-widest border-none outline-none"
                            onClick={transformForm}
                        >
                            SIGN IN
                        </button>
                    </div>
                    <div
                        className={classnames(
                            "switch__container  flex justify-center items-center flex-col absolute w-[400px] px-[50px] py-[55px]",
                            {
                                "is-hidden": !showSignIn,
                            },
                        )}
                    >
                        <h2 className="title text-4xl font-bold leading-[2]">
                            Hello Friend !
                        </h2>
                        <p className="switch__description text-sm tracking-wider text-center leading-relaxed">
                            Enter your personal details and start journey with
                            us
                        </p>
                        <button
                            className="switch__button login-button w-[180px] h-[50px] rounded-[25px] mt-12 font-bold text-sm tracking-widest border-none outline-none"
                            onClick={transformForm}
                        >
                            SIGN UP
                        </button>
                    </div>
                </div>
            </div>
            <div className="main flex md:hidden justify-center  relative w-10/12 h-2/5 rounded-xl overflow-hidden">
                <div
                    className={classnames(
                        "container flex justify-center items-center absolute top-0 w-full h-full",
                        {
                            // "is-txl": showSignIn,
                            "left-full": showSignIn,
                            "left-0": !showSignIn,
                            "is-z200": !showSignIn,
                        },
                    )}
                >
                    <div className="form flex justify-center items-center flex-col w-full h-full">
                        <h2 className="form_title title text-2xl font-bold leading-[2]">
                            Create Account
                        </h2>
                        <div className="flex justify-center items-center">
                            <Icon
                                className="icon-instagram"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                            <Icon
                                className="icon-facebook"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                            <Icon
                                className="icon-twitter"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                        </div>
                        <span className="mt-8 mb-3">
                            or use email for registration
                        </span>
                        <input
                            className="form__input w-4/6 h-10 my-4 pl-6 text-sm tracking-wide border-none outline-none rounded-lg"
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={state.formValue?.name || ""}
                            onChange={onInputChange}
                        />
                        <input
                            className="form__input w-4/6 h-10 my-4 pl-6 text-sm tracking-wide border-none outline-none rounded-lg"
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={state.formValue?.email || ""}
                            onChange={onInputChange}
                        />
                        <input
                            className="form__input w-4/6 h-10 my-4 pl-6 text-sm tracking-wide border-none outline-none rounded-lg"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={state.formValue?.password || ""}
                            onChange={onInputChange}
                        />
                        <button
                            className="form__button login-button w-[180px] h-[50px] rounded-[25px] mt-12 font-bold text-sm tracking-widest border-none outline-none"
                            onClick={onSubmit}
                        >
                            SIGN UP
                        </button>
                    </div>
                </div>
                <div
                    className={classnames(
                        "container flex justify-center items-center absolute top-0 w-full h-full",
                        {
                            "right-full": !showSignIn,
                            "right-0": showSignIn,
                            "is-z200": showSignIn,
                        },
                    )}
                >
                    <div className="form flex justify-center items-center flex-col w-full h-full">
                        <h2 className="form_title title text-2xl font-bold leading-[2]">
                            Sign in to Website
                        </h2>
                        <div className="flex justify-center items-center">
                            <Icon
                                className="icon-instagram"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                            <Icon
                                className="icon-facebook"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                            <Icon
                                className="icon-twitter"
                                addClassName="form__icon text-2xl mx-2 opacity-50"
                            />
                        </div>
                        <span className="mt-8 mb-3">
                            or use your email account
                        </span>
                        <input
                            className="form__input w-4/6 h-10 my-4 pl-6 text-sm tracking-wide border-none outline-none rounded-lg"
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={state.formValue?.email || ""}
                            onChange={onInputChange}
                        />
                        <input
                            className="form__input w-4/6 h-10 my-4 pl-6 text-sm tracking-wide border-none outline-none rounded-lg"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={state.formValue?.password || ""}
                            onChange={onInputChange}
                        />
                        <a className="form__link text-base mt-6 hover:no-underline cursor-pointer">
                            Forgot your password?
                        </a>
                        <button
                            className="form__button login-button w-[180px] h-[50px] rounded-[25px] mt-12 font-bold text-sm tracking-widest border-none outline-none"
                            onClick={onSubmit}
                        >
                            SIGN IN
                        </button>
                    </div>
                </div>
                <div
                    onClick={toggleSignIn}
                    className={classnames(
                        "mobile-toggle flex items-center justify-center absolute top-0 h-full z-[210] cursor-pointer",
                        showSignIn ? "is-m-left" : "left-0",
                    )}
                >
                    <Icon
                        className={
                            showSignIn
                                ? "icon-double-arrow-left"
                                : "icon-double-arro-right"
                        }
                        addClassName="text-xl arrow-icon"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
