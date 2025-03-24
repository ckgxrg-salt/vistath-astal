import { bind, exec, Variable } from "astal";
import { Gtk } from "astal/gtk3";

const quote = Variable("");

export default function Quote() {
	quote.set(exec("fortune"));

	return <box
		className="QuoteContainer"
		halign={Gtk.Align.CENTER}
		heightRequest={150}
	>
		<button
			className="QuoteButton"
			widthRequest={50}
			halign={Gtk.Align.END}
			tooltipText="Quotes from fortune"
			onClicked={() => quote.set(exec("fortune"))}
		>
			<icon icon="btsync-gui-10" />
		</button>
		<label
			className="Quote"
			widthRequest={770}
			halign={Gtk.Align.CENTER}
			truncate
			wrap
			maxWidthChars={55}
			label={bind(quote).as(content => getMaxContent(content))}
			tooltipText={bind(quote)}
		/>
	</box>;
}

function getMaxContent(str: string) {
	let lines = str.split("\n");
	if (lines.length > 4) {
		return lines.slice(0, 3).map(each => each + "\n").toString() + "...";
	} else {
		return str;
	}
}
