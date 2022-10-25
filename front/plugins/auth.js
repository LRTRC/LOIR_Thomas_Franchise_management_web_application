export default function ({ $auth }) {
  if(process.client) {
    let data = JSON.parse(sessionStorage.getItem('user'));
    $auth.setUser(data)
  }
}
