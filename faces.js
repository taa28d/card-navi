// カード券面のイラスト。実物の画像やロゴは使わず、色・模様・配置を似せて描いている。
// ロゴのある位置には、文字に見える帯や丸などの図形を置く（公式サイトの券面を2026年11月に見て作成）。
// 上の帯にはカード名と還元率を重ねるので、模様は中央より下に寄せている。
// ink はカード名の文字色、d:1 は「地が明るいカード」の印。
const FACES = (() => {
  const lin = (id, x2, y2, ...cols) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">` +
    cols.map((c, i) => `<stop offset="${i / (cols.length - 1)}" stop-color="${c}"/>`).join('') + '</linearGradient>';
  const base = (id, c1, c2, x2 = 1, y2 = 1) => `<defs>${lin(id, x2, y2, c1, c2)}</defs><rect width="320" height="202" fill="url(#${id})"/>`;
  const poly = (pts, col, o = 1) => `<polygon points="${pts}" fill="${col}" opacity="${o}"/>`;
  const circle = (x, y, r, col, o = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" opacity="${o}"/>`;
  // ICチップ
  const chip = (gold, x = 28, y = 82) => `<rect x="${x}" y="${y}" width="38" height="29" rx="5" fill="url(#${gold ? 'chipG' : 'chipS'})" stroke="rgba(0,0,0,.3)" stroke-width=".7"/>` +
    `<path d="M${x + 13} ${y}v29M${x + 25} ${y}v29M${x} ${y + 10}h13M${x} ${y + 19}h13M${x + 25} ${y + 10}h13M${x + 25} ${y + 19}h13" fill="none" stroke="rgba(0,0,0,.3)" stroke-width=".8"/>`;
  // タッチ決済の波マーク
  const wave = (col, x = 270, y = 122) => `<g fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round" opacity=".85" transform="translate(${x} ${y})"><path d="M0-5q4 5 0 10"/><path d="M6-9q7 9 0 18"/><path d="M12-13q10 13 0 26"/></g>`;
  // 文字に見える帯の並び
  const word = (x, y, widths, h, col, o = 1) => {
    let s = '', cx = x;
    for (const w of widths) { s += `<rect x="${cx}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w, h) / 3.2}" fill="${col}" opacity="${o}"/>`; cx += w + 3; }
    return s;
  };
  // 右下の国際ブランドの位置に置く図形
  const slant = (col, o = 1) => `<g transform="translate(252 160) skewX(-14)" fill="${col}" opacity="${o}"><rect width="9" height="18" rx="2"/><rect x="12" width="5" height="18" rx="2"/><rect x="20" width="10" height="18" rx="2"/><rect x="33" width="11" height="18" rx="2"/></g>`;
  const trio = (kind, col = '#fff') => {
    const fills = kind === 'color' ? ['#2161b3', '#d5273d', '#1f9a4c'] : [col, col, col];
    return fills.map((f, i) => `<rect x="${248 + i * 18}" y="150" width="15" height="31" rx="5" ${kind === 'line' ? `fill="none" stroke="${f}" stroke-width="1.6"` : `fill="${f}"`}/>`).join('');
  };
  const duo = () => circle(262, 168, 14, '#d9432f', .9) + circle(282, 168, 14, '#f1a52e', .88);
  const lines = (col, o, step = 4) => { let s = ''; for (let y = 3; y < 202; y += step) s += `M0 ${y}H320`; return `<path d="${s}" stroke="${col}" stroke-opacity="${o}" stroke-width="1" fill="none"/>`; };

  // 三井住友カード系：右寄りの一点から光の筋が広がる柄
  const rays = (id, c1, c2, w, beam) => base(id, c1, c2) +
    poly('120,0 215,0 198,97', w[0], .55) + poly('215,0 320,0 320,58 198,97', w[1], .7) +
    poly('320,68 320,99 198,97', beam) + poly('320,99 320,150 198,97', w[2], .8) +
    poly('320,150 320,202 236,202 198,97', w[3], .6) + poly('236,202 120,202 198,97', w[4], .75) + poly('0,202 0,128 198,97', w[0], .22);
  // イオンカード系：中央に白い文字、左下に犬のマーク
  const aeon = (id, c1, c2, extra) => base(id, c1, c2) + word(98, 92, [14, 13, 15, 15], 10, '#fff') + word(172, 92, [14, 13, 13, 14], 10, '#fff') + extra +
    circle(34, 168, 11, '#fff') + '<ellipse cx="27" cy="160" rx="4" ry="6" fill="#222"/><ellipse cx="41" cy="160" rx="4" ry="6" fill="#222"/>' + chip(true) + trio('fill');
  const dcard = (id, c1, c2, a, b, c, ink, mark) => base(id, c1, c2) + circle(236, 160, 128, a, .5) + circle(262, 46, 88, b, .33) + circle(96, 214, 104, c, .45) +
    '<rect x="196" y="14" width="24" height="15" rx="3" fill="#f4c21f"/>' + circle(234, 21, 8.5, '#d7002e') + word(28, 150, [10, 30], 9, ink, .8) + chip(false) + slant(mark);
  const eneos = (id, letter) => base(id, '#f57a1e', '#de2418') +
    '<g fill="none" stroke="#ffd35a" stroke-opacity=".28" stroke-width="18"><circle cx="100" cy="150" r="70"/><circle cx="100" cy="150" r="118"/><circle cx="100" cy="150" r="166"/><circle cx="100" cy="150" r="214"/></g>' +
    word(92, 86, [16, 16, 16, 16, 16], 16, '#fff') + word(116, 110, [9, 9, 9, 9], 9, '#fff') +
    `<text x="170" y="120" font-size="15" font-weight="800" fill="#fff" font-family="Arial,Helvetica,sans-serif">${letter}</text>` + chip(true) + slant('#fff', .9);
  const amazon = (id, c1, c2, lineCol, lineO, ink) => base(id, c1, c2) + lines(lineCol, lineO) + word(226, 56, [9, 12, 9, 8, 9, 9], 10, ink) +
    `<path d="M224 76q32 14 64 0M282 72l8 3-5 6" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>` + chip(true) + wave(ink, 270, 118) + duo();
  // スマホ決済：赤やオレンジの地に、白いマークを中央に置く
  const tile = (id, c1, c2, mark) => base(id, c1, c2) + poly('0,0 150,0 70,202 0,202', '#fff', .06) + mark;

  return {
    'smbc-nl': { ink: '#fff', art: rays('f1', '#0e4a37', '#041c15', ['#1a6e54', '#0b3b2c', '#05241a', '#12573f', '#072d21'], '#f3f7f5') + chip(false) + slant('#fff') },
    'smbc-gold-nl': { ink: '#1f4a3b', d: 1, art: rays('f2', '#f0dc9c', '#c39d3f', ['#f8ebbd', '#d7b95f', '#b98f2f', '#e8cf84', '#c7a244'], '#0f4b39') + chip(true) + slant('#9a7418') },
    'smbc-pp': { ink: '#fff', art: rays('f3', '#302e2f', '#0a0909', ['#474445', '#1c1a1b', '#000', '#363334', '#151314'], '#5d5a5b') + word(206, 118, [42, 54], 3, '#fff', .7) + chip(false) + slant('#fff') },
    olive: { ink: '#fff', art: `<defs>${lin('f4r', 1, 0, '#d9e25c', '#6fc7a0', '#8f63d2')}</defs>` + rays('f4', '#696c6e', '#2b2c2e', ['#7d8082', '#4a4c4e', '#232425', '#56585a', '#333436'], 'url(#f4r)') + chip(false) + slant('#fff') },
    'olive-gold': { ink: '#6b5320', d: 1, art: `<defs>${lin('f32r', 1, 0, '#f6e7b4', '#cdeee2', '#e6cff2')}</defs>` + base('f32', '#f4e4b0', '#c9a75a', 0, 1) +
      poly('0,150 320,58 320,98 0,202', '#fff', .24) + poly('214,90 320,58 320,96', 'url(#f32r)', .95) + chip(false) + slant('#a8842f') },
    rakuten: { ink: '#bf0000', d: 1, art: base('f5', '#f1f1f1', '#c6c7c9') + poly('0,0 150,0 70,202 0,202', '#fff', .28) + chip(true, 28, 84) + wave('#8d8f93', 76, 98) + slant('#9a9ca0', .9) },
    'jcb-w': { ink: '#fff', art: `<defs>${lin('f6', 1, 1, '#8e93ac', '#272d57', '#080b20')}<radialGradient id="f6r" cx=".26" cy=".18" r=".75"><stop offset="0" stop-color="#c3c7da" stop-opacity=".5"/><stop offset="1" stop-color="#c3c7da" stop-opacity="0"/></radialGradient></defs>` +
      '<rect width="320" height="202" fill="url(#f6)"/><rect width="320" height="202" fill="url(#f6r)"/>' + chip(false) + wave('#fff', 270, 124) + trio('line') },
    'jcb-s': { ink: '#5b4f43', d: 1, art: base('f7', '#d5c8b8', '#9a8a79', 0, 1) + '<rect x="16" y="95" width="288" height="2.5" fill="#f1eadf" opacity=".9"/><rect x="16" y="97.5" width="288" height="1" fill="#6f6254" opacity=".35"/>' + chip(true) + wave('#f3ede4', 270, 124) + trio('line', '#f6f0e6') },
    dcard: { ink: '#5a5d64', d: 1, art: dcard('f8', '#fbfbfb', '#d3d5da', '#fff', '#c9ccd3', '#dfe1e6', '#8b8e95', '#9da0a7') },
    'dcard-gold': { ink: '#4b3508', d: 1, art: dcard('f9', '#dfc17c', '#a57c2c', '#f0d79b', '#b78d38', '#e6c985', '#fff', '#f6e7bd') },
    'aupay-card': { ink: '#5a5148', d: 1, art: `<defs>${lin('f10a', 1, 0, '#f59a23', '#e96aa8', '#4aa3f0')}</defs>` + base('f10', '#e2dbd3', '#b1a79c') +
      '<path d="M-10 172Q170 152 330 46" fill="none" stroke="url(#f10a)" stroke-width="1.8"/><path d="M-10 188Q180 172 330 72" fill="none" stroke="#fff" stroke-opacity=".5"/>' + chip(false) + slant('#fff') },
    'paypay-card': { ink: '#fff', art: base('f11', '#252528', '#000') + '<path d="M112 176V64h46a31 31 0 0 1 0 62h-46" fill="none" stroke="#fff" stroke-opacity=".09" stroke-width="18" stroke-linejoin="round"/>' + chip(false, 232, 90) + slant('#fff') },
    'aeon-select': { ink: '#fff', art: aeon('f12', '#5b6dca', '#33449c', word(134, 110, [7, 7, 7, 7, 7, 7], 5, '#fff', .9)) },
    'aeon-waon': { ink: '#fff', art: aeon('f13', '#4f66cf', '#2a3d99', '<rect x="128" y="108" width="64" height="17" rx="8.5" fill="none" stroke="#fff" stroke-width="1.6"/>' + word(140, 113, [8, 8, 8, 8], 7, '#fff')) },
    'welcia-card': { ink: '#fff', art: base('f14', '#e5e6e9', '#b4b6ba') + '<rect width="148" height="202" fill="#17276d"/><rect x="196" y="76" width="98" height="26" rx="13" fill="#1f86d9"/>' +
      word(212, 84, [10, 10, 8, 10, 8, 10], 10, '#fff') + word(206, 110, [34, 22], 4, '#1f86d9') + circle(34, 168, 11, '#fff') +
      '<ellipse cx="27" cy="160" rx="4" ry="6" fill="#222"/><ellipse cx="41" cy="160" rx="4" ry="6" fill="#222"/>' + chip(true) + trio('color') },
    'saison-pearl': { ink: '#3d5f96', d: 1, art: base('f15', '#f7f7f5', '#cbcdd0') + lines('#aeb2b8', .35, 6) +
      '<ellipse cx="150" cy="118" rx="44" ry="52" fill="#eceded" stroke="#9ea3aa" stroke-width="1.5"/><path d="M116 160q36-34 70 0v8h-70z" fill="#b4b9c0"/>' + circle(152, 106, 19, '#b4b9c0') +
      '<path d="M134 98q18-26 40-4" fill="none" stroke="#8d939b" stroke-width="5" stroke-linecap="round"/>' +
      word(226, 50, [9, 9, 9, 9, 9, 9, 9], 7, '#2f6fb5') + word(238, 61, [9, 9, 9, 9, 9, 9], 7, '#2f6fb5') + '<rect x="268" y="74" width="34" height="13" rx="2" fill="#1c9a6b"/>' +
      chip(false, 28, 88) + word(28, 176, [42, 28], 4, '#8f949b') },
    'saison-intl': { ink: '#fff', art: base('f16', '#f2f2f4', '#cfd1d6', 0, 1) + '<rect width="320" height="58" fill="#1d52a5"/><rect y="58" width="320" height="8" fill="#17a35a"/>' +
      [0, 1, 2, 3].map(g => word(74 + g * 58, 132, [10, 10, 10, 10], 13, '#bfc2c9')).join('') + chip(true, 28, 84) + slant('#b3b6bd') },
    recruit: { ink: '#1b62bd', d: 1, art: `<defs>${lin('f17b', 1, 1, '#3aa0ec', '#1b62bd')}</defs>` + base('f17', '#f3f5f8', '#c2c8d1') +
      poly('196,202 320,92 320,150 262,202', 'url(#f17b)') + poly('150,202 320,50 320,68 172,202', '#2f8fe0', .35) + chip(false) + slant('#fff') },
    mufg: { ink: '#fff', art: base('f18', '#d8222f', '#770912') + poly('0,0 110,0 30,202 0,202', '#fff', .07) +
      '<path d="M-20 192Q160 152 340 52" fill="none" stroke="#fff" stroke-opacity=".1" stroke-width="46"/><path d="M-20 168Q160 128 340 28" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="1.5"/>' + chip(false) + slant('#fff') },
    'amazon-prime-mc': { ink: '#fff', art: amazon('f19', '#323234', '#0e0e10', '#fff', .04, '#e6e6e8') },
    'amazon-mc': { ink: '#5b6067', d: 1, art: amazon('f20', '#eeeff1', '#b5b7bb', '#fff', .28, '#7b7f85') },
    'seven-plus': { ink: '#fff', art: '<defs><pattern id="f21p" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0H9M0 0V9" stroke="#fff" stroke-opacity=".08"/></pattern></defs>' +
      base('f21', '#1f3579', '#0b173f') + '<rect width="320" height="202" fill="url(#f21p)"/><path d="M110 202Q250 192 320 56V118Q266 202 196 202z" fill="#fff" opacity=".16"/>' +
      word(102, 92, [12, 11, 12, 11, 12], 10, '#fff') + word(176, 92, [12, 11, 11, 12], 10, '#fff') + word(148, 110, [6, 6, 6, 6], 5, '#fff', .85) +
      ['#e94e77', '#f6a623', '#f4dd1e', '#7ed321', '#4a90e2', '#9b59b6'].map((c, i) => `<rect x="${264 + i * 6}" y="52" width="6" height="14" fill="${c}"/>`).join('') + chip(true) + trio('fill') },
    epos: { ink: '#77776f', d: 1, art: base('f22', '#f6f6f4', '#cdcdca') + poly('120,0 210,0 130,202 40,202', '#fff', .35) + word(100, 88, [24, 24, 28, 24], 32, '#b9b9b3', .45) + chip(false, 28, 60) + slant('#b0b0aa') },
    'famima-card': { ink: '#3e4b5c', d: 1, art: base('f23', '#f1f2f4', '#c3c6cb') + poly('130,0 220,0 140,202 50,202', '#fff', .3) + '<rect width="6" height="202" fill="#00a041"/><rect x="6" width="6" height="202" fill="#0b62b6"/>' + chip(false, 32, 82) + wave('#8d9299', 82, 96) + trio('line', '#8d9299') },
    'lawson-ponta': { ink: '#fff', art: base('f24', '#14213f', '#050914') + '<rect x="7" y="7" width="306" height="188" rx="10" fill="none" stroke="#2f73d8" stroke-width="1.2"/>' +
      '<g fill="none" stroke="#fff" stroke-width="4"><ellipse cx="248" cy="106" rx="14" ry="11"/><ellipse cx="276" cy="106" rx="14" ry="11"/></g>' + chip(true) + duo() },
    'bic-suica': { ink: '#1d6b2a', d: 1, art: base('f25', '#c6e44d', '#58ad30') + '<rect width="320" height="40" fill="#fff" opacity=".93"/>' + word(96, 76, [16, 9, 16, 8, 16, 16, 16, 14, 16], 8, '#1f6f2c', .8) +
      word(96, 92, [20, 18, 10, 18, 18], 26, '#1f6f2c', .9) + circle(266, 104, 19, '#1d1d1f') + '<ellipse cx="266" cy="110" rx="10" ry="12" fill="#fff"/><path d="M262 100h8l-4 5z" fill="#f2a31b"/>' +
      '<rect x="242" y="144" width="62" height="42" rx="6" fill="#fff"/>' + chip(true) + trio('color') },
    'view-std': { ink: '#fff', art: base('f26', '#2f77d2', '#15479a') + '<g fill="none" stroke="#fff" stroke-opacity=".15" stroke-width="14"><path d="M-10 150C60 110 120 190 200 140S300 110 330 130"/><path d="M-10 190C60 150 120 230 200 180S300 150 330 170"/><path d="M-10 110C60 70 120 150 200 100S300 70 330 90"/></g>' + chip(true) + trio('fill') },
    'jal-suica-gold': { ink: '#fff', art: `<defs>${lin('f33h', 1, 1, '#ece6d8', '#9ea6b2', '#f8f1e0')}</defs>` + base('f33', '#b38c1e', '#6a5007') +
      poly('64,202 244,0 262,0 82,202', '#fff', .08) + poly('148,202 320,44 320,64 168,202', '#fff', .07) +
      '<circle cx="168" cy="90" r="27" fill="none" stroke="#f2d47c" stroke-width="2.4"/>' +
      '<path d="M151 98q8-22 31-25q-9 7-9 14q11-2 15 4q-13 0-23 15z" fill="#f2d47c"/>' + word(156, 103, [6, 6, 6], 6, '#f2d47c') +
      '<rect x="224" y="70" width="56" height="34" rx="4" fill="url(#f33h)" opacity=".9"/>' +
      word(24, 140, [9, 9, 9, 9, 4, 9, 9, 9, 9, 4, 8, 8, 8, 8], 9, '#3a2902', .6) + word(24, 157, [7, 7, 7, 7, 7, 4, 7, 7, 7, 7], 6, '#3a2902', .5) +
      '<rect x="196" y="160" width="42" height="18" rx="9" fill="#1b8f4b"/>' + word(204, 166, [5, 5, 5, 5], 6, '#fff') + chip(true, 28, 72) + trio('line', '#f2d47c') },
    mercard: { ink: '#55585e', d: 1, art: `<defs>${lin('f27m', 1, 1, '#ff8fa3', '#8fb8ff', '#9ff0c8')}</defs>` + base('f27', '#fbfbfb', '#dcdde0') +
      '<rect x="264" y="52" width="30" height="30" rx="7" fill="url(#f27m)"/><path d="M272 74V62l7 7 7-7v12" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>' + chip(false) + wave('#a0a3a9', 82, 96) },
    orico: { ink: '#fff', art: base('f28', '#2e2826', '#0c0a09') + chip(true) + wave('#bdb9b6', 270, 112) + duo() },
    'eneos-s': { ink: '#fff', art: eneos('f29', 'S') },
    'eneos-p': { ink: '#fff', art: eneos('f30', 'P') },
    'apollo-card': { ink: '#666b73', d: 1, art: base('f31', '#f5f6f7', '#b4b8be') + poly('110,0 200,0 120,202 30,202', '#fff', .35) +
      '<g transform="translate(46 112) skewX(-24)" fill="#7b8087"><rect width="18" height="5"/><rect y="8" width="18" height="5"/><rect y="16" width="14" height="5"/></g>' +
      word(72, 112, [10, 10, 10, 5, 5, 10, 9, 7, 10, 7, 5, 10, 10], 14, '#7b8087') + chip(false, 28, 58) + '<rect x="268" y="150" width="34" height="32" rx="3" fill="#2f6fb5" opacity=".85"/>' },

    'rakuten-pay': { ink: '#fff', art: tile('p1', '#c80000', '#860000', '<rect x="112" y="90" width="96" height="54" rx="27" fill="#fff"/>' + word(132, 108, [14, 10, 14, 10], 18, '#bf0000')) },
    paypay: { ink: '#fff', art: tile('p2', '#ff1f49', '#d4002a', '<rect x="128" y="84" width="64" height="64" rx="15" fill="#fff"/><path d="M150 136V100h14a10 10 0 0 1 0 20h-14" fill="none" stroke="#ff0033" stroke-width="7" stroke-linejoin="round"/>') },
    dbarai: { ink: '#fff', art: tile('p3', '#d6003b', '#9a0026', circle(160, 116, 31, '#fff') + '<path d="M170 98v34M170 124a10 10 0 1 1 0-14" fill="none" stroke="#cc0033" stroke-width="6" stroke-linecap="round"/>') },
    aupay: { ink: '#fff', art: tile('p4', '#ff7d1f', '#e04c00', word(104, 102, [20, 20], 26, '#fff') + word(158, 102, [18, 18, 18], 26, '#fff')) },
    'aeon-pay': { ink: '#fff', art: tile('p5', '#c6007f', '#6a1493', '<rect x="128" y="84" width="64" height="64" rx="15" fill="#fff"/><path d="M146 126a16 16 0 1 1 28 0" fill="none" stroke="#b5007f" stroke-width="7" stroke-linecap="round"/>') },
    famipay: { ink: '#0b62b6', d: 1, art: base('p6', '#fff', '#e6eaee') + '<rect y="150" width="320" height="26" fill="#00a041"/><rect y="176" width="320" height="26" fill="#0b62b6"/>' + word(108, 92, [16, 14, 18, 8], 20, '#00a041') + word(176, 92, [14, 14, 14], 20, '#0b62b6') },
    suica: { ink: '#fff', art: tile('p7', '#38c45d', '#0c8a39', '<ellipse cx="160" cy="120" rx="104" ry="46" fill="#eef2f3" opacity=".94"/>' + word(84, 108, [18, 16, 9, 16, 16], 24, '#1c8b3a') +
      circle(226, 116, 21, '#1d1d1f') + '<ellipse cx="226" cy="123" rx="11" ry="13" fill="#fff"/><path d="M222 111h8l-4 5z" fill="#f2a31b"/>') },

    // 自分で追加したカード用：色だけを差し替える
    custom: (c1, c2) => ({ ink: '#fff', art: base('fc' + c1.slice(1), c1, c2) + poly('0,0 150,0 70,202 0,202', '#fff', .08) + chip(true) + wave('#fff', 270, 122) }),
  };
})();
