import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID tJmE8l9uBd60jTziK1N2_rYgrHF9Hl3MQ3_VG6GF3Ag',
  },
});
