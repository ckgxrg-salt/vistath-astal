import { bind } from "astal";
import { weather, updateLocation, location } from "../util/weather";
import { active } from "./BottomRow";

export default function Weather() {
	return <box>
		<button
			className="WeatherButton"
			visible={bind(active).as(v => v != "weather")}
			widthRequest={260}
			heightRequest={260}
			margin={15}
			onClicked={() => {
				active.set("weather");
			}}
		>
			<icon icon="weather-clear-symbolic" />
		</button>
		<box
			vertical
			className="Weather"
			visible={bind(active).as(v => v == "weather")}
			widthRequest={760}
			heightRequest={260}
			margin={15}
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
		placeholderText={bind(location)}
		onActivate={self => {
			updateLocation(self.text);
			self.set_text("");
			self.hide();
			self.show();
		}}
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
