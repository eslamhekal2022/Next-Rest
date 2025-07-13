export const dynamic = "force-dynamic"; // 🧠 ده بيمنع البيلد من محاولة prerender

import { Suspense } from "react";
import SearchComponent from "@/src/(components)/SearchComponent";

export default function SearchPage() {
  return (
    <main className="min-h-screen p-4">
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchComponent />
      </Suspense>
    </main>
  );
}
