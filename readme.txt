フォルダ構成、その他ご説明を記載しております。


1. html ファイル構成
    /index.html(TOP)
    ├── /about
    │   └── /index.html
    ├── /works
    │   └── /index.html
    │   ├── /single-flot.html
    │   └── /single-galleria.html
    ├── /service
    │   └── /index.html
    ├── /news
    │   └── /index.html
    │   ├── /single-news01.html
    │   ├── /single-news02.html
    │   └── /single-news03.html
    ├── /recruit
    │   └── /index.html
    ├── /contact
    │   └── /index.html
    └── /privacy-policy
        └── /index.html


2. Sass/CSS ファイル構成
    /src/scss
    ├───── style.scss               : 以下ファイル郡の読み込み→CSSに変換
    ├── /setting                       <動作設定用>
    │   ├── /_animation.scss          : アニメーション動作
    │   └── /_loader.scss             : ページロード/移動時のローディング動作
    ├── /base                          <全ページ共通項目>
    │   ├── /_reset.scss              : リセットCSS
    │   └── /_base.scss               : 全ページ共通項目のスタイル
    ├── /mixin                         : mixin
    │   └── /_linkーbtn.scss          : リンクボタンのスタイル
    │   ├── /_media-query.scss        : メディアクエリ定義
    │   ├── /_plus-icon.scss          : ＋アイコンのスタイル
    │   └── /_scroll-area.scss        : scrollアイコンのスタイル
    ├── /module                        ＜共通モジュールのスタイル＞
    │   └── /_container.scss          : 各ページのcontainer
    │   ├── /_cursor.scss             : カーソル追従アイコン
    │   ├── /_header.scss             : ヘッダー
    │   ├── /_page-title.scss         : 各ページ上部のタイトルエリア
    │   ├── /_page-link.scss          : フッター上のページリンクエリア
    │   ├── /_footer.scss             : フッター
    │   ├── /_single-title.scss       : 記事個別ページのタイトルエリア
    │   ├── /_single-pager.scss       : 記事個別ページのページ移動エリア
    │   ├── /_background-img.scss     : 背景画像表示エリア
    │   └── /_sns-area.scss           : SNSアイコンエリア
    └── /page                          ＜その他、各ページのスタイル＞
         └── /_top.scss
         ├── /_about.scss
         ├── /_works.scss
         ├── /_works_single.scss
         ├── /_service.scss
         ├── /_news.scss
         ├── /_news_single.scss
         ├── /_recruit.scss
         ├── /_contact.scss
         └── /_privacypolicy.scss
→ style.scssをCSSにコンパイルし、/css/style.cssとして各htmlファイルで読み込んでいます。


3. jsファイル
  /js/main.jsで読み込んでいます。
  スライダーをslick.jsで実装しており、関連ファイルを/js内に設置しています。
