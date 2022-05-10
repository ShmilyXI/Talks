import React from 'react';

const Header = () => {
  return (
    <div
      className="navbar bg-white px-16 mx-auto md:px-16 z-60 shadow-navbar sticky pin-t md:relative md:shadow-none"
      data-controller="navbar"
      id="top"
    >
      <div className="hidden md:flex items-center py-16">
        <svg className="icon flex-none text-black text-26" aria-hidden="true">
          <use xlinkHref="#icon-discover"></use>
        </svg>
        <div className="w-full ml-16 mr-8 flex items-center min-w-0">
          <div className="text-black font-medium">Tookapic</div>
          <div className="hidden lg:block ml-20 truncate">
            <a
              href="https://tookapic.com/auth/register"
              className="text-inherit"
            >
              Start your own 365 Project
            </a>
          </div>
        </div>
        <div className="flex flex-none items-center -mx-16">
          <div className="ml-8" data-controller="dropdown">
            <a
              href="https://tookapic.com/photos"
              className="block py-4 px-16 leading-sm font-medium text-black hover:no-underline"
            >
              Browse
            </a>
          </div>
          <a
            href="https://tookapic.com/"
            className="block py-4 px-16 ml-8 leading-sm font-medium text-grey-53 hover:text-black hover:no-underline"
          >
            Learn more
          </a>
        </div>
        <div className="flex flex-none items-center justify-start ml-32 lg:ml-24 lg:ml-48 flex-grow">
          <a
            href="https://tookapic.com/auth/login"
            className="button button--secondary hidden sm:block md:ml-8 mr-16"
          >
            Log in
          </a>
          <a
            href="https://tookapic.com/auth/login"
            className="leading-xl sm:hidden mr-24"
          >
            <svg
              className="icon text-22 align-middle text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M331.328 240C355.031 213.566 368 179.781 368 144 368 64.417 303.596 0 224 0 144.417 0 80 64.404 80 144c0 35.781 12.969 69.566 36.672 96C44.863 240 0 293.844 0 352v116c0 24.262 19.738 44 44 44h360c24.262 0 44-19.738 44-44V352c0-58.421-45.117-112-116.672-112zM224 32c61.856 0 112 50.144 112 112s-50.144 112-112 112-112-50.144-112-112S162.144 32 224 32zm192 436c0 6.627-5.373 12-12 12H44c-6.627 0-12-5.373-12-12V352c0-44.183 35.817-80 80-80h45.898c41.196 21.333 90.958 21.359 132.204 0H336c44.183 0 80 35.817 80 80v116z"></path>
            </svg>
          </a>
          <a
            href="https://tookapic.com/auth/register"
            className="button button--primary"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
