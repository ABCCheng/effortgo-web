import { defaultLocale } from "@/lib/i18n";
import { getLocalizedPageMetadata } from "@/lib/seo";

import { EffortGoHome } from "@/app/pages/EffortGoHome";

export const metadata = getLocalizedPageMetadata(defaultLocale, "/");

export default function HomePage() {
  return <EffortGoHome />;
}
