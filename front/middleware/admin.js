export default function ({$auth, redirect}) {
  let user = $auth.user

  if ($auth.loggedIn && Object.keys(user).length > 0) {
    let role = $auth.user.role
    if (role !== 'admin' || role === 'visitor') {
      return redirect('/me')
    }
  }

}
