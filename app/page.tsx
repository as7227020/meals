"use client";

import Image from "next/image";
import {
  getMicrocms_Meal_Type,
  getMicrocms_Meal_Type_ByFilter,
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
  const [cuisineType, SetcuisineType] = useState("");
  const SelectBtn = async (typeStr: string) => {
    console.log("場所 : " + typeStr);
    SetselectPlace(typeStr);
    if (typeStr == "") {
      if (cuisineType == "") {
        const responsData = await getMicrocms_Meal_Type(); //ISR
        Setdatas(responsData.contents);
      } else {
        SendReq(`cuisineType[contains]${cuisineType}`);
      }
    } else {
      let AddStr = "";
      if (selectPlace != "") {
      }
      const filterStr = `place[contains]${typeStr}[and]cuisineType[contains]${cuisineType}`;

      SendReq(filterStr);
    }
    //`place[contains]${place}`
  };

  const SelectCuisineType = async (cuisineType: string) => {
    console.log("料理 : " + cuisineType);
    SetcuisineType(cuisineType);

    if (selectPlace == "") {
      SendReq(`cuisineType[contains]${cuisineType}`);
      return;
    } else {
      const filterStr = `place[contains]${selectPlace}[and]cuisineType[contains]${cuisineType}`;

      SendReq(filterStr);
    }

    // if (cuisineType == "") {
    //   const responsData = await getMicrocms_Meal_Type(); //ISR
    //   Setdatas(responsData.contents);
    // } else {
    //   const responsData = await getMicrocms_Meal_Type_ByPlace(cuisineType); //ISR
    //   Setdatas(responsData.contents);
    // }
  };

  const SendReq = async (filterStr: string) => {
    console.log("送出搜索 : " + filterStr);
    const responsData = await getMicrocms_Meal_Type_ByFilter(filterStr); //ISR
    Setdatas(responsData.contents);
  };

  useEffect(() => {
    Get_CMS_Announcement_Setting();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="row">
        <div className="col-12 d-flex  gap-2">
          場所 :
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioSelectPlace"
              id=""
              onChange={(e) => SelectBtn(e.target.id)}
              checked={selectPlace == "" ? true : false}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              全部
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioSelectPlace"
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
              name="flexRadioSelectPlace"
              id="新富町"
              onChange={(e) => SelectBtn(e.target.id)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              新富町
            </label>
          </div>
        </div>
        <div className="col-12 d-flex gap-2">
          料理 :
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioSelectPlaceCuisineType"
              id=""
              onChange={(e) => SelectCuisineType(e.target.id)}
              checked={cuisineType == "" ? true : false}
            />
            <label className="form-check-label" htmlFor="flexRadioCuisineType0">
              全部
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioSelectPlaceCuisineType"
              id="イタリア"
              onChange={(e) => SelectCuisineType(e.target.id)}
            />
            <label className="form-check-label" htmlFor="flexRadioCuisineType1">
              イタリア
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioSelectPlaceCuisineType"
              id="日本"
              onChange={(e) => SelectCuisineType(e.target.id)}
            />
            <label className="form-check-label" htmlFor="flexRadioCuisineType2">
              日本
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioSelectPlaceCuisineType"
              id="中華"
              onChange={(e) => SelectCuisineType(e.target.id)}
            />
            <label className="form-check-label" htmlFor="flexRadioCuisineType3">
              中華
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioSelectPlaceCuisineType"
              id="Bar"
              onChange={(e) => SelectCuisineType(e.target.id)}
            />
            <label className="form-check-label" htmlFor="flexRadioCuisineType3">
              Bar
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
              className="list-group-item "
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
              <span
                className={
                  data.allyoucaneat
                    ? "badge bg-primary rounded-pill"
                    : "badge bg-secondary rounded-pill"
                }
              >
                食べ放題 : {data.allyoucaneat ? " O " : " X "}
              </span>
              <small></small>
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
