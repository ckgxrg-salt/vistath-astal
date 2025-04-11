import { bind } from "astal";
import Tray from "gi://AstalTray";

import { active } from "./BottomRow";

export default function SysTray() {
	const tray = Tray.get_default();

	return <box>
		<button
			className="TrayButton"
			visible={bind(active).as(v => v != "tray")}
			widthRequest={260}
			heightRequest={260}
			margin={15}
			onClicked={() => {
				active.set("tray");
			}}
		>
			<icon icon="view-more" />
		</button>
		<box
			className="SysTray"
			vertical
			visible={bind(active).as(v => v == "tray")}
			widthRequest={760}
			heightRequest={260}
			margin={15}
		>
			{bind(tray, "items").as(items => groupIntoRows(items))}
		</box>
	</box>;
}

function groupIntoRows(items: Tray.TrayItem[]) {
	let buttons = items.map(item => (
		<menubutton
			margin={20}
			widthRequest={100}
			heightRequest={50}
			tooltipMarkup={bind(item, "tooltipMarkup")}
			usePopover={false}
			actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
			menuModel={bind(item, "menuModel")}>
			<icon gicon={bind(item, "gicon")} />
		</menubutton>
	));
	if (buttons.length > 5) {
		let upper = buttons.slice(0, 5);
		let lower = buttons.slice(5);
		return [
			<box heightRequest={110}>
				{upper}
			</box>,
			<box heightRequest={110}>
				{lower}
			</box>
		];
	}
	return [
		<box heightRequest={110}>
			{buttons}
		</box>,
		<box heightRequest={110} />
	]
}
