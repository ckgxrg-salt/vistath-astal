import { Variable, GLib, execAsync } from "astal";
import { Gtk } from "astal/gtk3";

export default function Calendar() {
	return <box
		vertical
		className="Calendar"
		widthRequest={640}
		heightRequest={320}
		margin={15}
	>
		<Clock />
		<Today />
	</box>;
}


function Clock() {
	const time = Variable(GLib.DateTime.new_now_local()).poll(1000, () =>
		GLib.DateTime.new_now_local());

	return <box
		className="Clock"
		halign={Gtk.Align.CENTER}
		widthRequest={230}
	>
		<label label={time().as(v => v.format("%H")!)} css="font-size: 96px; margin-right: 25px;" />
		<box vertical valign={Gtk.Align.CENTER}>
			<label label={time().as(v => v.format("%a")!)} css="font-size: 32px;" />
			<label label={time().as(v => v.format("%m/%d")!)} css="font-size: 24px;" />
		</box>
		<label label={time().as(v => v.format("%M")!)} css="font-size: 96px; margin-left: 25px;" />
	</box>;
}

function Today() {
	const event = Variable("").poll(60 * 60 * 1000, () =>
		execAsync(["bash", "-c", "khal list today today | head -n 2"]).then(str => {
			if (str.length == 0) {
				return "No Events Today =)";
			}
			return str;
		}));

	return <box
		className="Today"
		vertical
		widthRequest={230}
		heightRequest={80}
	>
		<label label="Today" />
		<label label={event()} />
	</box>;
}
