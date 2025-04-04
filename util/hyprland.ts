// Interacts with Hyprland
import Hyprland from "gi://AstalHyprland";

const hypr = Hyprland.get_default();

// WM callbacks
export function hyprInit() {
}

// Send all clients back to primary screen
export function sendBack() {
	let clients = hypr.get_clients();
	let workspace = hypr.get_monitor(0).get_active_workspace();
	clients.forEach(each => {
		if (each.get_monitor().get_name() == "DP-1" && each.get_class() != "alacritty-cava") {
			each.move_to(workspace);
		}
	});
}

// Switch the focus back to primary monitor before any task
export function switchFocus() {
	hypr.dispatch("focusmonitor", "eDP-1");
}
