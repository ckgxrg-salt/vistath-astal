import { Variable, bind } from "astal";
import { Gtk, App } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";

const hypr = Hyprland.get_default();
export default function Buttons() {
	return <box
		vertical
		className="LOButtons"
		valign={Gtk.Align.CENTER}
		halign={Gtk.Align.CENTER}
	>
		<box className="MenuContainerUpper" halign={Gtk.Align.CENTER}>
			<Shutdown />
			<Reboot />
		</box>
		<Focused />
		<box halign={Gtk.Align.CENTER}>
			<Lock />
			<Logout />
			<Suspend />
		</box>
	</box>;
}

export const confirm = Variable("");
function mapClassname(orig: string, conf: string) {
	if (conf == orig.toLowerCase()) {
		return orig + "Confirm";
	}
	return orig;
}

function Focused() {
	return <label
		halign={Gtk.Align.CENTER}
		className="FocusedAction"
		label={bind(confirm).as(str => {
			switch (str) {
				case "shutdown": return "Power Off";
				case "reboot": return "Reboot";
				case "lock": return "Lock Screen";
				case "lgout": return "Log Out";
				case "suspend": return "Suspend";
				default: return "Vistath";
			}
		})} />;
}

function Shutdown() {
	return <button
		className={bind(confirm).as(c => mapClassname("Shutdown", c))}
		tooltipText="Power Off"
		widthRequest={300}
		heightRequest={350}
		onClicked={() => {
			if (confirm.get() === "shutdown") {
				hypr.dispatch("exec", "systemctl poweroff");
				App.quit();
			}
			confirm.set("shutdown");
		}}
	>
		<icon icon="system-shutdown" />
	</button>;
}
function Reboot() {
	return <button
		className={bind(confirm).as(c => mapClassname("Reboot", c))}
		tooltipText="Reboot"
		widthRequest={300}
		heightRequest={350}
		onClicked={() => {
			if (confirm.get() === "reboot") {
				hypr.dispatch("exec", "systemctl reboot");
				App.quit();
			}
			confirm.set("reboot");
		}}
	>
		<icon icon="system-reboot" />
	</button>;
}
function Lock() {
	return <button
		className={bind(confirm).as(c => mapClassname("Lock", c))}
		tooltipText="Lock Screen"
		widthRequest={300}
		heightRequest={350}
		onClicked={() => {
			if (confirm.get() === "lock") {
				hypr.dispatch("exec", "bash -c 'pidof hyprlock || hyprlock --immediate'");
				App.quit();
			}
			confirm.set("lock");
		}}
	>
		<icon icon="system-lock-screen" />
	</button>;
}
function Logout() {
	return <button
		className={bind(confirm).as(c => mapClassname("LGout", c))}
		tooltipText="Terminate Current Session"
		widthRequest={300}
		heightRequest={350}
		onClicked={() => {
			if (confirm.get() === "lgout") {
				hypr.dispatch("exit", "");
				App.quit();
			}
			confirm.set("lgout");
		}}
	>
		<icon icon="system-log-out" />
	</button>;
}
function Suspend() {
	return <button
		className={bind(confirm).as(c => mapClassname("Suspend", c))}
		tooltipText="Take a Nap"
		widthRequest={300}
		heightRequest={350}
		onClicked={() => {
			if (confirm.get() === "suspend") {
				hypr.dispatch("exec", "systemctl suspend");
				App.quit();
			}
			confirm.set("suspend");
		}}
	>
		<icon icon="system-suspend" />
	</button>;
}
