# MikeFit

Duolingoのようなゲーミフィケーション要素を取り入れた健康・ダイエット支援アプリです。Firebase と TailwindCSS を用いた PWA として設計します。

## 1. UI構成

### トップページ
- ログインまたは継続ボタンを配置
- 今日のタスクや獲得XPのサマリーを表示
- ぽちゃ猫キャラクター「ミケ」がランダムなセリフで応援

### コース一覧ページ
- お腹・脚・二の腕・全身などのコースをカード形式で表示
- 進捗バーとアンロック状況（有料会員向けコースを含む）

### タスク詳細ページ
- コース内のその日のタスク内容をシンプルなカードまたはリストで表示
- "完了"ボタンで進捗を保存し、ミケのセリフ＋アニメーションを再生

### プロフィールページ
- 累計XP、連続達成日数、獲得バッジなどをまとめて表示
- Super MikeFit（有料会員）のステータスや課金管理リンクを設置

## 2. TailwindCSSベースの構造案

- `src/components/` に再利用可能な UI コンポーネントを配置
- Figma のレイヤー名をそのまま意識したクラス命名（例: `btn-primary`, `card-course`）
- `tailwind.config.js` でパステル調のカラーパレットを定義
- レスポンシブ対応のため `sm:` `md:` `lg:` を積極的に利用
- 例: タスクカード
  ```html
  <div class="card-task p-4 bg-white rounded-lg shadow mb-4">
    <h3 class="font-bold text-lg">Day 1: スクワット 20 回</h3>
    <button class="btn-primary mt-2">完了</button>
  </div>
  ```

## 3. ミケのアニメーション定義例

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-3px); }
  40%, 80% { transform: translateX(3px); }
}

@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.mike-float { animation: float 3s ease-in-out infinite; }
.mike-shake { animation: shake 0.6s ease-in-out; }
.mike-pop   { animation: popIn 0.3s forwards; }
```

ミケ画像は `img/mike-normal.png` など表情別に用意し、セリフに応じて切り替えます。

## 4. Firebase のデータ構造（例）

```text
users (collection)
  └─ {uid}
      ├─ displayName: string
      ├─ xp: number
      ├─ membership: boolean  # Super MikeFit かどうか
      ├─ badges: array        # 獲得バッジID
      └─ createdAt: timestamp

courses (collection)
  └─ {courseId}
      ├─ title: string
      ├─ description: string
      ├─ days: number
      └─ tasks (subcollection)
          └─ {taskId}
              ├─ order: number
              ├─ text: string
              └─ xp: number

progress (subcollection under user)
  └─ courses
      └─ {courseId}
          └─ {taskId}: { completed: boolean, completedAt: timestamp }
```

- Authentication には Google ログインを利用
- 課金情報は `membership` フラグやサブコレクションで管理
- 追加コースやセリフデータは Firestore から取得できるよう拡張

---
このドキュメントはアプリ設計の初期提案です。実装に合わせて随時更新してください。

