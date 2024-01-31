import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  // params: {
  //   key: '40988075-de1418e45c03a33efd2d9210c',
  //   per_page: 12,
  //   image_type: 'photo',
  //   orientation: 'horizontal',
  // },
});

export const getAllImg = () => {
  return instance.get(
    '/?q=cat&page=1&key=40988075-de1418e45c03a33efd2d9210c&image_type=photo&orientation=horizontal&per_page=12'
  );
};

export const searchImg = (q, page = 1) => {
  return instance.get('/', {
    params: {
      q,
      page,
      key: '40988075-de1418e45c03a33efd2d9210c',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
};
