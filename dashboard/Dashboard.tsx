import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { bind } from "astal";

import Calendar from "./Calendar";
import Media from "./Media";
import Quote from "./Quote";
import Sliders from "./Sliders";
import Tray from "./Tray";
import Weather from "./Weather";

import { focused } from "../app";

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
		widthRequest={1540}
		heightRequest={420}
	>
		<box
			vertical
			className="DashboardContainer"
			halign={Gtk.Align.CENTER}
			valign={Gtk.Align.CENTER}
		>
			<box>
				<Sliders />
				<Calendar />
			</box>
			<box>
				<Quote />
			</box>
			<box>
				<Media />
				<Weather />
				<Tray />
			</box>
		</box>
	</window >;
}
