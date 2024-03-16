import { axiosInstance } from "./axiosInstance"

export const getAPIResponse = async url => {

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export const downloadAPIResponse = async url => {

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, { responseType: 'blob' })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export const postAPIResponse = async (url, obj) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, obj)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export const putAPIResponse = async (url, obj) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(url, obj)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export const deleteAPIResponse = async (url, obj) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(url, obj)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
