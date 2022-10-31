export default function ({ $auth, redirect}) {
  if(process.client) {
    // save user in session storage, used to correct nuxt auth that delete user when refreshing the page
    let data = JSON.parse(sessionStorage.getItem('user'));
    $auth.setUser(data)
  }
  if (!$auth.loggedIn) return redirect('/login')
}
