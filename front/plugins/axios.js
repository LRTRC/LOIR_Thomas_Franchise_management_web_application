export default function ({$axios, redirect}) {
  $axios.onError(error => {
    // if axios interceptor catch error expired token, then redirect login
    // ( https://axios.nuxtjs.org/helpers )
    if (error.name === "ExpiredAuthSessionError") return redirect('/login')

    // if (error.response.status === 401) return redirect('/me')
  })
}
