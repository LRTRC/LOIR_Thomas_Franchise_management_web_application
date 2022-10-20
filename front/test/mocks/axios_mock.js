const axiosMock = {
  get: jest.fn(() => Promise.resolve({statusCode: 200})),
  post: jest.fn(() => Promise.resolve({})),
  patch: jest.fn(() => Promise.resolve({})),
  $delete: jest.fn(() => Promise.resolve(true)),
}
export default axiosMock
