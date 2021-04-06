import { combineReducers } from "redux";
import FetchAllData from "./fetchAllData";
import FetchLocationData from "./fetchLocationData";

const allReducers = combineReducers({
	AllData: FetchAllData,
	LocationData: FetchLocationData,
});

export type RootState = ReturnType<typeof allReducers>;

export default allReducers;
