import { App, Astal, Gtk } from "astal/gtk3";
import { bind } from "astal";
import { quickcontrolVisible } from "../app";

import { Volume, Bright } from "./Sliders";
import Buttons from "./Buttons";

export default function QuickControl() {
	const { LEFT, TOP, BOTTOM, RIGHT } = Astal.WindowAnchor;
	return <window
		application={App}
		className="QuickControl"
		name="astal-quickcontrol"
		namespace="astal-quickcontrol"
		anchor={LEFT | TOP | BOTTOM | RIGHT}
		layer={Astal.Layer.OVERLAY}
		exclusivity={Astal.Exclusivity.IGNORE}
		visible={bind(quickcontrolVisible)}
		monitor={0}
	>
		<box>
			<eventbox widthRequest={1500} expand onClick={() => {
				quickcontrolVisible.set(false);
			}} />
			<box
				vertical
				className="QuickControlContainer"
				halign={Gtk.Align.CENTER}
				valign={Gtk.Align.CENTER}
				spacing={10}
			>
				<box>
					<Bright />
					<Volume />
				</box>
				<Buttons />
				<eventbox heightRequest={600} expand onClick={() => {
					quickcontrolVisible.set(false);
				}} />
			</box>
			<eventbox expand onClick={() => {
				quickcontrolVisible.set(false);
			}} />
		</box>
	</window>;
}
