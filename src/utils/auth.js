import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const EmKey = 'Employee-id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getEmployee() {
  return Cookies.get(EmKey)
}

export function setEmployee(id) {
  return Cookies.set(EmKey, id)
}
