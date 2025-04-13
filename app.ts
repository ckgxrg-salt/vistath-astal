import { App } from "astal/gtk3";
import { Variable } from "astal";

import Dashboard from "./dashboard/Dashboard";
import Navigator from "./navigator/Navigator";
import { hyprInit } from "./util/hyprland";
import { mprisInit } from "./util/mpris";
import { weatherInit } from "./util/weather";

import dashboardCss from "./css/dashboard.scss";
import navigatorCss from "./css/navigator.scss";

export const navigatorVisible = Variable(false);

App.start({
	css: dashboardCss + navigatorCss,
	requestHandler(req: string, res: (response: any) => void) {
		if (req == "navigator") {
			navigatorVisible.set(true);
			return res("Ok");
		}
		return res("Unknown command");
	},
	main() {
		mprisInit();
		hyprInit();
		weatherInit();
		Dashboard();
		Navigator();
	},
});
