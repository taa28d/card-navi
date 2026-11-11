// 還元率データ。数字を直すときはこのファイルだけを編集する。
// 各カードの checked は公式サイトで内容を確かめた日、src はその出典ページ。
// 直したら DATA_UPDATED と、そのカードの checked も新しい日付にする。
const DATA_UPDATED = '2026-11-11';

const CATEGORIES = [
  { id: 'conv', name: 'コンビニ', icon: '🏪' },
  { id: 'super', name: 'スーパー', icon: '🛒' },
  { id: 'drug', name: 'ドラッグストア', icon: '💊' },
  { id: 'food', name: '飲食店', icon: '🍽️' },
  { id: 'cafe', name: 'カフェ', icon: '☕' },
  { id: 'gas', name: 'ガソリン', icon: '⛽' },
  { id: 'online', name: 'ネット通販', icon: '📦' },
];

// k は検索用のよみがな（ひらがな・英字小文字）
const STORES = [
  { id: 'seven', name: 'セブン-イレブン', cat: 'conv', k: 'せぶんいれぶん seven 7' },
  { id: 'lawson', name: 'ローソン', cat: 'conv', k: 'ろーそん lawson' },
  { id: 'famima', name: 'ファミリーマート', cat: 'conv', k: 'ふぁみりーまーと ふぁみま familymart' },
  { id: 'ministop', name: 'ミニストップ', cat: 'conv', k: 'みにすとっぷ ministop' },
  { id: 'seico', name: 'セイコーマート', cat: 'conv', k: 'せいこーまーと seicomart' },
  { id: 'poplar', name: 'ポプラ', cat: 'conv', k: 'ぽぷら せいかつさいか poplar' },
  { id: 'daily', name: 'デイリーヤマザキ', cat: 'conv', k: 'でいりーやまざき daily' },
  { id: 'newdays', name: 'NewDays', cat: 'conv', k: 'にゅーでいず newdays' },

  { id: 'aeon', name: 'イオン', cat: 'super', k: 'いおん いおんすたいる aeon' },
  { id: 'maxvalu', name: 'マックスバリュ', cat: 'super', k: 'まっくすばりゅ maxvalu' },
  { id: 'daiei', name: 'ダイエー', cat: 'super', k: 'だいえー daiei' },
  { id: 'mybasket', name: 'まいばすけっと', cat: 'super', k: 'まいばすけっと' },
  { id: 'maruetsu', name: 'マルエツ', cat: 'super', k: 'まるえつ maruetsu' },
  { id: 'inageya', name: 'いなげや', cat: 'super', k: 'いなげや' },
  { id: 'yokado', name: 'イトーヨーカドー', cat: 'super', k: 'いとーよーかどー yokado' },
  { id: 'yorkbeni', name: 'ヨークベニマル', cat: 'super', k: 'よーくべにまる' },
  { id: 'yorkmart', name: 'ヨークマート・ヨークフーズ', cat: 'super', k: 'よーくまーと よーくふーず' },
  { id: 'seiyu', name: '西友', cat: 'super', k: 'せいゆう seiyu' },
  { id: 'life', name: 'ライフ', cat: 'super', k: 'らいふ life' },
  { id: 'summit', name: 'サミット', cat: 'super', k: 'さみっと summit' },
  { id: 'yaoko', name: 'ヤオコー', cat: 'super', k: 'やおこー yaoko' },
  { id: 'ok', name: 'オーケー', cat: 'super', k: 'おーけー ok' },
  { id: 'ozeki', name: 'オオゼキ', cat: 'super', k: 'おおぜき' },
  { id: 'tokyu', name: '東急ストア', cat: 'super', k: 'とうきゅうすとあ' },
  { id: 'tobu', name: '東武ストア', cat: 'super', k: 'とうぶすとあ' },
  { id: 'hanamasa', name: '肉のハナマサ', cat: 'super', k: 'にくのはなまさ' },
  { id: 'heiwado', name: '平和堂', cat: 'super', k: 'へいわどう' },
  { id: 'izumiya', name: 'イズミヤ', cat: 'super', k: 'いずみや' },
  { id: 'mandai', name: '万代', cat: 'super', k: 'まんだい' },
  { id: 'gyomu', name: '業務スーパー', cat: 'super', k: 'ぎょうむすーぱー' },
  { id: 'seijo', name: '成城石井', cat: 'super', k: 'せいじょういしい' },

  { id: 'matsukiyo', name: 'マツモトキヨシ', cat: 'drug', k: 'まつもときよし まつきよ' },
  { id: 'cocokara', name: 'ココカラファイン', cat: 'drug', k: 'ここからふぁいん' },
  { id: 'welcia', name: 'ウエルシア', cat: 'drug', k: 'うえるしあ welcia' },
  { id: 'tsuruha', name: 'ツルハドラッグ', cat: 'drug', k: 'つるはどらっぐ' },
  { id: 'sugi', name: 'スギ薬局', cat: 'drug', k: 'すぎやっきょく' },
  { id: 'sundrug', name: 'サンドラッグ', cat: 'drug', k: 'さんどらっぐ' },
  { id: 'aoki', name: 'クスリのアオキ', cat: 'drug', k: 'くすりのあおき' },
  { id: 'tomods', name: 'トモズ', cat: 'drug', k: 'ともず tomods' },
  { id: 'create', name: 'クリエイトSD', cat: 'drug', k: 'くりえいとえすでぃー create' },

  { id: 'mcd', name: 'マクドナルド', cat: 'food', k: 'まくどなるど まっく mcdonalds' },
  { id: 'mos', name: 'モスバーガー', cat: 'food', k: 'もすばーがー mos' },
  { id: 'freshness', name: 'フレッシュネスバーガー', cat: 'food', k: 'ふれっしゅねすばーがー' },
  { id: 'kfc', name: 'ケンタッキー', cat: 'food', k: 'けんたっきー kfc' },
  { id: 'zetteria', name: 'ゼッテリア・ロッテリア', cat: 'food', k: 'ぜってりあ ろってりあ' },
  { id: 'yoshinoya', name: '吉野家', cat: 'food', k: 'よしのや' },
  { id: 'sukiya', name: 'すき家', cat: 'food', k: 'すきや' },
  { id: 'matsuya', name: '松屋', cat: 'food', k: 'まつや' },
  { id: 'saizeriya', name: 'サイゼリヤ', cat: 'food', k: 'さいぜりや' },
  { id: 'gusto', name: 'ガスト', cat: 'food', k: 'がすと gusto' },
  { id: 'bamiyan', name: 'バーミヤン', cat: 'food', k: 'ばーみやん' },
  { id: 'jonathan', name: 'ジョナサン', cat: 'food', k: 'じょなさん' },
  { id: 'syabuyo', name: 'しゃぶ葉', cat: 'food', k: 'しゃぶよう' },
  { id: 'yumean', name: '夢庵', cat: 'food', k: 'ゆめあん' },
  { id: 'dennys', name: 'デニーズ', cat: 'food', k: 'でにーず dennys' },
  { id: 'cocos', name: 'ココス', cat: 'food', k: 'ここす cocos' },
  { id: 'royalhost', name: 'ロイヤルホスト', cat: 'food', k: 'ろいやるほすと' },
  { id: 'hamazushi', name: 'はま寿司', cat: 'food', k: 'はまずし' },
  { id: 'kappa', name: 'かっぱ寿司', cat: 'food', k: 'かっぱずし' },
  { id: 'sushiro', name: 'スシロー', cat: 'food', k: 'すしろー' },
  { id: 'kura', name: 'くら寿司', cat: 'food', k: 'くらずし' },
  { id: 'ohsho', name: '餃子の王将', cat: 'food', k: 'ぎょうざのおうしょう' },
  { id: 'cocoichi', name: 'CoCo壱番屋', cat: 'food', k: 'ここいちばんや ここいち' },
  { id: 'marugame', name: '丸亀製麺', cat: 'food', k: 'まるがめせいめん' },
  { id: 'pizzahut', name: 'ピザハット', cat: 'food', k: 'ぴざはっと' },
  { id: 'dominos', name: 'ドミノ・ピザ', cat: 'food', k: 'どみのぴざ' },

  { id: 'starbucks', name: 'スターバックス', cat: 'cafe', k: 'すたーばっくす すたば starbucks' },
  { id: 'doutor', name: 'ドトール', cat: 'cafe', k: 'どとーる doutor' },
  { id: 'excelsior', name: 'エクセルシオール カフェ', cat: 'cafe', k: 'えくせるしおーる' },
  { id: 'tullys', name: 'タリーズ', cat: 'cafe', k: 'たりーず tullys' },
  { id: 'komeda', name: 'コメダ珈琲店', cat: 'cafe', k: 'こめだこーひー' },
  { id: 'stmarc', name: 'サンマルクカフェ', cat: 'cafe', k: 'さんまるくかふぇ' },
  { id: 'pronto', name: 'プロント', cat: 'cafe', k: 'ぷろんと pronto' },
  { id: 'ueshima', name: '上島珈琲店', cat: 'cafe', k: 'うえしまこーひー' },
  { id: 'cafedecrie', name: 'カフェ・ド・クリエ', cat: 'cafe', k: 'かふぇどくりえ' },

  { id: 'eneos', name: 'ENEOS', cat: 'gas', k: 'えねおす eneos' },
  { id: 'apollo', name: 'apollostation（出光）', cat: 'gas', k: 'あぽろすてーしょん いでみつ apollostation' },
  { id: 'cosmo', name: 'コスモ石油', cat: 'gas', k: 'こすもせきゆ cosmo' },

  { id: 'amazon', name: 'Amazon', cat: 'online', k: 'あまぞん amazon' },
  { id: 'rakuten', name: '楽天市場', cat: 'online', k: 'らくてんいちば rakuten' },
  { id: 'yahoo', name: 'Yahoo!ショッピング', cat: 'online', k: 'やふーしょっぴんぐ yahoo' },
];

// 支払い方法のラベル
const METHODS = {
  card: 'カード払い',
  touch: 'スマホのタッチ決済',
  applepay: 'Apple Payのタッチ決済',
  quicpay: 'QUICPay',
  code: 'コード決済',
  ic: 'モバイルSuica',
  charge: 'オンライン入金・モバイルオーダー',
  mobile: 'モバイルオーダー・ネット注文',
};

// その支払い手段が使えると、各社の公式「使えるお店」一覧で確かめられたお店。
// 載っていないお店は「使えるかはお店で確認」として、順位には入れずに表示する。
const ids = s => s.split(',');
const ACCEPT = {
  // QUICPay公式（2026年3月末時点）。松屋は三菱UFJカード公式の記載による
  quicpay: ids('seven,lawson,famima,ministop,seico,poplar,daily,newdays,aeon,maxvalu,daiei,mybasket,yokado,yorkbeni,yorkmart,seiyu,ok,ozeki,tobu,heiwado,izumiya,matsukiyo,cocokara,welcia,tsuruha,sugi,sundrug,tomods,create,mcd,mos,freshness,kfc,yoshinoya,sukiya,matsuya,gusto,bamiyan,jonathan,yumean,dennys,royalhost,hamazushi,kappa,ohsho,cocoichi,doutor,excelsior,tullys,komeda,cafedecrie,eneos,apollo'),
  // 楽天ペイ公式「使えるお店」
  rpay: ids('seven,lawson,famima,ministop,seico,poplar,daily,newdays,inageya,yokado,yorkbeni,yorkmart,seiyu,life,summit,ok,ozeki,tokyu,tobu,heiwado,izumiya,mandai,matsukiyo,cocokara,welcia,tsuruha,sugi,sundrug,aoki,tomods,create,mcd,freshness,kfc,zetteria,yoshinoya,sukiya,matsuya,gusto,bamiyan,jonathan,syabuyo,yumean,dennys,cocos,royalhost,hamazushi,kappa,sushiro,kura,ohsho,cocoichi,starbucks,doutor,excelsior,tullys,komeda,stmarc,pronto,ueshima,apollo,cosmo'),
  // d払い公式「街のお店」
  dpay: ids('seven,lawson,famima,ministop,seico,poplar,daily,inageya,yokado,yorkbeni,yorkmart,seiyu,life,summit,ok,ozeki,tokyu,tobu,heiwado,izumiya,mandai,matsukiyo,cocokara,welcia,tsuruha,sugi,sundrug,aoki,tomods,mcd,mos,kfc,zetteria,yoshinoya,sukiya,matsuya,gusto,bamiyan,jonathan,syabuyo,yumean,dennys,cocos,royalhost,hamazushi,kappa,sushiro,kura,ohsho,cocoichi,marugame,starbucks,doutor,excelsior,tullys,komeda,stmarc,pronto,ueshima,apollo,cosmo'),
  // PayPay公式「主なご利用可能店舗」（掲載は一部）
  paypay: ids('seven,lawson,famima,ministop,seico,poplar,daily,newdays,inageya,yokado,yorkbeni,yorkmart,seiyu,life,summit,ozeki,tokyu,tobu,matsukiyo,cocokara,welcia,tsuruha,sugi,sundrug,aoki,tomods,create,mos,freshness,kfc,zetteria,yoshinoya,sukiya,matsuya,gusto,bamiyan,jonathan,syabuyo,yumean,dennys,cocos,hamazushi,kappa,sushiro,kura,cocoichi,starbucks,doutor,excelsior,tullys,stmarc,pronto,ueshima,cosmo'),
  // au PAY公式の紹介記事に名前があるお店（公式の検索ページがメンテナンス中で、掲載は一部）
  aupay: ids('seven,lawson,famima,ministop,yokado,yorkbeni,seiyu,life,seijo,matsukiyo,welcia,tsuruha,sugi,mcd,mos,yoshinoya,sukiya,starbucks,doutor,komeda'),
  // JR東日本公式「Suicaが使えるお店」の掲載例（2018年11月時点の一覧で、掲載は一部）
  ic: ids('seven,lawson,famima,ministop,seico,daily,aeon,daiei,mybasket,maruetsu,yokado,yorkbeni,yorkmart,life,summit,ok,hanamasa,welcia,cocokara,tsuruha,sugi,sundrug,aoki,tomods,mcd,mos,kfc,yoshinoya,sukiya,matsuya,gusto,bamiyan,jonathan,yumean,dennys,royalhost,kappa,cocoichi,dominos,starbucks,doutor,excelsior,tullys,komeda,stmarc,pronto,cafedecrie'),
  // イオンカード公式「いつでもポイント2倍の対象店」
  aeonpay: ids('aeon,maxvalu,daiei,mybasket,maruetsu,inageya,ministop,welcia'),
};
const ACCEPT_NAMES = { quicpay: 'QUICPay', rpay: '楽天ペイ', dpay: 'd払い', paypay: 'PayPay', aupay: 'au PAY', ic: '交通系IC', aeonpay: 'AEON Pay' };

// ---- よく使う条件のまとまり ----

// 三井住友カード「対象のコンビニ・飲食店」（スマホのタッチ決済）
const SMBC_TOUCH = ids('seven,lawson,seico,poplar,mcd,mos,freshness,kfc,yoshinoya,sukiya,saizeriya,gusto,bamiyan,jonathan,syabuyo,yumean,cocos,hamazushi,kappa,doutor,excelsior');
const SMBC_OPTS = [{ id: 'seven', label: 'セブン‐イレブンアプリとVポイントを連携している', short: 'アプリ連携' }];
const smbcRules = (rate, sevenRate) => [
  { rate, method: 'touch', stores: SMBC_TOUCH, note: 'スマホのタッチ決済が条件。カード現物のタッチ決済・iD・差し込みは通常ポイントのみ' },
  { rate, method: 'touch', stores: ['ministop'], until: '2027-01-31', note: 'ミニストップは2027年1月31日の利用分まで' },
  { rate, method: 'mobile', stores: ['ohsho'], note: '餃子の王将はテイクアウトのネット予約（事前決済）が対象' },
  { rate: sevenRate, method: 'touch', stores: ['seven'], if: 'seven', note: '会員コードを提示してスマホのタッチ決済。うち0.5%はセブンマイル。たばこは追加分の対象外' },
];
const SMBC_SRC = 'https://www.smbc-card.com/mem/wp/vpoint_up_program/index.jsp';
const SMBC_MEMO = '2027年2月1日の利用分から、対象コンビニでのたばこの購入は通常ポイントだけになります。家族ポイントやVポイントアッププログラムの上乗せは、ここには含めていません。';

// JCBのJ-POINTパートナー（事前のポイントアップ登録が必要）。w は JCBカード W の上乗せ分0.5%
const jcbRules = w => [
  { rate: 1.5 + w, method: 'card', stores: ['seven', 'amazon'], note: 'ポイントアップ登録が必要。セブンのスマホレジ・ネット注文は対象外' },
  { rate: 10 + w, method: 'charge', stores: ['starbucks'], note: 'スターバックス カードへのオンライン入金・オートチャージ、モバイルオーダーが対象。店頭での支払いは対象外' },
  { rate: 10 + w, method: 'mobile', stores: ['mcd'], note: 'モバイルオーダーとマックデリバリーのみ対象' },
  { rate: 10 + w, method: 'card', stores: ['sukiya'], note: 'ポイントアップ登録が必要。QUICPay（Apple Payなど）での支払いは対象外' },
  { rate: 10 + w, method: 'card', stores: ['yoshinoya'], note: 'ポイントアップ登録が必要' },
  { rate: 10 + w, method: 'card', stores: ['gusto', 'bamiyan', 'jonathan'], note: 'ポイントアップ登録が必要。すかいらーくアプリのテーブル決済は対象外' },
  { rate: 10 + w, method: 'card', stores: ['stmarc', 'dominos'], note: 'ポイントアップ登録が必要。対象になる支払い方法は登録ページで確認' },
  { rate: 2.5 + w, method: 'card', stores: ['poplar'], note: 'ポイントアップ登録が必要' },
  { rate: 1 + w, method: 'card', stores: ['welcia', 'apollo', 'seijo'], note: 'ポイントアップ登録が必要' },
];
const JCB_SRC = 'https://j-pointpartner.jcb.co.jp/search';
const JCB_MEMO = '2026年1月にポイントが「J-POINT」に変わりました。率は1ポイントを1円相当で使った場合です。優待店はどれも事前のポイントアップ登録（無料）が必要です。';

// dカード特約店
const D_RULES = [
  { rate: 3, method: 'card', stores: ['matsukiyo', 'cocokara'], note: 'dカード特約店（マツキヨココカラ）' },
  { rate: 4, method: 'charge', stores: ['doutor'], note: 'ドトール バリューカードへのチャージが対象' },
];
const D_SRC = 'https://dcard.docomo.ne.jp/st/dpoint_tokuyaku/index.html';

// イオンマークのカード
const AEON_GROUP = ids('aeon,maxvalu,daiei,mybasket,maruetsu,inageya,ministop,welcia');
const AEON_DAYS = [
  { rate: 5, off: true, method: 'card', days: [20, 30], stores: ['aeon', 'maxvalu'], note: 'お客さま感謝デー。一部の店舗・商品は対象外' },
  { rate: 2.5, method: 'card', days: [10], stores: ['aeon'], note: 'ありが10デー（本州・四国のイオン、イオンスタイル）はポイント5倍' },
];
const aeonRules = () => [{ rate: 1, method: 'card', stores: AEON_GROUP, note: 'イオングループ対象店舗はいつでもポイント2倍' }, ...AEON_DAYS];
const AEON_SRC = 'https://faq.aeon.co.jp/faq/show/6781';

const amazonRules = rate => [
  { rate, method: 'card', stores: ['amazon'] },
  { rate: 7, method: 'applepay', stores: ['seven'], note: 'Apple PayでのMastercardタッチ決済のみ。Google Payなどは1.5%。たばこは上乗せの対象外' },
  { rate: 1.5, method: 'card', stores: ['seven', 'lawson', 'famima'] },
];
const AMAZON_SRC = 'https://www.smbc-card.com/nyukai/affiliate/amazon/';

const LITER_NOTE = '並び順は、1L＝170円として約1.2%で計算しています';

// ---- カードとスマホ決済 ----
// kind: 'card' = クレジットカード / 'pay' = スマホ決済（online に書いたネット通販以外では、ネット通販は対象外）
// base: 基本の還元率 / baseNext: 変更予定 / need: 使えるお店の確認が必要な支払い手段（ACCEPT の名前）
// opts: 人によって違う条件。カードの画面でオン・オフでき、rules の if で参照する（on:true は最初からオン）
// rules: stores（店ID）、または where:'offline'（ネット通販以外）/ where:'all'（すべて）で対象を指定する
//   days … 毎月その日だけ / hours … [開始時, 終了時) / until … その日の利用分まで / off … ポイントではなく割引
//   label … %の代わりに表示する言葉 / need … その払い方に必要な支払い手段
const CARDS = [
  { id: 'smbc-nl', kind: 'card', name: '三井住友カード（NL）', issuer: '三井住友カード', base: 0.5,
    opts: SMBC_OPTS, rules: smbcRules(7, 10), checked: '2026-11-10', src: SMBC_SRC, memo: SMBC_MEMO },
  { id: 'smbc-gold-nl', kind: 'card', name: '三井住友カード ゴールド（NL）', issuer: '三井住友カード', base: 0.5,
    opts: SMBC_OPTS, rules: smbcRules(7, 10), checked: '2026-11-10', src: SMBC_SRC, memo: SMBC_MEMO },
  { id: 'smbc-pp', kind: 'card', name: '三井住友カード プラチナプリファード', issuer: '三井住友カード', base: 1,
    opts: SMBC_OPTS,
    rules: [
      ...smbcRules(7, 10),
      { rate: 2, method: 'card', stores: ['daily', 'pronto'], note: 'リワードアップ プラチナプリファードの対象店（＋1%）' },
      { rate: 2, method: 'card', stores: ['matsukiyo', 'cocokara', 'aoki', 'tomods'], note: 'リワードアップ プラチナプリファードの対象店（＋1%）' },
      { rate: 2, method: 'card', stores: ['life', 'yaoko', 'heiwado', 'izumiya', 'mandai'], note: 'リワードアップ プラチナプリファードの対象店（＋1%）' },
    ],
    checked: '2026-11-10', src: 'https://www.smbc-card.com/nyukai/platinum-preferred/special-store/index.jsp', memo: SMBC_MEMO },
  { id: 'olive', kind: 'card', name: 'Olive フレキシブルペイ', issuer: '三井住友銀行', base: 0.5,
    opts: SMBC_OPTS, rules: smbcRules(8, 11), checked: '2026-11-10', src: SMBC_SRC,
    memo: 'クレジットモードで支払った場合の率です（ポイント払いモードは対象外）。' + SMBC_MEMO },
  { id: 'olive-gold', kind: 'card', name: 'Olive フレキシブルペイ ゴールド', issuer: '三井住友銀行', base: 0.5,
    opts: SMBC_OPTS, rules: smbcRules(8, 11), checked: '2026-11-11', src: SMBC_SRC,
    memo: 'クレジットモードで支払った場合の率です（ポイント払いモードは対象外）。年間100万円使うと、翌年以降の年会費が無料になります。' + SMBC_MEMO },

  { id: 'rakuten', kind: 'card', name: '楽天カード', issuer: '楽天カード', base: 1,
    rules: [{ rate: 3, method: 'card', stores: ['rakuten'], note: '楽天市場の通常分1倍＋カード通常分1倍＋カード特典分1倍（特典分は月1,000ポイントまで）' }],
    checked: '2026-11-10', src: 'https://www.rakuten-card.co.jp/point/' },

  { id: 'jcb-w', kind: 'card', name: 'JCBカード W', issuer: 'JCB', base: 1, rules: jcbRules(0.5),
    checked: '2026-11-10', src: JCB_SRC, memo: JCB_MEMO },
  { id: 'jcb-s', kind: 'card', name: 'JCBカード S', issuer: 'JCB', base: 0.5, rules: jcbRules(0),
    checked: '2026-11-10', src: JCB_SRC, memo: JCB_MEMO },

  { id: 'dcard', kind: 'card', name: 'dカード', issuer: 'NTTドコモ', base: 1, baseNext: { from: '2027-01-01', rate: 0.5 }, rules: D_RULES,
    checked: '2026-11-10', src: D_SRC,
    memo: '2027年1月の利用分から、通常の還元率が1%から0.5%に下がる予定です（特約店の合計がどうなるかは未発表）。ENEOSとスターバックス カードの特約店はすでに終了しています。' },
  { id: 'dcard-gold', kind: 'card', name: 'dカード GOLD', issuer: 'NTTドコモ', base: 1, rules: D_RULES,
    checked: '2026-11-10', src: D_SRC },

  { id: 'aupay-card', kind: 'card', name: 'au PAY カード', issuer: 'auフィナンシャルサービス', base: 1, rules: [],
    checked: '2026-11-10', src: 'https://www.kddi-fs.com/function/promotion/reward/' },

  { id: 'paypay-card', kind: 'card', name: 'PayPayカード', issuer: 'PayPayカード', base: 1,
    opts: [{ id: 'step', label: 'PayPayステップを達成している（月30回・10万円以上）', short: 'ステップ達成' }],
    rules: [
      { rate: 1.5, method: 'card', where: 'all', if: 'step' },
      { rate: 5, method: 'card', stores: ['yahoo'], note: '「毎日5%」。うち3%は期間限定ポイントで、付与条件と上限あり' },
    ],
    checked: '2026-11-10', src: 'https://www.paypay-card.co.jp/service/benefit/point/',
    memo: '2026年6月から、PayPayアプリへのカード登録と本人確認が必要になりました。' },

  { id: 'aeon-select', kind: 'card', name: 'イオンカードセレクト', issuer: 'イオン銀行', base: 0.5, rules: aeonRules(),
    checked: '2026-11-10', src: AEON_SRC },
  { id: 'aeon-waon', kind: 'card', name: 'イオンカード（WAON一体型）', issuer: 'イオン銀行', base: 0.5, rules: aeonRules(),
    checked: '2026-11-10', src: AEON_SRC },
  { id: 'welcia-card', kind: 'card', name: 'ウエルシアカード', issuer: 'イオン銀行', base: 0.5,
    rules: [
      { rate: 1, method: 'card', stores: AEON_GROUP.filter(s => s !== 'welcia'), note: 'イオングループ対象店舗はいつでもポイント2倍' },
      { rate: 1.5, method: 'card', stores: ['welcia'], note: 'クレジット払いで200円ごとに3ポイント。カード提示の1%は別に付く' },
      { rate: 10, method: 'card', days: [10], stores: ['welcia'], note: '毎月10日はクレジット払いで10%還元（一部対象外の店舗あり）' },
      ...AEON_DAYS,
    ],
    checked: '2026-11-10', src: 'https://www.aeon.co.jp/card/lineup/welcia/' },

  { id: 'saison-pearl', kind: 'card', name: 'セゾンパール・アメックス', issuer: 'クレディセゾン', base: 0.5,
    rules: [{ rate: 2, method: 'quicpay', where: 'offline', need: 'quicpay', note: 'Apple Pay / Google PayのQUICPayが対象。年間30万円の利用まで（超えると0.5%）' }],
    checked: '2026-11-10', src: 'https://www.saisoncard.co.jp/amextop/pearl-pro/' },
  { id: 'saison-intl', kind: 'card', name: 'セゾンカードインターナショナル', issuer: 'クレディセゾン', base: 0.5, rules: [],
    checked: '2026-11-11', src: 'https://www.saisoncard.co.jp/creditcard/lineup/001/',
    memo: '1,000円ごとに永久不滅ポイント1ポイント（最大5円相当）です。' },

  { id: 'recruit', kind: 'card', name: 'リクルートカード', issuer: 'リクルート', base: 1.2, rules: [],
    checked: '2026-11-10', src: 'https://recruit-card.jp/' },

  { id: 'mufg', kind: 'card', name: '三菱UFJカード', issuer: '三菱UFJニコス', base: 0.5,
    rules: [
      { rate: 7, method: 'card', stores: ids('seven,lawson,matsuya,kura,sushiro,zetteria,ueshima,cafedecrie,ok,ozeki,tokyu,tobu,hanamasa'),
        note: 'カード払い・カードのタッチ決済・Apple PayのQUICPayが対象。スマホのタッチ決済は対象外。優遇は月5万円の利用まで' },
      { rate: 7, method: 'charge', stores: ['starbucks'], note: 'スターバックス カードへのオンライン入金のみ対象' },
      { rate: 7, method: 'mobile', stores: ['pizzahut'], note: '公式サイト・公式アプリでのオンライン注文が対象' },
    ],
    checked: '2026-11-10', src: 'https://www.cr.mufg.jp/apply/card/mucard/pup/index.html',
    memo: '7%は1ポイントを5円相当で交換した場合の率です。三菱UFJ銀行を引落口座にしてエントリーすると、条件に応じて最大20%。アメックスブランドは2026年12月16日からすべての対象店で優遇されます。' },

  { id: 'amazon-prime-mc', kind: 'card', name: 'Amazon Prime Mastercard', issuer: '三井住友カード', base: 1, rules: amazonRules(2),
    checked: '2026-11-10', src: AMAZON_SRC },
  { id: 'amazon-mc', kind: 'card', name: 'Amazon Mastercard', issuer: '三井住友カード', base: 1, rules: amazonRules(1.5),
    checked: '2026-11-10', src: AMAZON_SRC },

  { id: 'seven-plus', kind: 'card', name: 'セブンカード・プラス', issuer: 'セブン・カードサービス', base: 0.5,
    opts: [
      { id: 'sid', label: 'カードを7iDに登録している', short: '7iD登録', on: true },
      { id: 'bank', label: '引落口座をセブン銀行にしている', short: 'セブン銀行口座' },
    ],
    rules: [
      { rate: 3, method: 'card', stores: ['seven'], note: 'QUICPayとVisaのApple Payは0.5%。たばこは対象外' },
      { rate: 4, method: 'card', stores: ['seven'], if: 'bank' },
      { rate: 10, method: 'card', stores: ['seven'], if: 'sid', note: 'うち0.5%はセブンマイル。QUICPayとVisaのApple Payは0.5%。たばこは対象外' },
      { rate: 11, method: 'card', stores: ['seven'], if: ['sid', 'bank'] },
      { rate: 1, method: 'card', stores: ['yokado', 'yorkbeni', 'yorkmart', 'dennys'], note: 'Apple Pay・QUICPayでの支払いは0.5%' },
      { rate: 5, off: true, method: 'card', days: [8, 18, 28], stores: ['yokado'], note: 'ハッピーデー。カードのクレジット払いが対象（Apple Payなどは対象外）。一部の店舗は実施日が異なる' },
    ],
    checked: '2026-11-10', src: 'https://www.7card.co.jp/7card/point/save.html' },

  { id: 'epos', kind: 'card', name: 'エポスカード', issuer: 'エポスカード', base: 0.5, rules: [],
    checked: '2026-11-10', src: 'https://www.eposcard.co.jp/epospoint/index.html' },

  { id: 'famima-card', kind: 'card', name: 'ファミマカード', issuer: 'ポケットカード', base: 1, baseOff: true,
    opts: [{ id: 'fp', label: 'ファミペイと連携している', short: 'ファミペイ連携', on: true }],
    rules: [
      { rate: 3, off: true, method: 'card', stores: ['famima'], note: '請求のときに割引。Apple Pay・たばこ・チケット類は1%' },
      { rate: 5, off: true, method: 'card', stores: ['famima'], if: 'fp', note: '請求のときに割引。Apple Pay・たばこ・チケット類は1%' },
    ],
    checked: '2026-11-10', src: 'https://fcard.pocketcard.co.jp/service/discount.html',
    memo: 'ポイントではなく、請求のときに割り引かれるカードです。' },

  { id: 'lawson-ponta', kind: 'card', name: 'ローソンPontaプラス', issuer: 'ローソン銀行', base: 1,
    opts: [
      { id: 'entry', label: 'ローソンアプリで今月のエントリーをした', short: 'アプリでエントリー' },
      { id: 'max', label: '「最大15%還元」にエントリーしている', short: '最大15%にエントリー' },
    ],
    rules: [
      { rate: 2, method: 'card', hours: [16, 24], stores: ['lawson'], note: 'カードを提示して支払うか、Apple Payで支払う' },
      { rate: 2, method: 'card', days: [10, 20], hours: [0, 16], stores: ['lawson'] },
      { rate: 4, method: 'card', days: [10, 20], hours: [16, 24], stores: ['lawson'] },
      { rate: 3, method: 'card', days: [10, 20], hours: [0, 16], stores: ['lawson'], if: 'entry' },
      { rate: 6, method: 'card', days: [10, 20], hours: [16, 24], stores: ['lawson'], if: 'entry' },
      { rate: 4, method: 'card', stores: ids('ok,kura,sushiro,matsuya,zetteria,pizzahut'), if: 'max', note: '対象店舗の利用は月3万円まで。条件を満たすと最大15%' },
    ],
    checked: '2026-11-10', src: 'https://www.lawsonbank.jp/creditcard/point/point/',
    memo: 'ローソン以外の基本還元率は、2026年6月16日の利用分から1%です。ローソンでは0時〜16時が1%、16時〜24時が2%（ナチュラルローソン、ローソンストア100も同じ）。' },

  { id: 'bic-suica', kind: 'card', name: 'ビックカメラSuicaカード', issuer: 'ビューカード', base: 1, rules: [],
    checked: '2026-11-10', src: 'https://www.jreast.co.jp/card/first/bic/',
    memo: 'JRE POINT 0.5%とビックポイント0.5%の合計です。モバイルSuicaへのチャージは1.5%。' },
  { id: 'view-std', kind: 'card', name: 'ビューカード スタンダード', issuer: 'ビューカード', base: 0.5, rules: [],
    checked: '2026-11-10', src: 'https://www.jreast.co.jp/card/first/',
    memo: '1,000円ごとにJRE POINT 5ポイント。モバイルSuicaへのチャージは1.5%です。' },

  { id: 'jal-suica-gold', kind: 'card', name: 'JALカードSuica CLUB-Aゴールド（JAL CLUB EST）', issuer: 'JALカード・ビューカード', base: 1,
    rules: [
      { rate: 2, method: 'card', stores: ['aeon', 'welcia', 'matsukiyo', 'cocokara', 'royalhost'],
        note: 'JALカード特約店。カード本体で払った場合のみ（Apple Pay・QUICPay・コード決済は1%）' },
      { rate: 2, method: 'charge', stores: ['starbucks'], note: 'JALカード特約店。スターバックス カードへのオンライン入金・オートチャージが対象' },
    ],
    checked: '2026-11-11', src: 'https://partner.jal.co.jp/search_result/?ptn=1&ct=2',
    memo: '1マイル＝1円として計算しています（特典航空券に使うと、1マイルの価値はもっと高くなります）。JAL CLUB ESTではショッピングマイル・プレミアムに自動で入るので、どこでも100円＝1マイル。毎年2,500マイルのプレゼントは含めていません。Suicaへのチャージはマイルではなく、JRE POINTが1.5%たまります（モバイルSuica・オートチャージの場合）。ファミリーマートの特約店は2025年10月末で終わりました。' },
  { id: 'mercard', kind: 'card', name: 'メルカード', issuer: 'メルペイ', base: 1, rules: [],
    checked: '2026-11-10', src: 'https://www.merpay.com/mercard/standard/', memo: 'メルカリでの購入は1〜4%です。' },
  { id: 'orico', kind: 'card', name: 'Orico Card THE POINT', issuer: 'オリコ', base: 1, rules: [],
    checked: '2026-11-10', src: 'https://www.orico.co.jp/creditcard/list/thepoint/', memo: '入会後6か月間は2%（上乗せ分は5,000ポイントまで）。' },

  { id: 'eneos-s', kind: 'card', name: 'ENEOSカード S', issuer: 'トヨタファイナンス', base: 0.6,
    rules: [{ rate: 1.2, label: '2円/L引き', method: 'card', stores: ['eneos'], note: 'ガソリン・軽油の値引き（月150Lまで）。' + LITER_NOTE }],
    checked: '2026-11-10', src: 'https://www.eneos.co.jp/consumer/card/card/kind/' },
  { id: 'eneos-p', kind: 'card', name: 'ENEOSカード P', issuer: 'トヨタファイナンス', base: 0.6,
    rules: [{ rate: 3, method: 'card', stores: ['eneos'], note: 'ENEOSでは1,000円ごとに30ポイント' }],
    checked: '2026-11-10', src: 'https://www.eneos.co.jp/consumer/card/card/kind/' },
  { id: 'apollo-card', kind: 'card', name: 'apollostation card', issuer: '出光クレジット', base: 0.5,
    rules: [{ rate: 1.2, label: '2円/L引き', method: 'card', stores: ['apollo'], note: 'ガソリン・軽油の値引き（月300Lまで）。' + LITER_NOTE }],
    checked: '2026-11-10', src: 'https://www.idemitsucard.com/privilege/carlife/cashback/mydo_nebiki.html' },

  { id: 'rakuten-pay', kind: 'pay', name: '楽天ペイ', issuer: '楽天ペイ残高（楽天キャッシュ）で支払い', base: 1, baseMethod: 'code', need: 'rpay',
    opts: [{ id: 'pc', label: 'アプリの楽天ポイントカードを月2回以上提示している', short: 'ポイントカード提示', on: true }],
    rules: [{ rate: 1.5, method: 'code', where: 'offline', if: 'pc', note: '前々月16日〜前月15日に、アプリの楽天ポイントカードを2回以上提示していることが条件' }],
    checked: '2026-11-10', src: 'https://pay.rakuten.co.jp/topics/pointprogram/',
    memo: '支払い元を楽天カードにした場合は1.0%です。' },
  { id: 'paypay', kind: 'pay', name: 'PayPay', issuer: 'コード決済', base: 0.5, baseMethod: 'code', need: 'paypay',
    opts: [
      { id: 'credit', label: 'PayPayカードでのクレジット払いにしている', short: 'クレジット払い', on: true },
      { id: 'step', label: 'PayPayステップを達成している（月30回・10万円以上）', short: 'ステップ達成' },
    ],
    rules: [
      { rate: 1, method: 'code', where: 'offline', if: 'credit' },
      { rate: 1, method: 'code', where: 'offline', if: 'step' },
      { rate: 1.5, method: 'code', where: 'offline', if: ['credit', 'step'] },
    ],
    checked: '2026-11-10', src: 'https://paypay.ne.jp/event/paypaystep/',
    memo: '残高払いは0.5%、クレジット払いは1.0%が基本です。' },
  { id: 'dbarai', kind: 'pay', name: 'd払い', issuer: 'コード決済', base: 0.5, baseMethod: 'code', need: 'dpay',
    opts: [{ id: 'dc', label: '支払い方法をdカードにしている', short: 'dカード払い', on: true }],
    rules: [{ rate: 1, method: 'code', where: 'offline', if: 'dc', note: 'うち0.5%は期間・用途限定のdポイント' }],
    checked: '2026-11-10', src: 'https://service.smt.docomo.ne.jp/keitai_payment/app/help/detail/0008.html' },
  { id: 'aupay', kind: 'pay', name: 'au PAY', issuer: 'コード決済', base: 0.5, baseMethod: 'code', need: 'aupay',
    opts: [
      { id: 'auto', label: 'au・UQ mobile・povo1.0の回線があり、au PAY カードからオートチャージしている', short: 'オートチャージ', on: true },
      { id: 'jibun', label: 'カードの引落口座をauじぶん銀行にしている', short: 'じぶん銀行' },
      { id: 'fam', label: '家族カードかETCカードを使っている', short: '家族・ETCカード' },
    ],
    rules: [
      { rate: 1, method: 'code', where: 'offline', if: 'auto', note: 'オートチャージ特典は月500ポイントまで' },
      { rate: 1.5, method: 'code', where: 'offline', if: ['auto', 'jibun'], note: 'オートチャージ特典は月500ポイントまで' },
      { rate: 1.5, method: 'code', where: 'offline', if: ['auto', 'fam'], note: 'オートチャージ特典は月500ポイントまで' },
      { rate: 2, method: 'code', where: 'offline', if: ['auto', 'jibun', 'fam'], note: 'オートチャージ特典は月500ポイントまで' },
    ],
    checked: '2026-11-10', src: 'https://www.kddi-fs.com/function/promotion/reward/',
    memo: 'au PAY ゴールドカードからのオートチャージなら、条件に応じて最大5.5%です。' },
  { id: 'aeon-pay', kind: 'pay', name: 'AEON Pay', issuer: 'コード決済', base: 1.5, baseMethod: 'code', need: 'aeonpay',
    rules: [{ rate: 5, off: true, method: 'code', days: [20, 30], stores: ['aeon', 'maxvalu'], note: 'お客さま感謝デー。一部の店舗・商品は対象外' }],
    checked: '2026-11-10', src: 'https://www.aeon.co.jp/benefits/1-5-percent/',
    memo: '2026年10月20日から、コード決済の利用は1.5%還元です（月2万円の利用まで）。' },
  { id: 'famipay', kind: 'pay', name: 'ファミペイ', issuer: 'コード決済', base: 0.5, baseMethod: 'code', only: ['famima'],
    opts: [{ id: 'fc', label: 'ファミマカードからチャージしている', short: 'ファミマカードでチャージ' }],
    rules: [{ rate: 1, method: 'code', stores: ['famima'], if: 'fc', note: 'チャージ分0.5%＋支払い分0.5%' }],
    checked: '2026-11-10', src: 'https://www.family.co.jp/famipay.html',
    memo: 'このアプリではファミリーマートでの利用だけを表示しています。' },
  { id: 'suica', kind: 'pay', name: 'モバイルSuica', issuer: '交通系IC', base: 0, baseMethod: 'ic', need: 'ic',
    opts: [{ id: 'view', label: 'ビューカードからチャージしている', short: 'ビューカードでチャージ', on: true }],
    rules: [{ rate: 1.5, method: 'ic', where: 'offline', if: 'view', note: 'ビューカードからモバイルSuicaにチャージしたときに付くポイント' }],
    checked: '2026-11-10', src: 'https://www.jreast.co.jp/card/first/bic/',
    memo: 'Suicaでの支払いそのものには、原則ポイントは付きません。' },
];
