import axios from 'axios'

const API_URL = 'https://tresebackend.up.railway.app/api/auth/'

class AuthService {
  login (user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
  }

  register (user) {
    const userToken = JSON.parse(localStorage.getItem('user'))
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, {
      headers: {
        Authorization: 'Bearer ' + userToken.accessToken
      }
    })
  }
}

export default new AuthService()
