"use client";

import Image from "next/image";
import { getMicrocms_Meal_Type } from "./lib/microcms/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [datas, Setdatas] = useState<Microcms_Meal_Type[]>([]);
  //拿取CMS 公告資料
  const Get_CMS_Announcement_Setting = async () => {
    const responsData = await getMicrocms_Meal_Type(); //ISR
    Setdatas(responsData.contents);
  };

  useEffect(() => {
    Get_CMS_Announcement_Setting();
  }, []);
  return (
    <div className="bg-slate-50 dark:bg-gray-800 border-b">
      <div className="py-8 px-6 sm:px-6 sm:py-20">
        <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
          <input
            className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
            type="radio"
            name="flexRadioDefault"
            id="radioDefault01"
          />
          <label
            className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
            htmlFor="radioDefault01"
          >
            Default radio
          </label>
        </div>
        <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
          <input
            className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
            type="radio"
            name="flexRadioDefault"
            id="radioDefault02"
            checked
          />
          <label
            className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
            htmlFor="radioDefault02"
          >
            Default checked radio
          </label>
        </div>
      </div>
      {datas &&
        datas.map((data, index) => (
          <div key={index} className="py-8 px-6 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-center text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
                {data.storename}
              </h2>
              <p className="mx-auto mt-3 sm:mt-6 max-w-xl text-md sm:text-lg sm:leading-snug text-gray-600 dark:text-gray-300">
                地址 : {data.address}
              </p>
              <p className="mx-auto mt-3 sm:mt-6 max-w-xl text-md sm:text-lg sm:leading-snug text-gray-600 dark:text-gray-300">
                距離 : {data.distance}
              </p>
              <div className="mt-6 sm:mt-10 flex items-center justify-center gap-x-6">
                <a
                  className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] text-sm py-6 px-8"
                  href={data.weblink}
                >
                  向かう
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
