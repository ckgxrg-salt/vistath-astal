import { bind } from "astal";
import { weather, updateLocation, location } from "../util/weather";

export default function Weather() {
	return <box
		vertical
		className="Weather"
		widthRequest={230}
		heightRequest={140}
	>
		<Location />
		<RealWeather />
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
