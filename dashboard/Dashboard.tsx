import { App, Astal, Gtk } from "astal/gtk3";
import { bind } from "astal";

import BottomRow from "./BottomRow";
import Calendar from "./Calendar";
import Quote from "./Quote";
import Monitor from "./Monitor";

import { focused } from "../app";
import Avatar from "./Avatar";

export default function Dashboard() {
	return <window
		application={App}
		className="Dashboard"
		name="astal-dashboard"
		namespace="astal-dashboard"
		layer={Astal.Layer.BOTTOM}
		monitor={0}
		exclusivity={Astal.Exclusivity.IGNORE}
		visible={bind(focused).as(v => !v)}
		keymode={Astal.Keymode.ON_DEMAND}
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
