import React, { useState } from "react";
import axios from "axios";
import StartMeeting from "./StartMeeting";

const AdminStartLiveSession = () => {
	const [meetingDetails, setMeetingDetails] = useState(null);
	const [courseId, setCourseId] = useState("672f600db2f3905e23f914e6");
	const [cohortId, setCohortId] = useState("6732f2f47a0ce8a492cc36e1");

	const handleStartSession = async () => {
		try {
			const response = await axios({
				method: "GET",
				url: `https://avi-lms-backend.onrender.com/api/v1/admins/courses/${courseId}/cohorts/${cohortId}/live-session/start`,
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDg3MTliNDk5YTUxMjVhNzY0Yjc3MiIsImVtYWlsIjoib3hsZWU4MTQ5QGdtYWlsLmNvbSIsImlhdCI6MTczNDk2MDY2NSwiZXhwIjoxNzM1MTMzNDY1fQ.m2Xr1Qw9M84KpPthBoM5-EEv_AmnYd0owDubmjmPcBU",
				},
			});
			console.log(response.data.data);
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

			{meetingDetails && (
				<StartMeeting
					meetingNumber={meetingDetails.meeting_id}
					userName="Admin"
					signature={meetingDetails.signature}
					apiKey={`${process.env.REACT_APP_ZOOM_API_KEY}`}
					password={meetingDetails.password}
					zak={meetingDetails.accessToken}
				/>
			)}
		</div>
	);
};

export default AdminStartLiveSession;
