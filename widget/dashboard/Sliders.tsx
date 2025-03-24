import Battery from "gi://AstalBattery";
import Wp from "gi://AstalWp";
import Brightness from "../../util/brightness";
import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";

export default function Sliders() {
	return <box
		className="Sliders"
		widthRequest={200}
		heightRequest={230}
	>
		<Volume />
		<Bright />
		<Bat />
		<Mem />
	</box>;
}

function Volume() {
	const speaker = Wp.get_default()?.audio.defaultSpeaker!

	return <box>
		<icon
			className="AudioIcon"
			valign={Gtk.Align.START}
			icon={bind(speaker, "volumeIcon")}
		/>
		<slider
			className="AudioSlider"
			halign={Gtk.Align.CENTER}
			onDragged={({ value }) => speaker.volume = value}
			value={bind(speaker, "volume")}
		/>
	</box>;
}

function Bright() {
	const brightness = Brightness.get_default();

	return <box>
		<icon
			className="BrightnessIcon"
			valign={Gtk.Align.START}
			icon="weather-clear"
		/>
		<slider
			className="BrightnessSlider"
			halign={Gtk.Align.CENTER}
			onDragged={({ value }) => brightness.screen = value}
			value={bind(brightness, "screen")}
		/>
	</box>;
}

function Mem() {
	const mem = Variable(0).poll(5000, ["bash", "-c", "printf \"%.0f\\n\" $(free -m | grep Mem | awk '{print ($3 / $2 )}')"], (out) => parseFloat(out));

	return <box>
		<icon
			className="MemoryIcon"
			valign={Gtk.Align.START}
			icon="weather-clear"
		/>
		<slider
			className="MemorySlider"
			halign={Gtk.Align.CENTER}
			value={bind(mem)}
		/>
	</box>;
}

function mapBatState(warn: Battery.WarningLevel, state: Battery.State) {
	if (warn == Battery.WarningLevel.LOW) return "BatteryLow";
	if (warn == Battery.WarningLevel.CRITICIAL) return "BatteryCrit";
	if (state == Battery.State.CHARGING) return "BatteryCharging";
	if (state == Battery.State.FULLY_CHARGED) return "BatteryCharging";
	return "Battery";
}
function Bat() {
	const bat = Battery.get_default();
	const className = Variable.derive([bind(bat, "warningLevel"), bind(bat, "state")], (w, s) => mapBatState(w, s));

	return <box>
		<icon
			className="BatteryIcon"
			valign={Gtk.Align.START}
			icon={bind(bat, "batteryIconName")}
		/>
		<slider
			className={bind(className)}
			halign={Gtk.Align.CENTER}
			value={bind(bat, "percentage")}
		/>
	</box>;
}
