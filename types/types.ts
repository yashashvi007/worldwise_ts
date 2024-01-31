export interface ICity {
    cityName: string;
    country: string;
    emoji: string;
    date: Date;
    notes: string;
    position: IPosition;
    id: number;
}
export interface IPosition {
    lat: number;
    lng: number;
}

export type PositionArr = [lat: number, lng: number];


export interface ICountry {
    id: number;
    country: string;
    emoji: string;
}
  


export enum ButtonType {
    Primary = 'primary',
    Back = 'back',
    Position = 'position',
}




export type CitiesContextType = {
    cities: ICity[];
    isLoading: boolean;
    currentCity: ICity | null;
    error: string;
    getCity(id: string): void;
    createCity(newCity: ICityPost): void;
    deleteCity(id: number): void;
  };
  

export interface ICityPost {
    cityName: string;
    country: string;
    emoji: string;
    date: string;
    notes: string;
    position: IPosition;
  }
  


export type CitiesReducerType = {
    cities: ICity[];
    isLoading: boolean;
    currentCity: ICity | null;
    error: string;
};
  
export type CitiesAction =
    | {
        type: CitiesActionType.Loading;
      }
    | {
        type: CitiesActionType.CitiesLoaded;
        payload: ICity[];
      }
    | {
        type: CitiesActionType.CityCreated;
        payload: ICity;
      }
    | {
        type: CitiesActionType.CityDeleted;
        payload: number;
      }
    | {
        type: CitiesActionType.Rejected;
        payload: string;
      }
    | {
        type: CitiesActionType.CityLoaded;
        payload: ICity;
      };
  
export enum CitiesActionType {
    Loading = 'loading',
    CitiesLoaded = 'cities/loaded',
    CityCreated = 'cities/created',
    CityDeleted = 'cities/deleted',
    Rejected = 'rejected',
    CityLoaded = 'city/loaded',
}
  