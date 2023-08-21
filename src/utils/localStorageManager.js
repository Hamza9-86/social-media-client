export const KEY_ACCESS_TOKEN = "access_token";

export function getItem(key) {
  return localStorage.getItem(key);//localStorage browser provide lrta h it is an object
}

export function setItem(key, value) {
  return localStorage.setItem(key, value);
}

export function removeItem(key) {
  return localStorage.removeItem(key);
}
