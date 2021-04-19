export const locationCreator = (allData: any[]): any => {
	var locationData: any = [];
	var checkList: any = {};
	for (let i = 0; i < allData.length; i++) {
		let item = allData[i];
		if (checkList[item.facultyCode] === undefined) {
			checkList[item.facultyCode] = locationFacObject(
				item.facultyCode,
				facCodeToName[item.facultyCode]
			);
		}
		if (checkList[item.facultyCode].buildings[item.building] === undefined) {
			checkList[item.facultyCode].buildings[item.building] = locationBldObject(
				item.building
			);
		}

		if (
			!checkList[item.facultyCode].buildings[item.building].floor.includes(
				item.floor
			)
		) {
			checkList[item.facultyCode].buildings[item.building].floor.push(
				item.floor
			);
		}
	}

	locationData = Object.keys(checkList).map((key) => checkList[key]);

	for (let j = 0; j < locationData.length; j++) {
		let item = locationData[j].buildings;
		let temp = Object.keys(item).map((key) => item[key]);
		locationData[j].buildings = temp;
	}
	return { data: locationData };
};

interface TempFacultyInfo {
	facultyName: string;
	facultyCode: string;
	buildings: any;
}

interface TempBuildingInfo {
	buildingName: string;
	floor: string[];
}

const locationFacObject = (code: string, name: string): TempFacultyInfo => {
	return {
		facultyCode: code || "",
		facultyName: name || "",
		buildings: {},
	};
};

const locationBldObject = (name: string): TempBuildingInfo => {
	return {
		buildingName: name || "",
		floor: [],
	};
};

export const facCodeToName: any = {
	"01": `The Sirindhron Thai Language Institute`,
	"02": `Office of Academic Affairs`,
	"20": `Graduate School`,
	"21": `Engineering`,
	"22": `Arts`,
	"23": `Science`,
	"24": `Political Science`,
	"25": `Architecture`,
	"26": `Commerce and Accountancy`,
	"27": `Education`,
	"28": `Communication Arts`,
	"29": `Economics`,
	"30": `Medicine`,
	"31": `Veterinary Science`,
	"32": `Dentistry`,
	"33": `Pharmaceutical Sciences`,
	"34": `Law`,
	"35": `Fine and Applied Arts`,
	"36": `Nursing`,
	"37": `Allied Health Sciences`,
	"38": `Psychology`,
	"39": `Sports Science`,
	"40": `School of Agricultural Resources`,
	"51": `College of Population Studies`,
	"53": `College of Public Health Science`,
	"55": `Language Institute`,
	"56": `School of Integrated Innovation`,
	"58": `Sasin Graduate Institute of Business Administration`,
	"99": `Other University`,
};
