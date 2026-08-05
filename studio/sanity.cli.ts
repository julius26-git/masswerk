import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "z88uzayz",
    dataset: "production",
  },
  studioHost: "masswerk",
  deployment: {
    appId: "c5l5dq7w3x0a28sq5zaagxgu",
  },
  autoUpdates: true,
});
