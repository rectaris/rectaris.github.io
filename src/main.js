const ADSENSE_CLIENT = "ca-pub-1161740700371268";
const PORTAL_FOOTER_AD_SLOT = "7736293518";

const app = document.querySelector("#app");

if (!app) {
  throw new Error("#app was not found");
}

const tools = [
  {
    title: "gakumasu-timeline",
    url: "https://rectaris.github.io/gakumasu-timeline/",
    description: [
      "学マスのコミュや出来事を、時間軸の上で俯瞰しながら確認できる年表アプリです。",
      "表示期間とレーン密度を調整しながら、見たい対象をレーン単位で絞り込んで確認できます。",
    ],
    usage: "学マス年表の閲覧、レーン単位の見比べ、出来事の詳細確認",
    guideEyebrow: "gakumasu-timeline の使い方",
    guideTitle: "開いて確認する手順を見る",
    guideSteps: [
      "まず gakumasu-timeline を開いて、全体の時系列を確認する",
      "表示期間とレーン密度を調整し、見やすい範囲に合わせる",
      "必要に応じてカテゴリやレーンを絞り込み、気になるイベントの詳細を読む",
    ],
  },
  {
    title: "supportcard-status",
    url: "https://rectaris.github.io/status/",
    description: [
      "学マスのサポートカードの編成をシミュレーションし、最終的なステータス上昇値を算出する計算ツールです。",
      "カードのアビリティやイベント発動を考慮した精密な計算を、ブラウザ上で即座に行えます。",
    ],
    usage: "サポートカード編成の最適化、ステータス上昇値の試算、アビリティ検証",
    guideEyebrow: "supportcard-status の使い方",
    guideTitle: "試算を行う手順を見る",
    guideSteps: [
      "アイドルと育成モード（シナリオ）を選択する",
      "サポートカードを 6 枚スロットにセットする",
      "リアルタイムで算出されるステータス合計値を確認し、編成を調整する",
    ],
  },
];

function renderPortalFooterAd() {
  if (!PORTAL_FOOTER_AD_SLOT) {
    return "";
  }

  return `
    <section class="portal-ad-section" aria-label="広告">
      <p class="portal-ad-section__label">広告</p>
      <ins
        class="adsbygoogle portal-ad-section__unit"
        style="display:block"
        data-ad-client="${ADSENSE_CLIENT}"
        data-ad-slot="${PORTAL_FOOTER_AD_SLOT}"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </section>
  `;
}

function renderGuideSteps(steps) {
  return steps.map((step) => `<li>${step}</li>`).join("");
}

function renderToolSection(tool) {
  return `
      <section class="section-card portal-grid">
        <article class="tool-card">
          <span class="tool-label">公開中のツール</span>
          <h2 class="tool-title">${tool.title}</h2>
          <p class="tool-description">
            ${tool.description.join("\n            ")}
          </p>
          <a
            class="button-link button-link--primary"
            href="${tool.url}"
          >
            ページへ移動
          </a>
        </article>

        <aside class="meta-card">
          <div>
            <p class="meta-label">公開 URL</p>
            <p class="meta-value">${tool.url}</p>
          </div>
          <div>
            <p class="meta-label">用途</p>
            <p class="meta-value">
              ${tool.usage}
            </p>
          </div>
          <details class="guide-disclosure">
            <summary class="guide-summary">
              <span class="guide-summary__eyebrow">${tool.guideEyebrow}</span>
              <span class="guide-summary__title">${tool.guideTitle}</span>
            </summary>
            <ol class="guide-list">
              ${renderGuideSteps(tool.guideSteps)}
            </ol>
          </details>
        </aside>
      </section>
  `;
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
        gakumasu-timeline と supportcard-status を中心に、学マス関連の公開ページへ迷わず入れるように整理したトップページです。
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
      ${tools.map(renderToolSection).join("")}
    </div>

    <p class="footer-note">
      このページはポータルです。各ツールの機能仕様や詳細な操作説明は、リンク先の各プロジェクト側で管理しています。
    </p>
    ${renderPortalFooterAd()}
  </main>
`;

if (PORTAL_FOOTER_AD_SLOT) {
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.push({});
}
