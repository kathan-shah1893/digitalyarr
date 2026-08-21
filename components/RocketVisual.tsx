export default function RocketVisual() {
  return (
    <div
      className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[520px] xl:max-w-[560px] aspect-square mx-auto animate-float"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="rv-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rv-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a2848" />
            <stop offset="100%" stopColor="#0f1a2e" />
          </linearGradient>
          <linearGradient id="rv-nose" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1a2848" />
          </linearGradient>
          <linearGradient id="rv-exhaust" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#06B6D4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="rv-pad-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rv-win-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <circle cx="200" cy="200" r="180" fill="url(#rv-bg)" />

        {/* Outer dashed orbit ring */}
        <circle cx="200" cy="200" r="162" stroke="#2563EB" strokeWidth="0.6" strokeDasharray="3 9" opacity="0.18" />

        {/* Inner ring */}
        <circle cx="200" cy="200" r="124" stroke="#06B6D4" strokeWidth="0.5" opacity="0.1" />

        {/* Cross-hair lines */}
        <line x1="55" y1="200" x2="145" y2="200" stroke="#2563EB" strokeWidth="0.5" opacity="0.14" />
        <line x1="255" y1="200" x2="345" y2="200" stroke="#2563EB" strokeWidth="0.5" opacity="0.14" />
        <line x1="200" y1="55" x2="200" y2="132" stroke="#2563EB" strokeWidth="0.5" opacity="0.14" />
        <line x1="200" y1="268" x2="200" y2="345" stroke="#2563EB" strokeWidth="0.5" opacity="0.14" />

        {/* Horizontal data-flow dashes (left) */}
        <line x1="68" y1="170" x2="132" y2="170" stroke="#06B6D4" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.22" />
        <line x1="72" y1="220" x2="128" y2="220" stroke="#2563EB" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.18" />

        {/* Horizontal data-flow dashes (right) */}
        <line x1="268" y1="165" x2="332" y2="165" stroke="#2563EB" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.22" />
        <line x1="272" y1="218" x2="328" y2="218" stroke="#06B6D4" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.18" />

        {/* Exhaust flame */}
        <path d="M 178 283 Q 200 358 222 283 Z" fill="url(#rv-exhaust)" />
        <path d="M 187 283 Q 200 330 213 283 Z" fill="white" opacity="0.12" />

        {/* Rocket body */}
        <rect x="176" y="158" width="48" height="126" rx="5" fill="url(#rv-body)" />

        {/* Body accent lines */}
        <line x1="176" y1="193" x2="224" y2="193" stroke="#2563EB" strokeWidth="0.9" opacity="0.38" />
        <line x1="176" y1="240" x2="224" y2="240" stroke="#2563EB" strokeWidth="0.9" opacity="0.28" />

        {/* Left fin */}
        <path d="M 176 228 L 148 278 L 176 273 Z" fill="#0f1a2e" stroke="#2563EB" strokeWidth="1" opacity="0.85" />

        {/* Right fin */}
        <path d="M 224 228 L 252 278 L 224 273 Z" fill="#0f1a2e" stroke="#2563EB" strokeWidth="1" opacity="0.85" />

        {/* Nose cone */}
        <path d="M 176 158 Q 200 68 224 158 Z" fill="url(#rv-nose)" />
        <path d="M 176 158 Q 200 68 224 158" stroke="#3b82f6" strokeWidth="1.2" fill="none" opacity="0.75" />

        {/* Window glow */}
        <circle cx="200" cy="204" r="20" fill="url(#rv-win-glow)" />

        {/* Window outer ring */}
        <circle cx="200" cy="204" r="15" stroke="#06B6D4" strokeWidth="1.5" fill="#06B6D4" fillOpacity="0.06" />

        {/* Window inner */}
        <circle cx="200" cy="204" r="9" fill="#06B6D4" fillOpacity="0.35" />

        {/* Window highlight */}
        <circle cx="196" cy="200" r="2.5" fill="white" opacity="0.55" />

        {/* Body border */}
        <rect x="176" y="158" width="48" height="126" rx="5" stroke="#2563EB" strokeWidth="1" fill="none" opacity="0.3" />

        {/* Launch platform base */}
        <rect x="134" y="283" width="132" height="7" rx="3.5" fill="#1a2848" />
        <rect x="134" y="283" width="132" height="2.5" rx="1.25" fill="#2563EB" opacity="0.45" />
        <rect x="158" y="290" width="84" height="4" rx="2" fill="#0f1a2e" />

        {/* Platform glow ellipse */}
        <ellipse cx="200" cy="289" rx="60" ry="9" fill="url(#rv-pad-glow)" />

        {/* Platform legs */}
        <line x1="158" y1="283" x2="148" y2="294" stroke="#2563EB" strokeWidth="1" opacity="0.35" />
        <line x1="242" y1="283" x2="252" y2="294" stroke="#2563EB" strokeWidth="1" opacity="0.35" />

        {/* Floating particles */}
        <circle cx="106" cy="138" r="2.5" fill="#2563EB" opacity="0.55" />
        <circle cx="296" cy="126" r="2" fill="#06B6D4" opacity="0.55" />
        <circle cx="84" cy="248" r="1.8" fill="#06B6D4" opacity="0.4" />
        <circle cx="318" cy="234" r="2.2" fill="#2563EB" opacity="0.45" />
        <circle cx="118" cy="312" r="1.5" fill="#2563EB" opacity="0.3" />
        <circle cx="282" cy="305" r="1.8" fill="#06B6D4" opacity="0.35" />
        <circle cx="340" cy="160" r="1.5" fill="#2563EB" opacity="0.3" />
        <circle cx="62" cy="175" r="1.5" fill="#06B6D4" opacity="0.3" />

        {/* Small diamond accents */}
        <path d="M 138 155 L 142 158 L 138 161 L 134 158 Z" fill="#2563EB" opacity="0.3" />
        <path d="M 260 148 L 264 151 L 260 154 L 256 151 Z" fill="#06B6D4" opacity="0.3" />
      </svg>
    </div>
  );
}
