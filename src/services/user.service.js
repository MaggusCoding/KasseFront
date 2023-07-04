import authHeader from './auth-header'

class UserService {
  postHeader () {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', authHeader())
    return {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    }
  }

  getHeader () {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', authHeader())
    return {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
  }
}
export default new UserService()
