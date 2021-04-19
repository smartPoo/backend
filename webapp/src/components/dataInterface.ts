import { Dispatch, SetStateAction } from "react";

export interface Toilet {
	toilet: number;
	remainingTissue: number;
	remainingDustbin: number;
	issues: string[];
}

export interface Restroom {
	restroomID: string;
	status: string;
	faculty: string;
	facultyCode: string;
	building: string;
	floor: string;
	gender: number;
	occupancy: string;
}

export interface resRestroomData {
	data: Restroom[];
}

export interface resToiletData {
	data: Toilet[];
}

export interface FullData {
	NearestData: Restroom[];
	ListData: Restroom[];
}

export interface FormSelectorState {
	genderSelector: number;
	setGenderSelector: Dispatch<SetStateAction<number>>;
	facultySelector: string;
	setFacultySelector: Dispatch<SetStateAction<string>>;
	buildingSelector: string;
	setBuildingSelector: Dispatch<SetStateAction<string>>;
	floorSelector: string;
	setFloorSelector: Dispatch<SetStateAction<string>>;
}

export interface LocationInformation {
	data: FacultyInfo[];
}

export interface FacultyInfo {
	facultyName: string;
	facultyCode: string;
	buildings: BuildingInfo[];
}

export interface BuildingInfo {
	buildingName: string;
	floor: string[];
}
