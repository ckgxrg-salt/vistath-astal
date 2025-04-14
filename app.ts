import { App } from "astal/gtk3";
import { exec, Variable } from "astal";

import Dashboard from "./dashboard/Dashboard";
import Navigator from "./navigator/Navigator";
import QuickControl from "./quickcontrol/QuickControl";
import { hyprInit } from "./util/hyprland";
import { mprisInit } from "./util/mpris";
import { weatherInit } from "./util/weather";

import dashboardCss from "./css/dashboard.scss";
import navigatorCss from "./css/navigator.scss";
import quickcontrolCss from "./css/quickcontrol.scss";

export const coffeeState = Variable(false);
export const navigatorVisible = Variable(false);
export const quickcontrolVisible = Variable(false);

App.start({
	css: dashboardCss + navigatorCss + quickcontrolCss,
	requestHandler(req: string, res: (response: any) => void) {
		switch (req) {
			case "navigator":
				navigatorVisible.set(true);
				quickcontrolVisible.set(false);
				exec(["pkill", "-USR1", "wvkbd-vistath"]);
				return res("Ok");
			case "quickcontrol":
				navigatorVisible.set(false);
				quickcontrolVisible.set(true);
				exec(["pkill", "-USR1", "wvkbd-vistath"]);
				return res("Ok");
			default:
				return res("Unknown command");
		}
	},
	client(message: (msg: string) => string, ...args: Array<string>) {
		const res = message(args.toString())
		print(res)
	},
	main() {
		mprisInit();
		hyprInit();
		weatherInit();
		Dashboard();
		Navigator();
		QuickControl();
	},
});
