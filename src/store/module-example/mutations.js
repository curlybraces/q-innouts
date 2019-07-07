export function someMutation (/* state */) {
}

export const authRequest = (state) => {
  state.status = 'loading'
}

export const authSuccess = (state, token, userVar) => {
  state.status = 'success'
  state.token = token
  state.user = userVar
}

export const authError = (state) => {
  state.status = 'error'
}

export const logout = (state) => {
  state.status = ''
  state.token = ''
}

export const setLeftDrawer = (state, ld) => {
  state.leftDrawer = ld
}
