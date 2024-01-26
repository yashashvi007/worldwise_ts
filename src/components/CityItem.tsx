import React from 'react'

// interfaces
import { ICity } from '../../types/types'

// styles
import styles  from './CityItem.module.css'
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';

interface CityItemProps {
    city: ICity
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({city}: CityItemProps) {
    const {currentCity}  = useCities()
    const {cityName , emoji , date, id, position} = city
    console.log(city)
  return (
    <li >
      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${id === currentCity?.id ? styles['cityItem--active']: ""}`} >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>
          &times; 
        </button>
      </Link>
    </li>
  )
}
