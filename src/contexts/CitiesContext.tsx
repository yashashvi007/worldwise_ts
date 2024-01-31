import { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { CitiesAction, CitiesActionType, CitiesContextType, CitiesReducerType,  ICity,  ICityPost } from "../../types/types";

const CitiesContext = createContext<CitiesContextType | null>(null)

const BASE_URL: string = "http://localhost:9000"

const initialState: CitiesReducerType = {
  cities: [], 
  isLoading: false, 
  currentCity: null, 
  error: ''
}
function reducer(state: CitiesReducerType, action: CitiesAction): CitiesReducerType{
   switch(action.type){
    case CitiesActionType.Loading:
      return {
        ...state, 
        isLoading: true
      }
    case CitiesActionType.CitiesLoaded:
      return {
        ...state, 
        isLoading: false, 
        cities: action.payload
      }
    case CitiesActionType.CityLoaded:
      return {
        ...state, 
        isLoading: false, 
        currentCity: action.payload
      }
    case CitiesActionType.CityCreated:
      return {
        ...state, 
        isLoading: false, 
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case CitiesActionType.CityDeleted:
      return {
        ...state, 
        isLoading: false, 
        cities: state.cities.filter(city => city.id !== action.payload), 
        currentCity: null
      }
    case CitiesActionType.Rejected: 
      return {
        ...state, 
        isLoading: false, 
        error: action.payload
      } 
    default:
      return initialState;
   }
}

function CitiesProvider({children}: {children: ReactNode}){
    const [{cities , isLoading, currentCity, error},dispatch] = useReducer(reducer , initialState)
    // const [cities , setCities] = useState<ICity[]>([])
    // const [isLoading , setIsLoading] = useState<boolean>(false)
    // const [currentCity , setCurrentCity] = useState<ICity | null>(null)
  
    useEffect(function(){
      async function fetchCities(){
        dispatch({type: CitiesActionType.Loading})
        try {
          const res = await fetch(`${BASE_URL}/cities`)
          const data = await res.json()
          dispatch({type: CitiesActionType.CitiesLoaded, payload: data})
        } catch (error) {
          dispatch({type: CitiesActionType.Rejected, payload: "There was an error in loading cities..."})
        } 
      }

      fetchCities()
      console.log(cities)
      console.log(isLoading)
    } , [])

    async function getCity(id:string) {
       try {
        dispatch({type: CitiesActionType.Loading})
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data: ICity = await res.json()
        dispatch({type: CitiesActionType.CityLoaded, payload: data})
       } catch (error) {
        dispatch({type: CitiesActionType.Rejected, payload: "Fetch current city failed"})
       }
    }

    async function createCity(newCity: ICityPost) {
      try {
       dispatch({type: CitiesActionType.Loading})
       const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST", 
        body: JSON.stringify(newCity), 
        headers: {
          "Content-Type": "application/json"
        }
       })
       const data: ICity = await res.json()
       dispatch({type: CitiesActionType.CityCreated, payload: data})
      } catch (error) {
       dispatch({type: CitiesActionType.Rejected , payload: "Failed to create a new city"})
      }
   }

   async function deleteCity(id:number) {
    try {
     dispatch({type: CitiesActionType.Loading})
     await fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE"
     })
     dispatch({type: CitiesActionType.CityDeleted , payload: id})
    } catch (error) {
     dispatch({type: CitiesActionType.Rejected, payload: "There was an error during deleting a city"})
    }
   }

    return <CitiesContext.Provider value={{
        cities,
        isLoading, 
        currentCity,
        getCity,
        createCity, 
        deleteCity,
        error
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
