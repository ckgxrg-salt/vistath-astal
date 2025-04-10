import { bind } from "astal";
import { weather, updateLocation, location } from "../util/weather";
import { Gtk } from "astal/gtk3";
import { active } from "./BottomRow";

export default function Weather() {
	return <box>
		<button
			className="WeatherButton"
			visible={bind(active).as(v => v != "weather")}
			onClicked={() => {
				active.set("weather");
			}}
		>
			<icon icon="weather-clear" />
		</button>
		<box
			vertical
			className="Weather"
			visible={bind(active).as(v => v == "weather")}
			widthRequest={230}
			heightRequest={140}
		>
			<Location />
			<RealWeather />
		</box>
	</box>;
}

function Location() {
	return <entry
		className="Location"
		widthRequest={230}
		heightRequest={80}
		text={bind(location)}
		onActivate={self => updateLocation(self.text)}
	/>;
}

function RealWeather() {
	return <box
		className="RealWeather"
		widthRequest={230}
		heightRequest={80}
	>
		<label label={bind(weather)} />
	</box>;
}
