export default function ({$auth, redirect, app, route}) {
  if (process.client) {
    // save user in session storage, used to correct nuxt auth that delete user when refreshing the page
    let data = JSON.parse(sessionStorage.getItem('user'));
    $auth.setUser(data)
  }
  if (!$auth.loggedIn) return redirect('/login')

  let user = $auth.user

  if ($auth.loggedIn && Object.keys(user).length > 0) {
    let role = $auth.user.role
    if (role !== 'admin' || role === 'visitor') {
      return redirect('/me')
    }
  }
}
