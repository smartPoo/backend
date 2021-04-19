import { Restroom } from "../dataInterface";

export const homeNearestFiltered = (
	data: Restroom[],
	gender: number,
	faculty: string,
	building: string,
	floor: string
): Restroom[] => {
	let NearestData = data.filter((restroom) =>
		gender === -1 || gender === undefined ? true : restroom.gender === gender
	);
	NearestData = NearestData.filter((restroom) =>
		faculty === "" ? true : restroom.facultyCode === faculty
	);
	NearestData = NearestData.filter((restroom) =>
		building === "" ? true : restroom.building === building
	);
	NearestData = NearestData.filter((restroom) =>
		floor === "" ? true : restroom.floor === floor
	);

	return NearestData;
};

export const homeListFiltered = (
	data: Restroom[],
	gender: number,
	faculty: string,
	building: string,
	floor: string
): Restroom[] => {
	let ListData = data.filter((restroom) =>
		gender === -1 || gender === undefined ? true : restroom.gender === gender
	);

	return ListData;
};
