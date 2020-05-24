import axios from "axios"
import humps from "humps"

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data) => humps.camelizeKeys(data),
  ],
  transformRequest: [
    (data) => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest,
  ],
})

const apiClient = {
  getProcess: () => process.env,
  createNewChat: (name) =>
    instance
      .post("/chat", name)
      .then((response) => {
        console.log(response)
        return response.data.id
      })
      .catch((err) => console.log(err)),

  getChats: () =>
    instance
      .get("/chats")
      .then((response) => {
        console.log("response")
        console.log(response)
        return response.data
      })
      .catch((err) => {
        console.log("err")
        console.log(err)
        console.log(process.env)
      }),

  postMessage: (data) =>
    instance
      .post("/message", data)
      .then((response) => console.log(response))
      .catch((err) => console.log(err)),

  getNbaPlayersByLetter: (letter) =>
    instance
      .get(`/nba/players_by_letter/${letter}`)
      .then((response) => response.data)
      .catch((err) => console.log(err)),

  getNbaPlayerByLink: (link) =>
    instance
      .get(`/nba/player_by_link?link=${link}`)
      .then((response) => response.data)
      .catch((err) => console.log(err)),

  getNbaNicknamesById: (id) =>
    instance
      .get(`/nba/nicknames?id=${id}`)
      .then((response) => response.data)
      .catch((err) => console.log(err)),

  getNbaNicknamesByName: (name) =>
    instance
      .get(`/nba/nicknames?name=${name}`)
      .then((response) => response.data)
      .catch((err) => console.log(err)),

  getNbaImage: (name) =>
    instance
      .get(`/nba/player_image?name=${name}`)
      .then((response) => response.data)
      .catch((err) => console.log(err)),
}

export default apiClient
