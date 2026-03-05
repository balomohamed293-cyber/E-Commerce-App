export interface AddedAddress {
  name: string
  details: string
  phone: string
  city: string
}

export interface AddressesRes {
  results: number
  status: string
  data: Data[]
}

export interface Data {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}
