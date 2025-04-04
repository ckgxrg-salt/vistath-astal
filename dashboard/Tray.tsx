import { bind } from "astal";
import Tray from "gi://AstalTray";

export default function SysTray() {
	const tray = Tray.get_default();

	return <box
		className="SysTray"
		heightRequest={75}
		widthRequest={750}
	>
		{bind(tray, "items").as(items => items.map(item => (
			<menubutton
				widthRequest={50}
				tooltipMarkup={bind(item, "tooltipMarkup")}
				usePopover={false}
				actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
				menuModel={bind(item, "menuModel")}>
				<icon gicon={bind(item, "gicon")} />
			</menubutton>
		)))}
	</box>
}
