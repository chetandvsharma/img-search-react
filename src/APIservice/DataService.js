import axios from 'axios';

const REACT_APP_API_BASEURL = `http://192.168.1.161:8002`;

const client = axios.create({
  baseURL: REACT_APP_API_BASEURL,
  withCredentials: false,
});

const header = () => {
  const headers = {
    'content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    crossDomain: true,
  };

  let authenticate = '';
  if (refreshOtpToken) {
    authenticate = refreshOtpToken && JSON.parse(refreshOtpToken).token;
  }
};

class DataService {
  static post(path = '', data = {}, optionHeader) {
    return client({
      method: 'Post',
      url: path,
      data,
      headers: header(optionHeader),
    });
  }
}
