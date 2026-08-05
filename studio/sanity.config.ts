import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemaTypes";
import { structure, einzelstuecke } from "./structure";

const projectId = "z88uzayz";
const dataset = "production";

const vorschauUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

export default defineConfig({
  name: "doermannDigital",
  title: "Dörmann Digital",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: vorschauUrl,
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
    visionTool({ defaultApiVersion: "2026-02-01" }),
  ],
  schema: {
    types: schemaTypes,
    // Einzelstücke dürfen nicht über "Neu" dupliziert werden.
    templates: (prev) =>
      prev.filter(
        (template) =>
          !einzelstuecke.includes(template.schemaType as (typeof einzelstuecke)[number]),
      ),
  },
  document: {
    actions: (prev, { schemaType }) =>
      einzelstuecke.includes(schemaType as (typeof einzelstuecke)[number])
        ? prev.filter(
            (action) =>
              action.action &&
              !["unpublish", "delete", "duplicate"].includes(action.action),
          )
        : prev,
  },
});
