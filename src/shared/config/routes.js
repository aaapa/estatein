import { properties } from '../../entities/ApartmentsCard/model/properties.js'

export const routes = [
  '/',
  '/about/',
  '/apartments/',
  '/services/',
  '/contacts/',
  ...properties.map(({ id }) => `/apartments/${id}/`),
]
