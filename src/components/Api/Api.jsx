import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;
const myAPI_KEY = '36710727-a92fb0af94cdc490d5669056a';

export const fetchPixabayImages = async (inputValue, pageNumber) => {
  const { data } = await axios.get(`/?q=${inputValue}&page=${pageNumber}&key=${myAPI_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
  return data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
    id,
    webformatURL,
    largeImageURL,
    tags,
  }));
};