# みんなの留学部 オリエンテーションWeb

ミーティングに参加できない部員が、自分のペースでオリエンテーションを受けるためのページです。
最後のクイズに全問正解すると Discord ID を送信でき、運営がそのIDを検索してチャンネル権限を付けます。

- 公開: GitHub Pages（Settings → Pages → Branch: `main` / `/ (root)`）
- 検索エンジンには載らない設定です（`noindex` と `robots.txt`）。リンクはDiscordの中だけで配ってください。

## ファイル

| ファイル | 中身 |
| --- | --- |
| `index.html` | 各ステップの文章・画像・動き |
| `content.js` | クイズの問題と、送信先Googleフォームの設定 |
| `img/` | スライドから切り出した画像 |
| `gas/discord-notify.gs` | フォーム回答をDiscordに通知するスクリプト（フォーム側に貼る） |

## 文章やクイズを直すには

GitHubでファイルを開き、鉛筆アイコン（Edit）で直して「Commit changes」を押すと、1〜2分でサイトに反映されます。

- クイズ: `content.js` の `QUIZ`。`o` が選択肢、`a` が正解の番号（0から数える）、`e` が正解時の解説
- 文章: `index.html` の `<section class="step" ...>` ごとに1ステップ

## Googleフォームの接続

`content.js` の `FORM` に、フォームの各質問の `entry.数字` を入れます。

1. フォームの編集画面 → ︙ → 「事前入力したURLを取得」
2. 3つの質問に適当な文字（例: aaa, bbb, ccc）を入れて「リンクを取得」→ コピー
3. URLの中の `entry.123456=aaa` の `entry.123456` 部分をそれぞれ `discordId` / `displayName` / `nickname` に入れる

`discordId` が空の間は「プレビュー版」として動き、送信はされません。

## Discord通知

`gas/discord-notify.gs` の先頭コメントの手順どおりに設定します。Webhook URL はスクリプト プロパティにだけ保存し、このリポジトリには書かないでください（公開されるため）。

## 運営メンバーで管理する

- このリポジトリ: Settings → Collaborators で運営メンバーを追加（または Organization に移管）
- Googleフォームと回答スプレッドシート: 共有から運営メンバーを編集者に追加
