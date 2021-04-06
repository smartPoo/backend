import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
import HomeFilterTag from "./HomeFilterTag";
import { Restroom, FormSelectorState } from "../dataInterface";
import HomeContentList from "./HomeContentList";

const useStyles = makeStyles((theme) => ({
	contentContainer: {
		paddingTop: theme.spacing(12),
		paddingBottom: theme.spacing(24),
	},
	contentListHeading: {
		fontWeight: "bold",
		fontSize: "1em",
		[theme.breakpoints.up("md")]: {
			fontSize: "1.4em",
		},
		marginBottom: "20px",
	},
}));

interface HomeContentProps {
	nearestData: Restroom[];
	listData: Restroom[];
	formSelector: FormSelectorState;
	loading: boolean;
}
const HomeContent: React.FC<HomeContentProps> = ({
	nearestData,
	listData,
	formSelector,
	loading,
}) => {
	const classes = useStyles();

	return (
		<Container className={classes.contentContainer}>
			{/* ------ Form Selection ------ */}
			<HomeFilterTag formSelector={formSelector} />

			{loading ? (
				<Container style={{ textAlign: "center", marginTop: "20px" }}>
					<Typography variant="h5">Loading...</Typography>
				</Container>
			) : (
				<Container style={{ padding: "0" }}>
					{/* ------ Nearest You ------ */}
					<Typography className={classes.contentListHeading}>
						Nearest You
					</Typography>
					{nearestData.length > 0 ? (
						<HomeContentList
							starterKey="n"
							dataList={nearestData}
							formSelector={formSelector}
						/>
					) : formSelector.facultySelector === "" ? (
						<Typography style={{ marginLeft: "20px", marginBottom: "30px" }}>
							Please selects some location
						</Typography>
					) : (
						<Typography style={{ marginLeft: "20px", marginBottom: "30px" }}>
							Data not Found
						</Typography>
					)}

					{/* ------ Restroom List ------ */}
					<Typography className={classes.contentListHeading}>
						Restroom List
					</Typography>
					{listData.length > 0 ? (
						<HomeContentList
							starterKey="l"
							dataList={listData}
							genderSelector={formSelector.genderSelector}
						/>
					) : (
						<Typography style={{ marginLeft: "20px", marginBottom: "30px" }}>
							Data not Found
						</Typography>
					)}
				</Container>
			)}
		</Container>
	);
};

export default HomeContent;
