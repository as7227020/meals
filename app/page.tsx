"use client";
import {
  getCMS_Datas,
  getMicrocms_Meal_Type,
  getMicrocms_Meal_Type_ByFilter,
} from "./lib/microcms/client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import LoadingView from "./loadingView";
import "./home.css";
import Image from "next/image";
import ScrollToTopBtn from "./ScrollToTopBtn";
import toast from "react-hot-toast";

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
      "焼鳥 ",
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
const onePageCount: number = 8;
type filterData = {
  place: string; //場所
  cuisine: string; //料理
  type: string; //種類
  allyoucaneat: string;
};
export default function Home() {
  //拿取CMS 公告資料
  const Get_CMS_Announcement_Setting = async () => {
    SendReq("diplayFlag[equals]true", 1, true);
  };
  const [filterData, SetfilterData] = useState<filterData>({
    place: "条件なし", //場所
    cuisine: "条件なし", //料理
    type: "条件なし", //種類
    allyoucaneat: "条件なし",
  });

  const [datas, Setdatas] = useState<Microcms_Meal_Type[]>([]);
  const [loadingViewController, SetloadingViewController] = useState(true);

  const filter = async (filterStr: string) => {
    SetloadingViewController(true);
    //console.log("filter");
    const key = filterStr.split(":")[0];
    const value = filterStr.split(":")[1];
    //== "条件なし" ? "" : filterStr.split(":")[1];
    //console.log(key, value);

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
        // console.log("料理:" + value);
        break;
      }
      case "type": {
        //料理
        if (value == "") {
        } else {
        }
        emptyData.type = value;
        //console.log("種類:" + value);
        break;
      }

      case "allyoucaneat": {
        //料理
        if (value == "") {
        } else {
        }
        emptyData.allyoucaneat = value;
        //console.log("吃到飽:" + value);
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

    SendReq(nowAssembly, 1, true);
  };

  //公尺和公里轉換
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
    SendReq("diplayFlag[equals]true", 1, true);
  };

  //切換頁數
  const ChangePage = (page: number) => {
    if (currPage == page) {
      return;
    }
    scrollUp();
    //讀取顯示開啟
    SetloadingViewController(true);
    //送出語法 使用紀錄的
    SendReq(sqlRecordStr, page, false);
  };

  //目前最大頁數
  const [maxPageCount, SetmaxPageCount] = useState(0);

  //目前頁數
  const [currPage, SetcurrPage] = useState(1);
  //紀錄上一部搜尋語法 切換用繼續使用
  const [sqlRecordStr, SetsqlRecordStr] = useState("");
  //頁數的陣列資料 用來顯示頁數 map用
  const [pageData, SetpageData] = useState<number[]>([1]);

  const SendReq = async (
    filterStr: string,
    page: number,
    isShowCount: boolean
  ) => {
    SetcurrPage(page);
    //console.log("page");
    // console.log(page);
    //console.log("送出搜索 : " + filterStr);
    // const responsData = await getMicrocms_Meal_Type_ByFilter(filterStr); //ISR
    SetsqlRecordStr(filterStr);
    const responsData = getCMS_Datas(
      onePageCount * (page - 1),
      onePageCount,
      "meals",
      "GET",
      filterStr
    );
    responsData.then((data) => {
      Setdatas(data.contents);
      const totalPageCount = Math.ceil(data.totalCount / onePageCount);
      //console.log(data.contents);
      SetmaxPageCount(totalPageCount);
      if (isShowCount == true) {
        toast.success(data.totalCount + " 軒が見つかりました。");
      }

      var i: number;
      let thePageData: number[] = [];
      for (i = 0; i < totalPageCount; i++) {
        thePageData.push(i + 1);
      }
      SetpageData(thePageData);

      SetloadingViewController(false);
    });
  };
  const scrollUp = () => {
    window.scrollTo({
      top: 340,
      behavior: "smooth",
    });
  };

  const [windowWidth, SetwindowWidth] = useState<number>(0);
  useEffect(() => {
    Get_CMS_Announcement_Setting();
    require("bootstrap/dist/js/bootstrap.bundle.js");
    const w = window.innerWidth;
    SetwindowWidth(Number(w));
  }, []);
  //https://drive.google.com/file/d/1HFv75WvguDLPwbwdM7PoA74XDLiUM4T6/view?usp=drive_link
  return (
    <div className="container">
      <ScrollToTopBtn />
      <header className="vh-40 text-center position-relative">
        <div className="text-container position-relative d-flex flex-column justify-content-center align-items-center h-100">
          <Image
            src={
              "https://drive.google.com/thumbnail?id=1HFv75WvguDLPwbwdM7PoA74XDLiUM4T6&sz=w640"
            }
            width={windowWidth * 0.9}
            className="topImage"
            height={150}
            alt=" "
          ></Image>
        </div>
      </header>
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
            <div key={index} className="card cardeffect">
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
                    <p className="mb-1">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        >
                          <path d="M6 8.107C6 4.734 8.686 2 12 2s6 2.734 6 6.107c0 3.347-1.915 7.252-4.903 8.649a2.587 2.587 0 0 1-2.194 0C7.915 15.359 6 11.454 6 8.107M12 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4" />
                          <path
                            d="M3.627 14.534a.75.75 0 0 1-.122 1.054c-.573.454-.755.855-.755 1.162c0 .243.11.538.44.88c.334.345.856.695 1.566 1.017c1.254.569 2.988 1 4.994 1.187v-.459a.75.75 0 0 1 1.244-.564l1.5 1.312a.75.75 0 0 1 0 1.129l-1.5 1.313A.75.75 0 0 1 9.75 22v-.66c-2.185-.191-4.14-.659-5.614-1.327c-.814-.369-1.515-.815-2.024-1.34c-.511-.53-.862-1.179-.862-1.923c0-.95.567-1.738 1.324-2.338a.75.75 0 0 1 1.053.122m16.746 0a.75.75 0 0 1 1.053-.122c.757.6 1.324 1.388 1.324 2.338c0 1.378-1.168 2.41-2.547 3.101c-1.441.723-3.412 1.234-5.627 1.459a.75.75 0 0 1-.152-1.493c2.098-.212 3.877-.69 5.107-1.307c1.294-.648 1.719-1.303 1.719-1.76c0-.307-.182-.708-.755-1.162a.75.75 0 0 1-.122-1.054"
                            opacity=".5"
                          />
                        </g>
                      </svg>
                      　{data.address}
                    </p>
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <div className="d-flex w-100 justify-content-between">
                      <small>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="currentColor"
                            d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608a17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42a18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                          />
                        </svg>
                        　{data.tel}
                      </small>
                      <a href={data.weblink} className="btn btn-info btn-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="5 10 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0m0 64c35.4 0 64 28.6 64 64s-28.6 64-64 64s-64-28.6-64-64s28.6-64 64-64m85.3 384H170.7v-21.3H192V256h-21.3v-21.3H320v192h21.3z"
                          />
                        </svg>
                        サイト
                      </a>
                    </div>
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <small className="d-flex mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ minHeight: "24px", minWidth: "24px" }}
                      >
                        <path
                          fill="currentColor"
                          d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h4.2q.325-.9 1.088-1.45T12 1t1.713.55T14.8 3H19q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm7-14.75q.325 0 .538-.213t.212-.537t-.213-.537T12 2.75t-.537.213t-.213.537t.213.538t.537.212M5 19V5zm2.5-2h1.2q.2 0 .388-.088T9.4 16.7l5.7-5.65l-2.15-2.15l-5.65 5.65q-.15.15-.225.337T7 15.276V16.5q0 .2.15.35t.35.15m8.3-6.65l1.05-1.1Q17 9.1 17 8.9t-.15-.35l-1.4-1.4Q15.3 7 15.1 7t-.35.15l-1.1 1.05z"
                        />
                      </svg>
                      <div
                        style={{
                          backgroundColor: " #eeeeee",
                          border: "1px solid #7a7a7a",
                          borderRadius: "6px",
                          color: "#000",
                          marginLeft: "5px",
                        }}
                      >
                        　{data.remark}　
                      </div>
                    </small>
                  </li>
                </ul>
              </div>
              <div
                className="card-footer d-flex gap-1"
                style={{ justifyContent: "start", alignItems: "center" }}
              >
                <span
                  className={
                    data.allyoucaneat
                      ? "badge bg-primary rounded-pill"
                      : "badge bg-secondary rounded-pill"
                  }
                >
                  食べ放題 : {data.allyoucaneat ? "あり" : "なし"}
                </span>{" "}
                <span className="badge bg-success rounded-pill">
                  料理：{data.cuisineType}
                </span>{" "}
                <span className="badge bg-warning rounded-pill text-dark">
                  種類：{data.type}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-4">
            {loadingViewController == false
              ? "条件に合う店が見つかりません。"
              : ""}
          </div>
        )}
      </div>

      {maxPageCount > 1 ? (
        <div className="row">
          <div
            className="col-12"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <nav
              aria-label="Page navigation "
              style={{
                position: "fixed",
                zIndex: "15",
                bottom: "-10px",
                right: "30%",
                opacity: "85%",
              }}
            >
              <ul className="pagination pagination-sm">
                <li className="page-item">
                  <a
                    className="page-link"
                    aria-label="Previous"
                    onClick={() => {
                      ChangePage(1);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {pageData.map((num) => (
                  <li
                    key={num}
                    className={
                      currPage == num ? "page-item active" : "page-item"
                    }
                  >
                    <a
                      className="page-link"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        ChangePage(num);
                      }}
                    >
                      {num}
                    </a>
                  </li>
                ))}

                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      ChangePage(maxPageCount);
                    }}
                    aria-label="Next"
                    style={{ cursor: "pointer" }}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <div></div>
      )}
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
