export const TELEGRAM_HANDLE = 'krpcroom';
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_HANDLE}`;

export type Game = {
  id: string;
  name: string;
  cn: string;
  ko: string;
  short: string;
  gradient: string;
  ring: string;
};

export const SUPPORTED_GAMES: Game[] = [
  { id: 'lol',             name: 'League of Legends', cn: '英雄联盟',       ko: '리그 오브 레전드', short: 'LoL', gradient: 'from-[#0a323c] to-[#005a82]', ring: '#c8aa6e' },
  { id: 'valorant',        name: 'Valorant',          cn: '无畏契约',       ko: '발로란트',         short: 'V',   gradient: 'from-[#ff4655] to-[#0f1923]', ring: '#ff4655' },
  { id: 'overwatch2',      name: 'Overwatch 2',       cn: '守望先锋 2',     ko: '오버워치 2',       short: 'OW2', gradient: 'from-[#f99e1a] to-[#43484c]', ring: '#f99e1a' },
  { id: 'aion2',           name: 'Aion 2',            cn: '永恒之塔 2',     ko: '아이온 2',         short: 'A2',  gradient: 'from-[#0a3a5a] to-[#1a1a1a]', ring: '#7adfff' },
  { id: 'battleground',    name: 'PUBG',              cn: '绝地求生',       ko: '배틀그라운드',     short: 'PB',  gradient: 'from-[#f1a226] to-[#a45a00]', ring: '#f1a226' },
  { id: 'lineage',         name: 'Lineage',           cn: '天堂',           ko: '리니지',           short: 'L',   gradient: 'from-[#1a1a1a] to-[#6e1a1a]', ring: '#b8860b' },
  { id: 'lineageclassic',  name: 'Lineage Classic',   cn: '天堂经典',       ko: '리니지 클래식',    short: 'LC',  gradient: 'from-[#1a1a1a] to-[#3a3a3a]', ring: '#b8860b' },
  { id: 'fifaonline4',     name: 'FC Online',         cn: 'FC Online',      ko: 'FC 온라인',         short: 'FC',  gradient: 'from-[#0a7e3a] to-[#0c0c0c]', ring: '#23c552' },

  { id: 'lostark',         name: 'Lost Ark',          cn: '命运方舟',       ko: '로스트아크',       short: 'LA',  gradient: 'from-[#1a1a2e] to-[#ffd54f]', ring: '#ffd54f' },
  { id: 'diavlo4',         name: 'Diablo IV',         cn: '暗黑破坏神 4',   ko: '디아블로 4',       short: 'D4',  gradient: 'from-[#7a0a0a] to-[#1a0505]', ring: '#c8222e' },
  { id: 'throneandliberty', name: 'Throne and Liberty', cn: '王座与自由',   ko: '쓰론 앤 리버티',   short: 'TL',  gradient: 'from-[#0a1a3a] to-[#caa050]', ring: '#caa050' },
  { id: 'mabinogi',        name: 'Mabinogi',          cn: '玛奇',           ko: '마비노기',         short: 'MB',  gradient: 'from-[#5a8acc] to-[#e8d4a8]', ring: '#a8c8f0' },
  { id: 'blacksand',       name: 'Black Desert',      cn: '黑色沙漠',       ko: '검은사막',         short: 'BD',  gradient: 'from-[#1a1a1a] to-[#7a0010]', ring: '#c8222e' },
  { id: 'lineage2',        name: 'Lineage 2',         cn: '天堂 2',         ko: '리니지 2',         short: 'L2',  gradient: 'from-[#1a1a1a] to-[#4a1a8a]', ring: '#b8860b' },
  { id: 'suddenattack',    name: 'Sudden Attack',     cn: '突袭',           ko: '서든어택',         short: 'SA',  gradient: 'from-[#b1001d] to-[#1a1a1a]', ring: '#ff3344' },
  { id: 'starcraft',       name: 'StarCraft',         cn: '星际争霸',       ko: '스타크래프트',     short: 'SC',  gradient: 'from-[#0066cc] to-[#001a33]', ring: '#3399ff' },
  { id: 'aion',            name: 'Aion',              cn: '永恒之塔',       ko: '아이온',           short: 'A',   gradient: 'from-[#0a3a5a] to-[#3aaaff]', ring: '#7adfff' },
  { id: 'bladensoul',      name: 'Blade & Soul',      cn: '剑灵',           ko: '블레이드 & 소울',  short: 'BnS', gradient: 'from-[#1a1a1a] to-[#aa2a2a]', ring: '#ff5050' },

  { id: 'wow',             name: 'World of Warcraft', cn: '魔兽世界',       ko: '월드 오브 워크래프트', short: 'WoW', gradient: 'from-[#1a3a5a] to-[#cc7a1a]', ring: '#f0a020' },
  { id: 'diablo2',         name: 'Diablo II Resurrected', cn: '暗黑破坏神 2', ko: '디아블로 2 레저렉션', short: 'D2', gradient: 'from-[#3a0a0a] to-[#1a0505]', ring: '#c8222e' },
  { id: 'hearthstone',     name: 'Hearthstone',       cn: '炉石传说',       ko: '하스스톤',         short: 'HS',  gradient: 'from-[#aa5a1a] to-[#3a1a0a]', ring: '#ffb84a' },
  { id: 'tft',             name: 'Teamfight Tactics', cn: '云顶之弈',       ko: '전략적 팀 전투',   short: 'TFT', gradient: 'from-[#5d3fd3] to-[#0a323c]', ring: '#c8aa6e' },
  { id: 'pathofexile2',    name: 'Path of Exile 2',   cn: '流放之路 2',     ko: '패스 오브 엑자일 2', short: 'PoE2', gradient: 'from-[#3a1a1a] to-[#0a0505]', ring: '#aa3a3a' },
  { id: 'stormgate',       name: 'Stormgate',         cn: '风暴之门',       ko: '스톰게이트',       short: 'SG',  gradient: 'from-[#0a3a5a] to-[#3aaaca]', ring: '#5acaff' },

  { id: 'firstdescendant', name: 'The First Descendant', cn: '第一后裔',    ko: '퍼스트 디센던트',  short: 'TFD', gradient: 'from-[#1a3a5a] to-[#aa1a3a]', ring: '#ff5577' },
  { id: 'mir4',            name: 'MIR4',              cn: '传奇 4',         ko: 'MIR4',             short: 'M4',  gradient: 'from-[#3a2a1a] to-[#aa8a3a]', ring: '#e8c870' },
  { id: 'vindictus',       name: 'Vindictus',         cn: '玛奇英雄传',     ko: '마비노기 영웅전',  short: 'VD',  gradient: 'from-[#3a1a1a] to-[#aa5a3a]', ring: '#ff8a4a' },
  { id: 'eternalreturn',   name: 'Eternal Return',    cn: '永恒轮回',       ko: '이터널 리턴',      short: 'ER',  gradient: 'from-[#1a3a5a] to-[#3aaaca]', ring: '#7adfff' },
  { id: 'elsword',         name: 'Elsword',           cn: '艾尔之光',       ko: '엘소드',           short: 'EL',  gradient: 'from-[#aa1a3a] to-[#ff5a8a]', ring: '#ff7a9a' },
  { id: 'lostsaga',        name: 'Lost Saga',         cn: '失落传说',       ko: '로스트사가',       short: 'LS',  gradient: 'from-[#aa5a1a] to-[#1a1a1a]', ring: '#ffaa3a' },
  { id: 'windofblade',     name: 'Wind of Blade',     cn: '风之国度',       ko: '바람의 나라',      short: 'WB',  gradient: 'from-[#1a5a3a] to-[#3aaaca]', ring: '#5acaaa' },
  { id: 'talesweaver',     name: 'TalesWeaver',       cn: '泰瑞亚',         ko: '테일즈위버',       short: 'TW',  gradient: 'from-[#aa5acc] to-[#3a1a5a]', ring: '#cc88ff' },
  { id: 'talesrunner',     name: 'TalesRunner',       cn: 'TalesRunner',    ko: '테일즈런너',       short: 'TR',  gradient: 'from-[#ffaa3a] to-[#ff5a8a]', ring: '#ffcc66' },

  { id: 'archeage',        name: 'ArcheAge',          cn: '阿키에이지',     ko: '아키에이지',       short: 'AA',  gradient: 'from-[#2a1a5a] to-[#5a2a8a]', ring: '#a06aff' },
  { id: 'mu',              name: 'Mu Online',         cn: '奇迹 MU',        ko: '뮤 온라인',         short: 'MU',  gradient: 'from-[#3a1a5a] to-[#1a1a1a]', ring: '#c8a8ff' },
  { id: 'ragnarok',        name: 'Ragnarok Online',   cn: '仙境传说',       ko: '라그나로크',       short: 'RO',  gradient: 'from-[#ff6a3a] to-[#1a3a6a]', ring: '#ff9a5a' },
  { id: 'cabal',           name: 'Cabal Online',      cn: '卡巴尔',         ko: '카발 온라인',       short: 'CB',  gradient: 'from-[#ff5a1a] to-[#1a1a1a]', ring: '#ffaa3a' },
  { id: 'closers',         name: 'Closers',           cn: 'Closers',        ko: '클로저스',         short: 'CL',  gradient: 'from-[#3a1a8a] to-[#aa1a5a]', ring: '#ff4cb8' },
  { id: 'cyphers',         name: 'Cyphers',           cn: 'Cyphers',        ko: '사이퍼즈',         short: 'CY',  gradient: 'from-[#1a1a3a] to-[#3a3aaa]', ring: '#5a8aff' },
  { id: 'finalfantasy',    name: 'Final Fantasy XIV', cn: '最终幻想 14',    ko: '파이널 판타지 14', short: 'FF',  gradient: 'from-[#1a1a3e] to-[#7a1a3e]', ring: '#dab14b' }
];

export const LOGO_EXTS = ['svg', 'png', 'webp', 'jpg', 'jpeg'] as const;
