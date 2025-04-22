// Elemanlar
const target   = document.getElementById('target');
const ouch     = document.getElementById('ouch');
const hitSound = document.getElementById('hitSound');

// Vurulduğunda gösterilecek farklı metinler
const ouchTexts = ["Ahh!", "Uhh!", "Ouch!", "Ayy!"];

// Resim yolları
const IMG_NORMAL = "img/ben.png";
const IMG_HIT    = "img/ben_hit.png";

// Vuruş görseli ve metni göster
function showOuch(x, y) {
  // Rastgele metin
  ouch.textContent = ouchTexts[Math.floor(Math.random() * ouchTexts.length)];

  // Metni tıklama noktasına yerleştir
  const rect = target.getBoundingClientRect();
  ouch.style.left = (x - rect.left) + 'px';
  ouch.style.top  = (y - rect.top)  + 'px';

  // Animasyon
  ouch.style.transform = 'translate(-50%,-50%) scale(1)';
  setTimeout(() => {
    ouch.style.transform = 'translate(-50%,-50%) scale(0)';
  }, 150);
}

// Tıklama / dokunma işleyicisi
function handleHit(e) {
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;

  // Resmi vurulmuş hâle geçir
  target.src = IMG_HIT;

  showOuch(x, y);

  // Sesi çal
  hitSound.currentTime = 0;
  hitSound.play();

  // 0,4 sn sonra eski resme dön
  setTimeout(() => target.src = IMG_NORMAL, 400);
}

// Hem tık hem dokun
target.addEventListener('click', handleHit);
target.addEventListener('touchstart', handleHit, { passive:true });
