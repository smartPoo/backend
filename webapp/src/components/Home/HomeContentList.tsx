import React, { useEffect, useState } from "react";
import { Restroom, FormSelectorState } from "../dataInterface";
import { Container } from "@material-ui/core";
import HomeInfoBar from "./HomeInfoBar";
import { Pagination } from "@material-ui/lab";

interface HomeContentListProps {
	dataList: Restroom[];
	starterKey: string;
	formSelector?: FormSelectorState;
	genderSelector?: number;
}
const HomeContentList: React.FC<HomeContentListProps> = ({
	dataList,
	starterKey,
	formSelector,
	genderSelector,
}) => {
	const [page, setPage] = useState<number>(1);
	const perPage = 5;
	const maxPage = Math.ceil(dataList.length / perPage);
	const [startData, setStartData] = useState<number>(0);

	useEffect(() => {
		setPage(1);
	}, [
		formSelector?.genderSelector,
		formSelector?.facultySelector,
		formSelector?.buildingSelector,
		formSelector?.floorSelector,
		genderSelector,
	]);
	useEffect(() => {
		setStartData((page - 1) * perPage);
	}, [page]);

	return (
		<Container style={{ padding: "0" }}>
			{dataList.slice(startData, startData + perPage).map((restroom) => {
				let colorStatus: string;
				if (restroom.status === "green") colorStatus = "#62f972";
				else if (restroom.status === "orange") colorStatus = "#ff952f";
				else colorStatus = "#ff1c1d";
				return (
					<Container
						key={`${starterKey}${restroom.restroomID}`}
						style={{ padding: "0" }}>
						<HomeInfoBar
							restroomID={`${starterKey}${restroom.restroomID}`}
							status={colorStatus}
							faculty={restroom.faculty}
							facultyCode={restroom.facultyCode}
							building={restroom.building}
							floor={restroom.floor}
							gender={restroom.gender}
							occupancy={restroom.occupancy}
						/>
					</Container>
				);
			})}
			<Container
				style={{
					display: "flex",
					justifyContent: "center",
					marginBottom: "30px",
				}}>
				<Pagination
					page={page}
					count={maxPage}
					onChange={(e, v) => setPage(v)}
				/>
			</Container>
		</Container>
	);
};

export default HomeContentList;
