# 生豆資料：317 跳舞山羊 西阿希南西寶 G1 水洗藝伎

這個資料夾集中保存同一支豆子的生豆資料、參考曲線、每一鍋計畫、Artisan 曲線檔與覆盤。之後要比較各鍋的曲線、操作與杯測結果時，先從這裡看。

## 基本資料

| 項目 | 資料 |
| --- | --- |
| 豆名 | 317 跳舞山羊 - 西阿希 南西寶 G1 |
| 產區 | 衣索比亞 Oromia，Sidamo Nensebo |
| 海拔 | `1800-2400m` |
| 處理法 | 水洗處理法 |
| 品種 | 藝伎 |
| 等級 | G1 |
| 採收年份 | 2025-2026 |
| 含水量 | `9.9%` |
| 密度 | `842 g/L` |
| 水活性 | `0.5 aw` |
| 供應商杯測風味 | 檸檬、野薑花、桃子、紅蘋果、棉花糖般甜感 |

## 目前學到的重點

- 這支豆子密度高，但目前用 `100g` 左右小批次烘，熱量不能直接套用 `150g` reference。
- 第一鍋實際 `102.1g -> 86.1g`，失重率 `15.67%`，苦味明顯，代表熱量與發展都過頭。
- 第二鍋實際約 `102.44g -> 89.52g`，失重率約 `12.6%`；FCs 從第一鍋 `4:14` 拉到 `6:24`，發展時間壓到 `1:05`，明顯改善，但 FCs 前進程仍比 reference 快。
- 第三鍋實際 `101.6g -> 86.75g`，失重率約 `14.6%`；SV 長時間停在 `150°C`，RoR 在中段 crash，後段補火才進一爆，判定為失敗鍋。
- 第四鍋實際 `101.0g -> 87.0g`，失重率約 `13.9%`；生豆太早放入入豆艙，起始條件不乾淨，且 SV 仍到中段才拉高，判定為失敗鍋。
- 第五鍋實際 `101.4g -> 88.2g`，失重率約 `13.0%`；DE `4:08`、FCs `7:36`、DROP `8:35`。一爆前 RoR 平順下降，甜感與花果表現比第 2、3、4 鍋進步，目前可作新的操作基準。
- 第五鍋 FCs 到 DROP 只有 `0:59`，BT 僅增加 `1.4°C`，下豆前粗估 RoR 已接近 `0.6°C/min`；後續要驗證一爆後是否因降火太快而限制 body 與回韻。
- 2026-07-05 空機測試顯示，目前 Kaleido M1 + Artisan 設定下，SV 不能忽略；入豆後若 SV 留太低，只調 Burner 不一定能有效推升溫度。
- 第六鍋實際 `100.5g -> 87.7g`，失重率 `12.7%`；DE `3:57`、FCs `8:45`、DROP `9:48`。新增時間主要在一爆前中段，杯測呈現柔和、酸感較低與很長的尾韻，目前可作「柔和長尾韻」風味基準。
- 第七鍋實際 `100.6g -> 87.4g`，失重率 `13.1%`；DE `4:00`、FCs `6:27`、DROP `7:36`。杯中前段酸感、層次與果汁感較強，但第 8、21 天都確認尾韻較短，尚未達到影片 E 想兼得前段香氣與長回韻的目標。
- 第七鍋和第二鍋的 TP、FCs、DROP 很接近，但兩鍋的 Burner、Air、SV 與機體熱狀態不同；TP 又包含探針熱反應，因此不能用相近 TP 判定 soak 沒有作用。
- 第六鍋後沒有降到 `50°C` 以下再預熱並不是操作錯誤；`50°C` 是完整結束後再關閉整機的門檻。連續烘焙應改記錄可重複的批次間熱重置程序與最低 BT / ET。
- 同一支豆後續比較時，要固定批次量、Artisan 重量欄位、事件標記方式與杯測時間。

## 檔案索引

| 類型 | 檔案 |
| --- | --- |
| Reference 曲線圖 | [2026-07-01-reference-kaleido-m1-light-roast-profile.png](references/2026-07-01-reference-kaleido-m1-light-roast-profile.png) |
| 第一鍋計畫 | [roasts/2026-07-01-1st-roast/plan.md](roasts/2026-07-01-1st-roast/plan.md) |
| 第一鍋覆盤 | [roasts/2026-07-01-1st-roast/review.md](roasts/2026-07-01-1st-roast/review.md) |
| 第二鍋計畫 | [roasts/2026-07-02-2nd-roast/plan.md](roasts/2026-07-02-2nd-roast/plan.md) |
| 第二鍋覆盤 | [roasts/2026-07-02-2nd-roast/review.md](roasts/2026-07-02-2nd-roast/review.md) |
| 第三鍋計畫 | [roasts/2026-07-03-3rd-roast/plan.md](roasts/2026-07-03-3rd-roast/plan.md) |
| 第三鍋覆盤 | [roasts/2026-07-03-3rd-roast/review.md](roasts/2026-07-03-3rd-roast/review.md) |
| 第四鍋臨時補記 | [roasts/2026-07-03-4th-roast/plan.md](roasts/2026-07-03-4th-roast/plan.md) |
| 第四鍋覆盤 | [roasts/2026-07-03-4th-roast/review.md](roasts/2026-07-03-4th-roast/review.md) |
| 第五鍋覆盤 | [roasts/2026-07-08-5th-roast/review.md](roasts/2026-07-08-5th-roast/review.md) |
| 影片 A–E 烘焙節奏逆向工程 | [references/youtube-rxiz8bsucqa-roast-a-e-reverse-engineering.md](references/youtube-rxiz8bsucqa-roast-a-e-reverse-engineering.md) |
| 第六鍋 B 版計畫 | [roasts/2026-07-15-6th-roast/plan.md](roasts/2026-07-15-6th-roast/plan.md) |
| 第六鍋覆盤 | [roasts/2026-07-15-6th-roast/review.md](roasts/2026-07-15-6th-roast/review.md) |
| 第七鍋 E 版計畫 | [roasts/2026-07-15-7th-roast/plan.md](roasts/2026-07-15-7th-roast/plan.md) |
| 第七鍋覆盤 | [roasts/2026-07-15-7th-roast/review.md](roasts/2026-07-15-7th-roast/review.md) |
| Kaleido M1 SV / Burner / Air 測試筆記 | [../../docs/equipment/kaleido-m1-sv-burner-air-relationship.md](../../docs/equipment/kaleido-m1-sv-burner-air-relationship.md) |
