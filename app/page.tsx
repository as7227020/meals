"use client";

import Image from "next/image";
import {
  getMicrocms_Meal_Type,
  getMicrocms_Meal_Type_ByPlace,
} from "./lib/microcms/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [datas, Setdatas] = useState<Microcms_Meal_Type[]>([]);
  //拿取CMS 公告資料
  const Get_CMS_Announcement_Setting = async () => {
    const responsData = await getMicrocms_Meal_Type(); //ISR
    Setdatas(responsData.contents);
  };

  const [selectPlace, SetselectPlace] = useState("");
  const SelectBtn = async (typeStr: string) => {
    console.log(typeStr);
    if (typeStr == "") {
      const responsData = await getMicrocms_Meal_Type(); //ISR
      Setdatas(responsData.contents);
    } else {
      const responsData = await getMicrocms_Meal_Type_ByPlace(typeStr); //ISR
      Setdatas(responsData.contents);
    }
  };

  useEffect(() => {
    Get_CMS_Announcement_Setting();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="row">
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id=""
              onChange={(e) => SelectBtn(e.target.id)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              全部
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="銀座"
              onChange={(e) => SelectBtn(e.target.id)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              銀座
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="新富町"
              onChange={(e) => SelectBtn(e.target.id)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              新富町
            </label>
          </div>
        </div>
      </div>

      <div className="list-group">
        {datas &&
          datas.map((data, index) => (
            <a
              key={index}
              href={data.weblink}
              className="list-group-item list-group-item-action"
              aria-current="true"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                  {" "}
                  {data.storename} - {data.place}
                </h5>
                <small>
                  {data.cuisineType} / {data.Tyoe}
                </small>
                <small>{data.distance}m</small>
              </div>
              <p className="mb-1">{data.address}</p>
              <small>食べ放題 : {data.allyoucaneat ? " O " : " X "}</small>
              <div className="d-flex w-100 justify-content-between">
                <small>備考 : {data.remark}</small>
                <small>TEL : {data.tel}</small>
                <small> </small>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}
