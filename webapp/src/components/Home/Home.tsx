import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import HomeContent from "./HomeContent";
import { FullData, FormSelectorState } from "../dataInterface";
import { homeNearestFiltered, homeListFiltered } from "./homeFiltered";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";

const theme = createMuiTheme({
	palette: {
		background: {
			default: "#F1FFFF",
		},
	},
});

interface HomeProps {
	loading: boolean;
}
const Home: React.FC<HomeProps> = ({ loading }) => {
	const allData = useSelector((state: RootState) => state.AllData);
	const [fullData, setFullData] = useState<FullData>({
		NearestData: [],
		ListData: [],
	});
	const [genderSelector, setGenderSelector] = useState<number>(-1);
	const [facultySelector, setFacultySelector] = useState<string>("");
	const [buildingSelector, setBuildingSelector] = useState<string>("");
	const [floorSelector, setFloorSelector] = useState<string>("");

	const formSelector: FormSelectorState = {
		genderSelector,
		setGenderSelector,
		facultySelector,
		setFacultySelector,
		buildingSelector,
		setBuildingSelector,
		floorSelector,
		setFloorSelector,
	};

	useEffect(() => {
		setFullData(() => {
			return {
				NearestData:
					facultySelector === ""
						? []
						: homeNearestFiltered(
								allData.data,
								genderSelector,
								facultySelector,
								buildingSelector,
								floorSelector
						  ),
				ListData: homeListFiltered(
					allData.data,
					genderSelector,
					facultySelector,
					buildingSelector,
					floorSelector
				),
			};
		});
	}, [
		loading,
		allData,
		genderSelector,
		facultySelector,
		buildingSelector,
		floorSelector,
	]);

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Header />
			<HomeContent
				nearestData={fullData.NearestData}
				listData={fullData.ListData}
				formSelector={formSelector}
				loading={loading}
			/>
		</MuiThemeProvider>
	);
};

export default Home;
