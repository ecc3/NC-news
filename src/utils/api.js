import axios from "axios";

const baseURL = "https://ec-nc-news.herokuapp.com/api";

const getTopics = () => {
  return axios.get(`${baseURL}/topics`).then(({ data }) => {
    console.log(data);
    return data.topics;
  });
};

export default getTopics;
