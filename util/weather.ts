import { Variable, readFile, writeFile, execAsync, exec } from "astal";

export const location = Variable("Vatican");
export const weather = Variable("");
export const xdg_data_home = exec(["bash", "-c", "echo $XDG_DATA_HOME"]);

export function weatherInit() {
	let loc = readFile(xdg_data_home + "/astal/loc");
	if (loc.length == 0) {
		loc = "Vatican";
	}
	location.set(loc);
	weather.poll(60 * 60 * 1000, () => getWeather());
}

export function updateLocation(loc: string) {
	location.set(loc);
	writeFile(xdg_data_home + "/astal/loc", loc);
	weather.stopPoll();
	weather.startPoll();
}

export async function getWeather() {
	return execAsync(["wego", "-f", "emoji", location.get()]).catch(() => {
		return "Weather Unavailable =(";
	});
}
