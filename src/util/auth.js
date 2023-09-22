const TokenKey = "token";
const userTypeKey = "userType";
const userIdKey = "userId";

// token
export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

// 角色权限
export function getUserType() {
  return localStorage.getItem(userTypeKey);
}

export function setUserType(userType) {
  return localStorage.setItem(userTypeKey, userType);
}

export function removeUserType() {
  return localStorage.removeItem(userTypeKey);
}

// 用户编号
export function getUserId() {
  return localStorage.getItem(userIdKey);
}

export function setUserId(userId) {
  return localStorage.setItem(userIdKey, userId);
}

export function removeUserId() {
  return localStorage.removeItem(userIdKey);
}
