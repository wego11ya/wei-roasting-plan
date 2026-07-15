# Kaleido M1 Empty-Drum Test Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將兩次 Kaleido M1 空機 SV、Burner、Air 測試整理成日期式原始資料目錄、一份唯一測試主文件，以及強制供後續烘焙計畫與覆盤使用的專案規則。

**Architecture:** 原始 `.alog`、`.csv`、`.png` 依測試日期與主題共同存放在 `docs/equipment/tests/`。`kaleido-m1-sv-burner-air-relationship.md` 是唯一的人類可讀測試結論，`kaleido-m1-machine-and-heat-system.md` 是機器結構與熱能基準，`AGENTS.md` 負責強制所有後續規劃與覆盤先讀這兩份文件。

**Tech Stack:** Markdown、Artisan `.alog` / tab-delimited CSV / PNG、PowerShell、Git。

## Global Constraints

- 使用繁體中文與台灣常見烘豆用語，專有名詞第一次出現時附白話解釋。
- 2026-07-08 測試沒有實際入豆；CHARGE 只用來讓 Artisan 進入記錄流程。
- 不得把 `.alog` 殘留豆名、生豆重量 `101g`、CHARGE、DROP 或 roast phase 衍生值當成實際烘焙紀錄。
- 第一次與第二次測試的 `.alog`、`.csv`、`.png` 全部保留，搬移前後 SHA-256 必須相同。
- `docs/equipment/` 只保留 `kaleido-m1-sv-burner-air-relationship.md` 一份 SV、Burner、Air 測試 Markdown 主文件。
- 不修改豆子烘焙計畫、覆盤、本機電壓、額定功率或加熱管資料。
- 保留工作樹內所有與本任務無關的使用者變更。

---

### Task 1: 搬移並重新命名第二次空機測試原始資料

**Files:**
- Move: `test2/#test2_26-07-08_2139.alog` → `docs/equipment/tests/2026-07-08-sv-burner-air-empty-drum/2026-07-08-sv-burner-air-empty-drum.alog`
- Move: `test2/test2.csv` → `docs/equipment/tests/2026-07-08-sv-burner-air-empty-drum/2026-07-08-sv-burner-air-empty-drum.csv`
- Move: `test2/#test2_26-07-08_2139.png` → `docs/equipment/tests/2026-07-08-sv-burner-air-empty-drum/2026-07-08-sv-burner-air-empty-drum.png`

**Interfaces:**
- Consumes: `test2/` 內三份第二次測試原始檔。
- Produces: 可由所有設備文件用穩定相對路徑引用的日期式測試資料夾。

- [ ] **Step 1: 計算搬移前雜湊**

Run:

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath 'test2\#test2_26-07-08_2139.alog','test2\test2.csv','test2\#test2_26-07-08_2139.png'
```

Expected: 三筆 SHA-256，供搬移後逐一比較。

- [ ] **Step 2: 建立目標資料夾並確認位於專案內**

Run:

```powershell
$target = Join-Path (Get-Location) 'docs\equipment\tests\2026-07-08-sv-burner-air-empty-drum'
New-Item -ItemType Directory -Path $target
Resolve-Path $target
```

Expected: 絕對路徑位於 `E:\repo\wei-roasting-plan\docs\equipment\tests\`。

- [ ] **Step 3: 使用 PowerShell 在同一工作區內搬移三份檔案**

Run:

```powershell
Move-Item -LiteralPath 'test2\#test2_26-07-08_2139.alog' -Destination 'docs\equipment\tests\2026-07-08-sv-burner-air-empty-drum\2026-07-08-sv-burner-air-empty-drum.alog'
Move-Item -LiteralPath 'test2\test2.csv' -Destination 'docs\equipment\tests\2026-07-08-sv-burner-air-empty-drum\2026-07-08-sv-burner-air-empty-drum.csv'
Move-Item -LiteralPath 'test2\#test2_26-07-08_2139.png' -Destination 'docs\equipment\tests\2026-07-08-sv-burner-air-empty-drum\2026-07-08-sv-burner-air-empty-drum.png'
```

Expected: `test2/` 變成空資料夾，目標資料夾有三份重新命名的檔案。

- [ ] **Step 4: 驗證搬移後雜湊與檔案數**

Run:

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath 'docs\equipment\tests\2026-07-08-sv-burner-air-empty-drum\2026-07-08-sv-burner-air-empty-drum.alog','docs\equipment\tests\2026-07-08-sv-burner-air-empty-drum\2026-07-08-sv-burner-air-empty-drum.csv','docs\equipment\tests\2026-07-08-sv-burner-air-empty-drum\2026-07-08-sv-burner-air-empty-drum.png'
```

Expected: 三份新檔案的 SHA-256 分別與 Step 1 相同。

### Task 2: 合併成唯一 SV、Burner、Air 測試主文件

**Files:**
- Modify: `docs/equipment/kaleido-m1-sv-burner-air-relationship.md`
- Delete: `docs/equipment/kaleido-m1-sv-burner-air-test-2026-07-08.md`

**Interfaces:**
- Consumes: 兩篇既有測試文件、兩個日期式測試資料夾。
- Produces: 後續機器判讀、烘焙計畫與覆盤唯一引用的測試主文件。

- [ ] **Step 1: 重寫主文件的資料索引與測試前提**

主文件要列出兩次測試各自的 `.alog`、`.csv`、`.png`，並明寫兩次都是空機測試；2026-07-08 的 CHARGE 只供 Artisan 記錄。

- [ ] **Step 2: 以第二次測試作主要證據**

保留固定控制區間的 ET / BT 線性斜率、接近 SV 後的實際 Burner 調節、BT `160.8°C` 超調、`10:00-15:34` 平台統計與 Air `30% -> 80%` 等長時窗比較。

- [ ] **Step 3: 保留第一次測試的補充證據**

保留 `SV = 0°C` 時 Burner `100%` 幾乎不升溫、SV `50°C` 後才開始加熱，以及低溫恆溫附近 Air 影響小的紀錄。

- [ ] **Step 4: 重寫工作模型與限制**

清楚區分已驗證、部分驗證、待確認，並明寫空機結果不能直接外推到有豆烘焙。

- [ ] **Step 5: 移除獨立第二次測試報告**

使用 `apply_patch` 刪除 `docs/equipment/kaleido-m1-sv-burner-air-test-2026-07-08.md`，確保 `docs/equipment/` 只剩唯一測試主文件。

### Task 3: 更新專案規則與設備文件引用

**Files:**
- Modify: `AGENTS.md`
- Modify: `docs/equipment/kaleido-m1-machine-and-heat-system.md`

**Interfaces:**
- Consumes: 唯一測試主文件與新的原始資料路徑。
- Produces: 對所有後續協作者生效的閱讀順序、資料解讀限制與穩定連結。

- [ ] **Step 1: 更新 AGENTS.md 目錄與命名規則**

加入 `docs/equipment/tests/<YYYY-MM-DD>-<test-topic>/`，並要求測試原始檔與資料夾使用相同日期式主檔名。

- [ ] **Step 2: 強化規劃與覆盤前置閱讀規則**

明寫任何 Kaleido M1 烘焙計畫、曲線覆盤、熱量判讀或操作建議，都必須先讀機器基準文件與唯一實測文件；遇到待確認或衝突資訊先向使用者確認。

- [ ] **Step 3: 記錄 2026-07-08 空機與 CHARGE 限制**

明寫沒有入豆、CHARGE 只供記錄，以及殘留豆名、重量與 roast phase 資料不能當成實際烘焙證據。

- [ ] **Step 4: 同步機器基準文件**

更新「本機目前最重要的已知行為」與來源，加入第二次測試的 SV 主動調節、Burner 遠離 SV 時有效、Air 尚未完成升溫期驗證，以及三份新原始檔連結。

- [ ] **Step 5: 同步介面入門文件（後續取消）**

原規劃曾包含介面入門文件；該文件後續依使用者決策淘汰，不再列為設備文件依賴。

### Task 4: 完整驗證與交付

**Files:**
- Verify: `AGENTS.md`
- Verify: `docs/equipment/kaleido-m1-sv-burner-air-relationship.md`
- Verify: `docs/equipment/kaleido-m1-machine-and-heat-system.md`
- Verify: `docs/equipment/tests/2026-07-08-sv-burner-air-empty-drum/*`

**Interfaces:**
- Consumes: Tasks 1–3 的完整變更。
- Produces: 可追溯、無舊引用、原始資料未改變的最終文件結構。

- [ ] **Step 1: 搜尋舊路徑與獨立報告引用**

Run:

```powershell
rg -n --hidden --glob '!*.alog' --glob '!*.csv' --glob '!*.png' 'test2|#test2_26-07-08_2139|kaleido-m1-sv-burner-air-test-2026-07-08' .
```

Expected: 只允許設計與實作計畫中的歷史描述；正式專案文件沒有舊引用。

- [ ] **Step 2: 驗證唯一測試主文件**

Run:

```powershell
rg --files docs\equipment | Where-Object { $_ -match 'kaleido-m1-sv-burner-air.*\.md$' }
```

Expected: 只有 `docs\equipment\kaleido-m1-sv-burner-air-relationship.md`。

- [ ] **Step 3: 驗證必要文字與相對連結**

檢查 `AGENTS.md` 包含兩份強制前置文件與 2026-07-08 空機限制；檢查三份設備文件中的相對連結目標都存在。

- [ ] **Step 4: 驗證 Git 差異與空白**

Run:

```powershell
git diff --check
git status --short
```

Expected: `git diff --check` 沒有錯誤；狀態只顯示使用者既有變更與本計畫內變更，沒有意外檔案。
