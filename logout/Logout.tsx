import { App, Astal, Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import Buttons from "./Buttons";
import { confirm } from "./Buttons";

const { TOP, LEFT, BOTTOM, RIGHT } = Astal.WindowAnchor;
const hypr = Hyprland.get_default();

// Holds buttons
export function Logout() {
	return <window
		application={App}
		className="Logout"
		name="astal-logout"
		namespace="astal-logout"
		layer={Astal.Layer.OVERLAY}
		monitor={0}
		anchor={TOP | LEFT | BOTTOM | RIGHT}
		keymode={Astal.Keymode.EXCLUSIVE}
		onKeyPressEvent={(_, event) => {
			handleKeybind(event.get_keyval()[1]);
		}}
	>
		<box>
			<eventbox expand onClick={() => App.quit()} />
			<box vertical>
				<eventbox expand onClick={() => App.quit()} />
				<Buttons />
				<eventbox expand onClick={() => App.quit()} />
			</box>
			<eventbox expand onClick={() => App.quit()} />
		</box>
	</window>;
}

function handleKeybind(keycode: number) {
	switch (keycode) {
		case Gdk.KEY_Escape: App.quit();
		case Gdk.KEY_s: {
			if (confirm.get() === "shutdown") {
				hypr.dispatch("exec", "systemctl poweroff");
				App.quit();
			}
			confirm.set("shutdown");
			break;
		}
		case Gdk.KEY_r: {
			if (confirm.get() === "reboot") {
				hypr.dispatch("exec", "systemctl reboot");
				App.quit();
			}
			confirm.set("reboot");
			break;
		}
		case Gdk.KEY_l: {
			if (confirm.get() === "lock") {
				hypr.dispatch("exec", "bash -c 'pidof hyprlock || hyprlock --immediate'");
				App.quit();
			}
			confirm.set("lock");
			break;
		}
		case Gdk.KEY_e: {
			if (confirm.get() === "lgout") {
				hypr.dispatch("exit", "");
				App.quit();
			}
			confirm.set("lgout");
			break;
		}
		case Gdk.KEY_p: {
			if (confirm.get() === "suspend") {
				hypr.dispatch("exec", "systemctl suspend");
				App.quit();
			}
			confirm.set("suspend");
			break;
		}
	}
}
