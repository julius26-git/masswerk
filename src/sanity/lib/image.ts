import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";

const bauer = createImageUrlBuilder({ projectId, dataset });

export function urlFor(quelle: SanityImageSource) {
  return bauer.image(quelle).auto("format").fit("max");
}
