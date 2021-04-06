import {
	LocationInformation,
	resRestroomData,
} from "../../components/dataInterface";

export const fetchAllData = (data: resRestroomData) => {
	return {
		type: "fetchAllData",
		data: data,
	};
};

export const fetchLocationData = (data: LocationInformation) => {
	return {
		type: "fetchLocationData",
		data: data,
	};
};
