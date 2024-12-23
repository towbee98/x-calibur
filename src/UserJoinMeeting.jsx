import React, { useState } from "react";
import axios from "axios";
import StartMeeting from "./StartMeeting";

const UserJoinLiveSession = () => {
	const [meetingDetails, setMeetingDetails] = useState(null);
	const [courseId, setCourseId] = useState("672f600db2f3905e23f914e6");
	const [cohortId, setCohortId] = useState("6732f2f47a0ce8a492cc36e1");

	const [errorMessage, setErrorMessage] = useState("");
	const handleJoinSession = async () => {
		try {
			const response = await axios({
				method: "GET",
				url: `https://avi-lms-backend.onrender.com/api/v1/courses/enrolled/${courseId}/cohorts/${cohortId}/live-session/join`,
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzVkNThmNTQxZjUyYjdhMzljOTI3NiIsImVtYWlsIjoidG9iaWVtbWEyMDBAZ21haWwuY29tIiwiaWF0IjoxNzM0OTYwOTU4LCJleHAiOjE3MzUxMzM3NTh9.599SM--V4mnY-18OBbdMR37GgXr6isANhMtbOji4bk8",
				},
			});
			console.log(response.data.data);
			setMeetingDetails(response.data.data);
			return;
		} catch (error) {
			console.log("Error fetching meeting details:", error);
			setErrorMessage(error.response.message);
			return;
		}
	};

	return (
		<div>
			<h2>Join Zoom Meeting</h2>
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
				onClick={handleJoinSession}
			>
				Join Session
			</button>
			<div className="error-message-container"></div>
			{meetingDetails && (
				<StartMeeting
					meetingNumber={meetingDetails.meeting_id}
					userName="User "
					signature={meetingDetails.signature}
					apiKey={`${process.env.REACT_APP_ZOOM_API_KEY}`}
					password={meetingDetails.password}
				/>
			)}
		</div>
	);
};

export default UserJoinLiveSession;
