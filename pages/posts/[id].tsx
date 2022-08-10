import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { getAllPostsIds, getPostData } from "../../lib/post";
import postStyle from "../../styles/Post.module.css";

function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <div className={postStyle.container}>
      <Head>{postData.title}</Head>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </div>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsIds();
  // [{params: id: 'pre-rendering}, {}]
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("params", params);
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
