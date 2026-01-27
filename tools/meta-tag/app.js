<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Meta Tag Generator</title>
  <meta name="description" content="Generate SEO, Open Graph, Twitter, and JSON-LD meta tags." />
  <style>
    :root{
      --bg0:#070a16;
      --bg1:#0a1026;
      --glass: rgba(255,255,255,.08);
      --glass2: rgba(255,255,255,.12);
      --stroke: rgba(255,255,255,.16);
      --stroke2: rgba(255,255,255,.22);
      --txt: rgba(255,255,255,.92);
      --muted: rgba(255,255,255,.64);
      --shadow: 0 18px 60px rgba(0,0,0,.45);
      --glow: 0 0 22px rgba(116,227,255,.18), 0 0 48px rgba(176,83,255,.14);
      --radius: 20px;
      --radius2: 28px;
      --accent:#66f7ff;
      --accent2:#b25bff;
      --good:#52ffa1;
      --bad:#ff4d7d;
      --warn:#ffd36b;
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
    }
    *{ box-sizing:border-box; }
    html,body{ height:100%; }
    body{
      margin:0;
      font-family: var(--sans);
      color:var(--txt);
      background:
        radial-gradient(1200px 700px at 20% 10%, rgba(102,247,255,.18), transparent 60%),
        radial-gradient(1000px 700px at 80% 0%, rgba(178,91,255,.16), transparent 55%),
        radial-gradient(900px 700px at 60% 100%, rgba(82,255,161,.10), transparent 60%),
        linear-gradient(180deg, var(--bg0), var(--bg1));
      overflow-x:hidden;
    }
    a{ color:inherit; }
    .wrap{
      max-width:1180px;
      margin:0 auto;
      padding:28px 16px 44px;
    }
    header{
      display:flex;
      gap:14px;
      align-items:flex-start;
      justify-content:space-between;
      flex-wrap:wrap;
      margin-bottom:18px;
    }
    .brand{
      display:flex;
      gap:12px;
      align-items:center;
    }
    .logo{
      width:44px;height:44px;
      border-radius:14px;
      background: linear-gradient(135deg, rgba(102,247,255,.22), rgba(178,91,255,.18));
      border:1px solid var(--stroke);
      box-shadow: var(--glow);
      display:grid;place-items:center;
      position:relative;
      overflow:hidden;
    }
    .logo:before{
      content:"";
      position:absolute; inset:-60%;
      background: conic-gradient(from 90deg, rgba(102,247,255,.0), rgba(102,247,255,.26), rgba(178,91,255,.22), rgba(102,247,255,.0));
      animation: spin 7s linear infinite;
    }
    @keyframes spin{ to{ transform: rotate(360deg);} }
    .logo > span{
      position:relative;
      font-weight:800;
      letter-spacing:.2px;
    }
    h1{
      font-size:22px;
      margin:0;
      line-height:1.1;
    }
    .sub{
      margin:6px 0 0;
      color:var(--muted);
      font-size:13px;
      max-width:64ch;
    }
    .topActions{
      display:flex;
      gap:10px;
      align-items:center;
      flex-wrap:wrap;
      justify-content:flex-end;
    }
    .chip{
      padding:9px 12px;
      border-radius:999px;
      background: rgba(255,255,255,.06);
      border:1px solid var(--stroke);
      box-shadow: 0 10px 30px rgba(0,0,0,.25);
      display:flex;
      gap:10px;
      align-items:center;
      font-size:13px;
      color:var(--muted);
      user-select:none;
      backdrop-filter: blur(10px);
    }
    .chip strong{ color:var(--txt); font-weight:650; }
    .btn{
      cursor:pointer;
      border:1px solid var(--stroke);
      background: rgba(255,255,255,.06);
      color:var(--txt);
      padding:10px 12px;
      border-radius:14px;
      font-weight:650;
      letter-spacing:.1px;
      box-shadow: 0 14px 40px rgba(0,0,0,.35);
      backdrop-filter: blur(10px);
      transition: transform .12s ease, border-color .12s ease, background .12s ease;
      display:inline-flex;
      gap:10px;
      align-items:center;
    }
    .btn:hover{ transform: translateY(-1px); border-color: var(--stroke2); background: rgba(255,255,255,.09); }
    .btn:active{ transform: translateY(0px) scale(.99); }
    .btn.primary{
      background: linear-gradient(135deg, rgba(102,247,255,.18), rgba(178,91,255,.14));
      border-color: rgba(102,247,255,.22);
      box-shadow: var(--glow), 0 20px 70px rgba(0,0,0,.35);
    }
    .grid{
      display:grid;
      grid-template-columns: 1.06fr .94fr;
      gap:16px;
    }
    @media (max-width: 980px){
      .grid{ grid-template-columns: 1fr; }
      .topActions{ justify-content:flex-start; }
    }

    .card{
      border-radius: var(--radius2);
      background: linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.05));
      border: 1px solid var(--stroke);
      box-shadow: var(--shadow);
      overflow:hidden;
      position:relative;
      backdrop-filter: blur(12px);
    }
    .card:before{
      content:"";
      position:absolute;
      inset:-2px;
      background: radial-gradient(800px 280px at 10% 10%, rgba(102,247,255,.10), transparent 60%),
                  radial-gradient(700px 240px at 90% 0%, rgba(178,91,255,.10), transparent 60%);
      pointer-events:none;
      opacity:.8;
    }
    .card > *{ position:relative; }
    .cardHeader{
      padding:14px 14px 12px;
      border-bottom:1px solid rgba(255,255,255,.08);
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
    }
    .cardHeader h2{
      margin:0;
      font-size:14px;
      letter-spacing:.2px;
      text-transform:uppercase;
      color:rgba(255,255,255,.85);
    }
    .hint{
      font-size:12px;
      color:var(--muted);
      display:flex;
      gap:10px;
      align-items:center;
      flex-wrap:wrap;
      justify-content:flex-end;
    }
    .hint .dot{
      width:7px;height:7px;border-radius:99px;
      background: rgba(82,255,161,.7);
      box-shadow: 0 0 16px rgba(82,255,161,.25);
    }
    .body{
      padding:14px;
    }

    .tabs{
      display:flex;
      gap:8px;
      flex-wrap:wrap;
      padding:12px 14px 0;
    }
    .tab{
      border:1px solid var(--stroke);
      background: rgba(255,255,255,.05);
      color: rgba(255,255,255,.82);
      padding:8px 10px;
      border-radius:999px;
      font-size:12px;
      cursor:pointer;
      transition: background .12s ease, border-color .12s ease;
      user-select:none;
    }
    .tab[aria-selected="true"]{
      background: linear-gradient(135deg, rgba(102,247,255,.16), rgba(178,91,255,.12));
      border-color: rgba(102,247,255,.22);
      box-shadow: 0 0 0 3px rgba(102,247,255,.08);
    }
    .tab:focus-visible{
      outline:none;
      box-shadow: 0 0 0 3px rgba(102,247,255,.14);
    }

    .form{
      display:grid;
      grid-template-columns: 1fr 1fr;
      gap:12px;
    }
    @media (max-width: 560px){
      .form{ grid-template-columns: 1fr; }
    }
    .field{
      display:flex;
      flex-direction:column;
      gap:7px;
    }
    .field.full{ grid-column: 1 / -1; }
    label{
      font-size:12px;
      color: rgba(255,255,255,.78);
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
    }
    label small{
      color:var(--muted);
      font-weight:600;
      font-size:11px;
    }
    input, textarea, select{
      width:100%;
      border-radius: 16px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(10,16,38,.55);
      color:var(--txt);
      padding:11px 12px;
      font-size:14px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
      outline:none;
      transition: border-color .12s ease, box-shadow .12s ease, transform .12s ease;
    }
    textarea{ min-height:92px; resize:vertical; }
    input:focus, textarea:focus, select:focus{
      border-color: rgba(102,247,255,.28);
      box-shadow: 0 0 0 3px rgba(102,247,255,.10);
    }
    .row{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      margin-top:12px;
      align-items:center;
      justify-content:space-between;
    }
    .rowLeft, .rowRight{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; }

    .toggle{
      display:flex;
      gap:10px;
      align-items:center;
      padding:10px 12px;
      border-radius: 16px;
      border:1px solid var(--stroke);
      background: rgba(255,255,255,.05);
      user-select:none;
      cursor:pointer;
    }
    .switch{
      width:44px; height:24px;
      border-radius:999px;
      background: rgba(255,255,255,.14);
      border:1px solid rgba(255,255,255,.18);
      position:relative;
      flex:0 0 auto;
      transition: background .15s ease, border-color .15s ease;
    }
    .knob{
      position:absolute;
      top:50%;
      transform: translateY(-50%);
      left:3px;
      width:18px;height:18px;
      border-radius:999px;
      background: rgba(255,255,255,.86);
      box-shadow: 0 8px 20px rgba(0,0,0,.35);
      transition: left .15s ease, background .15s ease;
    }
    .toggle[aria-checked="true"] .switch{
      background: rgba(82,255,161,.22);
      border-color: rgba(82,255,161,.26);
    }
    .toggle[aria-checked="true"] .knob{
      left:22px;
      background: rgba(82,255,161,.95);
    }
    .toggle span{
      font-size:13px;
      color: rgba(255,255,255,.86);
      font-weight:650;
    }

    .out{
      padding:12px 14px 14px;
    }
    .codeWrap{
      border:1px solid rgba(255,255,255,.14);
      background: rgba(10,16,38,.55);
      border-radius: 18px;
      overflow:hidden;
    }
    .codeTop{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:10px;
      padding:10px 10px;
      border-bottom:1px solid rgba(255,255,255,.10);
    }
    .codeTop .pill{
      font-size:12px;
      color: var(--muted);
      display:flex;
      gap:8px;
      align-items:center;
    }
    .kbd{
      font-family: var(--mono);
      font-size:11px;
      padding:2px 6px;
      border-radius:8px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(255,255,255,.06);
      color: rgba(255,255,255,.82);
    }
    pre{
      margin:0;
      padding:12px;
      font-family: var(--mono);
      font-size:12.5px;
      line-height:1.55;
      color: rgba(255,255,255,.90);
      overflow:auto;
      max-height: 56vh;
      white-space: pre;
    }

    .status{
      display:flex;
      gap:10px;
      align-items:center;
      font-size:12px;
      color: var(--muted);
    }
    .badge{
      padding:4px 8px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(255,255,255,.06);
      color: rgba(255,255,255,.86);
      font-weight:700;
      letter-spacing:.2px;
      font-size:11px;
    }
    .badge.good{ border-color: rgba(82,255,161,.25); background: rgba(82,255,161,.10); }
    .badge.bad{ border-color: rgba(255,77,125,.24); background: rgba(255,77,125,.10); }
    .badge.warn{ border-color: rgba(255,211,107,.24); background: rgba(255,211,107,.10); }

    .sr{ position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden; }
    footer{
      margin-top:14px;
      color: rgba(255,255,255,.5);
      font-size:12px;
      text-align:center;
    }
  </style>
</head>

<body>
  <div class="wrap">
    <header>
      <div class="brand">
        <div class="logo" aria-hidden="true"><span>&lt;/&gt;</span></div>
        <div>
          <h1>Meta Tag Generator</h1>
          <p class="sub">Fill in your page details and instantly generate SEO meta tags, Open Graph, Twitter cards, and JSON-LD. Everything runs locally (no backend).</p>
        </div>
      </div>

      <div class="topActions">
        <div class="chip" title="All processing happens in your browser">
          <span aria-hidden="true">🧊</span>
          <span><strong>Offline</strong> • No tracking</span>
        </div>
        <button class="btn" id="btnReset" type="button" title="Reset all fields">Reset</button>
        <button class="btn primary" id="btnCopyAll" type="button" title="Copy output to clipboard">Copy Output</button>
      </div>
    </header>

    <div class="grid">
      <!-- LEFT: INPUTS -->
      <section class="card" aria-label="Inputs">
        <div class="cardHeader">
          <h2>Inputs</h2>
          <div class="hint">
            <span class="dot" aria-hidden="true"></span>
            <span>Live preview</span>
            <span class="badge" id="badgeCount">0 tags</span>
          </div>
        </div>

        <div class="tabs" role="tablist" aria-label="Sections">
          <button class="tab" role="tab" aria-selected="true" aria-controls="panel-basic" id="tab-basic" type="button">Basic</button>
          <button class="tab" role="tab" aria-selected="false" aria-controls="panel-social" id="tab-social" type="button">Social</button>
          <button class="tab" role="tab" aria-selected="false" aria-controls="panel-advanced" id="tab-advanced" type="button">Advanced</button>
          <button class="tab" role="tab" aria-selected="false" aria-controls="panel-schema" id="tab-schema" type="button">Schema</button>
        </div>

        <div class="body">
          <!-- BASIC -->
          <div id="panel-basic" role="tabpanel" aria-labelledby="tab-basic">
            <div class="form">
              <div class="field full">
                <label for="title">Page Title <small id="titleCount">0/60</small></label>
                <input id="title" type="text" maxlength="120" placeholder="Example: Free Tools Hub — Meta Tag Generator" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="description">Meta Description <small id="descCount">0/160</small></label>
                <textarea id="description" maxlength="320" placeholder="A short description that may appear in search results…"></textarea>
              </div>

              <div class="field">
                <label for="canonical">Canonical URL <small>recommended</small></label>
                <input id="canonical" type="url" placeholder="https://example.com/page" autocomplete="off" />
              </div>

              <div class="field">
                <label for="robots">Robots</label>
                <select id="robots">
                  <option value="index,follow">index,follow</option>
                  <option value="noindex,follow">noindex,follow</option>
                  <option value="index,nofollow">index,nofollow</option>
                  <option value="noindex,nofollow">noindex,nofollow</option>
                  <option value="">(omit)</option>
                </select>
              </div>

              <div class="field">
                <label for="lang">Language</label>
                <input id="lang" type="text" placeholder="en" autocomplete="off" />
              </div>

              <div class="field">
                <label for="charset">Charset</label>
                <select id="charset">
                  <option value="utf-8">utf-8</option>
                  <option value="">(omit)</option>
                </select>
              </div>

              <div class="field full">
                <label for="keywords">Keywords <small>optional</small></label>
                <input id="keywords" type="text" placeholder="comma, separated, keywords" autocomplete="off" />
              </div>
            </div>
          </div>

          <!-- SOCIAL -->
          <div id="panel-social" role="tabpanel" aria-labelledby="tab-social" hidden>
            <div class="form">
              <div class="field full">
                <label for="siteName">Site Name</label>
                <input id="siteName" type="text" placeholder="Example: FreeToolsHub" autocomplete="off" />
              </div>

              <div class="field">
                <label for="ogType">OG Type</label>
                <select id="ogType">
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                  <option value="profile">profile</option>
                </select>
              </div>

              <div class="field">
                <label for="twitterCard">Twitter Card</label>
                <select id="twitterCard">
                  <option value="summary_large_image">summary_large_image</option>
                  <option value="summary">summary</option>
                </select>
              </div>

              <div class="field">
                <label for="twitterSite">Twitter @site <small>optional</small></label>
                <input id="twitterSite" type="text" placeholder="@yourhandle" autocomplete="off" />
              </div>

              <div class="field">
                <label for="twitterCreator">Twitter @creator <small>optional</small></label>
                <input id="twitterCreator" type="text" placeholder="@creator" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="image">Social Image URL <small>1200×630 recommended</small></label>
                <input id="image" type="url" placeholder="https://example.com/og-image.png" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="favicon">Favicon URL <small>optional</small></label>
                <input id="favicon" type="url" placeholder="https://example.com/favicon.ico" autocomplete="off" />
              </div>
            </div>
          </div>

          <!-- ADVANCED -->
          <div id="panel-advanced" role="tabpanel" aria-labelledby="tab-advanced" hidden>
            <div class="form">
              <div class="field">
                <label for="themeColor">Theme Color <small>hex</small></label>
                <input id="themeColor" type="text" placeholder="#0a1026" autocomplete="off" />
              </div>

              <div class="field">
                <label for="viewport">Viewport</label>
                <input id="viewport" type="text" placeholder="width=device-width, initial-scale=1" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="author">Author <small>optional</small></label>
                <input id="author" type="text" placeholder="Your name or brand" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="referrer">Referrer Policy</label>
                <select id="referrer">
                  <option value="strict-origin-when-cross-origin">strict-origin-when-cross-origin</option>
                  <option value="no-referrer">no-referrer</option>
                  <option value="origin">origin</option>
                  <option value="origin-when-cross-origin">origin-when-cross-origin</option>
                  <option value="same-origin">same-origin</option>
                  <option value="">(omit)</option>
                </select>
              </div>

              <div class="field full">
                <label for="csp">Content-Security-Policy <small>optional</small></label>
                <textarea id="csp" placeholder="default-src 'self'; img-src 'self' https: data:; ..."></textarea>
              </div>

              <div class="field full">
                <label for="extra">Extra Meta Tags <small>one per line: name=value</small></label>
                <textarea id="extra" placeholder="example: rating=general&#10;example: apple-mobile-web-app-title=My App"></textarea>
              </div>
            </div>
          </div>

          <!-- SCHEMA -->
          <div id="panel-schema" role="tabpanel" aria-labelledby="tab-schema" hidden>
            <div class="form">
              <div class="field">
                <label for="schemaType">Schema Type</label>
                <select id="schemaType">
                  <option value="WebSite">WebSite</option>
                  <option value="WebPage">WebPage</option>
                  <option value="Organization">Organization</option>
                  <option value="Person">Person</option>
                  <option value="Article">Article</option>
                </select>
              </div>

              <div class="field">
                <label for="schemaName">Name</label>
                <input id="schemaName" type="text" placeholder="Brand or page name" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="schemaUrl">URL</label>
                <input id="schemaUrl" type="url" placeholder="https://example.com/" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="schemaLogo">Logo URL <small>optional</small></label>
                <input id="schemaLogo" type="url" placeholder="https://example.com/logo.png" autocomplete="off" />
              </div>

              <div class="field full">
                <label for="schemaSameAs">SameAs <small>optional — one URL per line</small></label>
                <textarea id="schemaSameAs" placeholder="https://twitter.com/you&#10;https://github.com/you"></textarea>
              </div>

              <div class="field full">
                <label for="schemaCustom">Custom JSON-LD <small>optional — merged</small></label>
                <textarea id="schemaCustom" placeholder="{&#10;  &quot;inLanguage&quot;: &quot;en&quot;&#10;}"></textarea>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="rowLeft">
              <div class="toggle" id="toggleMinify" role="switch" tabindex="0" aria-checked="false" aria-label="Minify output">
                <div class="switch" aria-hidden="true"><div class="knob"></div></div>
                <span>Minify output</span>
              </div>

              <div class="toggle" id="toggleIncludeComments" role="switch" tabindex="0" aria-checked="true" aria-label="Include section comments in output">
                <div class="switch" aria-hidden="true"><div class="knob"></div></div>
                <span>Include comments</span>
              </div>
            </div>

            <div class="rowRight">
              <div class="status" id="status">
                <span class="badge warn" id="badgeWarn" hidden>Needs URL</span>
                <span id="statusText">Ready.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- RIGHT: OUTPUT -->
      <section class="card" aria-label="Output">
        <div class="cardHeader">
          <h2>Output</h2>
          <div class="hint">
            <span class="badge" id="badgeQuality">OK</span>
            <span>Copy & paste into <span class="kbd">&lt;head&gt;</span></span>
          </div>
        </div>

        <div class="out">
          <div class="codeWrap" aria-label="Generated meta tags">
            <div class="codeTop">
              <div class="pill">
                <span aria-hidden="true">📋</span>
                <span id="lineInfo">0 lines</span>
              </div>
              <div class="rowRight">
                <button class="btn" id="btnCopy" type="button">Copy</button>
                <button class="btn" id="btnDownload" type="button">Download .html</button>
              </div>
            </div>
            <pre id="output" tabindex="0" aria-label="Output code block"></pre>
          </div>
        </div>
      </section>
    </div>

    <footer>
      Tip: if you’re using GitHub Pages, keep your canonical URL consistent with your published domain.
    </footer>
  </div>

  <script src="app.js"></script>
</body>
</html>