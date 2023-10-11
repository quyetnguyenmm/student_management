import axiosClient from './axiosClient';
import { City, GetResponse } from 'models';

const cityApi = {
  getAll: (): Promise<GetResponse<City>> => {
    const url = '/cities';
    return axiosClient.get(url, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
  },
};

export default cityApi;
