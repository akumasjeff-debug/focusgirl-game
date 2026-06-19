// 扉扉大冒險 — Phaser 3, 單檔案無建置流程
// 角色用 PNG（girl.png / cat.png），找不到圖檔時自動退回 emoji

const COLORS = [
  { name: '紅色', hex: 0xff5c7a, emoji: '🔴' },
  { name: '黃色', hex: 0xffd23f, emoji: '🟡' },
  { name: '綠色', hex: 0x4caf78, emoji: '🟢' },
  { name: '紫色', hex: 0xb185db, emoji: '🟣' },
];

// 每句說明的注音標註：[漢字, 注音]，標點符號注音留空
const STAR_INSTR = [['接', 'ㄐㄧㄝ'], ['住', 'ㄓㄨˋ'], ['這', 'ㄓㄜˋ'], ['個', 'ㄍㄜˋ'], ['顏', 'ㄧㄢˊ'], ['色', 'ㄙㄜˋ'], ['的', '˙ㄉㄜ'], ['星', 'ㄒㄧㄥ'], ['星', 'ㄒㄧㄥ'], ['！', '']];
const SCHULTE_INSTR = [['依', 'ㄧ'], ['照', 'ㄓㄠˋ'], ['數', 'ㄕㄨˋ'], ['字', 'ㄗˋ'], ['順', 'ㄕㄨㄣˋ'], ['序', 'ㄒㄩˋ'], ['點', 'ㄉㄧㄢˇ'], ['下', 'ㄒㄧㄚˋ'], ['去', 'ㄑㄩˋ'], ['！', '']];
const MEMORY_INSTR = [['找', 'ㄓㄠˇ'], ['出', 'ㄔㄨ'], ['一', 'ㄧ'], ['樣', 'ㄧㄤˋ'], ['的', '˙ㄉㄜ'], ['圖', 'ㄊㄨˊ'], ['案', 'ㄢˋ'], ['配', 'ㄆㄟˋ'], ['對', 'ㄉㄨㄟˋ'], ['！', '']];
const SIMON_INSTR = [['記', 'ㄐㄧˋ'], ['住', 'ㄓㄨˋ'], ['顏', 'ㄧㄢˊ'], ['色', 'ㄙㄜˋ'], ['出', 'ㄔㄨ'], ['現', 'ㄒㄧㄢˋ'], ['的', '˙ㄉㄜ'], ['順', 'ㄕㄨㄣˋ'], ['序', 'ㄒㄩˋ'], ['，', ''], ['跟', 'ㄍㄣ'], ['著', '˙ㄓㄜ'], ['點', 'ㄉㄧㄢˇ'], ['一', 'ㄧ'], ['次', 'ㄘˋ'], ['！', '']];
const ODD_INSTR = [['快', 'ㄎㄨㄞˋ'], ['找', 'ㄓㄠˇ'], ['出', 'ㄔㄨ'], ['不', 'ㄅㄨˋ'], ['一', 'ㄧ'], ['樣', 'ㄧㄤˋ'], ['的', '˙ㄉㄜ'], ['那', 'ㄋㄚˋ'], ['一', 'ㄧ'], ['個', 'ㄍㄜˋ'], ['！', '']];
const MAZE_INSTR = [['手', 'ㄕㄡˇ'], ['指', 'ㄓˇ'], ['沿', 'ㄧㄢˊ'], ['著', '˙ㄓㄜ'], ['路', 'ㄌㄨˋ'], ['線', 'ㄒㄧㄢˋ'], ['滑', 'ㄏㄨㄚˊ'], ['到', 'ㄉㄠˋ'], ['終', 'ㄓㄨㄥ'], ['點', 'ㄉㄧㄢˇ'], ['！', '']];
const BUBBLE_INSTR = [['點', 'ㄉㄧㄢˇ'], ['破', 'ㄆㄛˋ'], ['這', 'ㄓㄜˋ'], ['個', 'ㄍㄜˋ'], ['顏', 'ㄧㄢˊ'], ['色', 'ㄙㄜˋ'], ['的', '˙ㄉㄜ'], ['泡', 'ㄆㄠˋ'], ['泡', 'ㄆㄠˋ'], ['！', '']];
const RHYTHM_INSTR = [['看', 'ㄎㄢˋ'], ['圓', 'ㄩㄢˊ'], ['圈', 'ㄑㄩㄢ'], ['長', 'ㄓㄤˇ'], ['到', 'ㄉㄠˋ'], ['剛', 'ㄍㄤ'], ['好', 'ㄏㄠˇ'], ['的', '˙ㄉㄜ'], ['時', 'ㄕˊ'], ['候', 'ㄏㄡˋ'], ['點', 'ㄉㄧㄢˇ'], ['一', 'ㄧ'], ['下', 'ㄒㄧㄚˋ'], ['！', '']];
const PUZZLE_INSTR = [['點', 'ㄉㄧㄢˇ'], ['兩', 'ㄌㄧㄤˇ'], ['塊', 'ㄎㄨㄞˋ'], ['拼', 'ㄆㄧㄣ'], ['圖', 'ㄊㄨˊ'], ['交', 'ㄐㄧㄠ'], ['換', 'ㄏㄨㄢˋ'], ['位', 'ㄨㄟˋ'], ['置', 'ㄓˋ'], ['！', '']];
const CONNECT_INSTR = [['用', 'ㄩㄥˋ'], ['手', 'ㄕㄡˇ'], ['指', 'ㄓˇ'], ['畫', 'ㄏㄨㄚˋ'], ['線', 'ㄒㄧㄢˋ'], ['連', 'ㄌㄧㄢˊ'], ['到', 'ㄉㄠˋ'], ['下', 'ㄒㄧㄚˋ'], ['一', 'ㄧ'], ['個', 'ㄍㄜˋ'], ['數', 'ㄕㄨˋ'], ['字', 'ㄗˋ'], ['！', '']];
const MISSING_INSTR = [['快', 'ㄎㄨㄞˋ'], ['找', 'ㄓㄠˇ'], ['出', 'ㄔㄨ'], ['缺', 'ㄑㄩㄝ'], ['一', 'ㄧ'], ['角', 'ㄐㄧㄠˇ'], ['的', '˙ㄉㄜ'], ['那', 'ㄋㄚˋ'], ['一', 'ㄧ'], ['個', 'ㄍㄜˋ'], ['！', '']];

class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }
  preload() {
    this.failedKeys = new Set();
    this.load.image('girl', 'assets/girl.png');
    this.load.image('cat', 'assets/cat.png');
    this.load.on('loaderror', (file) => this.failedKeys.add(file.key));
  }
  create() {
    this.game.loadedChars = { girl: !this.failedKeys.has('girl'), cat: !this.failedKeys.has('cat') };
    document.title = gameTitle();
    this.scene.start('CharSelect');
  }
}

function isMuted() {
  return localStorage.getItem('fgMuted') === '1';
}
function toggleMuted() {
  localStorage.setItem('fgMuted', isMuted() ? '0' : '1');
}

function beep(freq, duration = 0.12, type = 'sine') {
  if (isMuted()) return;
  try {
    const ctx = window._sfxCtx || (window._sfxCtx = new (window.AudioContext || window.webkitAudioContext)());
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) { /* audio unavailable, ignore */ }
}
const sfxCorrect = () => beep(880, 0.12, 'sine');
const sfxWrong = () => beep(220, 0.15, 'sawtooth');
const sfxComplete = () => [880, 1100, 1320].forEach((f, i) => setTimeout(() => beep(f, 0.15), i * 120));

function pressEffect(scene, target, onClick) {
  target.on('pointerdown', () => {
    beep(600, 0.06, 'triangle');
    scene.tweens.add({
      targets: target, scaleX: 0.9, scaleY: 0.9, duration: 80, yoyo: true,
      onComplete: () => onClick && onClick(),
    });
  });
}

function popupText(scene, x, y, str, color) {
  const t = scene.add.text(x, y, str, { fontSize: '26px', color, fontStyle: 'bold' }).setOrigin(0.5);
  scene.tweens.add({ targets: t, y: y - 50, alpha: 0, duration: 650, onComplete: () => t.destroy() });
}

function addBackButton(scene) {
  const hit = scene.add.circle(32, 28, 27, 0xffffff, 0).setInteractive();
  scene.add.text(32, 28, '🔙', { fontSize: '32px' }).setOrigin(0.5);
  pressEffect(scene, hit, () => scene.scene.start('Menu'));
}

function addSoundToggle(scene) {
  const { width } = scene.scale;
  const x = width - 32, y = 28;
  const hit = scene.add.circle(x, y, 27, 0xffffff, 0).setInteractive();
  const icon = scene.add.text(x, y, isMuted() ? '🔇' : '🔊', { fontSize: '28px' }).setOrigin(0.5);
  pressEffect(scene, hit, () => { toggleMuted(); icon.setText(isMuted() ? '🔇' : '🔊'); });
}

function annotatedInstruction(scene, y, pairs) {
  const { width } = scene.scale;
  const gap = Math.min(36, (width * 0.94) / pairs.length);
  const totalWidth = gap * pairs.length;
  const startX = width / 2 - totalWidth / 2 + gap / 2;
  const lineH = 13;
  pairs.forEach(([ch, zy], i) => {
    const cx = startX + i * gap;
    if (zy) {
      let tone = null, base = zy;
      if (base.startsWith('˙')) { tone = '˙'; base = base.slice(1); }
      else if (/[ˊˇˋ]$/.test(base)) { tone = base.slice(-1); base = base.slice(0, -1); }
      const symbols = Array.from(base);
      symbols.forEach((sym, j) => {
        const sy = y - 18 - (symbols.length - 1 - j) * lineH;
        const symText = scene.add.text(cx, sy, sym, { fontSize: '15px', color: '#ff5c7a', fontStyle: 'bold' }).setOrigin(0.5);
        if (symText.width > gap - 1) symText.setScale((gap - 1) / symText.width);
      });
      const topY = y - 18 - (symbols.length - 1) * lineH;
      const bottomY = y - 18;
      if (tone === '˙') {
        scene.add.text(cx, topY - lineH + 2, '˙', { fontSize: '14px', color: '#ff5c7a', fontStyle: 'bold' }).setOrigin(0.5);
      } else if (tone) {
        scene.add.text(cx + gap * 0.34, bottomY - 4, tone, { fontSize: '13px', color: '#ff5c7a', fontStyle: 'bold' }).setOrigin(0.5);
      }
    }
    scene.add.text(cx, y, ch, { fontSize: '26px', color: '#666', fontFamily: 'sans-serif' }).setOrigin(0.5);
  });
}

function addHeader(scene, instrPairs) {
  addBackButton(scene);
  addSoundToggle(scene);
  annotatedInstruction(scene, 96, instrPairs);
}

function makeHearts(scene, x, y, count = 5) {
  return Array.from({ length: count }, (_, i) => scene.add.text(x + i * 28, y, '❤️', { fontSize: '22px' }));
}

function bobTween(scene, target) {
  scene.tweens.add({ targets: target, y: target.y - 8, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
}

const CHAR_EMOJI = { girl: '👧', cat: '🐱' };

function getGirlName() {
  return localStorage.getItem('fgGirlName') || '扉扉';
}
function setGirlName(name) {
  if (name && name.trim()) localStorage.setItem('fgGirlName', name.trim().slice(0, 6));
}
function resetGirlName() {
  localStorage.removeItem('fgGirlName');
}
const NAME_PRESETS = ['扉扉', '澄澄'];
function gameTitle() {
  return `${getGirlName()}大冒險`;
}

const DIFFICULTY_PRESETS = {
  StarCatcher: { 簡單: { level: 1 }, 普通: { level: 2 }, 困難: { level: 4 } },
  Schulte: { 簡單: { size: 3 }, 普通: { size: 4 }, 困難: { size: 5 } },
  Memory: { 簡單: { pairs: 4 }, 普通: { pairs: 6 }, 困難: { pairs: 8 } },
  Simon: { 簡單: { speed: 850 }, 普通: { speed: 650 }, 困難: { speed: 450 } },
  OddOneOut: { 簡單: { level: 1, time: 60 }, 普通: { level: 3, time: 45 }, 困難: { level: 5, time: 30 } },
  Maze: {
    簡單: { tolerance: 50, points: 6, scroll: 0 },
    普通: { tolerance: 38, points: 7, scroll: 0 },
    困難: { tolerance: 26, points: 10, scroll: 45 },
  },
  Bubble: { 簡單: { level: 1 }, 普通: { level: 2 }, 困難: { level: 4 } },
  Rhythm: { 簡單: { tolerance: 22, growSpeed: 55 }, 普通: { tolerance: 16, growSpeed: 70 }, 困難: { tolerance: 10, growSpeed: 90 } },
  Puzzle: { 簡單: { grid: 2 }, 普通: { grid: 3 }, 困難: { grid: 4 } },
  Connect: { 簡單: { count: 6 }, 普通: { count: 8 }, 困難: { count: 12 } },
  MissingPiece: { 簡單: { grid: 3, time: 50 }, 普通: { grid: 4, time: 40 }, 困難: { grid: 6, time: 30 } },
};

class DifficultyScene extends Phaser.Scene {
  constructor() { super('Difficulty'); }
  init(data) { this.targetScene = data.scene; this.icon = data.icon; this.label = data.label; }
  create() {
    const { width, height } = this.scale;
    addBackButton(this);
    this.add.text(width / 2, height * 0.2, `${this.icon} ${this.label}`, { fontSize: '26px', color: '#444', fontStyle: 'bold' }).setOrigin(0.5);
    this.add.text(width / 2, height * 0.28, '選擇難度', { fontSize: '18px', color: '#777' }).setOrigin(0.5);

    const presets = DIFFICULTY_PRESETS[this.targetScene];
    Object.keys(presets).forEach((diff, i) => {
      const y = height * (0.42 + i * 0.14);
      const btn = this.add.rectangle(width / 2, y, 220, 64, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
      this.add.text(width / 2, y, diff, { fontSize: '22px', color: '#444' }).setOrigin(0.5);
      pressEffect(this, btn, () => this.scene.start(this.targetScene, presets[diff]));
    });
  }
}

function addCharacter(scene, x, y, size) {
  const key = scene.registry.get('char') || 'girl';
  if (scene.game.loadedChars && scene.game.loadedChars[key]) {
    return scene.add.image(x, y, key).setDisplaySize(size, size);
  }
  return scene.add.text(x, y, CHAR_EMOJI[key], { fontSize: `${size}px` }).setOrigin(0.5);
}

class CharSelectScene extends Phaser.Scene {
  constructor() { super('CharSelect'); }
  create() {
    const { width, height } = this.scale;
    this.titleText = this.add.text(width / 2, height * 0.15, gameTitle(), { fontSize: '32px', fontFamily: 'sans-serif', color: '#ff3d7f', fontStyle: 'bold', stroke: '#ffffff', strokeThickness: 6 }).setOrigin(0.5);
    this.add.text(width / 2, height * 0.24, '選一個角色出發！', { fontSize: '20px', color: '#777' }).setOrigin(0.5);

    this.makeCharCard(width / 2 - 90, height * 0.45, 'girl', getGirlName());
    this.makeCharCard(width / 2 + 90, height * 0.45, 'cat', '小貓咪');

    const chipY = height * 0.45 + 95;
    const chipGap = 80;
    const chipStartX = width / 2 - chipGap * (NAME_PRESETS.length) / 2 + chipGap / 2;
    NAME_PRESETS.forEach((name, i) => {
      const chip = this.add.rectangle(chipStartX + i * chipGap, chipY, 70, 36, 0xffffff).setStrokeStyle(3, 0xb185db).setInteractive();
      this.add.text(chipStartX + i * chipGap, chipY, name, { fontSize: '15px', color: '#444' }).setOrigin(0.5);
      pressEffect(this, chip, () => { setGirlName(name); this.scene.restart(); });
    });

    const customBtn = this.add.text(width / 2 - 45, chipY + 36, '✏️ 自訂', { fontSize: '14px', color: '#999' }).setOrigin(0.5).setInteractive();
    pressEffect(this, customBtn, () => {
      const name = window.prompt('幫女孩取個名字：', getGirlName());
      if (name) { setGirlName(name); this.scene.restart(); }
    });
    const resetBtn = this.add.text(width / 2 + 45, chipY + 36, '↺ 重置', { fontSize: '14px', color: '#999' }).setOrigin(0.5).setInteractive();
    pressEffect(this, resetBtn, () => { resetGirlName(); this.scene.restart(); });
  }
  makeCharCard(x, y, key, label) {
    const card = this.add.rectangle(x, y, 140, 170, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
    const ok = this.game.loadedChars && this.game.loadedChars[key];
    if (ok) this.add.image(x, y - 25, key).setDisplaySize(90, 90);
    else this.add.text(x, y - 25, CHAR_EMOJI[key], { fontSize: '64px', color: '#444' }).setOrigin(0.5);
    this.add.text(x, y + 55, label, { fontSize: '18px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, card, () => {
      this.registry.set('char', key);
      this.scene.start('Menu');
    });
  }
}

class MenuScene extends Phaser.Scene {
  constructor() { super('Menu'); }
  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height * 0.1, '← 換角色', { fontSize: '16px', color: '#999' })
      .setOrigin(0.5).setInteractive().on('pointerdown', () => this.scene.start('CharSelect'));
    addCharacter(this, width / 2 - 90, height * 0.16, 40);
    this.add.text(width / 2 + 10, height * 0.16, gameTitle(), { fontSize: '26px', fontFamily: 'sans-serif', color: '#ff3d7f', fontStyle: 'bold', stroke: '#ffffff', strokeThickness: 5 }).setOrigin(0.5);
    this.add.text(width / 2, height * 0.23, '選一個遊戲開始吧！', { fontSize: '18px', color: '#777' }).setOrigin(0.5);

    const levels = [
      ['⭐', '接星星', 'StarCatcher'],
      ['🔢', '數字方格', 'Schulte'],
      ['🃏', '記憶翻牌', 'Memory'],
      ['🎵', '顏色複誦', 'Simon'],
      ['🔍', '找不同', 'OddOneOut'],
      ['🧵', '走迷宮', 'Maze'],
      ['🫧', '數泡泡', 'Bubble'],
      ['🥁', '節奏拍拍', 'Rhythm'],
      ['🧩', '拼圖還原', 'Puzzle'],
      ['🔗', '連連看', 'Connect'],
      ['🍩', '找缺角', 'MissingPiece'],
    ];
    const cols = 4;
    const pad = width * 0.04;
    const size = (width - pad * (cols + 1)) / cols;
    const startX = pad + size / 2;
    const startY = height * 0.4;
    levels.forEach(([icon, label, sceneKey], i) => {
      const col = i % cols, row = Math.floor(i / cols);
      const x = startX + col * (size + pad);
      const y = startY + row * (size + pad + 20);
      this.makeSquare(x, y, size, icon, label, () => this.scene.start('Difficulty', { scene: sceneKey, icon, label }));
    });
  }
  makeSquare(x, y, size, icon, label, onClick) {
    const btn = this.add.rectangle(x, y, size, size, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
    this.add.text(x, y - size * 0.1, icon, { fontSize: `${Math.floor(size * 0.42)}px` }).setOrigin(0.5);
    this.add.text(x, y + size * 0.34, label, { fontSize: '12px', color: '#777' }).setOrigin(0.5);
    pressEffect(this, btn, onClick);
  }
}

class StarCatcherScene extends Phaser.Scene {
  constructor() { super('StarCatcher'); }
  init(data) { this.level = data.level || 1; }
  create() {
    const { width, height } = this.scale;
    this.lives = 5;
    this.colorCount = Math.min(3 + this.level, COLORS.length);
    this.target = Phaser.Utils.Array.GetRandom(COLORS.slice(0, this.colorCount));
    this.spawnDelay = Math.max(900 - this.level * 150, 350);

    addHeader(this, STAR_INSTR);
    this.add.circle(26, 100, 13, this.target.hex).setStrokeStyle(2, 0x555555);
    this.hearts = makeHearts(this, 56, 136, 5);

    this.girl = addCharacter(this, width / 2, height * 0.68, 80);
    this.basket = this.add.text(width / 2, height * 0.75, '🧺', { fontSize: '40px', color: '#444' }).setOrigin(0.5);

    this.input.on('pointermove', (p) => {
      const x = Phaser.Math.Clamp(p.x, 40, width - 40);
      this.girl.x = x; this.basket.x = x;
    });

    this.falling = [];
    this.spawnTimer = this.time.addEvent({ delay: this.spawnDelay, loop: true, callback: () => this.spawnStar() });
  }
  loseLife() {
    this.lives--;
    this.hearts[this.lives].setText('🖤');
    if (this.lives <= 0) this.endGame();
  }
  spawnStar() {
    const { width } = this.scale;
    const c = Phaser.Utils.Array.GetRandom(COLORS.slice(0, this.colorCount));
    const star = this.add.star(Phaser.Math.Between(40, width - 40), -20, 5, 12, 24, c.hex).setStrokeStyle(2, 0x555555);
    star.colorData = c;
    this.falling.push(star);
  }
  update(time, delta) {
    if (this.finished) return;
    const { height } = this.scale;
    for (let i = this.falling.length - 1; i >= 0; i--) {
      const star = this.falling[i];
      star.y += (3.5 + this.level * 1.2) * delta / 16.67;
      if (Phaser.Math.Distance.Between(star.x, star.y, this.basket.x, this.basket.y) < 55) {
        if (star.colorData === this.target) {
          popupText(this, star.x, star.y, '✓', '#4caf78');
          sfxCorrect();
        } else {
          sfxWrong();
          popupText(this, star.x, star.y, '✕', '#ff5c7a');
          this.tweens.add({ targets: this.basket, x: this.basket.x + 8, duration: 60, yoyo: true, repeat: 2 });
          this.loseLife();
        }
        star.destroy();
        this.falling.splice(i, 1);
      } else if (star.y > height + 30) {
        star.destroy();
        this.falling.splice(i, 1);
      }
    }
  }
  endGame() {
    this.finished = true;
    this.spawnTimer.remove();
    this.falling.forEach(s => s.destroy());
    sfxComplete();
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.92);
    this.add.text(width / 2, height / 2 - 40, '💔 愛心用光了！', { fontSize: '26px', color: '#444' }).setOrigin(0.5);
    const next = this.add.rectangle(width / 2, height / 2 + 40, 200, 60, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
    this.add.text(width / 2, height / 2 + 40, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, next, () => this.scene.start('Menu'));
  }
}

class SchulteScene extends Phaser.Scene {
  constructor() { super('Schulte'); }
  init(data) { this.size = data.size || 3; }
  create() {
    const { width, height } = this.scale;
    this.next = 1;
    this.lives = 5;
    this.startTime = this.time.now;
    const total = this.size * this.size;

    addHeader(this, SCHULTE_INSTR);
    this.hearts = makeHearts(this, 56, 136, 5);
    this.progressText = this.add.text(width - 20, 136, `0 / ${total}`, { fontSize: '18px', color: '#444', fontStyle: 'bold' }).setOrigin(1, 0.5);
    this.girl = addCharacter(this, width / 2, 168, 50);
    this.timeText = this.add.text(width / 2, height - 30, '⏱ 0.0s', { fontSize: '22px', color: '#444', fontStyle: 'bold' }).setOrigin(0.5);

    const nums = Phaser.Utils.Array.Shuffle(Phaser.Utils.Array.NumberArray(1, total));
    const gridSize = Math.min(width, height) * 0.78;
    const cell = gridSize / this.size;
    const originX = width / 2 - gridSize / 2;
    const originY = 200;

    nums.forEach((num, idx) => {
      const row = Math.floor(idx / this.size);
      const col = idx % this.size;
      const x = originX + col * cell + cell / 2;
      const y = originY + row * cell + cell / 2;
      const tile = this.add.rectangle(x, y, cell - 8, cell - 8, 0xffffff).setStrokeStyle(3, 0xb185db).setInteractive();
      const label = this.add.text(x, y, String(num), { fontSize: '24px', color: '#555' }).setOrigin(0.5);
      tile.num = num; tile.label = label;
      tile.on('pointerdown', () => this.tap(tile));
    });

    this.total = total;
  }
  loseLife() {
    this.lives--;
    this.hearts[this.lives].setText('🖤');
    if (this.lives <= 0) this.endGame(false);
  }
  tap(tile) {
    if (this.finished) return;
    if (tile.num !== this.next) {
      sfxWrong();
      this.tweens.add({ targets: tile, x: tile.x + 6, duration: 60, yoyo: true, repeat: 2 });
      this.loseLife();
      return;
    }
    sfxCorrect();
    tile.disableInteractive();
    this.tweens.add({ targets: [tile, tile.label], alpha: 0.15, duration: 200 });
    this.next++;
    this.progressText.setText(`${this.next - 1} / ${this.total}`);
    if (this.next > this.total) this.endGame(true);
  }
  update() {
    if (this.finished) return;
    const elapsed = (this.time.now - this.startTime) / 1000;
    this.timeText.setText(`⏱ ${elapsed.toFixed(1)}s`);
  }
  endGame(success) {
    this.finished = true;
    sfxComplete();
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.92);
    if (success) {
      this.add.text(width / 2, height / 2 - 60, '🎉 太棒了！', { fontSize: '28px', color: '#444' }).setOrigin(0.5);
      const nextSize = Math.min(this.size + 1, 5);
      const again = this.add.rectangle(width / 2, height / 2, 220, 60, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
      this.add.text(width / 2, height / 2, `挑戰 ${nextSize}x${nextSize}`, { fontSize: '20px', color: '#444' }).setOrigin(0.5);
      pressEffect(this, again, () => this.scene.start('Schulte', { size: nextSize }));
      const menu = this.add.rectangle(width / 2, height / 2 + 80, 220, 60, 0xffffff).setStrokeStyle(4, 0xb185db).setInteractive();
      this.add.text(width / 2, height / 2 + 80, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
      pressEffect(this, menu, () => this.scene.start('Menu'));
    } else {
      this.add.text(width / 2, height / 2 - 40, '💔 愛心用光了！', { fontSize: '26px', color: '#444' }).setOrigin(0.5);
      const menu = this.add.rectangle(width / 2, height / 2 + 40, 220, 60, 0xffffff).setStrokeStyle(4, 0xb185db).setInteractive();
      this.add.text(width / 2, height / 2 + 40, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
      pressEffect(this, menu, () => this.scene.start('Menu'));
    }
  }
}

const FRUIT_EMOJI = ['🍎', '🍌', '🍇', '🍓', '🍒', '🥝', '🍍', '🍑'];

class MemoryScene extends Phaser.Scene {
  constructor() { super('Memory'); }
  init(data) { this.pairs = data.pairs || 6; }
  create() {
    const { width, height } = this.scale;
    addHeader(this, MEMORY_INSTR);
    this.movesText = this.add.text(56, 136, '次數: 0', { fontSize: '18px', color: '#444', fontStyle: 'bold' });
    const pet = addCharacter(this, width - 50, 140, 46);
    bobTween(this, pet);
    this.matchedCount = 0; this.moves = 0; this.locked = false; this.first = null;

    const icons = Phaser.Utils.Array.Shuffle(FRUIT_EMOJI.slice(0, this.pairs));
    const deck = Phaser.Utils.Array.Shuffle([...icons, ...icons]);

    const cols = 4;
    const rows = Math.ceil(deck.length / cols);
    const cell = Math.min(width * 0.86 / cols, height * 0.58 / rows);
    const originX = width / 2 - (cell * cols) / 2;
    const originY = height * 0.39 + 28;

    this.cards = deck.map((icon, idx) => {
      const row = Math.floor(idx / cols), col = idx % cols;
      const x = originX + col * cell + cell / 2;
      const y = originY + row * cell + cell / 2;
      const back = this.add.rectangle(x, y, cell - 10, cell - 10, 0xb185db).setStrokeStyle(3, 0xffffff).setInteractive();
      const label = this.add.text(x, y, icon, { fontSize: `${Math.floor(cell * 0.5)}px` }).setOrigin(0.5).setVisible(false);
      const card = { back, label, icon, matched: false };
      back.on('pointerdown', () => this.flip(card));
      return card;
    });
  }
  flip(card) {
    if (this.locked || card.matched || card === this.first) return;
    card.back.setFillStyle(0xffffff);
    card.label.setVisible(true);
    if (!this.first) { this.first = card; return; }

    const second = card;
    this.moves++;
    this.movesText.setText(`次數: ${this.moves}`);
    if (this.first.icon === second.icon) {
      this.first.matched = second.matched = true;
      sfxCorrect();
      this.matchedCount++;
      this.first = null;
      if (this.matchedCount === this.pairs) this.endGame();
    } else {
      this.locked = true;
      sfxWrong();
      this.time.delayedCall(500, () => {
        [this.first, second].forEach(c => { c.back.setFillStyle(0xb185db); c.label.setVisible(false); });
        this.first = null; this.locked = false;
      });
    }
  }
  endGame() {
    sfxComplete();
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.92);
    this.add.text(width / 2, height / 2 - 40, `🎉 配對成功！共 ${this.moves} 次`, { fontSize: '24px', color: '#444' }).setOrigin(0.5);
    const menu = this.add.rectangle(width / 2, height / 2 + 40, 220, 60, 0xffffff).setStrokeStyle(4, 0xb185db).setInteractive();
    this.add.text(width / 2, height / 2 + 40, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, menu, () => this.scene.start('Menu'));
  }
}

class SimonScene extends Phaser.Scene {
  constructor() { super('Simon'); }
  init(data) { this.speed = data.speed || 650; }
  create() {
    const { width, height } = this.scale;
    addHeader(this, SIMON_INSTR);
    this.roundText = this.add.text(56, 136, '關卡: 1', { fontSize: '18px', color: '#444', fontStyle: 'bold' });
    const pet = addCharacter(this, width - 50, 140, 46);
    bobTween(this, pet);

    this.sequence = [];
    this.playerStep = 0;
    this.accepting = false;

    const positions = [
      { x: width / 2 - 70, y: height * 0.48 }, { x: width / 2 + 70, y: height * 0.48 },
      { x: width / 2 - 70, y: height * 0.63 }, { x: width / 2 + 70, y: height * 0.63 },
    ];
    this.buttons = COLORS.map((c, i) => {
      const btn = this.add.rectangle(positions[i].x, positions[i].y, 110, 110, c.hex).setStrokeStyle(4, 0xffffff).setInteractive();
      btn.baseColor = c.hex;
      btn.on('pointerdown', () => this.onPress(i));
      return btn;
    });

    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.88);
    const ready = this.add.text(width / 2, height / 2 - 50, '準備好了嗎？', { fontSize: '22px', color: '#444', fontStyle: 'bold' }).setOrigin(0.5);
    const startBtn = this.add.rectangle(width / 2, height / 2 + 30, 180, 64, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
    const startLabel = this.add.text(width / 2, height / 2 + 30, '▶️ 開始', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, startBtn, () => {
      [overlay, ready, startBtn, startLabel].forEach(o => o.destroy());
      this.nextRound();
    });
  }
  nextRound() {
    this.accepting = false;
    this.playerStep = 0;
    this.sequence.push(Phaser.Math.Between(0, this.buttons.length - 1));
    this.roundText.setText(`關卡: ${this.sequence.length}`);
    this.time.delayedCall(500, () => this.playSequence());
  }
  playSequence() {
    this.sequence.forEach((idx, i) => this.time.delayedCall(i * this.speed, () => this.flash(idx)));
    this.time.delayedCall(this.sequence.length * this.speed + 200, () => { this.accepting = true; });
  }
  flash(idx) {
    const btn = this.buttons[idx];
    beep(330 + idx * 110, 0.25);
    btn.setFillStyle(0xffffff);
    this.tweens.add({ targets: btn, scaleX: 1.18, scaleY: 1.18, duration: 150, yoyo: true, ease: 'Sine.easeOut' });
    this.time.delayedCall(300, () => btn.setFillStyle(btn.baseColor));
  }
  onPress(idx) {
    if (!this.accepting) return;
    this.flash(idx);
    if (idx === this.sequence[this.playerStep]) {
      this.playerStep++;
      if (this.playerStep === this.sequence.length) {
        this.accepting = false;
        this.time.delayedCall(500, () => this.nextRound());
      }
    } else {
      this.accepting = false;
      sfxWrong();
      this.endGame();
    }
  }
  endGame() {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.92);
    this.add.text(width / 2, height / 2 - 50, `🎉 過了 ${this.sequence.length - 1} 關！`, { fontSize: '24px', color: '#444' }).setOrigin(0.5);
    const again = this.add.rectangle(width / 2, height / 2 + 30, 220, 60, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
    this.add.text(width / 2, height / 2 + 30, '再玩一次', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, again, () => this.scene.start('Simon', { speed: this.speed }));
    const menu = this.add.rectangle(width / 2, height / 2 + 100, 220, 60, 0xffffff).setStrokeStyle(4, 0xb185db).setInteractive();
    this.add.text(width / 2, height / 2 + 100, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, menu, () => this.scene.start('Menu'));
  }
}

class OddOneOutScene extends Phaser.Scene {
  constructor() { super('OddOneOut'); }
  init(data) { this.level = data.level || 1; this.timeLeft = data.time || 45; }
  create() {
    const { width, height } = this.scale;
    this.score = 0;
    this.gridSize = Math.min(4 + Math.floor(this.level / 2), 6);

    addHeader(this, ODD_INSTR);
    this.scoreText = this.add.text(56, 136, '⭐ 0', { fontSize: '20px', color: '#444', fontStyle: 'bold' });
    this.timeText = this.add.text(width - 56, 136, `⏱ ${this.timeLeft}`, { fontSize: '20px', color: '#444', fontStyle: 'bold' }).setOrigin(1, 0);
    const pet = addCharacter(this, width / 2, 140, 40);
    bobTween(this, pet);

    this.tiles = [];
    this.buildRound();
    this.clock = this.time.addEvent({ delay: 1000, loop: true, callback: () => this.tick() });
  }
  buildRound() {
    this.tiles.forEach(shape => shape.destroy());
    this.tiles = [];
    const { width, height } = this.scale;
    const n = this.gridSize;
    const total = n * n;
    const oddIdx = Phaser.Math.Between(0, total - 1);
    const baseColor = Phaser.Utils.Array.GetRandom(COLORS).hex;
    const oddColor = Phaser.Display.Color.IntegerToColor(baseColor).brighten(35).color;

    const gridSize = Math.min(width, height) * 0.74;
    const cell = gridSize / n;
    const originX = width / 2 - gridSize / 2;
    const originY = height * 0.39 + 28;

    for (let i = 0; i < total; i++) {
      const row = Math.floor(i / n), col = i % n;
      const x = originX + col * cell + cell / 2;
      const y = originY + row * cell + cell / 2;
      const isOdd = i === oddIdx;
      const shape = this.add.circle(x, y, cell * 0.32, isOdd ? oddColor : baseColor).setInteractive();
      shape.isOdd = isOdd;
      shape.on('pointerdown', () => this.tap(shape));
      this.tiles.push(shape);
    }
  }
  tap(shape) {
    if (shape.isOdd) {
      sfxCorrect();
      this.score++;
      this.scoreText.setText(`⭐ ${this.score}`);
      this.buildRound();
    } else {
      sfxWrong();
    }
  }
  tick() {
    this.timeLeft--;
    this.timeText.setText(`⏱ ${this.timeLeft}`);
    if (this.timeLeft <= 0) this.endGame();
  }
  endGame() {
    this.clock.remove();
    sfxComplete();
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.92);
    this.add.text(width / 2, height / 2 - 40, `🎉 完成！分數 ${this.score}`, { fontSize: '26px', color: '#444' }).setOrigin(0.5);
    const next = this.add.rectangle(width / 2, height / 2 + 40, 200, 60, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
    this.add.text(width / 2, height / 2 + 40, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, next, () => this.scene.start('Menu'));
  }
}

class MazeScene extends Phaser.Scene {
  constructor() { super('Maze'); }
  init(data) {
    this.tolerance = data.tolerance || 38;
    this.scrollSpeed = data.scroll || 0;
    this.pointCount = data.points || 6;
  }
  create() {
    const { width, height } = this.scale;
    this.lives = 5;
    this.finished = false;
    this.dragging = false;
    this.offPath = false;
    this.started = this.scrollSpeed <= 0;
    this.startTimer = 0;
    this.startDeadline = 4000;
    this.lastPointer = null;

    addHeader(this, MAZE_INSTR);
    this.hearts = makeHearts(this, 56, 136, 5);

    const top = 218, bottom = height - 50;
    const xs = Array.from({ length: this.pointCount }, (_, i) =>
      i % 2 === 0 ? Phaser.Math.Between(width * 0.22, width * 0.35) : Phaser.Math.Between(width * 0.65, width * 0.78)
    );
    this.points = xs.map((x, i) => ({ x, y: top + (bottom - top) * i / (xs.length - 1) }));
    this.last = this.points[this.points.length - 1];

    this.mazeContainer = this.add.container(0, 0);
    const g = this.add.graphics();
    g.lineStyle(this.tolerance * 2, 0xffe0ea, 1);
    this.drawPath(g);
    g.lineStyle(3, 0xff8fab, 1);
    this.drawPath(g);
    const startDot = this.add.circle(this.points[0].x, this.points[0].y, 14, 0x4caf78);
    const endStar = this.add.star(this.last.x, this.last.y, 5, 10, 18, 0xffd23f);
    this.mazeContainer.add([g, startDot, endStar]);

    this.runner = addCharacter(this, this.points[0].x, this.points[0].y, 44);

    if (this.scrollSpeed > 0) {
      this.countdownText = this.add.text(width / 2, 150, '⏱ 4 出發！', { fontSize: '18px', color: '#ff5c7a', fontStyle: 'bold' }).setOrigin(0.5);
    }

    this.input.on('pointerdown', (p) => {
      this.dragging = true;
      this.started = true;
      if (this.countdownText) this.countdownText.setVisible(false);
      this.lastPointer = { x: p.x, y: p.y };
    });
    this.input.on('pointerup', () => { this.dragging = false; });
    this.input.on('pointermove', (p) => {
      if (!this.dragging || this.finished) return;
      this.lastPointer = { x: p.x, y: p.y };
    });
  }
  drawPath(g) {
    g.beginPath();
    g.moveTo(this.points[0].x, this.points[0].y);
    this.points.slice(1).forEach(pt => g.lineTo(pt.x, pt.y));
    g.strokePath();
  }
  nearestOnPath(x, y) {
    const oy = this.mazeContainer.y;
    let best = null, bestDist = Infinity;
    for (let i = 0; i < this.points.length - 1; i++) {
      const a = { x: this.points[i].x, y: this.points[i].y + oy };
      const b = { x: this.points[i + 1].x, y: this.points[i + 1].y + oy };
      const c = this.closestOnSeg(x, y, a, b);
      const d = Phaser.Math.Distance.Between(x, y, c.x, c.y);
      if (d < bestDist) { bestDist = d; best = c; }
    }
    return { point: best, dist: bestDist };
  }
  closestOnSeg(x, y, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const len2 = dx * dx + dy * dy || 1;
    const t = Phaser.Math.Clamp(((x - a.x) * dx + (y - a.y) * dy) / len2, 0, 1);
    return { x: a.x + t * dx, y: a.y + t * dy };
  }
  trackRunner() {
    if (!this.lastPointer) return;
    const { x, y } = this.lastPointer;
    const { point, dist } = this.nearestOnPath(x, y);
    if (dist > this.tolerance) {
      const angle = Phaser.Math.Angle.Between(point.x, point.y, x, y);
      this.runner.setPosition(point.x + Math.cos(angle) * this.tolerance, point.y + Math.sin(angle) * this.tolerance);
      if (!this.offPath) { this.offPath = true; this.loseLife(); }
    } else {
      this.runner.setPosition(x, y);
      this.offPath = false;
      const oy = this.mazeContainer.y;
      if (Phaser.Math.Distance.Between(x, y, this.last.x, this.last.y + oy) < 30) this.win();
    }
  }
  update(time, delta) {
    if (this.finished) return;
    if (!this.started) {
      this.startTimer += delta;
      const remain = Math.max(0, Math.ceil((this.startDeadline - this.startTimer) / 1000));
      if (this.countdownText) this.countdownText.setText(`⏱ ${remain} 出發！`);
      if (this.startTimer >= this.startDeadline) { this.endGame(false); }
      return;
    }
    if (this.dragging) this.trackRunner();
    if (this.scrollSpeed > 0) this.mazeContainer.y -= this.scrollSpeed * delta / 1000;
  }
  loseLife() {
    this.lives--;
    this.hearts[this.lives].setText('🖤');
    sfxWrong();
    if (this.lives <= 0) this.endGame(false);
  }
  win() { this.endGame(true); }
  endGame(success) {
    this.finished = true;
    this.dragging = false;
    sfxComplete();
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.92);
    this.add.text(width / 2, height / 2 - 40, success ? '🎉 到達終點！' : '💔 愛心用光了！', { fontSize: '26px', color: '#444' }).setOrigin(0.5);
    const next = this.add.rectangle(width / 2, height / 2 + 40, 200, 60, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
    this.add.text(width / 2, height / 2 + 40, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, next, () => this.scene.start('Menu'));
  }
}

class BubbleScene extends Phaser.Scene {
  constructor() { super('Bubble'); }
  init(data) { this.level = data.level || 1; }
  create() {
    const { width, height } = this.scale;
    this.lives = 5;
    this.score = 0;
    this.colorCount = Math.min(3 + this.level, COLORS.length);
    this.target = Phaser.Utils.Array.GetRandom(COLORS.slice(0, this.colorCount));
    this.spawnDelay = Math.max(800 - this.level * 120, 350);
    this.finished = false;

    addHeader(this, BUBBLE_INSTR);
    this.add.circle(26, 136, 13, this.target.hex).setStrokeStyle(2, 0x555555);
    this.hearts = makeHearts(this, 56, 136, 5);
    this.scoreText = this.add.text(width - 20, 136, '⭐ 0', { fontSize: '18px', color: '#444', fontStyle: 'bold' }).setOrigin(1, 0.5);

    addCharacter(this, width / 2, height - 50, 70);

    this.bubbles = [];
    this.spawnTimer = this.time.addEvent({ delay: this.spawnDelay, loop: true, callback: () => this.spawnBubble() });
  }
  spawnBubble() {
    const { width, height } = this.scale;
    const c = Phaser.Utils.Array.GetRandom(COLORS.slice(0, this.colorCount));
    const x = Phaser.Math.Between(40, width - 40);
    const bubble = this.add.circle(x, height + 20, 26, c.hex, 0.85).setStrokeStyle(2, 0xffffff).setInteractive();
    bubble.colorData = c;
    bubble.on('pointerdown', () => this.pop(bubble));
    this.bubbles.push(bubble);
  }
  pop(bubble) {
    if (this.finished) return;
    if (bubble.colorData === this.target) {
      this.score++;
      this.scoreText.setText(`⭐ ${this.score}`);
      popupText(this, bubble.x, bubble.y, '✓', '#4caf78');
      sfxCorrect();
    } else {
      sfxWrong();
      popupText(this, bubble.x, bubble.y, '✕', '#ff5c7a');
      this.loseLife();
    }
    bubble.destroy();
    this.bubbles = this.bubbles.filter(b => b !== bubble);
  }
  loseLife() {
    this.lives--;
    this.hearts[this.lives].setText('🖤');
    if (this.lives <= 0) this.endGame();
  }
  update(time, delta) {
    if (this.finished) return;
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];
      b.y -= (1.6 + this.level * 0.4) * delta / 16.67;
      if (b.y < -30) { b.destroy(); this.bubbles.splice(i, 1); }
    }
  }
  endGame() {
    this.finished = true;
    this.spawnTimer.remove();
    this.bubbles.forEach(b => b.destroy());
    sfxComplete();
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.92);
    this.add.text(width / 2, height / 2 - 40, `🎉 完成！分數 ${this.score}`, { fontSize: '26px', color: '#444' }).setOrigin(0.5);
    const next = this.add.rectangle(width / 2, height / 2 + 40, 200, 60, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
    this.add.text(width / 2, height / 2 + 40, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, next, () => this.scene.start('Menu'));
  }
}

class RhythmScene extends Phaser.Scene {
  constructor() { super('Rhythm'); }
  init(data) {
    this.tolerance = data.tolerance || 16;
    this.growSpeed = data.growSpeed || 70;
  }
  create() {
    const { width, height } = this.scale;
    this.lives = 5;
    this.combo = 0;
    this.maxCombo = 0;
    this.targetRadius = 60;
    this.maxRadius = 150;
    this.radius = 10;
    this.active = true;

    addHeader(this, RHYTHM_INSTR);
    this.hearts = makeHearts(this, 56, 136, 5);
    this.comboText = this.add.text(width - 20, 136, '連續: 0', { fontSize: '18px', color: '#444', fontStyle: 'bold' }).setOrigin(1, 0.5);

    this.cx = width / 2; this.cy = height * 0.46;
    this.add.circle(this.cx, this.cy, this.targetRadius, 0xffffff, 0).setStrokeStyle(4, 0xff8fab);
    this.ringGraphics = this.add.graphics();

    const pet = addCharacter(this, width / 2, height * 0.78, 70);
    bobTween(this, pet);

    this.input.on('pointerdown', () => this.tapNow());
  }
  tapNow() {
    if (!this.active) return;
    if (Math.abs(this.radius - this.targetRadius) <= this.tolerance) {
      sfxCorrect();
      this.combo++;
      this.maxCombo = Math.max(this.maxCombo, this.combo);
      this.comboText.setText(`連續: ${this.combo}`);
      popupText(this, this.cx, this.cy, '✓', '#4caf78');
      this.growSpeed = Math.min(this.growSpeed + 4, 160);
    } else {
      this.miss();
    }
    this.radius = 10;
  }
  miss() {
    sfxWrong();
    this.combo = 0;
    this.comboText.setText('連續: 0');
    popupText(this, this.cx, this.cy, '✕', '#ff5c7a');
    this.lives--;
    this.hearts[this.lives].setText('🖤');
    if (this.lives <= 0) this.endGame();
  }
  update(time, delta) {
    if (!this.active) return;
    this.radius += this.growSpeed * delta / 1000;
    this.ringGraphics.clear();
    this.ringGraphics.lineStyle(4, 0xb185db, 1);
    this.ringGraphics.strokeCircle(this.cx, this.cy, this.radius);
    if (this.radius > this.maxRadius) {
      this.radius = 10;
      this.miss();
    }
  }
  endGame() {
    this.active = false;
    sfxComplete();
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.92);
    this.add.text(width / 2, height / 2 - 40, `🎉 最高連續 ${this.maxCombo} 次！`, { fontSize: '24px', color: '#444' }).setOrigin(0.5);
    const next = this.add.rectangle(width / 2, height / 2 + 40, 200, 60, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
    this.add.text(width / 2, height / 2 + 40, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, next, () => this.scene.start('Menu'));
  }
}

class PuzzleScene extends Phaser.Scene {
  constructor() { super('Puzzle'); }
  init(data) { this.gridSize = data.grid || 3; }
  create() {
    const { width, height } = this.scale;
    addHeader(this, PUZZLE_INSTR);
    this.movesText = this.add.text(56, 136, '次數: 0', { fontSize: '18px', color: '#444', fontStyle: 'bold' });
    this.moves = 0;
    this.first = null;

    const key = this.registry.get('char') || 'girl';
    const hasImage = this.game.loadedChars && this.game.loadedChars[key];

    const n = this.gridSize;
    const boardSize = Math.min(width, height) * 0.7;
    this.cell = boardSize / n;
    this.originX = width / 2 - boardSize / 2;
    this.originY = height * 0.42;
    this.n = n;

    let srcW = 0, srcH = 0;
    if (hasImage) {
      const src = this.textures.get(key).getSourceImage();
      srcW = src.width; srcH = src.height;
    }

    const order = Phaser.Utils.Array.Shuffle(Phaser.Utils.Array.NumberArray(0, n * n - 1));
    this.tiles = order.map((pieceIdx, slotIdx) => {
      const pos = this.slotPos(slotIdx);
      let obj;
      if (hasImage) {
        obj = this.add.image(pos.x, pos.y, key);
        const pr = Math.floor(pieceIdx / n), pc = pieceIdx % n;
        obj.setCrop(pc * (srcW / n), pr * (srcH / n), srcW / n, srcH / n);
        obj.setDisplaySize(this.cell - 6, this.cell - 6);
      } else {
        const hue = Math.floor((pieceIdx / (n * n)) * 360);
        obj = this.add.rectangle(pos.x, pos.y, this.cell - 6, this.cell - 6, Phaser.Display.Color.HSVColorWheel()[hue].color);
      }
      const label = this.add.text(pos.x, pos.y, String(pieceIdx + 1), { fontSize: '14px', color: '#fff', fontStyle: 'bold', stroke: '#444', strokeThickness: 3 }).setOrigin(0.5);
      const zone = this.add.zone(pos.x, pos.y, this.cell, this.cell).setInteractive();
      const tile = { obj, label, zone, pieceIdx, slotIdx };
      zone.on('pointerdown', () => this.select(tile));
      return tile;
    });
  }
  slotPos(slotIdx) {
    const row = Math.floor(slotIdx / this.n), col = slotIdx % this.n;
    return { x: this.originX + col * this.cell + this.cell / 2, y: this.originY + row * this.cell + this.cell / 2 };
  }
  select(tile) {
    if (this.locked) return;
    if (tile === this.first) { tile.obj.setAlpha(1); this.first = null; return; }
    if (!this.first) { this.first = tile; tile.obj.setAlpha(0.55); return; }
    const a = this.first, b = tile;
    const tmp = a.slotIdx; a.slotIdx = b.slotIdx; b.slotIdx = tmp;
    [a, b].forEach(t => {
      const pos = this.slotPos(t.slotIdx);
      t.obj.setPosition(pos.x, pos.y);
      t.label.setPosition(pos.x, pos.y);
      t.zone.setPosition(pos.x, pos.y);
    });
    a.obj.setAlpha(1);
    this.first = null;
    this.moves++;
    this.movesText.setText(`次數: ${this.moves}`);
    sfxCorrect();
    if (this.tiles.every(t => t.pieceIdx === t.slotIdx)) this.endGame();
  }
  endGame() {
    this.locked = true;
    sfxComplete();
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.92);
    this.add.text(width / 2, height / 2 - 40, `🎉 拼好了！共 ${this.moves} 次`, { fontSize: '24px', color: '#444' }).setOrigin(0.5);
    const menu = this.add.rectangle(width / 2, height / 2 + 40, 220, 60, 0xffffff).setStrokeStyle(4, 0xb185db).setInteractive();
    this.add.text(width / 2, height / 2 + 40, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, menu, () => this.scene.start('Menu'));
  }
}

class ConnectScene extends Phaser.Scene {
  constructor() { super('Connect'); }
  init(data) { this.total = data.count || 8; }
  create() {
    const { width, height } = this.scale;
    addHeader(this, CONNECT_INSTR);
    this.lives = 5;
    this.hearts = makeHearts(this, 56, 136, 5);
    this.next = 1;
    this.dragging = false;
    this.finished = false;
    this.trail = [];

    const top = 190, bottom = height - 40;
    this.dots = [];
    for (let i = 1; i <= this.total; i++) {
      const x = Phaser.Math.Between(width * 0.15, width * 0.85);
      const y = Phaser.Math.Between(top, bottom);
      const circle = this.add.circle(x, y, 22, 0xffffff).setStrokeStyle(3, 0xb185db);
      this.add.text(x, y, String(i), { fontSize: '18px', color: '#444', fontStyle: 'bold' }).setOrigin(0.5);
      this.dots.push({ x, y, num: i, circle, done: false });
    }

    this.lineGraphics = this.add.graphics();

    this.input.on('pointerdown', (p) => {
      this.dragging = true;
      this.trail = [{ x: p.x, y: p.y }];
    });
    this.input.on('pointerup', () => {
      if (this.dragging && !this.finished && this.next > 1) {
        this.next = 1;
        this.dots.forEach(d => { d.done = false; d.circle.setFillStyle(0xffffff); });
        this.lineGraphics.clear();
        this.trail = [];
      }
      this.dragging = false;
    });
    this.input.on('pointermove', (p) => {
      if (!this.dragging || this.finished) return;
      this.trail.push({ x: p.x, y: p.y });
      this.redrawTrail();
      const target = this.dots[this.next - 1];
      if (target && !target.done && Phaser.Math.Distance.Between(p.x, p.y, target.x, target.y) < 26) {
        target.done = true;
        target.circle.setFillStyle(0x4caf78);
        sfxCorrect();
        this.next++;
        if (this.next > this.total) this.win();
      }
    });
  }
  redrawTrail() {
    this.lineGraphics.clear();
    this.lineGraphics.lineStyle(4, 0xff8fab, 1);
    this.lineGraphics.beginPath();
    this.lineGraphics.moveTo(this.trail[0].x, this.trail[0].y);
    this.trail.forEach(pt => this.lineGraphics.lineTo(pt.x, pt.y));
    this.lineGraphics.strokePath();
  }
  fail() {
    this.lives--;
    this.hearts[this.lives].setText('🖤');
    sfxWrong();
    this.lineGraphics.clear();
    this.trail = [];
    if (this.lives <= 0) this.endGame(false);
  }
  win() { this.endGame(true); }
  endGame(success) {
    this.finished = true;
    sfxComplete();
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.92);
    this.add.text(width / 2, height / 2 - 40, success ? '🎉 連完了！' : '💔 愛心用光了！', { fontSize: '26px', color: '#444' }).setOrigin(0.5);
    const next = this.add.rectangle(width / 2, height / 2 + 40, 200, 60, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
    this.add.text(width / 2, height / 2 + 40, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, next, () => this.scene.start('Menu'));
  }
}

class MissingPieceScene extends Phaser.Scene {
  constructor() { super('MissingPiece'); }
  init(data) { this.gridSize = data.grid || 4; this.timeLeft = data.time || 40; }
  create() {
    const { width, height } = this.scale;
    this.score = 0;
    addHeader(this, MISSING_INSTR);
    this.scoreText = this.add.text(56, 136, '⭐ 0', { fontSize: '20px', color: '#444', fontStyle: 'bold' });
    this.timeText = this.add.text(width - 56, 136, `⏱ ${this.timeLeft}`, { fontSize: '20px', color: '#444', fontStyle: 'bold' }).setOrigin(1, 0);
    const pet = addCharacter(this, width / 2, 140, 40);
    bobTween(this, pet);

    this.tiles = [];
    this.buildRound();
    this.clock = this.time.addEvent({ delay: 1000, loop: true, callback: () => this.tick() });
  }
  buildRound() {
    this.tiles.forEach(t => { t.gfx.destroy(); t.zone.destroy(); });
    this.tiles = [];
    const { width, height } = this.scale;
    const n = this.gridSize;
    const total = n * n;
    const oddIdx = Phaser.Math.Between(0, total - 1);
    const color = Phaser.Utils.Array.GetRandom(COLORS).hex;

    const gridSize = Math.min(width, height) * 0.74;
    const cell = gridSize / n;
    const originX = width / 2 - gridSize / 2;
    const originY = height * 0.39 + 28;

    for (let i = 0; i < total; i++) {
      const row = Math.floor(i / n), col = i % n;
      const x = originX + col * cell + cell / 2;
      const y = originY + row * cell + cell / 2;
      const r = cell * 0.32;
      const isOdd = i === oddIdx;
      const gfx = this.add.graphics({ x, y });
      gfx.fillStyle(color, 1);
      if (isOdd) {
        gfx.slice(0, 0, r, Phaser.Math.DegToRad(25), Phaser.Math.DegToRad(335), false);
        gfx.fillPath();
      } else {
        gfx.fillCircle(0, 0, r);
      }
      const zone = this.add.zone(x, y, cell, cell).setInteractive();
      zone.isOdd = isOdd;
      zone.on('pointerdown', () => this.tap(zone));
      this.tiles.push({ gfx, zone });
    }
  }
  tap(zone) {
    if (zone.isOdd) {
      sfxCorrect();
      this.score++;
      this.scoreText.setText(`⭐ ${this.score}`);
      this.buildRound();
    } else {
      sfxWrong();
    }
  }
  tick() {
    this.timeLeft--;
    this.timeText.setText(`⏱ ${this.timeLeft}`);
    if (this.timeLeft <= 0) this.endGame();
  }
  endGame() {
    this.clock.remove();
    sfxComplete();
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0.92);
    this.add.text(width / 2, height / 2 - 40, `🎉 完成！分數 ${this.score}`, { fontSize: '26px', color: '#444' }).setOrigin(0.5);
    const next = this.add.rectangle(width / 2, height / 2 + 40, 200, 60, 0xffffff).setStrokeStyle(4, 0xff8fab).setInteractive();
    this.add.text(width / 2, height / 2 + 40, '回主選單', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
    pressEffect(this, next, () => this.scene.start('Menu'));
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: Math.min(window.innerWidth, 480),
  height: Math.min(window.innerHeight, 854),
  backgroundColor: '#fdeef4',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [BootScene, CharSelectScene, MenuScene, DifficultyScene, StarCatcherScene, SchulteScene, MemoryScene, SimonScene, OddOneOutScene, MazeScene, BubbleScene, RhythmScene, PuzzleScene, ConnectScene, MissingPieceScene],
};

new Phaser.Game(config);
