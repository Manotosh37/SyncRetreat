import { Metadata } from "next";
import ProductivityAudit from "../../../components/ProductivityAudit";

export const metadata: Metadata = {
  title: "Remote Team Productivity Audit — Free Diagnostic Tool | SyncRetreat",
  description:
    "Score your remote team across 5 dimensions: deep work, communication norms, team culture, alignment, and retreat investment. Free, research-backed audit for engineering teams.",
};

export default function ProductivityAuditPage() {
  return <ProductivityAudit />;
}
