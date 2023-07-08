import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const myApiKey = '36710727-a92fb0af94cdc490d5669056a';
const imageType = 'photo';
const orientation = 'horizontal';
const perPage = 12;

export const fetchPixabayImages = async (query, page) => {
  const url = `?key=${myApiKey}&image_type=${imageType}&orientation=${orientation}&per_page=${perPage}&q=${query}&page=${page}`;
  const { data } = await axios.get(url);
  return data;
};
