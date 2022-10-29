export default function ({ $auth, $router }) {
  if(process.client) {
    // save user in session storage, used to correct nuxt auth that delete user when refreshing the page
    let data = JSON.parse(sessionStorage.getItem('user'));
    $auth.setUser(data)
  }

  // if the user isn't loggedIn, redirect to /login
  if (!$auth.loggedIn) {
    $router.push('/login')
  }
}
