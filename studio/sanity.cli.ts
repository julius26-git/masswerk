import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "z88uzayz",
    dataset: "production",
  },
  studioHost: "doermann-digital",
  deployment: {
    appId: "hbj09p0b1608ap6fpfvr09s4",
  },
  autoUpdates: true,
});
