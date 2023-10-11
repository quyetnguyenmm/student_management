import { City, GetResponse, ListParams, Student } from 'models';
import axiosClient from './axiosClient';

const studentApi = {
  getAll: (params: ListParams): Promise<GetResponse<City>> => {
    const url = '/students';
    return axiosClient.get(url, { params });
  },

  getStudentById: (id: string): Promise<Student> => {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },

  addStudent: (data: Student): Promise<Student> => {
    const url = '/students';
    return axiosClient.post(url, data);
  },

  updateStudent: (data: Partial<Student>): Promise<Student> => {
    const url = `/students/${data.id}`;
    return axiosClient.patch(url, data);
  },

  removeStudent: (id: string): Promise<any> => {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
