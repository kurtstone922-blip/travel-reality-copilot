#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error("Usage: render-roadbook.mjs <trip-state.json> <output.html>");
  process.exit(1);
}

const state = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const esc = (value) => String(value ?? "").replace(/[&<>\"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeUrl = (value) => /^(https?:\/\/)/i.test(value || "") ? value : null;
const link = (url, label) => safeUrl(url) ? `<a href="${esc(url)}" target="_blank" rel="noreferrer">${esc(label)}</a>` : "";
const days = state.itinerary?.days || [];
const ledger = state.completion_ledger?.items || [];
const open = ledger.filter((x) => !["completed", "explicitly_skipped"].includes(x.status));
const provisional = open.some((x) => x.blocking_final);

const nav = days.map((d) => `<a href="#${esc(d.id)}">Day ${esc(d.day_number)} · ${esc(d.base_city)}</a>`).join("");
const sections = days.map((d) => {
  const rows = (d.items || []).map((item) => `<tr><td>${esc(item.time_block?.start || "弹性")}</td><td><strong>${esc(item.title)}</strong></td><td>${esc(item.duration_range_minutes?.min || "")} ${item.duration_range_minutes?.max ? `–${esc(item.duration_range_minutes.max)} min` : ""}</td><td>${esc(item.status)}</td><td>${esc(item.verification_status)}</td></tr>`).join("");
  const legs = (d.route_legs || []).map((leg) => `<li>${esc(leg.origin_name || leg.origin_item_id)} → ${esc(leg.destination_name || leg.destination_item_id)} · ${esc(leg.travel_mode)} · ${esc(leg.duration_minutes || leg.duration_range || "待确认")} ${link(leg.map_links?.google || leg.google_maps_url || leg.map_links?.amap || leg.amap_url, "地图")}</li>`).join("");
  return `<section id="${esc(d.id)}"><h2>Day ${esc(d.day_number)} · ${esc(d.date)} · ${esc(d.base_city)}</h2><p>${esc(d.theme || "")}</p><table><thead><tr><th>时间</th><th>行程</th><th>停留</th><th>状态</th><th>验证</th></tr></thead><tbody>${rows || '<tr><td colspan="5">暂无行程项目</td></tr>'}</tbody></table>${legs ? `<details open><summary>交通路线</summary><ul>${legs}</ul></details>` : ""}</section>`;
}).join("");

const lodging = (state.lodging?.stays || []).map((s) => `<li>${esc(s.city)} · ${esc(s.hotel_name || "住宿区域待定")} · ${esc(s.check_in)} → ${esc(s.check_out)} · ${esc(s.reservation_status)}</li>`).join("");
const dining = [...(state.dining?.booked_anchors || []), ...(state.dining?.restaurants || [])].map((r) => `<li>${esc(r.name || r.restaurant_name)} · ${esc(r.date || "")} ${esc(r.reservation_time || "")} ${link(r.official_url || r.map_url, "详情")}</li>`).join("");
const reminders = [...open.map((x) => x.summary), ...(state.verification_queue || []).map((x) => x.claim)].filter(Boolean).map((x) => `<li>${esc(x)}</li>`).join("");

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(state.trip?.title || "Travel Roadbook")}</title><style>:root{color-scheme:light;--ink:#18202a;--muted:#657180;--line:#dbe1e8;--accent:#1769e0;--warn:#fff3cd}*{box-sizing:border-box}body{margin:0;font:15px/1.55 system-ui,-apple-system,"PingFang SC",sans-serif;color:var(--ink);background:#f5f7fa}main{max-width:1060px;margin:auto;padding:28px}header,section,.card{background:white;border:1px solid var(--line);border-radius:14px;padding:22px;margin:0 0 18px}h1{margin:.1em 0}h2{margin-top:0}.muted{color:var(--muted)}.badge{display:inline-block;padding:4px 9px;border-radius:999px;background:${provisional ? "var(--warn)" : "#ddf6e8"}}nav{display:flex;gap:8px;overflow:auto;padding:10px 0 18px;position:sticky;top:0;background:#f5f7fa}nav a{white-space:nowrap;padding:7px 11px;background:white;border:1px solid var(--line);border-radius:999px;color:var(--accent);text-decoration:none}table{width:100%;border-collapse:collapse}th,td{padding:9px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}a{color:var(--accent)}@media(max-width:700px){main{padding:12px}header,section,.card{padding:15px}table{font-size:13px}}@media print{body{background:white;font-size:10pt}main{max-width:none;padding:0}nav{display:none}header,section,.card{border:0;border-radius:0;padding:0;margin:0 0 12mm;break-inside:avoid}section{break-before:page}a{color:inherit;text-decoration:none}details{display:block}table{font-size:9pt}}</style></head><body><main><header><span class="badge">${provisional ? "临时路书 · 尚有必需项未完成" : "最终路书"}</span><h1>${esc(state.trip?.title || "Travel Roadbook")}</h1><p class="muted">${esc(state.trip?.destination)} · ${esc(state.trip?.start_date)} → ${esc(state.trip?.end_date)} · ${esc(state.trip?.duration_days)} days</p></header><nav>${nav}</nav><div class="card"><h2>住宿</h2><ul>${lodging || "<li>暂无已确认住宿</li>"}</ul><h2>餐饮与预约</h2><ul>${dining || "<li>未指定具体餐厅；请查看每日用餐窗口或完成度提醒</li>"}</ul></div>${sections}<div class="card"><h2>待办与验证</h2><ul>${reminders || "<li>没有未完成项目</li>"}</ul></div></main></body></html>`;

fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
fs.writeFileSync(outputPath, html);
console.log(path.resolve(outputPath));
