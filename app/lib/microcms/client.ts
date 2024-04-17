import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVIER_DOMAIN || "",
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

// || ""  和   !    是一樣的意思

export const getMicrocms_Meal_Type = async () => {
  const restaurantData = await client.getList<Microcms_Meal_Type>({
    endpoint: "meals",
    customRequestInit: {
      cache: "no-store",
      //  next:{//ISR
      //   revalidate: 3600
      // }
    },
    queries: {
      orders: "distance",
      filters: ``,
    },
  });

  return restaurantData;
};

type methodType = "GET" | "POST" | "PUT" | "DELETE";
export const getCMS_Datas = (
  limit: number,
  endpoint: string,
  methodType: methodType,
  filtersStr: string
) =>
  fetch(
    `https://${process.env.NEXT_PUBLIC_SERVIER_DOMAIN}.microcms.io/api/v1/${endpoint}?limit=${limit}&filters=${filtersStr}`,
    {
      method: methodType,
      headers: { "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "" },
    }
  ).then((result) => result.json());

export const getMicrocms_Meal_Type_ByFilter = async (filterStr: string) => {
  const restaurantData = await client.getList<Microcms_Meal_Type>({
    endpoint: "meals",
    customRequestInit: {
      cache: "no-store",
      //  next:{//ISR
      //   revalidate: 3600
      // }
    },
    queries: {
      orders: "distance",
      filters: `${filterStr}`,
    },
  });

  return restaurantData;
};
/*
distance
orders: "-createdAt",
[or]
place[contains]${"銀座"}
allyoucaneat[equals]${true}
filters=title[contains]特集[or]publishedAt[begins_with]2019-12
title[contains]特集[and]publishedAt[begins_with]2019-12
       */

// export const getCMS_GPS_Setting = async (contentId: string) => {
//   const detailBook = await client.getListDetail<CMS_GPS_Setting>({
//     endpoint: "erpmanage",
//     contentId,
//     customRequestInit: {
//       cache: "no-store", //SSR
//     },
//   });
//   return detailBook;
// };
