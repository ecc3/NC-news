const axios = require("axios");
const request = axios.create({
  baseURL: "https://ec-nc-news.herokuapp.com/api"
});

//const baseURL = "https://ec-nc-news.herokuapp.com/api";

export const getTopics = async () => {
  const { data } = await request.get(`/topics`);
  console.log(data, "");
  return data.topics;
  // return axios.get(`${baseURL}/topics`).then(({ data }) => {
  //   return data.topics;
  // });
};

export const getAllArticles = async (topic, sort_by) => {
  const { data } = await request.get(`/articles`, {
    params: { topic, sort_by }
  });
  console.log(data, "");
  return data.articles;
  // return axios
  //   .get(`${baseURL}/articles`, { params: { topic, sort_by } })
  //   .then(({ data }) => {
  //     return data.articles;
  //   });
};

export const getSingleArticle = async article_id => {
  const { data } = await request.get(`/articles/${article_id}`);
  return data.article;
  // return axios.get(`${baseURL}/articles/${article_id}`).then(({ data }) => {
  //   return data.article;
  // });
};

export const getAllComments = async article_id => {
  const { data } = await request.get(`/articles/${article_id}/comments`);
  return data.comments;
  // return axios
  //   .get(`${baseURL}/articles/${article_id}/comments`)
  //   .then(({ data }) => {
  //     return data.comments;
  //   });
};
