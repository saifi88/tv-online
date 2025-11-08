// public/script.js — FINAL, NO PROXY LOKAL, 100% JALAN
const PROXY_URL = "/api/proxy?url=";  // PAKAI PROXY SENDIRI!

let player, hls;
const video = document.getElementById('video-player');
const channelGrid = document.getElementById('channels');

const channels = {
  all: [
    // === OLAHRAGA ===
    { name: "Spotv", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000160/1024.m3u8", group: "olahraga" },
    { name: "Spotv 2", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000138/1024.m3u8", group: "olahraga" },
    { name: "Sportstar 1", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000111/1024.m3u8", group: "olahraga" },
    { name: "Sportstar 2", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000124/1024.m3u8", group: "olahraga" },
    { name: "Sportstar 4", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000045/1024.m3u8", group: "olahraga" },
    { name: "Beinsport 2", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000148/1024.m3u8", group: "olahraga" },
    { name: "Fight Sports", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000163/1024.m3u8", group: "olahraga" },

    // === NASIONAL ===
    { name: "RCTI HD", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000143/1024.m3u8", group: "nasional" },
    { name: "MNC TV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000106/1024.m3u8", group: "nasional" },
    { name: "GTV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000113/1024.m3u8", group: "nasional" },
    { name: "iNews", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000128/1024.m3u8", group: "nasional" },
    { name: "TVOne", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000018/1024.m3u8", group: "nasional" },
    { name: "SindoNews", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000115/1024.m3u8", group: "nasional" },
    { name: "TVRI Nasional", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000010/1024.m3u8", group: "nasional" },
    { name: "TransTV HD", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000009/1024.m3u8", group: "nasional" },
    { name: "Trans7 HD", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000008/1024.m3u8", group: "nasional" },
    { name: "NET.", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000136/1024.m3u8", group: "nasional" },
    { name: "RTV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000057/1024.m3u8", group: "nasional" },
    { name: "ANTV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000022/1024.m3u8", group: "nasional" },
    { name: "IDX", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000019/1024.m3u8", group: "nasional" },
    { name: "JAKTV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000080/1024.m3u8", group: "nasional" },
    { name: "JTV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000054/1024.m3u8", group: "nasional" },
    { name: "KOMPASTV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000055/1024.m3u8", group: "nasional" },
    { name: "METROTV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000004/1024.m3u8", group: "nasional" },
    { name: "DAAI TV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000044/1024.m3u8", group: "nasional" },
    { name: "BTV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000041/1024.m3u8", group: "nasional" },
    { name: "TV 9", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000064/1024.m3u8", group: "nasional" },
    { name: "TV5 Monde", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000005/1024.m3u8", group: "nasional" },
    { name: "Berita TV", url: "https://b1news.beritasatumedia.com/Beritasatu/B1News_1280x720.m3u8", group: "nasional" },
    { name: "Metro Globe Network", url: "https://edge.medcom.id/live-edge/smil:mgnch.smil/chunklist_w139395680_b2692000_sleng.m3u8", group: "nasional" },
    { name: "CNBC Indonesia", url: "https://live.cnbcindonesia.com/livecnbc/smil:cnbctv.smil/chunklist_w1457300562_b384000_sleng.m3u8", group: "nasional" },
    { name: "CNN Indonesia", url: "https://live.cnnindonesia.com/livecnn/smil:cnntv.smil/chunklist_w1238913108_b384000_sleng.m3u8", group: "nasional" },
    { name: "BN Channel", url: "http://cdn.nng.cloudns.us/live/m3u8/id/6183ec225226ccf.m3u8", group: "nasional" },

    // === FILM & HIBURAN ===
    { name: "TVN MOVIES", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000142/1024.m3u8", group: "film" },
    { name: "CELESTIAL MOVIE", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000032/1024.m3u8", group: "film" },
    { name: "CELESTIAL CLASSIC", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000028/1024.m3u8", group: "film" },
    { name: "HITS MOVIE", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000139/1024.m3u8", group: "film" },
    { name: "HITS", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000114/1024.m3u8", group: "film" },
    { name: "TVN", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000141/1024.m3u8", group: "film" },
    { name: "ONE", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000123/1024.m3u8", group: "film" },
    { name: "ROCK ACTION", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000120/1024.m3u8", group: "film" },
    { name: "ROCK ENTERTAINMENT", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000110/1024.m3u8", group: "film" },
    { name: "KIX", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000037/1024.m3u8", group: "film" },
    { name: "STUDIO UNIVERSAL", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000121/1024.m3u8", group: "film" },
    { name: "MyCinema Asia", url: "https://op-group1-swiftservehd-1.dens.tv/h/h193/index.m3u8", group: "film" },
    { name: "My Family Channel", url: "https://op-group1-swiftservehd-1.dens.tv/h/h194/index.m3u8", group: "film" },
    { name: "AXN", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000119/1024.m3u8", group: "film" },
    { name: "Galaxy", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000117/1024.m3u8", group: "film" },
    { name: "Z BIOSKOP", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000061/1024.m3u8", group: "film" },
    { name: "Thrill", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000001/1024.m3u8", group: "film" },
    { name: "CINEMACHI HD", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000154/1024.m3u8", group: "film" },
    { name: "CINEMACHI KIDS", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000155/1024.m3u8", group: "film" },
    { name: "CINEMACHI ACTION", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000157/1024.m3u8", group: "film" },
    { name: "CINEMACHI MAX", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000156/1024.m3u8", group: "film" },
    { name: "CINEMACHI XTRA", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000145/1024.m3u8", group: "film" },
    { name: "ENTERTAINMENT", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000013/1024.m3u8", group: "film" },
    { name: "Vision Prime", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000130/1024.m3u8", group: "film" },
    { name: "Indonesia Movie Channel", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000133/1024.m3u8", group: "film" },

    // === ANAK & KELUARGA ===
    { name: "MyKids", url: "https://op-group1-swiftservehd-1.dens.tv/h/h191/index.m3u8?app_type=web&userid=wnctpm5uf2j&chname=My_Kidz_HD", group: "anak" },
    { name: "NICK Jr", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000118/1024.m3u8", group: "anak" },
    { name: "NICKELODEON", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000060/1024.m3u8", group: "anak" },
    { name: "Moonbug", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000125/1024.m3u8", group: "anak" },
    { name: "Dreamworks HD", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000126/1024.m3u8", group: "anak" },
    { name: "Kids TV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000135/1024.m3u8", group: "anak" },
    { name: "Cbeebies", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000006/1024.m3u8", group: "anak" },

    // === MUSIK ===
    { name: "MTV Live", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000129/1024.m3u8", group: "musik" },
    { name: "Music TV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000134/1024.m3u8", group: "musik" },
    { name: "MTV 90s", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000150/1024.m3u8", group: "musik" },

    // === DAERAH ===
    { name: "Bali TV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000042/1024.m3u8", group: "daerah" },
    { name: "Bandung TV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000068/1024.m3u8", group: "daerah" },

    // === LAINNYA ===
    { name: "BBC Earth", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000116/1024.m3u8", group: "lainnya" },
    { name: "Love Nature", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000127/1024.m3u8", group: "lainnya" },
    { name: "History", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000027/1024.m3u8", group: "lainnya" },
    { name: "Global Trekker", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000132/1024.m3u8", group: "lainnya" },
    { name: "Fox News", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000038/1024.m3u8", group: "lainnya" },
    { name: "Animax", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000122/1024.m3u8", group: "lainnya" },
    { name: "Food Travel", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000003/1024.m3u8", group: "lainnya" },
    { name: "Hanacaraka TV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000020/1024.m3u8", group: "lainnya" },
    { name: "CelebritiesTV", url: "http://202.80.222.20/cdn/iptv/Tvod/001/channel2000015/1024.m3u8", group: "lainnya" }
  ]
};

// === INIT PLAYER ===
function initPlayer() {
  player = videojs('video-player', {
    controls: true,
    fluid: true,
    html5: { hls: { withCredentials: false } }
  });
}

// === RENDER CHANNELS ===
function renderChannels(category) {
  channelGrid.innerHTML = '';
  const list = category === 'all' ? channels.all : channels.all.filter(ch => ch.group === category);

  list.forEach((ch, i) => {
    const div = document.createElement('div');
    div.className = 'channel';
    div.textContent = ch.name;
    div.onclick = () => playChannel(ch.url, div);
    channelGrid.appendChild(div);

    if (i === 0 && category === 'all') {
      setTimeout(() => playChannel(ch.url, div), 500);
    }
  });
}

// === PLAY CHANNEL ===
function playChannel(rawUrl, element) {
  document.querySelectorAll('.channel').forEach(el => el.classList.remove('active'));
  element.classList.add('active');

  const url = PROXY_URL + encodeURIComponent(rawUrl);

  if (hls) hls.destroy();

  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
    video.play();
  }
}

// === TAB & INIT ===
document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderChannels(tab.dataset.category);
  };
});

initPlayer();

renderChannels('all');
