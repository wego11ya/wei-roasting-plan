# Kaleido M1 空機測試資料與文件整併設計

## 目標

整理 2026-07-08 的第二次 SV、Burner、Air 空機測試資料，將兩次測試合併為一份可供後續烘焙計畫與覆盤引用的設備文件，同時在 `AGENTS.md` 固定機器基準文件、實測文件與原始資料的使用規則。

## 已確認事實

- 2026-07-08 測試全程沒有實際入豆。
- 測試中按下 CHARGE，只是為了讓 Artisan 進入可記錄流程。
- `.alog` 內的豆名、生豆重量 `101g`、CHARGE、DROP 與 roast phase 衍生值不能當成實際烘焙紀錄。
- 第一次與第二次測試的 `.alog`、`.csv`、`.png` 都要保留。
- `docs/equipment/` 只保留一份 SV、Burner、Air 測試主文件。

## 目錄與命名

設備空機測試統一放在：

```text
docs/equipment/tests/<YYYY-MM-DD>-<test-topic>/
```

這次整理後的結構：

```text
docs/equipment/
  kaleido-m1-machine-and-heat-system.md
  kaleido-m1-sv-burner-air-relationship.md
  tests/
    2026-07-05-sv-burner-air-empty-drum/
      2026-07-05-sv-burner-air-empty-drum.alog
      2026-07-05-sv-burner-air-empty-drum.csv
      2026-07-05-sv-burner-air-empty-drum.png
    2026-07-08-sv-burner-air-empty-drum/
      2026-07-08-sv-burner-air-empty-drum.alog
      2026-07-08-sv-burner-air-empty-drum.csv
      2026-07-08-sv-burner-air-empty-drum.png
```

`test2/` 內三份檔案移到 2026-07-08 測試資料夾並依日期與主題改名。搬移前後內容必須保持相同。

## 唯一測試主文件

保留：

```text
docs/equipment/kaleido-m1-sv-burner-air-relationship.md
```

移除獨立報告：

```text
docs/equipment/kaleido-m1-sv-burner-air-test-2026-07-08.md
```

主文件以第二次測試作為主要證據，第一次測試保留為早期基準。內容順序：

1. 文件用途、適用機型與證據限制。
2. 兩次測試資料索引。
3. 空機與 CHARGE 記錄方式說明。
4. 第二次測試的主要結果與量化資料。
5. 第一次測試補充的低 SV 行為。
6. 已驗證、部分驗證與待確認事項。
7. 對正式烘焙計畫與覆盤可採用的工作模型。
8. 下一輪可重複測試設計與安全提醒。

第二次測試證據要保留：

- SV `150°C` 時，Burner `5%`、`10%`、`20%` 的 ET / BT 升溫斜率依序增加。
- SV `160°C`、Burner `100%` 加熱接近目標後，實際輸出下降並調節，BT 長時間停在約 `159°C`。
- BT 最高 `160.8°C`，顯示小幅超調。
- Air `30% -> 80%` 在 SV 附近沒有造成大幅持續降溫。
- Air 對遠低於 SV 的持續升溫影響仍未驗證。

## AGENTS.md 規則

`AGENTS.md` 新增或強化以下規則：

1. 任何 Kaleido M1 烘焙計畫、曲線覆盤、熱量判讀或操作建議，都必須先讀：
   - `docs/equipment/kaleido-m1-machine-and-heat-system.md`
   - `docs/equipment/kaleido-m1-sv-burner-air-relationship.md`
2. 兩份文件有待確認、資料衝突或缺少會影響判讀的實機資訊時，先向使用者確認。
3. 不得用其他 M1 世代、Lite、Dual、舊手冊或 Artisan 預設值取代本機事實。
4. 設備空機測試使用日期式資料夾與同名原始檔，至少保留 `.alog`、`.csv`、`.png`。
5. 2026-07-08 是空機控制測試；CHARGE 只供 Artisan 記錄，殘留豆名、重量與階段資料不得當成實際入豆證據。

## 其他文件同步

- `kaleido-m1-machine-and-heat-system.md` 的本機已知行為與來源區塊補入第二次測試資料，並更新原始檔連結。
- 原規劃曾同步介面入門文件；該文件後續依使用者決策淘汰，不再列為設備文件依賴。
- 豆子索引原本已引用唯一主文件，路徑維持不變。

## 驗證

1. 計算第二次測試三份原始檔搬移前後的 SHA-256，結果必須相同。
2. 確認 `test2/` 不再存在，三份資料都位於新的日期式資料夾。
3. 確認 `docs/equipment/` 只剩一份 SV、Burner、Air 測試 Markdown 主文件。
4. 搜尋並移除舊 `test2`、舊檔名與獨立報告路徑引用。
5. 檢查主文件、機器基準文件、Artisan 介面文件與 `AGENTS.md` 的相對連結。
6. 檢查合併文件仍保留空機限制、量化結果、推論邊界與安全提醒。

## 不在本次範圍

- 不修改任何豆子烘焙計畫或覆盤。
- 不重新解讀其他正式烘焙曲線。
- 不變更已確認的本機電壓、額定功率或加熱管資料。
- 不刪除兩次測試的原始資料。
