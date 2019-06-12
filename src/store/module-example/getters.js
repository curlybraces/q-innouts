export function someGetter (/* state */) {
}

export function isLoggedIn (state) {
  return state => !!state.token
}

export function authStatus (state) {
  return state.status
}
