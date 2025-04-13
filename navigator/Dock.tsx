import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";
import Launchpad from "./Launchpad";
import { Astal, Gtk } from "astal/gtk3";
import { newWorkspace } from "../util/hyprland";

const hypr = Hyprland.get_default();

export default function Dock() {
	return <box
		className="Dock"
		heightRequest={150}
		spacing={30}
	>
		<Workspaces />
		<NewWorkspace />
		<LaunchpadButton />
	</box>;
}

function Workspaces() {
	return <box
		className="Workspaces"
		heightRequest={150}
		spacing={10}
	>
		{bind(hypr, "workspaces").as(wss => wss
			.filter(ws => ws.id >= 0)
			.sort((a, b) => a.id - b.id)
			.map(ws => (
				<button
					className={bind(hypr, "focusedWorkspace").as(fw =>
						ws === fw ? "focused" : "")}
					widthRequest={200}
					onClicked={() => ws.focus()}
				>
					{bind(ws, "lastClient").as((client) => {
						if (client != undefined) {
							let className = client.get_class();
							if (Astal.Icon.lookup_icon(className)) {
								return <box vertical valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER}>
									<icon icon={className} css="font-size: 48px" />
									<label label={className} truncate maxWidthChars={10} />
								</box>;
							}
							return <label label={className} />;
						}
						return <label label={ws.id.toString()} />;
					})}
				</button>
			))
		)}
	</box>;
}

function NewWorkspace() {
	return <button
		className="NewWorkspace"
		widthRequest={150}
		heightRequest={150}
		onClicked={() => newWorkspace()}
	>
		<icon icon="list-add" />
	</button>;
}

function LaunchpadButton() {
	return <button
		className="LaunchpadButton"
		widthRequest={150}
		heightRequest={150}
		onClicked={() => {
			Launchpad();
		}}
	>
		<icon icon="activities" />
	</button>;
}
