{
  pkgs,
  ags,
}:
# Bundle the project
ags.lib.bundle {
  inherit pkgs;
  src = ./.;
  name = "vistath-astal";
  entry = "app.ts";
  gtk4 = false;

  extraPackages = with ags.packages.${pkgs.system}; [
    astal3
    io
    apps
    hyprland
    tray
    mpris
    wireplumber
    battery
    pkgs.libgtop
  ];
}
