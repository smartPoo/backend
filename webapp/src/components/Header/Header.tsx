import React from "react";
import { AppBar, Toolbar, makeStyles, Container } from "@material-ui/core";
import SmartPooLogo from "../../assets/SmartPoo.png";

const useStyles = makeStyles((theme) => ({
	headerBarMain: {
		backgroundColor: "#ffffff",
		width: "100vw",
	},
	headerBarLogo: {
		height: "24px",
	},

	headerLogoArea: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
	},
}));

const Header: React.FC = () => {
	const classes = useStyles();

	return (
		<Container>
			<AppBar className={classes.headerBarMain} elevation={1}>
				<Toolbar>
					<Container className={classes.headerLogoArea}>
						<img
							src={SmartPooLogo}
							alt="SmartPooLogo"
							className={classes.headerBarLogo}
						/>
					</Container>
				</Toolbar>
			</AppBar>
		</Container>
	);
};

export default Header;
