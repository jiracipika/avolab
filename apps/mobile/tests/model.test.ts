import test from "node:test";
import assert from "node:assert/strict";
import {
  EMPTY,
  restore,
  toggleSaved,
  recordOpen,
  filterProducts,
  recordScore,
} from "../src/model.ts";
import fs from "node:fs";
import { URL } from "node:url";
const products = JSON.parse(
  fs.readFileSync(new URL("../src/catalog.json", import.meta.url), "utf8"),
);
const ids = products.map((p: { slug: string }) => p.slug);
test("catalog has unique identities and HTTPS destinations", () => {
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.length > 0);
  for (const p of products) assert.equal(new URL(p.url).protocol, "https:");
});
test("search is case-insensitive, trimmed, and searches descriptions", () => {
  assert.equal(
    filterProducts(products, "  DASHVERSE ", "All")[0].slug,
    "dashverse",
  );
  assert.ok(
    filterProducts(products, "ambient", "All").some(
      (p) => p.slug === "soundspace",
    ),
  );
});
test("category and query combine; empty results are valid", () => {
  assert.equal(filterProducts(products, "DashVerse", "Tools").length, 0);
  assert.ok(
    filterProducts(products, "", "Games").every((p) => p.group === "Games"),
  );
  assert.equal(filterProducts(products, "zzzzzz", "All").length, 0);
});
test("saved toggles without mutating prior state", () => {
  const next = toggleSaved(EMPTY, "dashverse");
  assert.deepEqual(next.saved, ["dashverse"]);
  assert.deepEqual(EMPTY.saved, []);
  assert.deepEqual(toggleSaved(next, "dashverse").saved, []);
});
test("history deduplicates, orders newest first and caps at six", () => {
  let s = EMPTY;
  for (const id of ids) s = recordOpen(s, id);
  assert.equal(s.recent.length, 6);
  s = recordOpen(s, ids[0]);
  s = recordOpen(s, ids[0]);
  assert.equal(s.recent[0], ids[0]);
  assert.equal(new Set(s.recent).size, 6);
});
test("restore rejects corrupted, stale and duplicate IDs", () => {
  assert.deepEqual(restore("{", ids), EMPTY);
  assert.deepEqual(restore("null", ids), EMPTY);
  const s = restore(
    JSON.stringify({
      saved: [ids[0], ids[0], "gone", null],
      recent: [ids[1]],
      best: -1,
    }),
    ids,
  );
  assert.deepEqual(s.saved, [ids[0]]);
  assert.equal(s.best, null);
});
test("state survives serialization", () => {
  const s = recordScore(recordOpen(toggleSaved(EMPTY, ids[0]), ids[1]), 210);
  assert.deepEqual(restore(JSON.stringify(s), ids), s);
});
test("personal best accepts only positive finite improvements", () => {
  let s = recordScore(EMPTY, 250);
  s = recordScore(s, 300);
  assert.equal(s.best, 250);
  s = recordScore(s, 200);
  assert.equal(s.best, 200);
  assert.equal(recordScore(s, NaN).best, 200);
  assert.equal(recordScore(s, -1).best, 200);
});
