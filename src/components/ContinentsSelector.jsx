import React, { useState } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com'
});

const GET_COUNTRIES = gql`
  query countries($continentCode: String) {
    continent(code: $continentCode) {
      name
      code
      countries {
        code
        name
      }
    }
  }
  `;

const ContinentsSelector = () => {

  const [continentName, setContinentName] = useState('AF')
  const continentOptions = [
    {
      "label": "Africa",
      "value": "AF"
    },
    {
      "label": "Antarctica",
      "value": "AN"
    },
    {
      "label": "Asia",
      "value": "AS"
    },
    {
      "label": "Europe",
      "value": "EU"
    },
    {
      "label": "North America",
      "value": "NA"
    },
    {
      "label": "Oceania",
      "value": "OC"
    },
    {
      "label": "South America",
      "value": "SA"
    }
  ]

  return (
    <div>
      <Dropdown options={continentOptions} value={continentName} onChange={({ value }) => setContinentName(value)} placeholder='Select Continent' />
      <br />

      <Query query={GET_COUNTRIES} client={client} variables={{ continentCode: continentName }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;
          return (
            <div>
              {data.continent.countries.map(country => (
                <div key={country.code} value={country.code}>
                  {country.name}
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  )
}

export default ContinentsSelector;