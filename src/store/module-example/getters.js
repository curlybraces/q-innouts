// export function someGetter (/* state */) {
// }

export function isLoggedIn (state) {
  return !!state.token
}

export function authStatus (state) {
  return state.status
}

export function leftDrawer (state) {
  return state.leftDrawer
}

export function rightDrawer (state) {
  return state.rightDrawer
}
