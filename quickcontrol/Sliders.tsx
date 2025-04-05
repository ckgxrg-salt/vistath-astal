import Wp from "gi://AstalWp";
import Brightness from "../util/brightness";
import { bind } from "astal";
import { Gtk } from "astal/gtk3";

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
