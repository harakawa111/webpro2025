// node.jsの標準ライブラリであるhttpモジュールを読み込む
// "node:" をつけることで、コアモジュールであることを明示している
import http from "node:http";
import { URL } from "node:url";

// 環境変数PORTが設定されていればその値を、なければ8888をポート番号として使用する
const PORT = process.env.PORT || 8888;

// httpサーバーを作成する
const server = http.createServer((req, res) => {
  // localhost:8888/ask?q=... のようなリクエストを処理するため、URLオブジェクトを生成
  const url = new URL(req.url, `http://${req.headers.host}`);

  // ルーティング：リクエストされたURLのパス名によって処理を分岐する
  if (url.pathname === "/") {
    console.log("ルートパスへのリクエストを受け付けました。");
    // レスポンスヘッダーを設定
    // ステータスコード200 (OK)
    // コンテンツタイプはHTMLで、文字コードはUTF-8
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    // レスポンスボディに "こんにちは！" と書き込む
    res.end("こんにちは！");
  } else if (url.pathname === "/ask") {
    console.log("/ask パスへのリクエストを受け付けました。");
    // クエリパラメータ 'q' の値を取得する
    const question = url.searchParams.get("q");
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Your question is '${question}'`);
  } else {
    console.log("不明なパスへのリクエストです。");
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
  }
});

// 指定したポートでリクエストの待受を開始する
server.listen(PORT, () => {
  console.log(
    `サーバーがポート${PORT}で起動しました。 http://localhost:${PORT}/`
  );
});
