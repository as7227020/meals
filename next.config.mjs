/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {//增加gitHub頭像 這樣才可以顯示
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
          },
          {//增加google頭像 這樣才可以顯示 詳細可以去DB看image欄位的url 只要前半段即可 
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
          },
            {//增加Line頭像 這樣才可以顯示 詳細可以去DB看image欄位的url 只要前半段即可 
              protocol: "https",
              hostname: "profile.line-scdn.net",
            },
          {
            protocol: "https",
            hostname: "book-thumbnail-bucket.s3.ap-northeast-1.amazonaws.com",
          },
          {
            protocol: "https",
            hostname: "images.microcms-assets.io",
          },
          {
            protocol: "https",
            hostname: "images.microcms-assets.io",
          },  {
            protocol: "https",
            hostname: "drive.google.com",
          },
        ],
      },
    reactStrictMode: false,
};

export default nextConfig;
