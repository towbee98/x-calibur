import { Routes, Route } from "react-router-dom";
import "./App.css";
import AdminStartLiveSession from "./AdminStartLiveSession";
import UserJoinLiveSession from "./UserJoinMeeting";
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path={"/user"} element={<UserJoinLiveSession />} />
				<Route path={"/admin"} element={<AdminStartLiveSession />} />
			</Routes>
		</div>
	);
}

export default App;
