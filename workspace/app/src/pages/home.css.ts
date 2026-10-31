import { style } from "@vanilla-extract/css";
import { vars } from "@studio-baeks/funky-ui/tokens";

export const home = style({ padding: `${vars.space["5xl"]} ${vars.space["4xl"]} ${vars.space["6xl"]}`, display: "flex", justifyContent: "center" });
export const hero = style({ display: "flex", flexDirection: "column", gap: vars.space["2xl"], marginBottom: vars.space["5xl"] });
export const layerCard = style({ textDecoration: "none", color: "inherit", display: "block" });
