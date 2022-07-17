//Demo User Data
let users = [
  {
    id: "1",
    name: "Sritaj",
    email: "sritajp@gmail.com",
  },
  {
    id: "2",
    name: "SP",
    email: "sritaj.info@gmail.com",
    age: 32,
  },
  {
    id: "3",
    name: "Lipan",
    email: "lipan.info@gmail.com",
  },
];
//Demo Post Data
let posts = [
  {
    id: "1",
    title: "GraphQL course",
    body: "course containing A-Z of GraphQL",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "NodeJS",
    body: "Become Backend Expert",
    published: true,
    author: "2",
  },
  {
    id: "3",
    title: "FSD",
    body: "Rise and Shine - All In One",
    published: false,
    author: "3",
  },
];

//Demo Comment Data
let comments = [
  {
    id: "1",
    text: "Comment 1",
    author: "1",
    post: "1",
  },
  {
    id: "2",
    text: "Comment 2",
    author: "2",
    post: "2",
  },
  {
    id: "3",
    text: "Comment 3",
    author: "2",
    post: "2",
  },
  {
    id: "4",
    text: "Comment 4",
    author: "3",
    post: "3",
  },
];

const db = {
  users: users,
  posts: posts,
  comments: comments,
};

export { db as default };
