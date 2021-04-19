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

export const facCodeToName = {
	"01": `THE SIRINDHORN THAI LANGUAGE INSTITUTE`,
	"02": `OFFICE OF ACADEMIC AFFAIRS`,
	"20": `GRADUATE SCHOOL`,
	"21": `ENGINEERING`,
	"22": `ARTS`,
	"23": `SCIENCE`,
	"24": `POLITICAL SCIENCE`,
	"25": `ARCHITECTURE`,
	"26": `COMMERCE AND ACCOUNTANCY`,
	"27": `EDUCATION`,
	"28": `COMMUNICATION ARTS`,
	"29": `ECONOMICS`,
	"30": `MEDICINE`,
	"31": `VETERINARY SCIENCE`,
	"32": `DENTISTRY`,
	"33": `PHARMACEUTICAL SCIENCES`,
	"34": `LAW`,
	"35": `FINE AND APLLIED ARTS`,
	"36": `NURSING`,
	"37": `ALLIED HEALTH SCIENCES`,
	"38": `PSYCHOLOGY`,
	"39": `SPORTS SCIENCE`,
	"40": `SCHOOL OF AGRICULTERAL RESOURCES`,
	"51": `COLLEGE OF POPULATION STUDIES`,
	"53": `COLLEGE OF PUBLIC HEALTH SCIENCE`,
	"55": `LANGUAGE INSTITUTE`,
	"56": `SCHOOL OF INTEGRATED INNOVATION`,
	"58": `SASIN GRADUATE INSTITUTE OF BUSINESS ADMINISTRATION`,
	"99": `OTHER UNIVERSITY`,
};
