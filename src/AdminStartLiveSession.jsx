import React, { useState } from "react";
import axios from "axios";
import StartMeeting from "./StartMeeting";

const AdminStartLiveSession = () => {
	const [meetingDetails, setMeetingDetails] = useState(null);
	const [courseId, setCourseId] = useState("");
	const [cohortId, setCohortId] = useState("");

	const handleStartSession = async () => {
		try {
			const response = await axios({
				method: "POST",
				url: `http://localhost:3500/api/v1/admins/courses/${courseId}/cohorts/${cohortId}/live-session/start`,
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer ",
				},
			});
			console.log("Nothing happened");
			setMeetingDetails(response.data.data);
			return;
		} catch (error) {
			console.log("Error fetching meeting details:", error);
			return;
		}
	};

	return (
		<div>
			<h2>Start Zoom Meeting</h2>
			<br />

			<div>
				<label htmlFor="courseId"></label>
				<input
					type="text"
					id=" courseId"
					placeholder="Course ID"
					value={courseId}
					onChange={(e) => setCourseId(e.target.value)}
				/>
			</div>

			<br />
			<label htmlFor="cohortId"></label>
			<input
				type="text"
				placeholder="Cohort ID"
				id="cohortId"
				value={cohortId}
				onChange={(e) => setCohortId(e.target.value)}
			/>

			<br />
			<button
				style={{ backgroundColor: "blue", color: "white" }}
				onClick={handleStartSession}
			>
				Start Session
			</button>

			{meetingDetails &&
				meetingDetails.meeting_id &&
				meetingDetails.signature &&
				meetingDetails.password && (
					<StartMeeting
						meetingNumber={meetingDetails.meeting_id}
						userName="Admin"
						signature={meetingDetails.signature}
						apiKey={`${process.env.REACT_APP_ZOOM_API_KEY}`}
						password={meetingDetails.password}
					/>
				)}
		</div>
	);
};

export default AdminStartLiveSession;
