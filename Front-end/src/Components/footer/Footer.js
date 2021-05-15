import React from "react";
import SimpleReactFooter from "simple-react-footer";

function Footer() {
  const description =
    "无论你是一般性质的体育爱好者，亦或是电竞赛事爱好者，我们都希望你能在这里找到属于自己的快乐。我们提供了多种功能，从体育赛事预测，到选手模板总结，我们尽可能提供全面的服务。如果您有什么建议，欢迎与我们联系";
  const title = "懂球帝 Sports Or ESports";
  const columns = [
    {
      title: "Resources",
      resources: [
        {
            name: "HomePage",
            link: "/",
        },
        {
            name: "LPL-Home",
            link: "#/game",
        },  
        {
            name: "NBA-Home",
            link: "#/basketball"
        },
        {
          name: "czh-Home",
          link: "https://lpl.qq.com/es/data/",
        },
        {
          name: "hzr-Home",
          link: "/careers",
        },
        {
            name:"我们的仓库",
            link: ""
        }
      ],
    },
    {
      title: "LPL",
      resources: [
        {
          name: "腾讯",
          link: "/privacy",
        },
        {
          name: "LOL",
          link: "/terms",
        },
      ],
    },
    {
      title: "NBA",
      resources: [
        {
          name: "腾讯",
          link: "/locations",
        },
        {
          name: "新浪",
          link: "/culture",
        },
      ],
    },
  ];
  return (
    <SimpleReactFooter
      description={description}
      title={title}
      columns={columns}
      linkedin="fluffy_cat_on_linkedin"
      facebook="fluffy_cat_on_fb"
      twitter="fluffy_cat_on_twitter"
      instagram="fluffy_cat_live"
      youtube="UCFt6TSF464J8K82xeA?"
      pinterest="fluffy_cats_collections"
      copyright="101.132.45.226"
      iconColor="#eeeeee"
      backgroundColor="#222831"
      fontColor="#eeeeee"
      copyrightColor="darkgrey"
    />
  );
}

export default Footer;
