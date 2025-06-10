const withPrefix = <T extends Record<string, string>>(
  prefix: string,
  routes: T
): { [K in keyof T]: string } =>
  Object.fromEntries(Object.entries(routes).map(([key, path]) => [key, `${prefix}${path}`])) as {
    [K in keyof T]: string
  }

export const API_ENDPOINT = {
  auth: withPrefix('/auth', {
    registerUser: '/register-user',
    login: '/login',
    logout: '/logout'
  }),
  project: withPrefix('/project', {
    create: '/create',
    getList: '/getProjectList'
  }),
  profile: withPrefix('/profile', {
    updateName: '/update-name',
    updateIcon: '/update-icon',
    getProfileList: '/get-profile-list',
    getProfileByNameTag: '/get-profile-by-name-tag'
  }),
  invite: withPrefix('/invite', {
    send: '/send',
    getReceived: '/get-received',
    respond: '/respond'
  }),
  task: withPrefix('/task', {
    create: '/create'
  })
}
