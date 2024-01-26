import React from 'react'
import Spinner from './Spinner'
import styles from './CountryList.module.css'
import { ICity, ICountry } from '../../types/types'
import Message from './Message'
import CountryItem from './CountryItem'
import { useCities } from '../contexts/CitiesContext'


export default function CountryList() {
  const {cities, isLoading} = useCities()
 
  if (isLoading) return <Spinner/>

  if (!cities.length)
     return (
       <Message message='Add your first country by clickin on a city on the map' />
     )

  const countries = cities.reduce((arr: ICountry[], city: ICity): ICountry[] =>  
     {if (!arr.map(el => el.country).includes(city.country))
       return [...arr , {id: city.id,country: city.country, emoji: city.emoji}]
     else 
       return arr}
  ,[])

  return (
    <ul className={styles.countryList} >
       {countries.map((country)=> (
        <CountryItem country={country} key={country.id} />
       ))}
    </ul>
  )
}
