import React from "react";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client";

const GET_POST = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        id
        name
        email
      }
    }
  }
`;

export default function Posts() {
  const { data, error, loading } = useQuery(GET_POST);

  console.log({ data, error, loading });

  if (error) return <div>Error Page</div>;

  if (loading) return <div>Loading ...</div>;

  const { posts } = data;

  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            id={post.id}
            user={post.user.name}
            email={post.user.email}
            userId={post.user.id}
          />
        );
      })}
    </div>
  );
}
