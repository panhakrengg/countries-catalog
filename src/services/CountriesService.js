import axios from 'axios'

export default class CountriesService {
  async getAllCountries() {
    const res = await axios.get('/v3.1/all', {
      baseURL: 'https://restcountries.com',
    })
    return res.data
  }

  async searchCountry(name) {
    const res = await axios.get(`/v3.1/name/${name}`, {
      baseURL: 'https://restcountries.com',
    })
    return res.data
  }
}
