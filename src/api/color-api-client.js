import axios from "axios"
import humps from "humps"

const instance = axios.create({
  baseURL: 'http://thecolorapi.com',
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data),
  ],
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest,
  ]
})

const colorApi = {
  getColors: (hex) => instance.get(`/id?hex=${hex}&mode=analogic&count=40`)
    .then((response) => {
      console.log("RES", response);
      return response.data;
    })
    .catch((err) => console.log(err))
}


export default colorApi;