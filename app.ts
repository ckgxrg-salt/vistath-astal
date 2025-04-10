import { App } from "astal/gtk3";
import { Variable } from "astal";

import Dashboard from "./dashboard/Dashboard";
import { hyprInit } from "./util/hyprland";
import { mprisInit } from "./util/mpris";
import { weatherInit } from "./util/weather";

import dashboardCss from "./css/dashboard.scss";

export const coffeeState = Variable(false);

export const focused = Variable(false);

App.start({
	css: dashboardCss,
	main() {
		mprisInit();
		hyprInit();
		weatherInit();
		Dashboard();
	},
});
