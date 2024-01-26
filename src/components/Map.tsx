import React, { useState } from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { PositionArr } from '../../types/types'
import { useCities } from '../contexts/CitiesContext'

export default function Map() {
  const [mapPosition , setMapPosition] = useState<PositionArr>([51.505, -0.09])
  const {cities} = useCities()
  console.log(setMapPosition);
  
  /* eslint-disable */
  const [searchParams , setSearchParams] = useSearchParams()
  const mapLat = Number(searchParams.get("lat"))
  const mapLng = Number(searchParams.get("lng"))

  const navigate = useNavigate()

  return (
    <div className={styles.mapContainer}  >
     <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
       />
       {cities?.map((city)=> (
        <Marker position={[city.position.lat , city.position.lng]}>
         <Popup>
          <span>{city.emoji}</span> <span>{city.cityName}</span>
         </Popup>
        </Marker>
       ))}
       <ChangeCenter position={[mapLat , mapLng]} />
      </MapContainer>
    </div>
  )
}


function ChangeCenter({position}){
  const map = useMap()
  map.setView(position)
  return null
} 