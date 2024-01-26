import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { CitiesContextType, ICity } from "../../types/types";

const CitiesContext = createContext<CitiesContextType | null>(null)

const BASE_URL: string = "http://localhost:9000"

function CitiesProvider({children}: {children: ReactNode}){
    const [cities , setCities] = useState<ICity[]>([])
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [currentCity , setCurrentCity] = useState<ICity | null>(null)
  
    useEffect(function(){
      async function fetchCities(){
        try {
          setIsLoading(true)
          const res = await fetch(`${BASE_URL}/cities`)
          const data = await res.json()
          setCities(data)
        } catch (error) {
          alert("THere was an error loading data...")
        } finally {
          setIsLoading(false)
        }
      }
  
      fetchCities()
      console.log(cities)
      console.log(isLoading)
    } , [])

    async function getCity(id:string) {
       try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        setCurrentCity(data)
       } catch (error) {
         alert("THere was something wrong with city")
       } finally {
        setIsLoading(false)
       }
    }

    return <CitiesContext.Provider value={{
        cities,
        isLoading, 
        currentCity,
        getCity 
    }} >
        {children}
    </CitiesContext.Provider>
}

function useCities(){
    const context = useContext(CitiesContext)
    if(context === undefined) throw new Error("Cities context was used outside CitiesProvider")
    return context
}


export {CitiesProvider, useCities}
