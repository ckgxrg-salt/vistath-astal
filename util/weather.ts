import { Variable, readFile, writeFile, execAsync } from "astal";

export const location = Variable("");

export function init() {
	let loc = readFile("$XDG_DATA_HOME/astal/loc");
	if (loc.length == 0) {
		loc = "Vatican";
	}
	location.set(loc);
}

export function updateLocation(loc: string) {
	location.set(loc);
	writeFile("$XDG_DATA_HOME/astal/loc", loc);
}

export function getWeather() {
	return execAsync(["wego", location.get()]);
}
