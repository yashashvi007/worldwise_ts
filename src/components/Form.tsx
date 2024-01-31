import { FormEvent, useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import { ButtonType } from "../../types/types";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji , setEmoji] = useState("");
  const [geoCodingError , setGeocodingError] = useState("")
  const [isLoadingGeocoding , setIsLoadingGeocoding] = useState(false)

  const {createCity} = useCities()

  useEffect(function(){
    if(!lat && !lng) return;
    async function fetchCityData(){
      try {
        setIsLoadingGeocoding(true)
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        
        if(!data.countryCode) throw new Error("That does'nt seem to be a city. Click somewhere else")

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
        setGeocodingError("")
      } catch (err) {
        if (err instanceof Error) setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
    console.log(country);
  }, [lat , lng])

  if(isLoadingGeocoding) return <Spinner/>

  if(!lat && !lng) return <Message message="Start by clicking somewhere" />

  if(geoCodingError) return <Message message={geoCodingError} />

  function handleSubmit(e: FormEvent){
    e.preventDefault()

    if(!cityName || !date) return; 

    const newCity = {
      cityName, 
      country, 
      emoji, 
      date, 
      notes, 
      position: {lat , lng}
    }
    
    createCity(newCity)
    navigate('/app/cities');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={date => setDate(date)} selected={date} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={ButtonType.Primary} >Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
