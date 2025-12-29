export default defineNuxtRouteMiddleware((to) => {
  console.log('MIDDLEWARE RUN:', to.path)

  if (to.path === '/') {
    return navigateTo('/en')
  }
})
