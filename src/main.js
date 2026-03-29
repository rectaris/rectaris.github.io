const app = document.querySelector("#app");

if (!app) {
  throw new Error("#app was not found");
}

app.innerHTML = `
  <header class="app-header">
    <span class="header-chip" aria-hidden="true">入口</span>
    <h1 class="app-title">学マス関連ポータル</h1>
    <span class="header-chip" aria-hidden="true">Web</span>
  </header>

  <main class="page-shell">
    <section class="hero">
      <p class="hero-eyebrow">rectaris.github.io</p>
      <h2 class="hero-title">公開ページとツールへの入口を、ひとつにまとめたポータルです。</h2>
      <p class="hero-text">
        gakumasu-timeline を中心に、学マス関連の公開ページへ迷わず入れるように整理したトップページです。
        年表アプリのやわらかい配色とカード感を引き継ぎつつ、入口として必要な情報だけを簡潔に置いています。
      </p>
      <div class="hero-actions">
        <a
          class="button-link button-link--primary"
          href="https://rectaris.github.io/gakumasu-timeline/"
        >
          gakumasu-timeline を開く
        </a>
        <a class="button-link" href="https://github.com/rectaris">
          GitHub Profile
        </a>
      </div>
    </section>

    <div class="sections">
      <section class="section-card portal-grid">
        <article class="tool-card">
          <span class="tool-label">公開中のツール</span>
          <h2 class="tool-title">gakumasu-timeline</h2>
          <p class="tool-description">
            学マスのコミュや出来事を、時間軸の上で俯瞰しながら確認できる年表アプリです。
            ドラッグ移動、ホイールズーム、詳細パネルによる確認を前提にした閲覧体験を提供します。
          </p>
          <a
            class="button-link button-link--primary"
            href="https://rectaris.github.io/gakumasu-timeline/"
          >
            ページへ移動
          </a>
        </article>

        <aside class="meta-card">
          <div>
            <p class="meta-label">公開 URL</p>
            <p class="meta-value">https://rectaris.github.io/gakumasu-timeline/</p>
          </div>
          <div>
            <p class="meta-label">用途</p>
            <p class="meta-value">
              学マス年表の閲覧、キャラクター別の見比べ、出来事の詳細確認
            </p>
          </div>
          <details class="guide-disclosure">
            <summary class="guide-summary">
              <span class="guide-summary__eyebrow">gakumasu-timeline の使い方</span>
              <span class="guide-summary__title">開いて確認する手順を見る</span>
            </summary>
            <ol class="guide-list">
              <li>まず gakumasu-timeline を開いて、全体の時系列を確認する</li>
              <li>必要に応じてレーンやカテゴリを絞り込み、見たい対象だけに寄せる</li>
              <li>気になるイベントを選択して詳細を読む</li>
            </ol>
          </details>
        </aside>
      </section>
    </div>

    <p class="footer-note">
      このページはポータルです。年表の機能仕様や詳細な操作説明は、リンク先の gakumasu-timeline 側で管理しています。
    </p>
  </main>
`;
