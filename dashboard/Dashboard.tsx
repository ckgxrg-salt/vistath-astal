import { App, Astal, Gtk } from "astal/gtk3";

import Avatar from "./Avatar";
import BottomRow from "./BottomRow";
import Calendar from "./Calendar";
import Quote from "./Quote";
import Monitor from "./Monitor";
import { coffeeState } from "../app";

export default function Dashboard() {
	return <window
		application={App}
		className="Dashboard"
		name="astal-dashboard"
		namespace="astal-dashboard"
		layer={Astal.Layer.BOTTOM}
		exclusivity={Astal.Exclusivity.IGNORE}
		monitor={0}
		setup={self => {
			self.set_inhibit(coffeeState.get());
			coffeeState.subscribe(state => self.set_inhibit(state));
		}}
	>
		<box
			vertical
			className="DashboardContainer"
			halign={Gtk.Align.CENTER}
			valign={Gtk.Align.CENTER}
		>
			<box>
				<Monitor />
				<Calendar />
				<Avatar />
			</box>
			<box>
				<Quote />
			</box>
			<BottomRow />
		</box>
	</window>;
}
