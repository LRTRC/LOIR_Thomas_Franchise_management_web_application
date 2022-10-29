export default function ({ $auth}) {
  if(process.client) {
    // save user in session storage, used to correct nuxt auth that delete user when refreshing the page
    let data = JSON.parse(sessionStorage.getItem('user'));
    $auth.setUser(data)
  }
}
