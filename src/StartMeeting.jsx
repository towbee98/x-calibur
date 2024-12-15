import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import "@zoomus/websdk/dist/css/bootstrap.css";
import "@zoomus/websdk/dist/css/react-select.css";

const StartMeeting = ({
	meetingNumber,
	userName,
	signature,
	apiKey,
	password,
}) => {
	console.log(
		"StartMeeting",
		meetingNumber,
		userName,
		signature,
		apiKey,
		password
	);

	useEffect(() => {
		// Preload necessary files for the Zoom Web SDK
		ZoomMtg.preLoadWasm();
		ZoomMtg.prepareJssdk();

		ZoomMtg.init({
			leaveUrl: "http://localhost:3000", // Redirect URL after leaving the meeting
			success: () => {
				console.log("Zoom Meeting Initialized");

				ZoomMtg.join({
					meetingNumber,
					userName,
					signature,
					apiKey,
					password,
					success: () => {
						console.log("Joined meeting successfully");
					},
					error: (error) => {
						console.error("Error joining meeting:", error);
					},
				});
			},
			error: (error) => {
				console.error("Error initializing Zoom Meeting:", error);
			},
		});
	}, [meetingNumber, userName, signature, apiKey, password]);

	return <div id="zmmtg-root"></div>; // Zoom SDK will render the meeting UI here
};

export default StartMeeting;
