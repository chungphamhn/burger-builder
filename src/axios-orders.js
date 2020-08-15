import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-db3d3.firebaseio.com'
});

export default instance;