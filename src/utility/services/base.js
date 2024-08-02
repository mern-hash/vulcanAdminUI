import axios from 'axios'
import { APIPath } from '../constant'
import { fetchAuthSession } from 'aws-amplify/auth'

const onSuccess = (response) => response.data

export const getToken = async () => {
  try {
    const { tokens } = await fetchAuthSession()
    return tokens.idToken
  } catch {
    return ''
  }
}

const onError = async (error) =>
  Promise.reject({
    ...(error?.response?.data || {}),
  })

const request = async (options,isSecure) => {
  const headers = {}

  if (isSecure) {
    const token = await getToken()
    headers.Authorization = `Bearer ${token}`
  }

  headers['Access-Control-Allow-Origin'] = '*'

  const client = axios.create({
    baseURL: APIPath.server,
    headers: { ...headers },
  })

  return client(options).then(onSuccess).catch(onError)
}

const uploadFiles = (url,data,headers) => {
  const client = axios({
    url,
    method: 'PUT',
    headers: { ...headers },
    data,
  })

  return client.then(onSuccess).catch(onError)
}

export class BaseService {
  static get(url,isSecure = true) {
    return request(
      {
        url,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      isSecure,
    )
  }

  static post(url,data,isSecure = true) {
    return request(
      {
        url,
        method: 'POST',
        data,
      },
      isSecure,
    )
  }

  static put(url,data,isSecure = true) {
    return request(
      {
        url,
        method: 'PUT',
        data,
      },
      isSecure,
    )
  }

  static patch(url,data,isSecure = true) {
    return request(
      {
        url,
        method: 'PATCH',
        data,
      },
      isSecure,
    )
  }

  static extenralAPICall(url) {
    const client = axios({
      url,
      method: 'GET',
      timeout: 1000 * 3,
    })
    return client.then(onSuccess).catch(onError)
  }

  static remove(url,isSecure = true) {
    return request(
      {
        url,
        method: 'DELETE',
      },
      isSecure,
    )
  }

  static upload = (url,data,header) => {
    return uploadFiles(url,data,header)
  }
}
