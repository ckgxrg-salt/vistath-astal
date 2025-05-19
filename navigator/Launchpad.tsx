import Apps from "gi://AstalApps";
import Hyprland from "gi://AstalHyprland";
import { App, Gtk, Gdk, Astal } from "astal/gtk3";
import { Variable, bind } from "astal";
import { newWorkspace } from "../util/hyprland";
import { navigatorVisible } from "../app";

const hypr = Hyprland.get_default();

function AppButton({ app }: { app: Apps.Application }) {
	return <button
		className="AppButton"
		widthRequest={415}
		heightRequest={250}
		onClicked={() => {
			newWorkspace();
			hypr.dispatch("exec", app.entry);
			navigatorVisible.set(false);
			App.get_window("astal-navigator-launchpad")!.destroy();
		}}>
		<box spacing={15}>
			<icon icon={app.iconName} />
			<box valign={Gtk.Align.CENTER} vertical>
				<label
					className="AppButtonName"
					truncate
					xalign={0}
					label={app.name}
				/>
				{app.description && <label
					className="AppButtonDesc"
					wrap
					maxWidthChars={20}
					xalign={0}
					label={app.description}
				/>}
			</box>
		</box>
	</button>
}

const apps = new Apps.Apps()
function generateList(text: string) {
	let res = apps.fuzzy_query(text);
	let items = res.map((each, index) => {
		return index % 4 === 0 ? [each, res[index + 1], res[index + 2], res[index + 3]] : null;
	}).filter(Boolean);
	return items.map(pair => {
		return <box spacing={20}>
			{pair!.map(each => {
				if (each != null) {
					return <AppButton app={each} />;
				}
			}).flatMap(item => item ? [item] : [])}
		</box>;
	})
}
export default function Launchpad() {
	const text = Variable("");

	return <window
		name="astal-navigator-launchpad"
		anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM}
		layer={Astal.Layer.OVERLAY}
		exclusivity={Astal.Exclusivity.NORMAL}
		keymode={Astal.Keymode.ON_DEMAND}
		application={App}
		onShow={() => {
			text.set("");
		}}
		onKeyPressEvent={function(self, event: Gdk.Event) {
			if (event.get_keyval()[1] === Gdk.KEY_Escape)
				self.destroy();
		}}>
		<box>
			<eventbox widthRequest={100} expand onClick={() => {
				App.get_window("astal-navigator-launchpad")!.destroy();
			}} />
			<box hexpand={false} vertical>
				<eventbox heightRequest={50} onClick={() => {
					App.get_window("astal-navigator-launchpad")!.destroy();
				}} />
				<entry
					className="SearchEntry"
					heightRequest={100}
					placeholderText="Search..."
					text={text()}
					onChanged={self => text.set(self.text)}
					onActivate={() => {
						apps.fuzzy_query(text.get())?.[0].launch();
						App.get_window("astal-navigator-launchpad")!.destroy();
					}}
				/>
				<box widthRequest={1720} className="Launchpad" vertical>
					<scrollable className="LaunchpadApps" heightRequest={1080} widthRequest={1720}>
						<box vertical spacing={20}>
							{bind(text).as(text => generateList(text))}
						</box>
					</scrollable>
					<box
						halign={Gtk.Align.CENTER}
						className="LaunchpadNotFound"
						vertical
						visible={bind(text).as(text => generateList(text).length == 0)}>
						<icon icon="system-search-symbolic" />
						<label label="No match found" />
					</box>
				</box>
				<eventbox expand onClick={() => {
					App.get_window("astal-navigator-launchpad")!.destroy();
				}} />
			</box>
			<eventbox widthRequest={100} expand onClick={() => {
				App.get_window("astal-navigator-launchpad")!.destroy();
			}} />
		</box>
	</window>
}
