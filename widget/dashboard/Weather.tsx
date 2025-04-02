import { Variable, bind, execAsync } from "astal";
import { getWeather, location, updateLocation } from "../../util/weather";

export default function Weather() {
	return <box
		vertical
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
	const weather = Variable("").poll(60 * 60 * 1000, () => getWeather());

	return <box
		className="Today"
		widthRequest={230}
		heightRequest={80}
	>
		<label label={weather()} />
	</box>;
}
