import { App, Astal, Gtk } from "astal/gtk3";
import Dock from "./Dock";

export default function Navigator() {
	return <window
		application={App}
		className="Navigator"
		name="astal-navigator"
		namespace="astal-navigator"
		anchor={Astal.WindowAnchor.BOTTOM}
		layer={Astal.Layer.TOP}
		exclusivity={Astal.Exclusivity.NORMAL}
		monitor={0}
	>
		<box
			vertical
			className="NavigatorContainer"
			halign={Gtk.Align.CENTER}
			valign={Gtk.Align.CENTER}
		>
			<Dock />
		</box>
	</window>;
}
