export default function authHeader () {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.accessToken) {
    // eslint-disable-next-line no-template-curly-in-string
    return { Authorization: 'Bearer ' + user.accessToken }
  } else {
    return {}
  }
}
