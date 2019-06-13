export function someMutation (/* state */) {
}

export const authRequest = (state) => {
  state.status = 'loading'
}

export const authSuccess = (state, token, user) => {
  state.status = 'success'
  state.token = token
  state.user = user
}

export const authError = (state) => {
  state.status = 'error'
}

export const logout = (state) => {
  state.status = ''
  state.token = ''
}
