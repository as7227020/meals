"use client";
import {
  getMicrocms_Meal_Type,
  getMicrocms_Meal_Type_ByFilter,
} from "./lib/microcms/client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import LoadingView from "./loadingView";
const FilterAssemblyData = () => {
  return {
    place: ["条件なし", "銀座", "新富町"],
    cuisine: ["条件なし", "イタリア", "日本", "中華", "Bar"],
    type: [
      "条件なし",
      "イタリア",
      "鉄板焼き",
      "居酒屋",
      "おでん",
      "天ぷら",
      "寿司",
      "ステーキ",
      "本番北京ダック",
      "小籠包　餃子",
      "四川料理",
      "鍋 薬膳 ",
    ],
    allyoucaneat: ["条件なし", "あり", "なし"],
  };
};

type filterData = {
  place: string; //場所
  cuisine: string; //料理
  type: string; //種類
  allyoucaneat: string;
};
export default function Home() {
  //拿取CMS 公告資料
  const Get_CMS_Announcement_Setting = async () => {
    const responsData = await getMicrocms_Meal_Type(); //ISR
    Setdatas(responsData.contents);
  };
  const [filterData, SetfilterData] = useState<filterData>({
    place: "条件なし", //場所
    cuisine: "条件なし", //料理
    type: "条件なし", //種類
    allyoucaneat: "条件なし",
  });

  const [datas, Setdatas] = useState<Microcms_Meal_Type[]>([]);
  const [loadingViewController, SetloadingViewController] = useState(false);

  const filter = async (filterStr: string) => {
    SetloadingViewController(true);
    console.log("filter");
    const key = filterStr.split(":")[0];
    const value = filterStr.split(":")[1];
    //== "条件なし" ? "" : filterStr.split(":")[1];
    console.log(key, value);

    let emptyData: filterData = filterData;

    switch (key) {
      case "place": {
        //場所
        if (value == "") {
        } else {
        }
        emptyData.place = value;
        break;
      }
      case "cuisine": {
        //料理
        if (value == "") {
        } else {
        }
        emptyData.cuisine = value;
        console.log("料理:" + value);
        break;
      }
      case "type": {
        //料理
        if (value == "") {
        } else {
        }
        emptyData.type = value;
        console.log("種類:" + value);
        break;
      }

      case "allyoucaneat": {
        //料理
        if (value == "") {
        } else {
        }
        emptyData.allyoucaneat = value;
        console.log("吃到飽:" + value);
        break;
      }

      default: {
        break;
      }
    }
    console.log("SetfilterData:");
    console.log(emptyData);
    SetfilterData(emptyData);

    console.log(emptyData);
    let count = 0;
    let nowAssembly: string = "";
    if (emptyData.place != "条件なし") {
      nowAssembly += `place[contains]${emptyData.place}`;
      count += 1;
    }
    if (emptyData.cuisine != "条件なし") {
      if (count >= 1) {
        nowAssembly += "[and]";
      }
      nowAssembly += `cuisineType[contains]${emptyData.cuisine}`;
      count += 1;
    }
    if (emptyData.type != "条件なし") {
      if (count >= 1) {
        nowAssembly += "[and]";
      }
      nowAssembly += `type[contains]${emptyData.type}`;
      count += 1;
    }

    if (emptyData.allyoucaneat != "条件なし") {
      if (count >= 1) {
        nowAssembly += "[and]";
      }
      nowAssembly += `allyoucaneat[equals]${
        emptyData.allyoucaneat == "あり" ? true : false
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
    SetloadingViewController(false);
  };

  useEffect(() => {
    Get_CMS_Announcement_Setting();
    require("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  return (
    <div className="container">
      <div className="row text-center mt-2 ">
        <div className="col-12 d-flex justify-content-between">
          <div className="btn-group">
            <button
              className="btn btn-secondary dropdown-toggle btn-sm "
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <h5 className="mt-3">場所</h5>
              <hr />
              {filterData.place}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton"
            >
              {FilterAssemblyData().place.map((value, index) => (
                <li key={index}>
                  <a
                    className="dropdown-item"
                    id={"place:" + value}
                    onClick={(e) => filter("place:" + value)}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-group">
            <button
              className="btn btn-success dropdown-toggle btn-sm"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <h5 className="mt-3">料理</h5>

              <hr />
              {filterData.cuisine}
            </button>

            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton"
            >
              {FilterAssemblyData().cuisine.map((value, index) => (
                <li key={index}>
                  <a
                    className="dropdown-item"
                    id={"cuisine:" + value}
                    onClick={(e) => filter("cuisine:" + value)}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-group">
            <button
              className="btn btn-warning dropdown-toggle btn-sm"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <h5 className="mt-3">種類</h5>
              <hr />
              {filterData.type}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton"
            >
              {FilterAssemblyData().type.map((value, index) => (
                <li key={index}>
                  <a
                    className="dropdown-item"
                    id={"type:" + value}
                    onClick={(e) => filter("type:" + value)}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="btn-group">
            <button
              className="btn btn-secondary dropdown-toggle btn-sm"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <h5 className="mt-3">食べ放題</h5>

              <hr />
              {filterData.allyoucaneat}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton"
            >
              {FilterAssemblyData().allyoucaneat.map((value, index) => (
                <li key={index}>
                  <a
                    className="dropdown-item"
                    id={"allyoucaneat:" + value}
                    onClick={(e) => filter("allyoucaneat:" + value)}
                    href="#"
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="list-group">
        <LoadingView viewSwitch={loadingViewController} />
        {datas.length > 0 ? (
          datas.map((data, index) => (
            <div key={index} className="card mt-2 mb-2">
              <div className="card-header d-flex justify-content-between">
                <h5>
                  {" "}
                  [{data.place}] {data.storename}
                  <div></div>
                </h5>

                <small>{data.distance}m</small>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    {" "}
                    <p className="mb-1"> アドレス : {data.address}</p>
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <div className="d-flex w-100 justify-content-between">
                      <small>TEL : {data.tel}</small>
                      <a href={data.weblink} className="btn btn-info btn-sm">
                        サイード
                      </a>
                    </div>
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <small>備考 : {data.remark}</small>
                  </li>
                </ul>
              </div>
              <div className="card-footer text-muted d-flex gap-2">
                <span
                  className={
                    data.allyoucaneat
                      ? "badge bg-primary rounded-pill"
                      : "badge bg-secondary rounded-pill"
                  }
                >
                  食べ放題 : {data.allyoucaneat ? "あり" : "なし"}
                </span>
                <span className="badge bg-success rounded-pill">
                  料理：{data.cuisineType}
                </span>
                <span className="badge bg-warning rounded-pill text-dark">
                  種類：{data.type}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">条件に合うのは見つかりません。</div>
        )}
      </div>
    </div>
  );
}

/*
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


*/
