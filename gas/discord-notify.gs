/**
 * Googleフォームに回答が届いたら、運営用Discordチャンネルに通知する。
 *
 * 設定方法（README「Discord通知」）:
 * 1. フォームの編集画面 ⋮ → スクリプトエディタ を開き、このファイルの中身を貼る
 * 2. プロジェクトの設定 → スクリプト プロパティ に DISCORD_WEBHOOK_URL を追加する
 * 3. トリガー → トリガーを追加 → onFormSubmit / フォームから / フォーム送信時
 */
function onFormSubmit(e) {
  const url = PropertiesService.getScriptProperties().getProperty('DISCORD_WEBHOOK_URL');
  if (!url) throw new Error('スクリプト プロパティ DISCORD_WEBHOOK_URL が未設定です');

  const answers = {};
  e.response.getItemResponses().forEach(function (r) {
    answers[r.getItem().getTitle()] = String(r.getResponse() || '').trim();
  });
  const pick = function (word) {
    const key = Object.keys(answers).find(function (k) { return k.indexOf(word) !== -1; });
    return key ? answers[key] : '';
  };
  const id = pick('Discord ID');
  const display = pick('表示名');
  const nick = pick('ニックネーム');

  const lines = [
    '🎓 オリエンテーション修了: **' + id + '**',
    display ? '表示名: ' + display : '',
    nick ? 'ニックネーム: ' + nick : '',
    '→ Discordで検索して部員ロールを付けてください'
  ].filter(String);

  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    // allowed_mentions を空にして、入力内容で @everyone などが飛ばないようにする
    payload: JSON.stringify({ content: lines.join('\n'), allowed_mentions: { parse: [] } })
  });
}
