import axios from 'axios';

// base url
axios.defaults.baseURL = 'http://localhost:4000/';

// export default axios.create({
//   baseURL: 'http://127.0.0.1:4000/api/',
// });

// axios.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response.status === 401) {
//       const response = await axios.post(
//         'auth/refresh',
//         {},
//         {
//           withCredentials: true,
//         }
//       );

//       return error;
//     }

//     if (error.response.status === 200) {
//       axios.defaults.headers.common[
//         'Authorization'
//       ] = `Bearer ${data['accessToken']}`;

//       return axios(error.config);
//     }
//   }
// );
