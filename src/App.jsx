import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  Mic,
  MicOff,
  Settings,
  AlertTriangle,
  BatteryWarning,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Compass as CompassIcon,
  Radio,
  X,
  Maximize2,
  Minimize2,
  Download,
  Terminal,
  KeyRound,
  Wrench,
  ShoppingBag,
  PhoneCall,
  ShieldCheck,
  ShieldOff,
  Sliders
} from "lucide-react";

const EMERGENCY_NUMBERS = {
  tr: "112",
  en: "911",
  ru: "112",
  de: "112",
  zh: "120",
  ko: "119"
};

const T = {
  tr: {
    speed: "HIZ",
    maxSpeed: "MAKS HIZ",
    avgSpeed: "ORT HIZ",
    distance: "MESAFE",
    time: "SÜRE",
    pause: "DURAKLAT",
    resume: "DEVAM ET",
    reset: "SIFIRLA",
    altitude: "RAKIM",
    grade: "EĞİM",
    settings: "AYARLAR",
    language: "DİL SEÇİMİ",
    theme: "TEMA",
    unit: "HIZ BİRİMİ",
    sensitivity: "SARSINTI HASSASİYETİ",
    potholeDetection: "ÇUKUR ALGILAMA",
    emergencyNum: "ACİL DURUM NUMARASI",
    close: "KAPAT",
    potholeWarning: "ÇUKUR ALGILANDI!",
    kmh: "km/s",
    mph: "mph",
    km: "km",
    mi: "mi",
    m: "m",
    radio: "RADYO",
    compass: "PUSULA",
    map: "HARİTA",
    hud: "GÖSTERGE",
    devOptions: "GELİŞTİRİCİ SEÇENEKLERİ",
    devHud: "Gösterge Panel",
    devCompass: "Pusula Modu",
    devMap: "Harita Modu",
    devRadio: "Radyo Modu",
    devRepair: "Tamirci Tarifi",
    devMarket: "Market Tarifi",
    voiceDevUnlocked: "Geliştirici seçenekleri açıldı.",
    voiceDevLocked: "Geliştirici seçenekleri kapatıldı.",
    voiceNav: "için yol tarifi hazırlanıyor.",
    voiceCompass: "Pusula modu açılıyor.",
    voiceRadio: "Radyo açılıyor.",
    voiceMap: "Harita açılıyor.",
    voiceHud: "Gösterge paneli açılıyor.",
    voiceReset: "Sürüş verileri sıfırlandı."
  },
  en: {
    speed: "SPEED", maxSpeed: "MAX SPEED", avgSpeed: "AVG SPEED", distance: "DISTANCE", time: "TIME", pause: "PAUSE", resume: "RESUME", reset: "RESET", altitude: "ALTITUDE", grade: "GRADE", settings: "SETTINGS", language: "LANGUAGE", theme: "THEME", unit: "SPEED UNIT", sensitivity: "SHAKE SENSITIVITY", potholeDetection: "POTHOLE DETECTION", emergencyNum: "EMERGENCY NUMBER", close: "CLOSE", potholeWarning: "POTHOLE DETECTED!", kmh: "km/h", mph: "mph", km: "km", mi: "mi", m: "m", radio: "RADIO", compass: "COMPASS", map: "MAP", hud: "HUD", devOptions: "DEVELOPER OPTIONS", devHud: "HUD Panel", devCompass: "Compass Mode", devMap: "Map Mode", devRadio: "Radio Mode", devRepair: "Repair Route", devMarket: "Market Route", voiceDevUnlocked: "Developer options unlocked.", voiceDevLocked: "Developer options locked.", voiceNav: "Getting directions for", voiceCompass: "Opening compass mode.", voiceRadio: "Opening radio.", voiceMap: "Opening map mode.", voiceHud: "Opening dashboard.", voiceReset: "Ride data reset."
  },
  ru: {
    speed: "СКОРОСТЬ", maxSpeed: "МАКС.", avgSpeed: "СРЕД.", distance: "ДИСТАНЦИЯ", time: "ВРЕМЯ", pause: "ПАУЗА", resume: "ПРОДОЛЖИТЬ", reset: "СБРОС", altitude: "ВЫСОТА", grade: "УКЛОН", settings: "НАСТРОЙКИ", language: "ЯЗЫК", theme: "ТЕМА", unit: "ЕД. СКОРОСТИ", sensitivity: "ЧУВСТВИТЕЛЬНОСТЬ", potholeDetection: "ДЕТЕКЦИЯ ВЫБОИН", emergencyNum: "АВАРИЙНЫЙ НОМЕР", close: "ЗАКРЫТЬ", potholeWarning: "ВЫБОИНА!", kmh: "км/ч", mph: "миль/ч", km: "км", mi: "миль", m: "м", radio: "РАДИО", compass: "КОМПАС", map: "КАРТА", hud: "СПИДОМЕТР", devOptions: "ОПЦИИ РАЗРАБОТЧИКА", devHud: "Спидометр", devCompass: "Компас", devMap: "Карта", devRadio: "Радио", devRepair: "Ремонт", devMarket: "Магазин", voiceDevUnlocked: "Режим разработчика включен.", voiceDevLocked: "Режим разработчика выключен.", voiceNav: "Маршрут для", voiceCompass: "Открываю компас.", voiceRadio: "Включаю радио.", voiceMap: "Открываю карту.", voiceHud: "Открываю спидометр.", voiceReset: "Данные сброшены."
  },
  de: {
    speed: "GESCHWINDIGKEIT", maxSpeed: "MAX", avgSpeed: "SCHNITT", distance: "STRECKE", time: "ZEIT", pause: "PAUSE", resume: "WEITER", reset: "RESET", altitude: "HÖHE", grade: "STEIGUNG", settings: "EINSTELLUNGEN", language: "SPRACHE", theme: "THEMA", unit: "EINHEIT", sensitivity: "EMPFINDLICHKEIT", potholeDetection: "SCHLAGLOCHERKENNUNG", emergencyNum: "NOTRUFNUMMER", close: "SCHLIESSEN", potholeWarning: "SCHLAGLOCH!", kmh: "km/h", mph: "mph", km: "km", mi: "mi", m: "m", radio: "RADIO", compass: "KOMPASS", map: "KARTE", hud: "HUD", devOptions: "ENTWICKLEROPTIONEN", devHud: "Tacho Panel", devCompass: "Kompass Modus", devMap: "Karten Modus", devRadio: "Radio Modus", devRepair: "Werkstatt Route", devMarket: "Markt Route", voiceDevUnlocked: "Entwickleroptionen freigeschaltet.", voiceDevLocked: "Entwickleroptionen gesperrt.", voiceNav: "Route wird berechnet für", voiceCompass: "Kompass wird geöffnet.", voiceRadio: "Radio wird geöffnet.", voiceMap: "Karte wird geöffnet.", voiceHud: "Tacho wird geöffnet.", voiceReset: "Fahrdaten zurückgesetzt."
  },
  zh: {
    speed: "速度", maxSpeed: "最高速", avgSpeed: "均速", distance: "距离", time: "时间", pause: "暂停", resume: "继续", reset: "重置", altitude: "海拔", grade: "坡度", settings: "设置", language: "语言", theme: "主题", unit: "单位", sensitivity: "灵敏度", potholeDetection: "坑洼检测", emergencyNum: "紧急电话", close: "关闭", potholeWarning: "检测到坑洼!", kmh: "km/h", mph: "mph", km: "km", mi: "mi", m: "m", radio: "收音机", compass: "指南针", map: "地图", hud: "仪表盘", devOptions: "开发者选项", devHud: "仪表盘模式", devCompass: "指南针模式", devMap: "地图模式", devRadio: "收音机模式", devRepair: "修车店路线", devMarket: "超市路线", voiceDevUnlocked: "开发者选项已解锁。", voiceDevLocked: "开发者选项已锁定。", voiceNav: "正在导航至", voiceCompass: "打开指南针。", voiceRadio: "打开收音机。", voiceMap: "打开地图。", voiceHud: "打开仪表盘。", voiceReset: "骑行数据已重置."
  },
  ko: {
    speed: "속도", maxSpeed: "최고속도", avgSpeed: "평균속도", distance: "거리", time: "시간", pause: "일시정지", resume: "재개", reset: "초기화", altitude: "고도", grade: "경사도", settings: "설정", language: "언어", theme: "테마", unit: "단위", sensitivity: "감도", potholeDetection: "포트홀 감지", emergencyNum: "비상 연락처", close: "닫기", potholeWarning: "충격 감지!", kmh: "km/h", mph: "mph", km: "km", mi: "mi", m: "m", radio: "라디오", compass: "나침반", map: "지도", hud: "계기판", devOptions: "개발자 옵션", devHud: "계기판 모드", devCompass: "나침반 모드", devMap: "지도 모드", devRadio: "라디오 모드", devRepair: "정비소 경로", devMarket: "마트 경로", voiceDevUnlocked: "개발자 옵션이 해제되었습니다.", voiceDevLocked: "개발자 옵션이 잠겼습니다.", voiceNav: "경로를 검색합니다:", voiceCompass: "나침반을 엽니다.", voiceRadio: "라디오를 켭니다.", voiceMap: "지도를 엽니다.", voiceHud: "계기판을 엽니다.", voiceReset: "주행 데이터가 초기화되었습니다."
  }
};

const LANGUAGES = [
  { code: "tr", name: "Türkçe" },
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" },
  { code: "ko", name: "한국어" }
];

const RADIO_STATIONS_BY_LANG = {
  tr: [
    { name: "Kral FM", url: "https://radyokralfm.rtp.org.tr/stream" },
    { name: "Power FM", url: "https://powerfm.listenpowerapp.com/powerfm/mpeg/icecast.audio" },
    { name: "TRT FM", url: "https://radio-trtfm.medya.trt.com.tr/stream" }
  ],
  en: [
    { name: "Capital FM UK", url: "https://stream-capital.musicradio.com/capitalmp3" },
    { name: "BBC Radio 1", url: "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one" }
  ],
  ru: [
    { name: "Европа Плюс", url: "https://ep128.hostingradio.ru:8030/ep128" }
  ],
  de: [
    { name: "1LIVE", url: "https://wdr-1live-live.icecast.wdr.de/wdr/1live/live/mp3/128/stream.mp3" }
  ],
  zh: [
    { name: "CNR Music Radio", url: "https://ngcdn001.cnr.cn/live/yyzs/index.m3u8" }
  ],
  ko: [
    { name: "KBS World Radio", url: "https://world-stream.kbs.co.kr/valive/world/world_32k.m3u8" }
  ]
};

const THEMES = {
  green: { primary: "#CCFF00", bg: "#12140F", cardBg: "rgba(255,255,255,0.05)", text: "#ffffff" },
  blue: { primary: "#00E5FF", bg: "#0A1218", cardBg: "rgba(255,255,255,0.05)", text: "#ffffff" },
  red: { primary: "#FF2A5F", bg: "#180A0D", cardBg: "rgba(255,255,255,0.05)", text: "#ffffff" },
  white: { primary: "#000000", bg: "#FFFFFF", cardBg: "rgba(0,0,0,0.05)", text: "#000000" }
};

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootTestSpeed, setBootTestSpeed] = useState(0);

  const [lang, setLang] = useState("tr");
  const [themeKey, setThemeKey] = useState("green");
  const [unit, setUnit] = useState("kmh");
  const [activeTab, setActiveTab] = useState("hud");

  const [speed, setSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [altitude, setAltitude] = useState(0);
  const [grade, setGrade] = useState(0);

  const [userCoords, setUserCoords] = useState({ lat: 40.6549, lon: 29.2842 });
  const [destinationQuery, setDestinationQuery] = useState("");

  const [heading, setHeading] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [potholeAlert, setPotholeAlert] = useState(false);
  const [isPotholeEnabled, setIsPotholeEnabled] = useState(true);
  const [shakeSensitivity, setShakeSensitivity] = useState(18);
  const [emergencyPhone, setEmergencyPhone] = useState(EMERGENCY_NUMBERS.tr);

  const [devClicks, setDevClicks] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isDevUnlocked, setIsDevUnlocked] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [assistantMsg, setAssistantMsg] = useState("");
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);
  const [currentRadioIndex, setCurrentRadioIndex] = useState(0);

  const [showSettings, setShowSettings] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const t = T[lang] || T.tr;
  const theme = THEMES[themeKey] || THEMES.green;
  const currentRadioList = RADIO_STATIONS_BY_LANG[lang] || RADIO_STATIONS_BY_LANG.tr;

  const prevCoordsRef = useRef({ lat: null, lon: null, alt: null });
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(currentRadioList[0].url);
  }, []);

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voiceLangs = { tr: "tr-TR", en: "en-US", ru: "ru-RU", de: "de-DE", zh: "zh-CN", ko: "ko-KR" };
      utterance.lang = voiceLangs[lang] || "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  // Açılış self-test animasyonu (Claude'un o saf akıcı döngüsü)
  useEffect(() => {
    let speedVal = 0;
    let direction = 1;
    const interval = setInterval(() => {
      if (direction === 1) {
        speedVal += 4;
        if (speedVal >= 120) direction = -1;
      } else {
        speedVal -= 6;
        if (speedVal <= 0) {
          speedVal = 0;
          clearInterval(interval);
          setIsBooting(false);
        }
      }
      setBootTestSpeed(speedVal);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newStations = RADIO_STATIONS_BY_LANG[lang] || RADIO_STATIONS_BY_LANG.tr;
    setCurrentRadioIndex(0);
    if (audioRef.current) {
      audioRef.current.src = newStations[0].url;
      if (isPlayingRadio) audioRef.current.play().catch(() => {});
    }
    setEmergencyPhone(EMERGENCY_NUMBERS[lang] || "112");
  }, [lang]);

  useEffect(() => {
    if (!navigator.geolocation || isBooting) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed: gpsSpeed, altitude: gpsAltitude } = position.coords;
        const currentAlt = gpsAltitude ? Math.round(gpsAltitude) : 0;
        let currentSpeedKmh = gpsSpeed ? Math.round(gpsSpeed * 3.6) : 0;

        if (currentSpeedKmh < 1.5) {
          setIsPaused(true);
          currentSpeedKmh = 0;
        } else {
          setIsPaused(false);
        }

        const displaySpeed = unit === "mph" ? Math.round(currentSpeedKmh * 0.621371) : currentSpeedKmh;

        setUserCoords({ lat: latitude, lon: longitude });
        setSpeed(displaySpeed);
        setMaxSpeed((prev) => Math.max(prev, displaySpeed));
        setAltitude(currentAlt);

        if (prevCoordsRef.current.lat !== null && prevCoordsRef.current.alt !== null) {
          const lat1 = prevCoordsRef.current.lat;
          const lon1 = prevCoordsRef.current.lon;
          const alt1 = prevCoordsRef.current.alt;

          const R = 6371000;
          const dLat = ((latitude - lat1) * Math.PI) / 180;
          const dLon = ((longitude - lon1) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
              Math.cos((latitude * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const dDist = R * c;

          if (dDist > 2 && !isPaused) {
            const addedDist = unit === "mph" ? (dDist / 1000) * 0.621371 : dDist / 1000;
            setDistance((prev) => prev + addedDist);

            const dAlt = currentAlt - alt1;
            const calculatedGrade = (dAlt / dDist) * 100;
            setGrade(Math.round(Math.max(-30, Math.min(30, calculatedGrade))));
            prevCoordsRef.current = { lat: latitude, lon: longitude, alt: currentAlt };
          }
        } else {
          prevCoordsRef.current = { lat: latitude, lon: longitude, alt: currentAlt };
        }
      },
      (err) => console.error("GPS Hatası:", err),
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isPaused, unit, isBooting]);

  useEffect(() => {
    let interval;
    if (!isPaused && !isBooting) {
      interval = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, isBooting]);

  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.webkitCompassHeading) setHeading(e.webkitCompassHeading);
      else if (e.alpha) setHeading(360 - e.alpha);
    };
    window.addEventListener("deviceorientation", handleOrientation, true);
    return () => window.removeEventListener("deviceorientation", handleOrientation, true);
  }, []);

  useEffect(() => {
    if (!isPotholeEnabled) return;

    const handleMotion = (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const totalAcc = Math.sqrt((acc.x || 0) * (acc.x || 0) + (acc.y || 0) * (acc.y || 0) + (acc.z || 0) * (acc.z || 0));
      if (totalAcc > shakeSensitivity) {
        setPotholeAlert(true);
        speakText(t.potholeWarning);
        setTimeout(() => setPotholeAlert(false), 3000);
      }
    };
    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [shakeSensitivity, isPotholeEnabled, lang]);

  const handleVersionClick = () => {
    const newClicks = devClicks + 1;
    setDevClicks(newClicks);
    if (newClicks >= 5) {
      setShowPasswordModal(true);
      setDevClicks(0);
    }
  };

  const handlePasswordSubmit = () => {
    if (inputPassword === "130782") {
      if (isDevUnlocked) {
        setIsDevUnlocked(false);
        speakText(t.voiceDevLocked);
      } else {
        setIsDevUnlocked(true);
        speakText(t.voiceDevUnlocked);
      }
      setShowPasswordModal(false);
      setInputPassword("");
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setInputPassword("");
    }
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    if (isPlayingRadio && audioRef.current) {
      audioRef.current.volume = 0.2;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    const voiceLangs = { tr: "tr-TR", en: "en-US", ru: "ru-RU", de: "de-DE", zh: "zh-CN", ko: "ko-KR" };
    recognition.lang = voiceLangs[lang] || "en-US";

    recognition.onstart = () => { setIsListening(true); setAssistantMsg("..."); };
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase();
      setAssistantMsg(`"${transcript}"`);

      if (transcript.includes("tamirci") || transcript.includes("bisiklet tamircisi")) {
        setDestinationQuery("bisiklet tamircisi");
        setActiveTab("map");
        speakText(`${t.voiceNav} bisiklet tamircisi`);
      } else if (transcript.includes("market")) {
        setDestinationQuery("market");
        setActiveTab("map");
        speakText(`${t.voiceNav} market`);
      } else if (transcript.includes("pusula")) {
        setActiveTab("compass");
        speakText(t.voiceCompass);
      } else if (transcript.includes("radyo")) {
        setActiveTab("radio");
        speakText(t.voiceRadio);
      } else if (transcript.includes("harita")) {
        setActiveTab("map");
        speakText(t.voiceMap);
      } else if (transcript.includes("gösterge") || transcript.includes("hud")) {
        setActiveTab("hud");
        speakText(t.voiceHud);
      } else if (transcript.includes("sıfırla")) {
        setDistance(0); setElapsedTime(0); setMaxSpeed(0);
        speakText(t.voiceReset);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (isPlayingRadio && audioRef.current) audioRef.current.volume = 1.0;
    };
    recognition.start();
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
      setIsFullScreen(false);
    }
  };

  // Kadran Açı Hesabı (Claude'un akıcı ibre mimarisiyle)
  const needleAngle = Math.min(Math.max((speed / 180) * 240 - 120, -120), 120);

  if (isBooting) {
    return (
      <div style={{ backgroundColor: "#000", color: "#CCFF00", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", transition: "all 0.3s ease" }}>
        <Zap size={64} style={{ animation: "pulse 1.5s infinite" }} />
        <h1 style={{ fontSize: "36px", letterSpacing: "6px", margin: "10px 0", fontWeight: "900" }}>V.O.L.T</h1>
        <p style={{ color: "#aaa", fontSize: "12px", letterSpacing: "2px" }}>SELF TEST SYSTEM...</p>
        <div style={{ fontSize: "52px", fontWeight: "900", marginTop: "20px", fontFamily: "monospace" }}>{bootTestSpeed} <small style={{ fontSize: "14px", opacity: 0.7 }}>KM/H</small></div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, height: "100vh", width: "100vw", display: "flex", flexDirection: "column", fontFamily: "system-ui, -apple-system, sans-serif", userSelect: "none", overflow: "hidden", transition: "background-color 0.4s ease, color 0.4s ease" }}>
      
      {/* Üst Bar (Claude UI Temizliğiyle) */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: `1px solid ${themeKey === "white" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`, flexShrink: 0, backdropFilter: "blur(10px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Zap size={24} color={theme.primary} style={{ filter: `drop-shadow(0 0 8px ${theme.primary}55)` }} />
          <span style={{ fontSize: "18px", fontWeight: "900", letterSpacing: "2.5px", color: theme.primary }}>V.O.L.T</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href={`tel:${emergencyPhone}`} style={{ color: "#FF2A5F", display: "flex", alignItems: "center", gap: "5px", textDecoration: "none", fontSize: "13px", fontWeight: "800", backgroundColor: "rgba(255,42,95,0.1)", padding: "4px 10px", borderRadius: "20px" }}>
            <PhoneCall size={14} /> {emergencyPhone}
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: "700" }}>
            <BatteryWarning size={16} color={batteryLevel <= 20 ? "#FF2A5F" : theme.primary} />
            <span>%{batteryLevel}</span>
          </div>
          <button onClick={toggleFullScreen} style={{ background: "none", border: "none", color: theme.text, cursor: "pointer", opacity: 0.8, padding: "4px" }}>
            {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button onClick={() => setShowSettings(true)} style={{ background: "none", border: "none", color: theme.text, cursor: "pointer", opacity: 0.8, padding: "4px" }}>
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Ana Ekran Alanı */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
        {potholeAlert && (
          <div style={{ backgroundColor: "#FF2A5F", color: "#fff", padding: "12px", textAlign: "center", fontWeight: "900", letterSpacing: "1px", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, boxShadow: "0 4px 12px rgba(255,42,95,0.4)" }}>
            <AlertTriangle size={18} style={{ verticalAlign: "middle", marginRight: "6px" }} /> {t.potholeWarning}
          </div>
        )}

        {/* 1. HUD GÖSTERGE PANELİ (Akıcı Analog İbre Tasarımı) */}
        {activeTab === "hud" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px", animation: "fadeIn 0.3s ease-out" }}>
            <div style={{ textAlign: "center", margin: "auto 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "230px", height: "230px", borderRadius: "50%", border: `6px solid ${theme.cardBg}`, backgroundColor: "rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: `inset 0 0 25px rgba(0,0,0,0.5), 0 0 20px ${theme.primary}15` }}>
                
                {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180].map((val) => {
                  const angle = (val / 180) * 240 - 120;
                  return (
                    <div
                      key={val}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        transform: `rotate(${angle}deg)`,
                        padding: "10px",
                        boxSizing: "border-box"
                      }}
                    >
                      <div style={{ width: "2px", height: "7px", backgroundColor: theme.primary, margin: "0 auto", borderRadius: "1px", opacity: 0.7 }} />
                    </div>
                  );
                })}

                <div
                  style={{
                    position: "absolute",
                    width: "4px",
                    height: "85px",
                    bottom: "50%",
                    transformOrigin: "bottom center",
                    transform: `rotate(${needleAngle}deg)`,
                    transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#FF2A5F", borderRadius: "4px", boxShadow: "0 0 10px #FF2A5F" }} />
                </div>

                <div style={{ width: "85px", height: "85px", borderRadius: "50%", backgroundColor: theme.bg, border: `2.5px solid ${theme.primary}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 5, boxShadow: "0 4px 15px rgba(0,0,0,0.6)" }}>
                  <div style={{ fontSize: "34px", fontWeight: "900", lineHeight: "1", color: theme.primary, letterSpacing: "-1px" }}>{speed}</div>
                  <div style={{ fontSize: "9px", fontWeight: "800", letterSpacing: "1.5px", opacity: 0.7, marginTop: "3px" }}>{unit === "kmh" ? t.kmh : t.mph}</div>
                </div>

              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div style={{ background: theme.cardBg, padding: "12px", borderRadius: "14px", textAlign: "center", backdropFilter: "blur(5px)" }}>
                <span style={{ fontSize: "10px", opacity: 0.6, display: "block", fontWeight: "700", letterSpacing: "1px" }}>{t.maxSpeed}</span>
                <span style={{ fontSize: "18px", fontWeight: "900" }}>{maxSpeed} <small style={{ fontSize: "10px", opacity: 0.7 }}>{unit}</small></span>
              </div>
              <div style={{ background: theme.cardBg, padding: "12px", borderRadius: "14px", textAlign: "center", backdropFilter: "blur(5px)" }}>
                <span style={{ fontSize: "10px", opacity: 0.6, display: "block", fontWeight: "700", letterSpacing: "1px" }}>{t.distance}</span>
                <span style={{ fontSize: "18px", fontWeight: "900" }}>{distance.toFixed(2)} <small style={{ fontSize: "10px", opacity: 0.7 }}>{unit === "kmh" ? t.km : t.mi}</small></span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "4px" }}>
              <div style={{ background: theme.cardBg, padding: "12px", borderRadius: "14px", textAlign: "center", backdropFilter: "blur(5px)" }}>
                <span style={{ fontSize: "10px", opacity: 0.6, display: "block", fontWeight: "700", letterSpacing: "1px" }}>{t.altitude}</span>
                <span style={{ fontSize: "18px", fontWeight: "900" }}>{altitude} <small style={{ fontSize: "10px", opacity: 0.7 }}>{t.m}</small></span>
              </div>
              <div style={{ background: theme.cardBg, padding: "12px", borderRadius: "14px", textAlign: "center", backdropFilter: "blur(5px)" }}>
                <span style={{ fontSize: "10px", opacity: 0.6, display: "block", fontWeight: "700", letterSpacing: "1px" }}>{t.grade}</span>
                <span style={{ fontSize: "18px", fontWeight: "900", color: grade > 4 ? "#FF2A5F" : grade < -4 ? "#4CAF50" : theme.text }}>
                  {grade > 0 ? `+${grade}` : grade}%
                </span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px", background: theme.cardBg, padding: "12px 16px", borderRadius: "14px", backdropFilter: "blur(5px)" }}>
              <div>
                <span style={{ fontSize: "9px", opacity: 0.6, display: "block", fontWeight: "700", letterSpacing: "1px" }}>{t.time}</span>
                <span style={{ fontSize: "17px", fontWeight: "900", fontFamily: "monospace" }}>{formatTime(elapsedTime)}</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setIsPaused(!isPaused)} style={{ backgroundColor: theme.primary, color: "#000", border: "none", padding: "8px 14px", borderRadius: "10px", fontWeight: "900", fontSize: "11px", cursor: "pointer", boxShadow: `0 4px 12px ${theme.primary}44` }}>
                  {isPaused ? t.resume : t.pause}
                </button>
                <button onClick={() => { setDistance(0); setElapsedTime(0); setMaxSpeed(0); }} style={{ backgroundColor: "rgba(255,255,255,0.08)", color: theme.text, border: "none", padding: "8px 12px", borderRadius: "10px", fontWeight: "800", fontSize: "11px", cursor: "pointer" }}>
                  {t.reset}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. PUSULA SEKMESİ */}
        {activeTab === "compass" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <div style={{ width: "210px", height: "210px", borderRadius: "50%", border: `4px solid ${theme.primary}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transform: `rotate(${-heading}deg)`, transition: "transform 0.15s ease-out", boxShadow: `0 0 30px ${theme.primary}22` }}>
              <div style={{ position: "absolute", top: "12px", fontWeight: "900", color: "#FF2A5F", fontSize: "14px" }}>K</div>
              <div style={{ position: "absolute", bottom: "12px", fontWeight: "900", fontSize: "14px" }}>G</div>
              <div style={{ position: "absolute", left: "12px", fontWeight: "900", fontSize: "14px" }}>B</div>
              <div style={{ position: "absolute", right: "12px", fontWeight: "900", fontSize: "14px" }}>D</div>
              <CompassIcon size={65} color={theme.primary} />
            </div>
            <div style={{ marginTop: "24px", fontSize: "32px", fontWeight: "900", fontFamily: "monospace" }}>{Math.round(heading)}°</div>
          </div>
        )}

        {/* 3. HARİTA SEKMESİ */}
        {activeTab === "map" && (
          <div style={{ width: "100%", height: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
            <iframe
              title="Google Maps Navigation"
              width="100%"
              height="100%"
              style={{ border: 0, width: "100%", height: "100%", flex: 1, filter: themeKey === "white" ? "none" : "invert(90%) hue-rotate(180deg)" }}
              loading="lazy"
              allowFullScreen
              src={
                destinationQuery
                  ? `https://maps.google.com/maps?saddr=${userCoords.lat},${userCoords.lon}&daddr=${encodeURIComponent(destinationQuery)}&output=embed`
                  : `https://maps.google.com/maps?q=${userCoords.lat},${userCoords.lon}&z=15&output=embed`
              }
            />
          </div>
        )}

        {/* 4. RADYO SEKMESİ */}
        {activeTab === "radio" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", padding: "16px" }}>
            <Radio size={56} color={theme.primary} style={{ filter: `drop-shadow(0 0 10px ${theme.primary}66)` }} />
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "900", letterSpacing: "1px" }}>{currentRadioList[currentRadioIndex]?.name}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              <button onClick={() => {
                let next = currentRadioIndex - 1 < 0 ? currentRadioList.length - 1 : currentRadioIndex - 1;
                setCurrentRadioIndex(next);
                if (audioRef.current) {
                  audioRef.current.src = currentRadioList[next].url;
                  if (isPlayingRadio) audioRef.current.play().catch(() => {});
                }
              }} style={{ background: "none", border: "none", color: theme.text, cursor: "pointer", opacity: 0.8 }}>
                <SkipBack size={28} />
              </button>
              <button onClick={() => {
                if (!audioRef.current) return;
                if (isPlayingRadio) { audioRef.current.pause(); setIsPlayingRadio(false); }
                else { audioRef.current.play().catch(() => {}); setIsPlayingRadio(true); }
              }} style={{ backgroundColor: theme.primary, border: "none", borderRadius: "50%", padding: "18px", cursor: "pointer", boxShadow: `0 0 20px ${theme.primary}55` }}>
                {isPlayingRadio ? <Pause size={26} color="#000" /> : <Play size={26} color="#000" />}
              </button>
              <button onClick={() => {
                let next = (currentRadioIndex + 1) % currentRadioList.length;
                setCurrentRadioIndex(next);
                if (audioRef.current) {
                  audioRef.current.src = currentRadioList[next].url;
                  if (isPlayingRadio) audioRef.current.play().catch(() => {});
                }
              }} style={{ background: "none", border: "none", color: theme.text, cursor: "pointer", opacity: 0.8 }}>
                <SkipForward size={28} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Alt Navigasyon Barı */}
      <nav style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 0", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <button onClick={() => setActiveTab("hud")} style={{ background: "none", border: "none", color: activeTab === "hud" ? theme.primary : "rgba(255,255,255,0.4)", cursor: "pointer", fontWeight: "900", fontSize: "11px", letterSpacing: "1px" }}>{t.hud}</button>
        <button onClick={() => setActiveTab("compass")} style={{ background: "none", border: "none", color: activeTab === "compass" ? theme.primary : "rgba(255,255,255,0.4)", cursor: "pointer", fontWeight: "900", fontSize: "11px", letterSpacing: "1px" }}>{t.compass}</button>
        <button onClick={() => setActiveTab("map")} style={{ background: "none", border: "none", color: activeTab === "map" ? theme.primary : "rgba(255,255,255,0.4)", cursor: "pointer", fontWeight: "900", fontSize: "11px", letterSpacing: "1px" }}>{t.map}</button>
        <button onClick={() => setActiveTab("radio")} style={{ background: "none", border: "none", color: activeTab === "radio" ? theme.primary : "rgba(255,255,255,0.4)", cursor: "pointer", fontWeight: "900", fontSize: "11px", letterSpacing: "1px" }}>{t.radio}</button>
      </nav>

      {/* Ses Kontrol Barı */}
      <div style={{ background: "rgba(0,0,0,0.7)", padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}>
        <span style={{ fontSize: "12px", color: isListening ? theme.primary : "rgba(255,255,255,0.5)", fontWeight: "700" }}>{isListening ? assistantMsg : "Sesli Komut Hazır"}</span>
        <button onClick={toggleListening} style={{ backgroundColor: isListening ? "#FF2A5F" : theme.primary, border: "none", borderRadius: "50%", width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: isListening ? "0 0 15px #FF2A5F" : `0 0 10px ${theme.primary}44` }}>
          {isListening ? <MicOff size={18} color="#fff" /> : <Mic size={18} color="#000" />}
        </button>
      </div>

      {/* Parola Modalı */}
      {showPasswordModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, padding: "20px" }}>
          <div style={{ backgroundColor: "#181A15", borderRadius: "18px", padding: "24px", width: "100%", maxWidth: "320px", border: `1px solid ${theme.primary}`, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
            <KeyRound size={36} color={theme.primary} style={{ margin: "0 auto 10px" }} />
            <h4 style={{ margin: "0 0 10px", color: "#fff", fontWeight: "900" }}>{isDevUnlocked ? "Geliştirici Modunu Kapat" : "Geliştirici Parolası"}</h4>
            <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 16px" }}>Lütfen 6 haneli erişim kodunu girin.</p>
            
            <input
              type="password"
              maxLength={6}
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="••••••"
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: passwordError ? "1px solid #FF2A5F" : "1px solid #444", backgroundColor: "#0A0B08", color: "#fff", fontSize: "20px", textAlign: "center", letterSpacing: "8px", marginBottom: "12px", outline: "none" }}
            />

            {passwordError && <p style={{ color: "#FF2A5F", fontSize: "12px", margin: "0 0 12px", fontWeight: "700" }}>Hatalı Parola!</p>}

            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => { setShowPasswordModal(false); setInputPassword(""); setPasswordError(false); }} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", backgroundColor: "rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer", fontWeight: "800" }}>
                İptal
              </button>
              <button onClick={handlePasswordSubmit} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", backgroundColor: theme.primary, color: "#000", fontWeight: "900", cursor: "pointer" }}>
                Onayla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ayarlar Modalı */}
      {showSettings && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: themeKey === "white" ? "#fff" : "#181A15", color: themeKey === "white" ? "#000" : "#fff", borderRadius: "20px", padding: "22px", width: "100%", maxWidth: "380px", maxHeight: "90vh", overflowY: "auto", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 15px 40px rgba(0,0,0,0.7)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontWeight: "900", fontSize: "18px" }}>{t.settings}</h3>
              <button onClick={() => setShowSettings(false)} style={{ background: "none", border: "none", color: theme.text, cursor: "pointer", opacity: 0.8 }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "10px", opacity: 0.6, display: "block", marginBottom: "6px", fontWeight: "800", letterSpacing: "1px" }}>{t.language}</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                {LANGUAGES.map((item) => (
                  <button key={item.code} onClick={() => setLang(item.code)} style={{ padding: "8px 4px", borderRadius: "8px", border: "none", backgroundColor: lang === item.code ? theme.primary : "rgba(255,255,255,0.06)", color: lang === item.code ? "#000" : theme.text, fontWeight: "900", fontSize: "11px", cursor: "pointer" }}>
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "10px", opacity: 0.6, display: "block", marginBottom: "6px", fontWeight: "800", letterSpacing: "1px" }}>{t.unit}</label>
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => setUnit("kmh")} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", backgroundColor: unit === "kmh" ? theme.primary : "rgba(255,255,255,0.06)", color: unit === "kmh" ? "#000" : theme.text, fontWeight: "900", fontSize: "11px" }}>KM/H</button>
                <button onClick={() => setUnit("mph")} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", backgroundColor: unit === "mph" ? theme.primary : "rgba(255,255,255,0.06)", color: unit === "mph" ? "#000" : theme.text, fontWeight: "900", fontSize: "11px" }}>MPH</button>
              </div>
            </div>

            <div style={{ marginBottom: "14px", padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isPotholeEnabled ? "10px" : "0" }}>
                <label style={{ fontSize: "10px", opacity: 0.6, fontWeight: "800", letterSpacing: "1px" }}>{t.potholeDetection}</label>
                <button
                  onClick={() => setIsPotholeEnabled(!isPotholeEnabled)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: isPotholeEnabled ? theme.primary : "rgba(255,255,255,0.08)",
                    color: isPotholeEnabled ? "#000" : theme.text,
                    fontWeight: "900",
                    fontSize: "11px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  {isPotholeEnabled ? <ShieldCheck size={14} /> : <ShieldOff size={14} />}
                  {isPotholeEnabled ? "AÇIK" : "KAPALI"}
                </button>
              </div>

              {isPotholeEnabled && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10px", opacity: 0.6, marginBottom: "6px", fontWeight: "700" }}>
                    <span>{t.sensitivity}</span>
                    <span>{shakeSensitivity}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="1"
                    value={shakeSensitivity}
                    onChange={(e) => setShakeSensitivity(Number(e.target.value))}
                    style={{ width: "100%", accentColor: theme.primary, cursor: "pointer" }}
                  />
                </div>
              )}
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "10px", opacity: 0.6, display: "block", marginBottom: "6px", fontWeight: "800", letterSpacing: "1px" }}>{t.emergencyNum}</label>
              <input
                type="text"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  color: theme.text,
                  fontWeight: "900",
                  fontSize: "13px",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "10px", opacity: 0.6, display: "block", marginBottom: "6px", fontWeight: "800", letterSpacing: "1px" }}>{t.theme}</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {Object.keys(THEMES).map((key) => (
                  <button key={key} onClick={() => setThemeKey(key)} style={{ flex: 1, height: "32px", borderRadius: "8px", border: themeKey === key ? "2px solid #fff" : "1px solid rgba(255,255,255,0.2)", backgroundColor: THEMES[key].primary, cursor: "pointer", boxShadow: themeKey === key ? "0 0 10px rgba(255,255,255,0.5)" : "none" }} />
                ))}
              </div>
            </div>

            {isDevUnlocked && (
              <div style={{ marginBottom: "16px", padding: "12px", background: "rgba(255,255,255,0.04)", borderRadius: "12px", border: `1px solid ${theme.primary}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "900", color: theme.primary, marginBottom: "8px" }}>
                  <Terminal size={14} /> {t.devOptions}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                  <button onClick={() => { setActiveTab("hud"); setShowSettings(false); }} style={{ padding: "8px", fontSize: "11px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.06)", color: theme.text, cursor: "pointer", fontWeight: "800" }}>{t.devHud}</button>
                  <button onClick={() => { setActiveTab("compass"); setShowSettings(false); }} style={{ padding: "8px", fontSize: "11px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.06)", color: theme.text, cursor: "pointer", fontWeight: "800" }}>{t.devCompass}</button>
                  <button onClick={() => { setActiveTab("map"); setShowSettings(false); }} style={{ padding: "8px", fontSize: "11px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.06)", color: theme.text, cursor: "pointer", fontWeight: "800" }}>{t.devMap}</button>
                  <button onClick={() => { setActiveTab("radio"); setShowSettings(false); }} style={{ padding: "8px", fontSize: "11px", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.06)", color: theme.text, cursor: "pointer", fontWeight: "800" }}>{t.devRadio}</button>

                  <button onClick={() => { setDestinationQuery("bisiklet tamircisi"); setActiveTab("map"); setShowSettings(false); speakText(`${t.voiceNav} bisiklet tamircisi`); }} style={{ padding: "8px", fontSize: "11px", borderRadius: "8px", border: "none", background: `${theme.primary}22`, color: theme.primary, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", fontWeight: "900" }}>
                    <Wrench size={12} /> {t.devRepair}
                  </button>
                  <button onClick={() => { setDestinationQuery("market"); setActiveTab("map"); setShowSettings(false); speakText(`${t.voiceNav} market`); }} style={{ padding: "8px", fontSize: "11px", borderRadius: "8px", border: "none", background: `${theme.primary}22`, color: theme.primary, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", fontWeight: "900" }}>
                    <ShoppingBag size={12} /> {t.devMarket}
                  </button>
                </div>
              </div>
            )}

            <button onClick={() => setShowSettings(false)} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "none", backgroundColor: theme.primary, color: "#000", fontWeight: "900", cursor: "pointer", fontSize: "14px", boxShadow: `0 4px 15px ${theme.primary}44` }}>
              {t.close}
            </button>

            {/* Versiyon Bilgisi (v0401.1) */}
            <div onClick={handleVersionClick} style={{ textAlign: "center", marginTop: "16px", opacity: 0.35, fontSize: "10px", letterSpacing: "1.5px", cursor: "pointer", userSelect: "none", fontWeight: "700" }}>
              v0401.1 - VOLT System {isDevUnlocked && "(DEV ACTIVE)"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
