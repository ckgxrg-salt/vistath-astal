// Interacts with Hyprland
import { exec } from "astal";
import Hyprland from "gi://AstalHyprland";
import { navigatorVisible } from "../app";

const hypr = Hyprland.get_default();

// WM callbacks
export function hyprInit() {
}

// Switches to next empty workspace
export function newWorkspace() {
	if (hypr.get_focused_workspace().get_clients().length == 0) {
		return;
	}
	let list = hypr.get_workspaces();
	list.sort((a, b) => a.id - b.id);
	hypr.dispatch("workspace", (list[list.length - 1].id + 1).toString());
}

// Closes the app in current workspace or activate kill mode
export function close() {
	let clients = hypr.get_focused_workspace().get_clients();
	if (clients.length == 0) {
		return;
	} else if (clients.length == 1) {
		clients[0].kill();
		navigatorVisible.set(true);
	} else {
		hypr.message("kill");
		exec(["notify-send", "-i", "laptop", "Astal", "Multiple apps in current window, click on the one you want to close."])
	}
}
