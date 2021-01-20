import { ApolloClient, InMemoryCache } from '@apollo/client'
import { favorites } from '../../cache/'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favoritesItem: {
            read() {
              return favorites()
            }
          }
        }
      }
    }
  })
})

export default client