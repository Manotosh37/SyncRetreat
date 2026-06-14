import { Metadata } from "next";
import ProductivityAudit from "../../../components/ProductivityAudit";

export const metadata: Metadata = {
  title: "Remote Team Productivity Audit — Free Diagnostic Tool | SyncRetreat",
  description:
    "Score your remote team across 5 dimensions: deep work, communication norms, team culture, alignment, and retreat investment. Free, research-backed audit for engineering teams.",
  alternates: { canonical: "https://syncretreat.com/tools/productivity-audit" },
  openGraph: {
    title: "Remote Team Productivity Audit — Free Diagnostic for Engineering Teams",
    description:
      "Score your remote team across deep work, communication, culture, alignment, and retreat ROI. Free research-backed audit. Takes 3 minutes.",
    url: "https://syncretreat.com/tools/productivity-audit",
  },
};

export default function ProductivityAuditPage() {
  return <ProductivityAudit />;
}
