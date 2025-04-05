import Battery from "gi://AstalBattery";
import GTop from "gi://GTop";
import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";

export default function Monitor() {
	return <box
		vertical
		className="Sliders"
		widthRequest={200}
		heightRequest={230}
	>
		<Bat />
		<Cpu />
		<Mem />
	</box>;
}

function mapBatState(warn: Battery.WarningLevel, state: Battery.State) {
	if (warn == Battery.WarningLevel.LOW) return "BatteryLow";
	if (warn == Battery.WarningLevel.CRITICIAL) return "BatteryCrit";
	if (state == Battery.State.CHARGING) return "BatteryCharging";
	if (state == Battery.State.FULLY_CHARGED) return "BatteryCharging";
	return "Battery";
}
function Bat() {
	const bat = Battery.get_default();
	const className = Variable.derive([bind(bat, "warningLevel"), bind(bat, "state")], (w, s) => mapBatState(w, s));

	return <box>
		<icon
			className="BatteryIcon"
			valign={Gtk.Align.START}
			icon={bind(bat, "batteryIconName")}
		/>
		<slider
			className={bind(className)}
			halign={Gtk.Align.CENTER}
			value={bind(bat, "percentage")}
		/>
	</box>;
}

const cpu = Variable({ cpu: new GTop.glibtop_cpu(), load: 0 }).poll(
	5000,
	({ cpu: lastCpu }) => {
		const cpu = new GTop.glibtop_cpu();
		GTop.glibtop_get_cpu(cpu);

		const used = cpu.user + cpu.sys + cpu.nice + cpu.irq + cpu.softirq;
		const total = used + cpu.idle + cpu.iowait;

		const lastUsed =
			lastCpu.user + lastCpu.sys + lastCpu.nice + lastCpu.irq + lastCpu.softirq;
		const lastTotal = lastUsed + lastCpu.idle + lastCpu.iowait;

		const diffUsed = used - lastUsed;
		const diffTotal = total - lastTotal;

		return { cpu, load: diffTotal > 0 ? diffUsed / diffTotal : 0 };
	},
);
function Cpu() {
	return <box>
		<icon
			className="CpuIcon"
			valign={Gtk.Align.START}
			icon="weather-clear"
		/>
		<slider
			className="CpuSlider"
			halign={Gtk.Align.CENTER}
			value={bind(cpu).as(v => v.load)}
		/>
	</box>;
}

const mem = Variable(new GTop.glibtop_mem()).poll(5000, () => {
	const realmem = new GTop.glibtop_mem();
	GTop.glibtop_get_mem(realmem);
	return realmem;
})
function Mem() {
	return <box>
		<icon
			className="MemoryIcon"
			valign={Gtk.Align.START}
			icon="weather-clear"
		/>
		<slider
			className="MemorySlider"
			halign={Gtk.Align.CENTER}
			value={bind(mem).as(m => m.used / m.total)}
		/>
	</box>;
}
