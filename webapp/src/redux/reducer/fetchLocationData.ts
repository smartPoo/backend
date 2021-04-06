import { LocationInformation } from "../../components/dataInterface";

interface Action {
	type: string;
	data: LocationInformation;
}

const fetchLocationData = (
	state: LocationInformation = { data: [] },
	action: Action
) => {
	switch (action.type) {
		case "fetchLocationData": {
			state = action.data;
			return state;
		}
		default:
			return state;
	}
};

export default fetchLocationData;
