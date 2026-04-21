# Sanmei Web - Phase 1 実装ガイド

## 📋 プロジェクト概要

**目標**: 既存の Windows 版 Sanmei ソフト (Sanmei.exe) を Web 化して、Mac・スマートフォンから利用可能にする

**現在の進捗**: Phase 1 - コア機能 2つの実装（宿命表 + 相性表）

**技術スタック**:
- Backend: Python 3.9+, Flask, CORS
- Frontend: React 18+, JavaScript
- Deployment: Vercel (Frontend), Heroku/Replit (Backend)
- Data: 既存の Sanmei CSV ファイル 5個

---

## 🏗️ プロジェクト構造

```
~/Projects/sanmei-web/
├── backend/
│   ├── app.py                 # Flask メインアプリ
│   ├── calculations.py        # 計算エンジン（実装中）
│   ├── requirements.txt       # Python 依存パッケージ
│   └── routes/               # API エンドポイント（将来）
├── frontend/
│   ├── src/
│   │   ├── App.js           # メインコンポーネント
│   │   ├── api.js           # Backend API クライアント
│   │   └── components/
│   │       ├── DestinyCalculator.js    # 宿命表計算
│   │       ├── CompatibilityCalculator.js # 相性表計算
│   │       └── Calculator.css
│   ├── public/
│   │   └── index.html       # HTML テンプレート
│   ├── package.json
│   └── .env.example
├── data/
│   └── csv/                 # Sanmei ソフトから copied CSV ファイル
│       ├── kaku.csv
│       ├── kyoku.csv
│       ├── setsuiribi.csv
│       ├── utsuwa.csv
│       └── 60kakoushie.csv
├── README.md
├── IMPLEMENTATION_GUIDE.md  # このファイル
└── .gitignore
```

---

## 🚀 クイックスタート

### 1. Backend 起動（ターミナル1）

```bash
cd ~/Projects/sanmei-web/backend

# 仮想環境作成
python3 -m venv venv
source venv/bin/activate

# 依存パッケージインストール
pip install -r requirements.txt

# サーバー起動
python app.py
```

**期待される出力**:
```
🚀 Sanmei Web Backend Starting...
📊 API Documentation:
  POST /api/v1/destiny - Calculate destiny table
  POST /api/v1/compatibility - Calculate compatibility
  GET  /health - Health check
  GET  /api/v1/debug - Debug info
 * Running on http://localhost:5000
```

### 2. Frontend 起動（ターミナル2）

```bash
cd ~/Projects/sanmei-web/frontend

# 依存パッケージインストール
npm install

# 開発サーバー起動
npm start
```

**期待される出力**:
```
Compiled successfully!

You can now view sanmei-web-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### 3. ブラウザで確認

- **Desktop**: http://localhost:3000
- **Mobile**: http://192.168.x.x:3000 (同じ WiFi ネットワーク)

---

## 🔧 次のステップ（実装中）

### ステップ1: CSV データ読み込み機能（優先度 🔴高）

**ファイル**: `backend/calculations.py`

**現在の状態**: CSV 読み込みのスケルトン存在

**実装内容**:
```python
# 例: 60kakoushie.csv の読み込みと利用
def _get_stem_branch(year, month, day):
    """
    生年月日から干支を計算
    1. CSV から該当行を検索
    2. 干 (stem) と 支 (branch) を抽出
    3. 結果を返す
    """
    # 1. 年干支を計算
    # 2. 月干支を計算
    # 3. 日干支を計算
    # 4. 時干支を計算
```

**参考**: Sanmei.exe で生年月日を入力した時の動作を参考にする

---

### ステップ2: 十大主星計算（優先度 🔴高）

**ファイル**: `backend/calculations.py` → `_calculate_major_stars()`

**実装内容**: 
- 10 個の主星の位置を 4 つの柱（年月日時）に配置
- 各主星の属性を返す

**十大主星一覧**:
1. 比肩 (Bi Jian)
2. 劫財 (Jie Cai)
3. 食神 (Shi Shen)
4. 傷官 (Shang Guan)
5. 偏財 (Pian Cai)
6. 正財 (Zheng Cai)
7. 偏官 (Pian Guan)
8. 正官 (Zheng Guan)
9. 偏印 (Pian Yin)
10. 正印 (Zheng Yin)

---

### ステップ3: 宇宙盤計算（優先度 🟡中）

**ファイル**: `backend/calculations.py` → `_calculate_cosmic_plate()`

**実装内容**:
- 12 個の宮（パレス）に配置
- 各宮に出現する主星を記録

**12 宮**:
- 子 (Child) - 0°
- 丑 (Ox)
- 寅 (Tiger)
- 卯 (Rabbit)
- 辰 (Dragon)
- 巳 (Snake)
- 午 (Horse)
- 未 (Goat)
- 申 (Monkey)
- 酉 (Rooster)
- 戌 (Dog)
- 亥 (Pig)

---

### ステップ4: 大運・年運計算（優先度 🟡中）

**ファイル**: `backend/calculations.py` → `_calculate_major_cycles()`

**実装内容**:
- 大運: 10 年周期での運気変化
- 年運: 毎年の運気予測

---

### ステップ5: React UI 完成（優先度 🟡中）

**実施内容**:
- Backend API の応答に応じて、結果テーブルを動的に表示
- グラフ・図解の追加（後のフェーズ）

---

## 📚 参考リソース

### Sanmei ソフト分析
- 位置: `~/Desktop/Sanmei/`
- 実行: Windows App で起動して UI を確認
- CSV ファイル: `~/Desktop/Sanmei/dat/`

### API エンドポイント

```bash
# 宿命表計算
curl -X POST http://localhost:5000/api/v1/destiny \
  -H "Content-Type: application/json" \
  -d '{"birth_date": "2000-01-01"}'

# 相性表計算
curl -X POST http://localhost:5000/api/v1/compatibility \
  -H "Content-Type: application/json" \
  -d '{"person1_birth_date": "2000-01-01", "person2_birth_date": "2000-01-02"}'

# ヘルスチェック
curl http://localhost:5000/health

# デバッグ情報
curl http://localhost:5000/api/v1/debug
```

---

## 🧪 テスト方法

### Backend テスト

```bash
cd backend
python -m pytest tests/ -v
```

（現在 pytest なし - 必要に応じて追加）

### Frontend テスト

```bash
cd frontend
npm test
```

---

## 🎯 マイルストーン

| Phase | 内容 | 期限 | 状態 |
|-------|------|------|------|
| 1.1 | CSV 読み込み + 干支計算 | 2026-04-22 | 🔨 実装中 |
| 1.2 | 十大主星 + 宇宙盤計算 | 2026-04-23 | ⏳ pending |
| 1.3 | 大運・年運計算 | 2026-04-24 | ⏳ pending |
| 1.4 | React UI 完成 + テスト | 2026-04-25 | ⏳ pending |
| 1.5 | Local テスト + 修正 | 2026-04-26 | ⏳ pending |
| 2.0 | **Vercel デプロイ** | 2026-04-27 | ⏳ pending |

---

## 🔐 環境変数

### Frontend (`.env`)

```
REACT_APP_API_URL=http://localhost:5000
```

デプロイ時:
```
REACT_APP_API_URL=https://sanmei-api.herokuapp.com
```

---

## 📞 トラブルシューティング

### Backend が起動しない
```bash
# venv が正しく有効化されているか確認
which python  # /Users/yukio/Projects/sanmei-web/backend/venv/bin/python であるべき

# 依存パッケージを再インストール
pip install --upgrade pip
pip install -r requirements.txt
```

### Frontend が Backend に接続できない
```bash
# Backend が http://localhost:5000 で起動しているか確認
curl http://localhost:5000/health

# CORS エラーの場合、Flask 側で CORS が有効か確認
# backend/app.py に以下があるか確認:
# from flask_cors import CORS
# CORS(app)
```

### React ホットリロードが動作しない
```bash
# ポート 3000 が既に使用中の可能性
lsof -i :3000
# 必要に応じて kill
```

---

## 🎓 算命学の基礎知識（開発者向け）

- **干支（かんし）**: 十干 (10) × 十二支 (12) = 60 の組み合わせ
- **十干**: 甲・乙・丙・丁・戊・己・庚・辛・壬・癸
- **十二支**: 子・丑・寅・卯・辰・巳・午・未・申・酉・戌・亥
- **四柱**: 年柱（年の干支）・月柱（月の干支）・日柱（日の干支）・時柱（時間の干支）
- **陰占**: 内面的な宿命
- **陽占**: 外面的な宿命・社会運

---

## ✅ チェックリスト

- [ ] Backend 起動確認
- [ ] Frontend 起動確認
- [ ] API 疎通確認 (`curl` で API テスト)
- [ ] CSV ファイルが正しく読み込まれているか確認 (`GET /api/v1/debug`)
- [ ] 干支計算ロジック実装完了
- [ ] React UI でデータ表示確認
- [ ] Local で 2-3 件の生年月日をテスト
- [ ] Vercel デプロイ

---

**最終目標**: 2026-04-27 までに Mac・スマートフォンの両方で動作確認完了
