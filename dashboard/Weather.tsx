import { bind } from "astal";
import { weather, updateLocation, location } from "../util/weather";
import { active } from "./BottomRow";
import { Astal, App } from "astal/gtk3";

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
	return <button
		className="LocationButton"
		widthRequest={230}
		heightRequest={80}
		onClicked={() => {
			LocationEntry();
		}}
	/>;
}

function LocationEntry() {
	return <window
		application={App}
		className="DashboardWeatherEntry"
		name="astal-dashboard-weatherentry"
		namespace="astal-dashboard-weatherentry"
		layer={Astal.Layer.TOP}
		exclusivity={Astal.Exclusivity.NORMAL}
		keymode={Astal.Keymode.ON_DEMAND}
		monitor={0}
	>
		<entry
			className="Location"
			widthRequest={230}
			heightRequest={80}
			placeholderText={"New Location..."}
			onActivate={self => {
				updateLocation(self.text);
				self.get_toplevel().destroy();
			}}
		/>
	</window >;
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
