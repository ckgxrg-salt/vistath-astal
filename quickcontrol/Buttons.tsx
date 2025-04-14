import { Variable, execAsync } from "astal";
import { close } from "../util/hyprland";
import { quickcontrolVisible } from "../app";

export const cavaState = Variable(false);
export const mpdState = Variable(false);

export default function Buttons() {
	return <box className="Buttons">
		<box vertical>
			<Power />
			<Close />
		</box>
		<box vertical>
			<Cava />
			<MPD />
		</box>
	</box>;
}

function Power() {
	return <button
		className="Power"
		tooltipText="Power Options"
		widthRequest={150}
		heightRequest={150}
		onClicked={() => {
			execAsync("uwsm app -- wlogout");
			quickcontrolVisible.set(false);
		}}
	>
		<icon icon="gtk-goto-last-ltr" />
	</button>;
}

function Close() {
	return <button
		className="Close"
		tooltipText="Close App"
		widthRequest={150}
		heightRequest={150}
		onClicked={() => {
			close();
			quickcontrolVisible.set(false);
		}}
	>
		<icon icon="window-close" />
	</button>;
}

function Cava() {
	return <button
		widthRequest={150}
		heightRequest={150}
		setup={self => {
			if (cavaState.get()) {
				self.set_class_name("CavaActive");
				self.set_tooltip_text("Our DJ C.A.V.A. is back!");
			} else {
				self.set_class_name("CavaInactive");
				self.set_tooltip_text("Our DJ is out for lunch");
			}
		}}
		onClicked={self => {
			cavaState.set(!cavaState.get());
			if (cavaState.get()) {
				self.set_class_name("CavaActive");
				self.set_tooltip_text("Our DJ C.A.V.A. is back!");
				execAsync(["systemctl", "--user", "start", "cava.service"]);
			} else {
				self.set_class_name("CavaInactive");
				self.set_tooltip_text("Our DJ is out for lunch");
				execAsync(["systemctl", "--user", "stop", "cava.service"]);
			}
		}}
	>
		<icon icon="audio-card" />
	</button>
}

function MPD() {
	return <button
		widthRequest={150}
		heightRequest={150}
		setup={self => {
			if (mpdState.get()) {
				self.set_class_name("MPDActive");
				self.set_tooltip_text("Climax! MPD's love letter to MPRIS!");
			} else {
				self.set_class_name("MPDInactive");
				self.set_tooltip_text("I'm here to disband Mpdchic");
			}
		}}
		onClicked={self => {
			mpdState.set(!mpdState.get());
			if (mpdState.get()) {
				self.set_class_name("MPDActive");
				self.set_tooltip_text("Climax! MPD's love letter to MPRIS!");
				execAsync(["systemctl", "--user", "start", "mpd.service"]);
				execAsync(["systemctl", "--user", "start", "mpd-mpris.service"]);
			} else {
				self.set_class_name("MPDInactive");
				self.set_tooltip_text("I'm here to disband Mpdchic");
				execAsync(["systemctl", "--user", "stop", "mpd.service"]);
				execAsync(["systemctl", "--user", "stop", "mpd-mpris.service"]);
			}
		}}
	>
		<icon icon="multimedia-player" />
	</button>
}
