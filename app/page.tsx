"use client";
import {
  getMicrocms_Meal_Type,
  getMicrocms_Meal_Type_ByFilter,
} from "./lib/microcms/client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import LoadingView from "./loadingView";
import "./home.css";
const FilterAssemblyData = () => {
  return {
    place: ["条件なし", "銀座", "新富町"],
    cuisine: [
      "条件なし",
      "イタリア",
      "日本",
      "中華",
      "インド",
      "フランス",
      "Bar",
      "その他",
    ],
    type: [
      "条件なし",
      "イタリア",
      "インド",
      "フランス",
      "すき焼き",
      "居酒屋",
      "寿司",
      "牡蠣",
      "焼鳥",
      "おでん",
      "小籠包　餃子",
      "ステーキ",
      "鍋 薬膳 ",
      "天ぷら",
      "鉄板焼き",
      "とんかつ",
      "四川料理",
      "Bar",
      "その他",
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
    SendReq("diplayFlag[equals]true");
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

    SetfilterData(emptyData);

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
    if (count >= 1) {
      nowAssembly += "[and]diplayFlag[equals]true";
    } else {
      nowAssembly += "diplayFlag[equals]true";
    }

    SendReq(nowAssembly);
  };

  const GetDisanceStr = (dis: number): string => {
    if (dis >= 1000) {
      const d = dis / 1000;
      return d.toLocaleString() + "km";
    }
    return dis.toLocaleString() + "m";
  };

  const OnClickReset = () => {
    SetfilterData({
      place: "条件なし", //場所
      cuisine: "条件なし", //料理
      type: "条件なし", //種類
      allyoucaneat: "条件なし",
    });
    SendReq("diplayFlag[equals]true");
  };

  const SendReq = async (filterStr: string) => {
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
      <div className="row text-center mt-2 m-3 ">
        <button
          type="button"
          className="btn"
          style={{
            border: "1px solid pink",
            fontWeight: "500",
          }}
          onClick={OnClickReset}
        >
          リセット
        </button>
      </div>
      <div className="row text-center mt-2 ">
        <div className="col-12 d-flex justify-content-between">
          <div className="btn-group selectdp">
            <button
              className="btn  dropdown-toggle btn-sm dropdownfont"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <h5 className="mt-3 dropdownfont">場所</h5>
              <hr
                className="dropdownfont"
                style={{
                  border: "none",
                  height: "2px",
                  backgroundColor: "white",
                }}
              />
              <div className="mt-3 dropdownfont"> {filterData.place}</div>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {FilterAssemblyData().place.map((value, index) => (
                <li key={index}>
                  <a
                    className="dropdown-item "
                    id={"place:" + value}
                    onClick={(e) => filter("place:" + value)}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-group selectdp">
            <button
              className="btn  dropdown-toggle btn-sm dropdownfont"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <h5 className="mt-3 dropdownfont">料理</h5>
              <hr
                className="dropdownfont"
                style={{
                  border: "none",
                  height: "2px",
                  backgroundColor: "white",
                }}
              />
              <div className="mt-3 dropdownfont"> {filterData.cuisine}</div>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {FilterAssemblyData().cuisine.map((value, index) => (
                <li key={index}>
                  <a
                    className="dropdown-item "
                    id={"cuisine:" + value}
                    onClick={(e) => filter("cuisine:" + value)}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="btn-group selectdp">
            <button
              className="btn  dropdown-toggle btn-sm dropdownfont"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <h5 className="mt-3 dropdownfont">種類</h5>
              <hr
                className="dropdownfont"
                style={{
                  border: "none",
                  height: "2px",
                  backgroundColor: "white",
                }}
              />
              <div className="mt-3 dropdownfont"> {filterData.type}</div>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {FilterAssemblyData().type.map((value, index) => (
                <li key={index}>
                  <a
                    className="dropdown-item "
                    id={"type:" + value}
                    onClick={(e) => filter("type:" + value)}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="btn-group selectdp">
            <button
              className="btn  dropdown-toggle btn-sm dropdownfont"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <h5 className="mt-3 dropdownfont">食べ放題</h5>
              <hr
                className="dropdownfont"
                style={{
                  border: "none",
                  height: "2px",
                  backgroundColor: "white",
                }}
              />
              <div className="mt-3 dropdownfont">
                {" "}
                {filterData.allyoucaneat}
              </div>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {FilterAssemblyData().allyoucaneat.map((value, index) => (
                <li key={index}>
                  <a
                    className="dropdown-item "
                    id={"allyoucaneat:" + value}
                    onClick={(e) => filter("allyoucaneat:" + value)}
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
              <div className="card-header d-flex w-100 justify-content-between">
                <div
                  style={{
                    justifyContent: "flex-start",
                    alignContent: "end",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  }}
                >
                  [{data.place}] {data.storename}
                </div>
                <div
                  style={{
                    alignContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: "400",
                    whiteSpace: "nowrap",
                  }}
                >
                  家から{GetDisanceStr(data.distance)}
                </div>
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
