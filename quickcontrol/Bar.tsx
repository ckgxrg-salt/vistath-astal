import { Variable, GLib, bind } from "astal";
import { Gtk } from "astal/gtk3";
import Battery from "gi://AstalBattery";

export default function Bar() {
	return <centerbox className="Bar">
		<box />
		<Clock />
		<Bat />
	</centerbox>;
}

function Clock() {
	const time = Variable(GLib.DateTime.new_now_local()).poll(1000, () =>
		GLib.DateTime.new_now_local());
	return <box
		className="QClock"
		halign={Gtk.Align.START}
	>
		<label label={time().as(v => v.format("%H:%M")!)} />
	</box>;
}
function Bat() {
	const bat = Battery.get_default();

	return <box halign={Gtk.Align.END}>
		<icon
			className="QBatteryIcon"
			icon={bind(bat, "batteryIconName")}
		/>
		<label
			className="QBatteryLabel"
			label={bind(bat, "percentage").as(v => `${v * 100}%`)}
		/>
	</box>;
}
