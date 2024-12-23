import React, { useEffect } from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
//import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

const StartMeeting = ({
	meetingNumber,
	userName,
	signature,
	apiKey,
	password,
	zak,
}) => {
	useEffect(() => {
		// Preload necessary files for the Zoom Web SDK
		ZoomMtg.preLoadWasm();
		ZoomMtg.prepareWebSDK();

		ZoomMtg.init({
			leaveUrl: "http://localhost:3000", // Redirect URL after leaving the meeting
			patchJsMedia: true,
			success: () => {
				console.log("Zoom Meeting Initialized");
				ZoomMtg.join({
					meetingNumber,
					userName,
					userEmail: "tobiemma200@gmail.com",
					signature,
					sdkKey: apiKey,
					passWord: password,
					zak,
					success: () => {
						console.log("Joined meeting successfully");
					},
					error: (error) => {
						if (error.message.includes("empty profile")) {
							console.warn("Empty profile warning, but the meeting works.");
						} else {
							console.error("Error joining meeting:", error);
						}
					},
				});
			},
			error: (error) => {
				console.error("Error initializing Zoom Meeting:", error);
			},
		});
	}, [meetingNumber, userName, signature, apiKey, password, zak]);

	return <div id="zmmtg-root"></div>; // Zoom SDK will render the meeting UI here
};

export default StartMeeting;
