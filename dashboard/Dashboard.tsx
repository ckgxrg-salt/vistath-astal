import { App, Astal, Gtk } from "astal/gtk3";

import Avatar from "./Avatar";
import BottomRow from "./BottomRow";
import Calendar from "./Calendar";
import Quote from "./Quote";
import Monitor from "./Monitor";

export default function Dashboard() {
	return <window
		application={App}
		className="Dashboard"
		name="astal-dashboard"
		namespace="astal-dashboard"
		layer={Astal.Layer.BOTTOM}
		monitor={0}
		exclusivity={Astal.Exclusivity.NORMAL}
		anchor={Astal.WindowAnchor.NONE}
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
	</window >;
}
