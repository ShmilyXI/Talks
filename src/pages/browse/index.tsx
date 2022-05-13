import Filter from '@/components/Filter';
import React from 'react';

const Browse = () => {
  return (
    <div className="container p-16 md:px-32 md:py-24">
      <div className="container p-0 flex items-center justify-between">
        <div className="min-w-0 flex-grow mr-8">
          <div className="xl:hidden">
            <div
              data-controller="dropdown"
              data-dropdown-placement="bottom-end"
              data-dropdown-offset="0,8px"
            >
              <button
                type="button"
                className="select truncate"
                data-target="dropdown.trigger"
                data-action="dropdown#toggle"
              >
                Popular
              </button>

              <div
                className="absolute z-50 bg-black-95 rounded whitespace-no-wrap min-w-128 shadow-sm hidden"
                data-target="dropdown.menu"
                x-placement="bottom-end"
                style={{
                  position: 'absolute',
                  transform: 'translate3d(0, 8px, 0)',
                  top: 0,
                  left: 0,
                  willChange: 'transform',
                }}
                x-out-of-boundaries=""
              >
                <div className="flex flex-col text-left py-12 text-16 leading-lg">
                  <a
                    href="https://tookapic.com/"
                    className="px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white hover:no-underline"
                  >
                    Following
                  </a>
                  <a
                    href="https://tookapic.com/photos"
                    className="px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white font-medium hover:no-underline"
                  >
                    Popular
                  </a>
                  <a
                    href="https://tookapic.com/photos?stream=recent"
                    className="px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white hover:no-underline"
                  >
                    Recent
                  </a>
                  <a
                    href="https://tookapic.com/photos?stream=debuts"
                    className="px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white hover:no-underline"
                  >
                    Debuts
                  </a>
                  <a
                    href="https://tookapic.com/photos?stream=finishers"
                    className="px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white hover:no-underline"
                  >
                    Finishers
                  </a>
                  <a
                    href="https://tookapic.com/photos?stream=photos-of-the-day"
                    className="px-28 lg:px-16 py-8 lg:py-1 hover:no-underline hover:bg-white-15 text-white hover:no-underline"
                  >
                    Photos of the Day
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden xl:block">
            <Filter
              items={[
                { label: 'Test1', value: '1' },
                { label: 'Test2', value: '2' },
                { label: 'Test3', value: '3' },
                { label: 'Test4', value: '4' },
                { label: 'Test5', value: '5' },
                { label: 'Test6', value: '6' },
                { label: 'Test7', value: '7' },
              ]}
              onChange={(item) => {
                console.log('item', item);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
