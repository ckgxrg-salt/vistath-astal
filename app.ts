import { App } from "astal/gtk3";

import Dashboard from "./dashboard/Dashboard";
import { hyprInit } from "./util/hyprland";
import { mprisInit } from "./util/mpris";
import { weatherInit } from "./util/weather";

import dashboardCss from "./css/dashboard.scss";

App.start({
	css: dashboardCss,
	main() {
		mprisInit();
		hyprInit();
		weatherInit();
		Dashboard();
	},
});
