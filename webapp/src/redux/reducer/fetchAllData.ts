import { resRestroomData } from "../../components/dataInterface";

interface Action {
	type: string;
	data: resRestroomData;
}

const fetchAllDataReducer = (
	state: resRestroomData = { data: [] },
	action: Action
) => {
	switch (action.type) {
		case "fetchAllData": {
			state = action.data;
			return state;
		}
		default:
			return state;
	}
};

export default fetchAllDataReducer;
