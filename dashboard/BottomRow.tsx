// Processes the folding logic
import { Variable } from "astal";

import Media from "./Media";
import Weather from "./Weather";
import SysTray from "./Tray";

export const active = Variable("tray");

export default function BottomRow() {
	return <box>
		<Media />
		<Weather />
		<SysTray />
	</box>;
}
