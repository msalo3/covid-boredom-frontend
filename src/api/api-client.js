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
  createNewChat: (name) =>
    instance
      .post("/chat", name)
      .then((response) => response.data.id)
      .catch((err) => logAndReturn(err, false)),

  getChats: () =>
    instance
      .get("/chats")
      .then((response) => logAndReturn(response, true))
      .catch((err) => logAndReturn(err, false)),

  postMessage: (data) =>
    instance
      .post("/message", data)
      .then((response) => logAndReturn(response, false))
      .catch((err) => logAndReturn(err, false)),

  getNbaPlayersByLetter: (letter) =>
    instance
      .get(`/nba/players_by_letter/${letter}`)
      .then((response) => logAndReturn(response, true))
      .catch((err) => logAndReturn(err, false)),

  getNbaPlayerByLink: (link) =>
    instance
      .get(`/nba/player_by_link?link=${link}`)
      .then((response) => logAndReturn(response, true))
      .catch((err) => logAndReturn(err, false)),

  getNbaNicknamesById: (id) =>
    instance
      .get(`/nba/nicknames?id=${id}`)
      .then((response) => logAndReturn(response, true))
      .catch((err) => logAndReturn(err, false)),

  getNbaNicknamesByName: (name) =>
    instance
      .get(`/nba/nicknames?name=${name}`)
      .then((response) => logAndReturn(response, true))
      .catch((err) => logAndReturn(err, false)),

  getNbaImage: (name) =>
    instance
      .get(`/nba/player_image?name=${name}`)
      .then((response) => logAndReturn(response, true))
      .catch((err) => logAndReturn(err, false)),
}

const logAndReturn = (response, returnData = false) => {
  console.log(response)
  if (returnData) return response.data
  return response
}

export default apiClient
