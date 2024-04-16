"use client";

import Image from "next/image";
import {
  getMicrocms_Meal_Type,
  getMicrocms_Meal_Type_ByFilter,
} from "./lib/microcms/client";
import { useEffect, useState } from "react";

const FilterAssemblyData = () => {
  return {
    place: ["条件なし", "銀座", "新富町"],
    cuisine: ["条件なし", "イタリア", "日本", "中華", "Bar"],
    type: [
      "条件なし",
      "イタリア",
      "居酒屋",
      "鉄板焼き",
      "天ぷら",
      "寿司",
      "ステーキ",
    ],
    allyoucaneat: ["条件なし", "O", "X"],
  };
};

type filterData = {
  place: string; //場所
  cuisine: string; //料理
  type: string; //種類
  allyoucaneat: string;
};
export default function Home() {
  const [datas, Setdatas] = useState<Microcms_Meal_Type[]>([]);
  //拿取CMS 公告資料
  const Get_CMS_Announcement_Setting = async () => {
    const responsData = await getMicrocms_Meal_Type(); //ISR
    Setdatas(responsData.contents);
  };
  const [filterData, SetfilterData] = useState<filterData>({
    place: "", //場所
    cuisine: "", //料理
    type: "", //種類
    allyoucaneat: "",
  });

  const filter = async (filterStr: string) => {
    console.log("filter");
    const key = filterStr.split(":")[0];
    const value =
      filterStr.split(":")[1] == "条件なし" ? "" : filterStr.split(":")[1];
    console.log(key, value);

    let emptyData: filterData = filterData;
    switch (key) {
      case "Place": {
        //場所
        if (value == "") {
        } else {
        }
        emptyData.place = value;
        break;
      }
      case "cuisine": {
        //料理
        emptyData.cuisine = value;
        console.log("料理:" + value);
        break;
      }
      case "type": {
        //料理
        emptyData.type = value;
        console.log("種類:" + value);
        break;
      }

      case "allyoucaneat": {
        //料理
        emptyData.allyoucaneat = value;
        console.log("吃到飽:" + value);
        break;
      }

      default: {
        break;
      }
    }
    SetfilterData(emptyData);
    console.log(emptyData);
    let count = 0;
    let nowAssembly: string = "";
    if (emptyData.place != "") {
      nowAssembly += `place[contains]${emptyData.place}`;
      count += 1;
    }
    if (emptyData.cuisine != "") {
      if (count >= 1) {
        nowAssembly += "[and]";
      }
      nowAssembly += `cuisineType[contains]${emptyData.cuisine}`;
      count += 1;
    }
    if (emptyData.type != "") {
      if (count >= 1) {
        nowAssembly += "[and]";
      }
      nowAssembly += `type[contains]${emptyData.type}`;
      count += 1;
    }

    if (emptyData.allyoucaneat != "") {
      if (count >= 1) {
        nowAssembly += "[and]";
      }
      nowAssembly += `allyoucaneat[equals]${
        emptyData.allyoucaneat == "O" ? true : false
      }`;
      count += 1;
    }

    SendReq(nowAssembly);
  };

  const SendReq = async (filterStr: string) => {
    console.log("filterData");
    console.log(filterData);

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
          {FilterAssemblyData().place.map((data, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioSelectPlace"
                id={"Place:" + data}
                onChange={(e) => filter(e.target.id)}
              />
              <label
                className="form-check-label"
                htmlFor={"flexRadioPlace" + index}
              >
                {data}
              </label>
            </div>
          ))}
        </div>

        <hr />

        <div className="col-12 d-flex gap-2">
          料理 :
          {FilterAssemblyData().cuisine.map((data, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioSelectcuisine"
                id={"cuisine:" + data}
                onChange={(e) => filter(e.target.id)}
              />
              <label
                className="form-check-label"
                htmlFor={"flexRadiocuisine" + index}
              >
                {data}
              </label>
            </div>
          ))}
        </div>
        <hr />
        <div className="col-12 d-flex gap-2">
          種類 :
          {FilterAssemblyData().type.map((data, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioSelecttype"
                id={"type:" + data}
                onChange={(e) => filter(e.target.id)}
              />
              <label
                className="form-check-label"
                htmlFor={"flexRadiotype" + index}
              >
                {data}
              </label>
            </div>
          ))}
        </div>
        <hr />
        <div className="col-12 d-flex gap-2">
          食べ放題 :
          {FilterAssemblyData().allyoucaneat.map((data, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioSelectallyoucaneat"
                id={"allyoucaneat:" + data}
                onChange={(e) => filter(e.target.id)}
              />
              <label
                className="form-check-label"
                htmlFor={"flexRadioallyoucaneat" + index}
              >
                {data}
              </label>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="list-group">
        {datas &&
          datas.map((data, index) => (
            <div key={index} className="card mt-2 mb-2">
              <div className="card-header d-flex justify-content-between">
                <h5>
                  {" "}
                  {data.storename} - {data.place}
                </h5>

                <small>{data.distance}m</small>
              </div>
              <div className="card-body">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">
                    {data.cuisineType} / {data.type}
                  </h6>
                  <small> </small>
                  <a href={data.weblink} className="btn btn-info btn-sm">
                    サイード
                  </a>
                </div>
                <p className="mb-1"> アドレス : {data.address}</p>

                <small></small>
                <div className="d-flex w-100 justify-content-between">
                  <small>備考 : {data.remark}</small>
                  <small>TEL : {data.tel}</small>
                </div>
              </div>
              <div className="card-footer text-muted">
                {" "}
                <span
                  className={
                    data.allyoucaneat
                      ? "badge bg-primary rounded-pill"
                      : "badge bg-secondary rounded-pill"
                  }
                >
                  食べ放題 : {data.allyoucaneat ? "あり" : "なし"}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
