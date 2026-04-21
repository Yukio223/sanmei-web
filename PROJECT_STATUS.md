# Sanmei Web - プロジェクトステータス

**更新日**: 2026-04-21 11:55 JST

## 🎯 プロジェクト目標

既存の Windows 版 Sanmei ソフト (算命学計算)を Web 化して、以下デバイスから利用可能にする:
- ✅ Mac
- ✅ iPhone・Android スマートフォン
- ✅ タブレット

## ✅ 完了した作業

### ✅ 1. プロジェクト初期化
- ✅ ディレクトリ構造作成
- ✅ Git .gitignore 設定
- ✅ README.md 作成

### ✅ 2. Backend スケルトン
- ✅ Flask アプリケーション（app.py）
- ✅ 計算エンジン基本構造（calculations.py）
- ✅ API エンドポイント定義（3 個）
  - `POST /api/v1/destiny` - 宿命表計算
  - `POST /api/v1/compatibility` - 相性表計算
  - `GET /health` - ヘルスチェック
- ✅ CORS 設定
- ✅ 依存パッケージリスト（requirements.txt）

### ✅ 3. Frontend スケルトン
- ✅ React アプリケーション構造
- ✅ メインコンポーネント（App.js）
- ✅ API クライアント（api.js）
- ✅ 2 つの計算コンポーネント
  - `DestinyCalculator.js` - 宿命表入力
  - `CompatibilityCalculator.js` - 相性表入力
- ✅ CSS スタイリング（App.css, Calculator.css）
- ✅ HTML テンプレート（index.html）
- ✅ package.json（React 18 依存）

### ✅ 4. データセットアップ
- ✅ CSV ファイル 5 個をコピー
  - `60kakoushie.csv` (15KB) - 60 干支マスタ
  - `kaku.csv` (20KB) - 画数マスタ
  - `kyoku.csv` (6.7KB) - 局数マスタ
  - `setsuiribi.csv` (6KB) - 節入日マスタ
  - `utsuwa.csv` (11KB) - 器・カテゴリマスタ

### ✅ 5. ドキュメント
- ✅ IMPLEMENTATION_GUIDE.md (詳細な実装手順)
- ✅ PROJECT_STATUS.md（このファイル）

## 🔨 現在進行中の作業

### 🔨 計算エンジン実装

**ファイル**: `backend/calculations.py`

**実装予定**:
1. CSV データローダー（Pandas）
2. 干支計算ロジック
   - 年干支、月干支、日干支、時干支
3. 十大主星配置計算
4. 宇宙盤（12 宮）計算
5. 大運・年運計算

**現在の状態**: スケルトンのみ (メソッド定義済み)

---

## ⏳ 次の作業（優先順）

### 📌 優先度 1: CSV データ読み込み
- [ ] `_load_csv_data()` を Pandas で実装
- [ ] CSV データを in-memory に保存
- [ ] デバッグエンドポイントで確認

### 📌 優先度 2: 干支計算
- [ ] `_get_stem_branch()` 実装
- [ ] 60 干支マスタの検索ロジック
- [ ] 4 つの柱すべてに対応

### 📌 優先度 3: 十大主星と宇宙盤
- [ ] `_calculate_major_stars()` 実装
- [ ] `_calculate_cosmic_plate()` 実装

### 📌 優先度 4: UI 完成
- [ ] React 側で API 結果を表示
- [ ] エラーハンドリング完成
- [ ] Loading 状態の表示

### 📌 優先度 5: テスト & デプロイ
- [ ] Local で動作確認
- [ ] GitHub にプッシュ
- [ ] Vercel にデプロイ

---

## 📊 技術仕様

### Backend API

#### 1. 宿命表計算
```
POST /api/v1/destiny
Content-Type: application/json

Request:
{
  "birth_date": "2000-01-01"
}

Response:
{
  "birth_date": "2000-01-01",
  "stem_branch": {
    "year_stem": "庚",
    "year_branch": "子",
    "month_stem": "...",
    ...
  },
  "yin_constellation": {...},
  "yang_constellation": {...},
  "major_stars": {...},
  "cosmic_plate": {...},
  "major_cycles": {...},
  "annual_cycles": {...}
}
```

#### 2. 相性表計算
```
POST /api/v1/compatibility
Content-Type: application/json

Request:
{
  "person1_birth_date": "2000-01-01",
  "person2_birth_date": "2000-01-02"
}

Response:
{
  "person1": {...},
  "person2": {...},
  "compatibility": {
    "score": 75,
    "analysis": "相性説明文",
    "details": {...}
  }
}
```

### Frontend コンポーネント

| コンポーネント | 役割 | 状態 |
|-------------|------|------|
| `App.js` | メイン・タブ切り替え | ✅ 完成 |
| `DestinyCalculator.js` | 宿命表入力・表示 | ⏳ 結果表示部実装中 |
| `CompatibilityCalculator.js` | 相性表入力・表示 | ⏳ 結果表示部実装中 |
| `api.js` | Backend 通信 | ✅ 完成 |

---

## 🗂️ ファイル構成

```
~/Projects/sanmei-web/
├── .gitignore                     # Git 設定
├── README.md                      # プロジェクト概要
├── IMPLEMENTATION_GUIDE.md        # 詳細な実装手順
├── PROJECT_STATUS.md              # このファイル
│
├── backend/
│   ├── app.py                     # Flask メインアプリ ✅
│   ├── calculations.py            # 計算エンジン 🔨 実装中
│   ├── requirements.txt           # Python 依存 ✅
│   └── venv/                      # Python 仮想環境（未作成）
│
├── frontend/
│   ├── public/
│   │   └── index.html             # HTML テンプレート ✅
│   ├── src/
│   │   ├── App.js                 # メインコンポーネント ✅
│   │   ├── App.css                # メインスタイル ✅
│   │   ├── api.js                 # API クライアント ✅
│   │   ├── index.js               # エントリーポイント ✅
│   │   └── components/
│   │       ├── DestinyCalculator.js      # 宿命表 ⏳
│   │       ├── CompatibilityCalculator.js # 相性表 ⏳
│   │       └── Calculator.css            # 計算機スタイル ✅
│   ├── package.json               # npm 依存 ✅
│   ├── .env.example               # 環境変数テンプレート ✅
│   └── node_modules/              # npm パッケージ（未作成）
│
└── data/
    └── csv/
        ├── 60kakoushie.csv        # 60 干支 ✅
        ├── kaku.csv               # 画数 ✅
        ├── kyoku.csv              # 局数 ✅
        ├── setsuiribi.csv         # 節入日 ✅
        └── utsuwa.csv             # 器 ✅
```

---

## 🚀 実行手順

### ステップ 1: Backend 準備
```bash
cd ~/Projects/sanmei-web/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### ステップ 2: Backend 起動
```bash
python app.py
```
**期待**: http://localhost:5000/health が応答

### ステップ 3: Frontend 準備
```bash
cd ~/Projects/sanmei-web/frontend
npm install
```

### ステップ 4: Frontend 起動
```bash
npm start
```
**期待**: http://localhost:3000 がブラウザで開く

---

## 📈 進捗指標

| マイルストーン | 完了度 | 予定日 |
|-------------|--------|--------|
| プロジェクト初期化 | 100% | ✅ 2026-04-21 |
| Backend スケルトン | 100% | ✅ 2026-04-21 |
| Frontend スケルトン | 100% | ✅ 2026-04-21 |
| CSV 読み込み実装 | 0% | 📌 2026-04-22 |
| 干支計算実装 | 0% | 📌 2026-04-22 |
| 十大主星実装 | 0% | 📌 2026-04-23 |
| UI 完成 | 50% | 📌 2026-04-24 |
| Local テスト完了 | 0% | 📌 2026-04-25 |
| Vercel デプロイ | 0% | 📌 2026-04-26 |

---

## 🎯 今週のゴール

**2026-04-27 までに以下を達成**:
1. ✅ ローカルでフロントエンド・バックエンド連携
2. ✅ 宿命表と相性表が動作
3. ✅ Mac・スマートフォンで動作確認
4. ✅ GitHub に初回プッシュ
5. ✅ Vercel にデプロイ（オプション）

---

## 📞 メモ

- **環境**: Mac OS（Dropbox フォルダ同期）
- **言語**: Python 3.9+, JavaScript (React 18)
- **デバッグ**: ブラウザコンソール + Terminal でログ確認
- **参考ソフト**: `/Users/yukio/Desktop/Sanmei/Sanmei.exe`

---

**最後の更新**: 2026-04-21 11:55 JST
**次の更新**: CSV データ読み込み実装時
