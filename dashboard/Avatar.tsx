import { Astal } from "astal/gtk3";

import { coffeeState } from "../app";

export default function Avatar() {
	return <overlay>
		<box
			className="Avatar"
			widthRequest={320}
			heightRequest={320}
			margin={15}
		>
			<box
				className="AvatarImg"
				widthRequest={240}
				heightRequest={240}
				margin={40}
			/>
		</box>
		<box vertical>
			<box heightRequest={175} />
			<box heightRequest={175}>
				<box widthRequest={50} heightRequest={50} margin={65} />
				<Coffee />
			</box>
		</box>
	</overlay>;
}

function Coffee() {
	return <button
		widthRequest={50}
		heightRequest={50}
		margin={65}
		setup={self => {
			if (coffeeState.get()) {
				self.set_class_name("CoffeeDrunk");
				(self.get_child() as Astal.Icon).icon = "caffeine-cup-full-symbolic";
				self.set_tooltip_text("Inhibited System Idle");
			} else {
				self.set_class_name("CoffeeZzz");
				(self.get_child() as Astal.Icon).icon = "view-refresh-symbolic";
				self.set_tooltip_text("This widget says Zzz, pretending to sleep");
			}
			coffeeState.subscribe(state => {
				if (state) {
					self.set_class_name("CoffeeDrunk");
					(self.get_child() as Astal.Icon).icon = "caffeine-cup-full-symbolic";
					self.set_tooltip_text("Inhibited System Idle");
				} else {
					self.set_class_name("CoffeeZzz");
					(self.get_child() as Astal.Icon).icon = "view-refresh-symbolic";
					self.set_tooltip_text("This widget says Zzz, pretending to sleep");
				}
			});
		}}
		onClicked={() => {
			coffeeState.set(!coffeeState.get());
		}}
	>
		<icon />
	</button>
}
