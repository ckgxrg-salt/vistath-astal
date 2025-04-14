import Wp from "gi://AstalWp";
import Brightness from "../util/brightness";
import { bind } from "astal";
import { Gtk } from "astal/gtk3";

export function Volume() {
	const speaker = Wp.get_default()?.audio.defaultSpeaker!

	return <overlay>
		<slider
			vertical
			inverted
			heightRequest={300}
			widthRequest={150}
			className="AudioSlider"
			halign={Gtk.Align.CENTER}
			onDragged={({ value }) => speaker.volume = value}
			value={bind(speaker, "volume")}
		/>
		<icon
			className="AudioIcon"
			sensitive={false}
			valign={Gtk.Align.START}
			icon={bind(speaker, "volumeIcon")}
		/>
	</overlay>;
}

export function Bright() {
	const brightness = Brightness.get_default();

	return <overlay>
		<slider
			vertical
			inverted
			heightRequest={300}
			widthRequest={150}
			className="BrightnessSlider"
			halign={Gtk.Align.CENTER}
			onDragged={({ value }) => brightness.screen = value}
			value={bind(brightness, "screen")}
		/>
		<icon
			className="BrightnessIcon"
			sensitive={false}
			valign={Gtk.Align.START}
			icon="weather-clear"
		/>
	</overlay>;
}
