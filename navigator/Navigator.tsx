import { App, Astal, Gtk } from "astal/gtk3";
import Dock from "./Dock";
import { bind } from "astal";
import { navigatorVisible } from "../app";

export default function Navigator() {
	const { LEFT, TOP, BOTTOM, RIGHT } = Astal.WindowAnchor;
	return <window
		application={App}
		className="Navigator"
		name="astal-navigator"
		namespace="astal-navigator"
		anchor={LEFT | TOP | BOTTOM | RIGHT}
		layer={Astal.Layer.OVERLAY}
		exclusivity={Astal.Exclusivity.NORMAL}
		visible={bind(navigatorVisible)}
		monitor={0}
	>
		<box>
			<eventbox expand onClick={() => {
				App.get_window("astal-navigator")!.hide();
			}} />
			<box
				vertical
				className="NavigatorContainer"
				halign={Gtk.Align.CENTER}
				valign={Gtk.Align.CENTER}
			>
				<eventbox heightRequest={1100} expand onClick={() => {
					navigatorVisible.set(false);
				}} />
				<Dock />
			</box>
			<eventbox expand onClick={() => {
				navigatorVisible.set(false);
			}} />
		</box>
	</window>;
}
