export function RomaMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 34V14h8.1c5.6 0 9 2.8 9 7.5 0 3.3-1.8 5.7-5 6.8L35 34h-5.7l-5-5.1h-2.2V34H17Zm5.1-9.4h2.7c2.7 0 4.2-1 4.2-3s-1.5-3-4.2-3h-2.7v6Z" fill="currentColor" />
    </svg>
  );
}

const common = {
  stroke: "var(--ill-stroke, #171914)",
  main: "var(--ill-main, #d4ad79)",
  pale: "var(--ill-pale, #f4f0e7)",
  leaf: "var(--ill-leaf, #214432)",
  accent: "var(--ill-accent, #d76b42)",
};

function Leaf({ x = 0, y = 0, r = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} className="ill-leaf">
      <path d="M0 0C18-28 50-31 69-10C47 10 20 14 0 0Z" fill={common.leaf} stroke={common.stroke} strokeWidth="2.2" />
      <path d="M6-2C24-7 41-9 59-11" stroke={common.pale} strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
    </g>
  );
}

function Spark({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="ill-spark">
      <path d="M0-10V10M-10 0H10" stroke={common.accent} strokeWidth="1.7" strokeLinecap="round" />
      <circle r="2.2" fill={common.accent} />
    </g>
  );
}

export function ProductIllustration({ type, className = "" }) {
  const props = {
    viewBox: "0 0 520 520",
    className: `product-illustration ${className}`,
    role: "img",
    "aria-label": type,
  };

  if (type === "almonds") {
    return (
      <svg {...props}>
        <g className="ill-branch">
          <path d="M86 390C177 338 233 252 297 153C330 101 367 75 426 57" fill="none" stroke={common.stroke} strokeWidth="5" strokeLinecap="round" />
          <Leaf x={318} y={122} r={-38} s={.9} />
          <Leaf x={236} y={220} r={158} s={.75} />
        </g>
        <g className="ill-main">
          <path d="M199 177C248 130 315 128 356 176C397 224 390 306 342 367C295 428 222 438 177 391C132 345 149 225 199 177Z" fill={common.main} stroke={common.stroke} strokeWidth="4" />
          <path d="M215 202C247 168 296 164 327 198C358 232 352 296 318 340C284 384 234 390 204 356C174 322 181 239 215 202Z" fill={common.pale} stroke={common.stroke} strokeWidth="3" />
          <path d="M233 221C257 194 291 194 310 216C329 239 322 281 298 315C273 350 238 350 219 327C199 304 209 248 233 221Z" fill={common.accent} opacity=".22" />
        </g>
        <Spark x={126} y={157} s={1.1} />
      </svg>
    );
  }

  if (type === "cashews") {
    return (
      <svg {...props}>
        <Leaf x={326} y={121} r={-28} s={.84} />
        <g className="ill-main">
          <path d="M300 138C221 108 151 155 135 226C118 301 160 384 237 400C307 414 384 370 396 299C403 257 384 223 352 211C327 202 306 219 310 241C314 263 340 270 354 291C366 309 357 337 334 351C299 373 252 360 225 329C193 292 185 239 210 205C232 175 267 169 300 181C329 191 352 168 342 151C334 138 317 134 300 138Z" fill={common.main} stroke={common.stroke} strokeWidth="4" />
          <path d="M308 170C249 148 199 180 188 231C177 282 204 338 256 351C294 361 337 342 351 311" fill="none" stroke={common.pale} strokeWidth="13" strokeLinecap="round" opacity=".95" />
        </g>
        <Spark x={112} y={330} />
        <Spark x={399} y={109} s={.7} />
      </svg>
    );
  }

  if (type === "pistachios") {
    return (
      <svg {...props}>
        <Leaf x={95} y={155} r={28} s={.8} />
        <Leaf x={339} y={122} r={-22} s={.72} />
        <g className="ill-main">
          <path d="M168 171C205 132 250 124 284 152C318 180 321 230 297 276C272 324 220 353 181 332C142 311 127 257 141 214C148 194 157 182 168 171Z" fill={common.pale} stroke={common.stroke} strokeWidth="4" />
          <path d="M192 182C220 160 248 158 267 176C286 195 282 232 263 264C243 298 212 315 189 301C165 287 158 252 168 221C173 204 181 192 192 182Z" fill={common.leaf} stroke={common.stroke} strokeWidth="3" />
          <path d="M321 215C354 185 394 183 421 209C449 236 447 280 424 318C399 360 356 381 323 362C289 342 282 297 298 259C304 241 312 226 321 215Z" fill={common.main} stroke={common.stroke} strokeWidth="4" />
          <path d="M327 225C347 216 369 218 385 233C406 253 403 288 385 317C370 341 349 352 331 348" fill="none" stroke={common.pale} strokeWidth="7" strokeLinecap="round" />
        </g>
        <Spark x={388} y={119} />
      </svg>
    );
  }

  if (type === "dates") {
    return (
      <svg {...props}>
        <g className="ill-branch">
          <path d="M99 127C193 168 255 213 309 289" fill="none" stroke={common.stroke} strokeWidth="5" strokeLinecap="round" />
          <path d="M117 139C124 195 109 237 80 278M141 149C165 200 166 244 146 290M170 166C206 205 217 244 211 287" fill="none" stroke={common.leaf} strokeWidth="12" strokeLinecap="round" opacity=".92" />
        </g>
        <g className="ill-main">
          {[
            [279,195,-12],[336,213,8],[243,246,13],[307,270,-6],[365,281,10],[255,322,-10],[322,335,6],[381,338,-5]
          ].map(([x,y,r],i)=>(
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              <path d="M0-51C27-47 44-25 40 7C37 38 20 57 0 60C-22 56-39 37-40 8C-42-23-26-46 0-51Z" fill={i%2 ? common.accent : common.main} stroke={common.stroke} strokeWidth="3.4" />
              <path d="M-12-25C-4-31 7-32 15-26" stroke={common.pale} strokeWidth="4" strokeLinecap="round" opacity=".7" />
            </g>
          ))}
        </g>
      </svg>
    );
  }

  if (type === "walnuts") {
    return (
      <svg {...props}>
        <Leaf x={321} y={112} r={-28} s={.78} />
        <g className="ill-main">
          <path d="M154 213C154 157 201 118 258 124C314 130 350 178 345 235C340 289 299 332 248 334C196 337 153 295 154 213Z" fill={common.main} stroke={common.stroke} strokeWidth="4" />
          <path d="M251 128C241 158 248 181 267 203C284 223 283 249 266 269C250 288 244 309 251 332" fill="none" stroke={common.stroke} strokeWidth="4" />
          <path d="M221 151C199 165 190 187 194 211C197 232 188 250 172 264M290 153C316 170 323 194 315 220C309 240 317 258 332 271" fill="none" stroke={common.stroke} strokeWidth="3" opacity=".55" />
          <path d="M289 264C348 253 397 281 412 327C427 372 394 413 344 416C293 419 252 386 251 341C251 306 265 277 289 264Z" fill={common.pale} stroke={common.stroke} strokeWidth="4" />
          <path d="M319 286C300 308 300 329 314 344C327 359 325 380 311 395M352 282C369 307 368 329 355 345C341 362 343 383 358 401" fill="none" stroke={common.accent} strokeWidth="5" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  if (type === "raisins") {
    return (
      <svg {...props}>
        <Leaf x={260} y={100} r={-15} s={.9} />
        <path className="ill-branch" d="M260 142C262 176 252 194 230 213" fill="none" stroke={common.stroke} strokeWidth="5" strokeLinecap="round" />
        <g className="ill-main">
          {[
            [232,216,30],[276,220,33],[320,235,31],[206,255,31],[253,262,34],[298,270,35],[347,274,31],
            [226,300,34],[276,310,36],[329,316,34],[255,354,34],[306,360,34]
          ].map(([x,y,r],i)=>(
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r={r} fill={i%3===0 ? common.accent : common.main} stroke={common.stroke} strokeWidth="3.2" />
              <path d="M-9-9C-2-16 8-17 14-12" fill="none" stroke={common.pale} strokeWidth="3" strokeLinecap="round" opacity=".7" />
            </g>
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg {...props}>
      <Leaf x={305} y={112} r={-26} s={.78} />
      <g className="ill-main">
        <path d="M126 286C151 213 230 168 303 183C371 197 416 257 399 324C381 393 306 432 235 412C167 392 105 350 126 286Z" fill={common.main} stroke={common.stroke} strokeWidth="4" />
        <path d="M148 288C202 306 254 294 300 252C330 225 358 218 389 225M176 372C217 351 255 345 296 354C333 362 365 349 392 326" fill="none" stroke={common.stroke} strokeWidth="3" opacity=".5" />
        <path d="M202 246C194 271 200 291 218 306M261 211C255 237 263 258 282 272M332 247C321 271 325 292 342 307M240 337C231 360 235 379 250 392" fill="none" stroke={common.pale} strokeWidth="7" strokeLinecap="round" opacity=".78" />
      </g>
      <Spark x={113} y={165} />
    </svg>
  );
}

export function AudienceIllustration({ type, className = "" }) {
  const base = { viewBox: "0 0 280 220", className: `audience-illustration ${className}`, "aria-hidden": true };

  if (type === "grocery") return (
    <svg {...base}>
      <path d="M56 70H224L204 186H76L56 70Z" fill={common.pale} stroke={common.stroke} strokeWidth="4" />
      <path d="M84 70L104 38H176L196 70" fill="none" stroke={common.stroke} strokeWidth="4" />
      <circle cx="110" cy="122" r="24" fill={common.main} stroke={common.stroke} strokeWidth="3" />
      <path d="M150 145C160 104 183 93 202 100C206 127 189 150 150 145Z" fill={common.leaf} stroke={common.stroke} strokeWidth="3" />
    </svg>
  );

  if (type === "bakery") return (
    <svg {...base}>
      <path d="M47 146C74 84 126 58 177 70C217 80 238 111 225 140C213 167 176 180 132 176C92 173 61 163 47 146Z" fill={common.main} stroke={common.stroke} strokeWidth="4" />
      <path d="M82 127C111 118 141 118 171 126M98 102C122 98 145 101 166 110" fill="none" stroke={common.pale} strokeWidth="4" strokeLinecap="round" />
      <path d="M186 80C201 61 220 52 241 55" fill="none" stroke={common.leaf} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );

  if (type === "cafe") return (
    <svg {...base}>
      <path d="M65 78H184V157C184 181 165 196 142 196H108C84 196 65 178 65 155V78Z" fill={common.pale} stroke={common.stroke} strokeWidth="4" />
      <path d="M184 101H205C231 101 237 143 207 151H184" fill="none" stroke={common.stroke} strokeWidth="4" />
      <path d="M102 54C90 41 102 30 113 18M143 54C132 40 144 29 155 18" fill="none" stroke={common.accent} strokeWidth="4" strokeLinecap="round" />
      <circle cx="125" cy="125" r="21" fill={common.main} />
    </svg>
  );

  if (type === "restaurant") return (
    <svg {...base}>
      <ellipse cx="140" cy="150" rx="96" ry="30" fill={common.pale} stroke={common.stroke} strokeWidth="4" />
      <path d="M84 142C98 96 127 74 164 82C193 88 211 108 211 137" fill={common.main} stroke={common.stroke} strokeWidth="4" />
      <circle cx="151" cy="101" r="15" fill={common.accent} stroke={common.stroke} strokeWidth="3" />
      <path d="M217 58V138M235 58V138M217 88H235" stroke={common.stroke} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );

  if (type === "hospitality") return (
    <svg {...base}>
      <path d="M48 158H232" stroke={common.stroke} strokeWidth="4" strokeLinecap="round" />
      <path d="M72 158C78 99 106 65 140 65C174 65 202 99 208 158" fill={common.pale} stroke={common.stroke} strokeWidth="4" />
      <circle cx="140" cy="55" r="9" fill={common.accent} stroke={common.stroke} strokeWidth="3" />
      <path d="M107 128C119 111 133 103 149 104C164 105 177 112 187 128" fill="none" stroke={common.leaf} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );

  return (
    <svg {...base}>
      <path d="M61 85L140 45L219 85L140 126L61 85Z" fill={common.main} stroke={common.stroke} strokeWidth="4" />
      <path d="M61 85V157L140 196V126M219 85V157L140 196" fill={common.pale} stroke={common.stroke} strokeWidth="4" />
      <path d="M100 65L179 106" stroke={common.pale} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function StandardIcon({ index }) {
  const icons = [
    <><rect x="52" y="74" width="86" height="64" rx="10" /><rect x="104" y="38" width="86" height="64" rx="10" /><rect x="126" y="102" width="86" height="64" rx="10" /></>,
    <><circle cx="84" cy="108" r="36" /><path d="M122 83C150 58 183 56 208 78C202 111 177 129 140 126" /><path d="M67 108H101M84 91V125" /></>,
    <><rect x="49" y="58" width="154" height="101" rx="18" /><path d="M76 88H175M76 112H154M76 136H132" /><circle cx="202" cy="49" r="16" /></>,
    <><circle cx="67" cy="104" r="22" /><circle cx="137" cy="104" r="22" /><circle cx="207" cy="104" r="22" /><path d="M89 104H115M159 104H185" /></>,
  ];
  return (
    <svg className="standard-icon" viewBox="0 0 260 210" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">{icons[index]}</g>
    </svg>
  );
}

export function ProcessIcon({ index }) {
  if (index === 0) return (
    <svg viewBox="0 0 120 120" aria-hidden="true"><path d="M22 28H98V82H62L39 100V82H22V28Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/><path d="M38 48H82M38 64H68" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
  );
  if (index === 1) return (
    <svg viewBox="0 0 120 120" aria-hidden="true"><path d="M32 18H84L98 32V102H32V18Z" fill="none" stroke="currentColor" strokeWidth="4"/><path d="M84 18V34H98M47 53H82M47 68H82M47 83H70" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
  );
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true"><path d="M18 47L60 26L102 47L60 68L18 47Z" fill="none" stroke="currentColor" strokeWidth="4"/><path d="M18 47V83L60 104V68M102 47V83L60 104" fill="none" stroke="currentColor" strokeWidth="4"/></svg>
  );
}

export function BotanicalPoster() {
  return (
    <svg className="botanical-poster" viewBox="0 0 680 760" aria-hidden="true">
      <path className="poster-stem" d="M78 654C205 562 238 417 310 280C363 180 437 111 596 71" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <g className="poster-leaf"><Leaf x={306} y={283} r={-47} s={1.3} /></g>
      <g className="poster-leaf poster-leaf--two"><Leaf x={198} y={444} r={148} s={1.1} /></g>
      <g className="poster-almond" transform="translate(382 312) rotate(14)">
        <path d="M0 0C48-34 112-21 138 31C165 84 135 153 78 178C22 202-35 168-42 111C-49 57-27 20 0 0Z" fill="var(--ill-main)" stroke="currentColor" strokeWidth="4" />
        <path d="M23 29C57 8 96 17 111 48C127 80 108 122 73 139C39 156 5 135 1 101C-3 68 8 43 23 29Z" fill="var(--ill-pale)" stroke="currentColor" strokeWidth="3" />
      </g>
      <Spark x={126} y={184} s={1.3} />
      <Spark x={560} y={535} s={.8} />
      <circle cx="585" cy="618" r="52" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="7 11" opacity=".5" />
    </svg>
  );
}
