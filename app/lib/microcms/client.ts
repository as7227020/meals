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

export const getMicrocms_Meal_Type_ByPlace = async (place: string) => {
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
      filters: `place[contains]${place}`,
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
