function toggleMenu(){
    const menu= document.querySelector(".menu-links");
    const icon= document.querySelector(".list-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const contactForm = document.querySelector(".contact-form");
const contactFormStatus = document.querySelector(".contact-form-status");

const skillsModal = document.getElementById("skills-modal");
const skillsTrigger = document.getElementById("skill");
const skillsCard = document.getElementById("skill-card");
const skillsClose = document.getElementById("skills-modal-close");
const skillsBackdrop = document.querySelector("[data-close-skills-modal]");
const workRail = document.getElementById("work-rail");
const workTrigger = document.getElementById("work");
const workCard = document.getElementById("work-card");
const workClose = document.getElementById("work-rail-close");
const workBackdrop = document.querySelector("[data-close-work-rail]");

function openSkillsModal() {
    if (!skillsModal) return;
    closeWorkRail();
    skillsModal.classList.add("is-open");
    skillsModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeSkillsModal() {
    if (!skillsModal) return;
    skillsModal.classList.remove("is-open");
    skillsModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function openWorkRail() {
    if (!workRail) return;
    closeSkillsModal();
    workRail.classList.add("is-open");
    workRail.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeWorkRail() {
    if (!workRail) return;
    workRail.classList.remove("is-open");
    workRail.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

if (skillsTrigger) {
    skillsTrigger.addEventListener("click", openSkillsModal);
}

if (skillsCard) {
    skillsCard.addEventListener("click", openSkillsModal);
    skillsCard.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openSkillsModal();
        }
    });
    skillsCard.setAttribute("tabindex", "0");
    skillsCard.setAttribute("role", "button");
    skillsCard.setAttribute("aria-haspopup", "dialog");
}

if (skillsClose) {
    skillsClose.addEventListener("click", closeSkillsModal);
}

if (skillsBackdrop) {
    skillsBackdrop.addEventListener("click", closeSkillsModal);
}

if (workTrigger) {
    workTrigger.addEventListener("click", openWorkRail);
}

if (workCard) {
    workCard.addEventListener("click", openWorkRail);
    workCard.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openWorkRail();
        }
    });
    workCard.setAttribute("tabindex", "0");
    workCard.setAttribute("role", "button");
    workCard.setAttribute("aria-haspopup", "dialog");
}

if (workClose) {
    workClose.addEventListener("click", closeWorkRail);
}

if (workBackdrop) {
    workBackdrop.addEventListener("click", closeWorkRail);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSkillsModal();
        closeWorkRail();
        closeCardModal();
    }
});

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = (formData.get("name") || "").toString().trim();
        const email = (formData.get("email") || "").toString().trim();
        const message = (formData.get("message") || "").toString().trim();
        const recipient = contactForm.dataset.recipientEmail || "Serurbisrat@gmail.com";

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        if (contactFormStatus) {
            contactFormStatus.textContent = "Opening your email app with the message filled in.";
        }

        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
}

// ── Card detail modal ────────────────────────────────────────────
const CARD_SNIPPETS = {

  // ── Projects ──────────────────────────────────────────────────
  'XAU/USD Trading AI':
`# Python — Random Forest price predictor
model = RandomForestRegressor(n_estimators=100, max_depth=8)
model.fit(X_train, y_train)

pred   = model.predict([[open, high, low, volume]])
signal = "BUY" if pred[0] > current_price else "SELL"`,

  'Project Management System':
`-- Task completion dashboard query
SELECT p.name,
       COUNT(t.id)                           AS total_tasks,
       SUM(CASE WHEN t.done = 1 THEN 1 END) AS completed,
       ROUND(AVG(t.done) * 100, 1)           AS pct_done
FROM projects p
JOIN tasks t ON p.id = t.project_id
GROUP BY p.id
ORDER BY pct_done DESC;`,

  'Organization-Level Network Design':
`! Cisco IOS — OSPF multi-area routing config
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip address 10.0.1.1 255.255.255.0
Router(config-if)# no shutdown
Router(config)# router ospf 1
Router(config-router)# network 10.0.1.0 0.0.0.255 area 0
Router(config-router)# network 192.168.10.0 0.0.0.255 area 1`,

  'Luna Agro Industries IT Systems Research':
`// IT Gap Analysis — key findings summary
AS-IS:  Manual spreadsheets  →  4-hour data lag
TO-BE:  ERP integration      →  real-time inventory sync

Gaps identified:
  • No API bridge between warehouse and finance
  • Staff training required (est. 8 weeks)
  • Legacy MSSQL schema needs migration path

Projected ROI: ~32% reduction in stock-out incidents`,

  'Social Network Application (Socall)':
`// Java / Android — real-time Firebase messaging
FirebaseDatabase db   = FirebaseDatabase.getInstance();
DatabaseReference ref = db.getReference("chats/" + chatId);

Message msg = new Message(currentUid, text, ServerValue.TIMESTAMP);
ref.push().setValue(msg)
   .addOnSuccessListener(v -> markDelivered(msg.getId()));`,

  'Health Prediction Data Mining Project':
`# Python — Gradient Boosting stroke/diabetes predictor
from sklearn.ensemble import GradientBoostingClassifier

clf = GradientBoostingClassifier(n_estimators=200, learning_rate=0.05)
clf.fit(X_train, y_train)    # features: age, glucose, BMI, bp...

proba = clf.predict_proba(patient)[0][1]
risk  = "HIGH RISK" if proba > 0.65 else "LOW RISK"
print(f"Stroke probability: {proba:.1%}  →  {risk}")`,

  'Instruction-Level Algorithm Project':
`// C++ — MIPS-like instruction encoding pipeline
void emitInstruction(OpCode op, int rd, int rs, int rt) {
    uint32_t instr = (op & 0x3F) << 26
                   | (rs & 0x1F) << 21
                   | (rt & 0x1F) << 16
                   | (rd & 0x1F) << 11;
    pipeline.push(instr);
}`,

  'Face Emotion Recognition System':
`# Python + OpenCV — face & emotion detection loop
faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

for (x, y, w, h) in faces:
    roi     = gray[y:y+h, x:x+w]
    emotion = model.predict(preprocess(roi, size=(48,48)))[0]
    label   = EMOTIONS[np.argmax(emotion)]      # e.g. "Happy"
    cv2.putText(frame, label, (x, y-10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0,255,0), 2)`,

  'Streaming Website':
`// C# ASP.NET Core — byte-range video streaming
[HttpGet("stream/{id}")]
public IActionResult Stream(int id) {
    var movie = _db.Movies.Find(id);
    var path  = Path.Combine(_env.WebRootPath, movie.FilePath);
    return PhysicalFile(path, "video/mp4",
                        enableRangeProcessing: true);
}`,

  'Dantel 3D Graphics Project':
`// C++ OpenGL — traditional Dantel fabric mesh renderer
void drawDantelPattern() {
    glBindTexture(GL_TEXTURE_2D, fabricTex);
    glBegin(GL_TRIANGLES);
    for (const auto& tri : mesh.triangles) {
        glNormal3fv(glm::value_ptr(tri.normal));
        glTexCoord2fv(glm::value_ptr(tri.uv));
        glVertex3fv(glm::value_ptr(tri.vertex));
    }
    glEnd();
}`,

  'Web Scraper Application':
`// C# HtmlAgilityPack — automated data extraction
var web  = new HtmlWeb();
var doc  = web.Load(targetUrl);
var rows = doc.DocumentNode
    .SelectNodes("//table[@class='data-table']//tr")
    ?.Skip(1)
    .Select(tr => tr.SelectNodes("td")
                    .Select(td => td.InnerText.Trim()).ToArray());
await db.BulkInsertAsync(rows.Select(r => new Record(r)));`,

  'Train Management & Dispatch System':
`// C++ — priority-queue dispatch scheduler
struct TrainCmp {
    bool operator()(const Train& a, const Train& b) {
        return a.priority < b.priority;  // highest priority first
    }
};
priority_queue<Train, vector<Train>, TrainCmp> dispatchQ;

void scheduleNext() {
    Train t = dispatchQ.top(); dispatchQ.pop();
    platform[t.platformId].assign(t);
    db.exec("UPDATE trains SET status='DISPATCHED' WHERE id=?", t.id);
}`,

  'Web-Based Employee Attendance System':
`// JavaScript — geofenced check-in via Geolocation API
navigator.geolocation.getCurrentPosition(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    const inOffice = haversine({ lat, lng }, OFFICE_COORDS) < 100;

    fetch('/api/attendance/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ empId, lat, lng, inOffice, ts: Date.now() })
    });
});`,

  'Employee Record Management System':
`// C# Dapper — type-safe employee CRUD operations
public class EmployeeRepo {
    public Employee GetById(int id) =>
        _db.QueryFirstOrDefault<Employee>(
            "SELECT * FROM Employees WHERE Id = @Id AND Active = 1",
            new { Id = id });

    public int Update(Employee e) =>
        _db.Execute(
            "UPDATE Employees SET Name=@Name, Dept=@Dept WHERE Id=@Id", e);
}`,

  'Notepad Application':
`// Java Swing — file-backed notepad with save/load
JTextArea editor   = new JTextArea();
JMenuItem saveItem = new JMenuItem("Save");

saveItem.addActionListener(e -> {
    if (currentFile == null) currentFile = chooseFile();
    try (FileWriter fw = new FileWriter(currentFile)) {
        fw.write(editor.getText());
        setTitle(currentFile.getName() + " — Notepad");
    } catch (IOException ex) { showError(ex.getMessage()); }
});`,

  'Employee Record & Attendance Management':
`-- Monthly attendance summary report
SELECT e.name,
       COUNT(a.id)          AS days_present,
       SUM(a.hours_worked)  AS total_hours,
       AVG(a.hours_worked)  AS avg_hours
FROM employees e
JOIN attendance a ON e.id = a.emp_id
WHERE YEAR(a.date)  = YEAR(GETDATE())
  AND MONTH(a.date) = MONTH(GETDATE())
GROUP BY e.name
ORDER BY total_hours DESC;`,

  'Game Development: Tetris':
`// C++ — piece rotation with collision check
void Piece::rotate() {
    int rotated[4][4] = {};
    for (int y = 0; y < 4; y++)
        for (int x = 0; x < 4; x++)
            rotated[x][3 - y] = grid[y][x];

    if (!board.collides(rotated, posX, posY))
        memcpy(grid, rotated, sizeof(grid));
}`,

  'Calendar System':
`// C++ — Gregorian calendar engine
int daysInMonth(int month, int year) {
    if (month == 2) {
        bool leap = (year % 4 == 0 && year % 100 != 0)
                 || (year % 400 == 0);
        return leap ? 29 : 28;
    }
    int d30[] = { 4, 6, 9, 11 };
    for (int m : d30) if (month == m) return 30;
    return 31;
}`,

  // ── Builds & Experiments ──────────────────────────────────────
  'APEX Dropshipping Platform':
`// TypeScript — Claude AI product scoring
import Anthropic from "@anthropic-ai/sdk";
const claude = new Anthropic();

async function scoreProduct(product: Product) {
    const msg = await claude.messages.create({
        model: "claude-opus-4-5",
        max_tokens: 256,
        messages: [{ role: "user",
            content: "Rate dropshipping viability 0-100:\\n"
                   + JSON.stringify(product) }]
    });
    const score = parseFloat(msg.content[0].text);
    await db.products.update({ where: { id: product.id },
                               data:  { aiScore: score } });
    return score;
}`,

  'Inv Advisor':
`// TypeScript — 5-algorithm composite scoring engine
function scoreCompany(c: Company): ScoredCompany {
    const future  = calcFutureProof(c);     // R&D, moat, sector trends
    const health  = calcFinancialHealth(c); // debt ratio, FCF, coverage
    const growth  = calcGrowthQuality(c);   // revenue CAGR, margin trend
    const value   = calcValuation(c);       // P/E, EV/EBITDA vs peers
    const risk    = calcRisk(c);            // beta, earnings volatility

    const composite = future*0.30 + health*0.25 + growth*0.25
                    + value*0.10  + risk*0.10;
    return { ...c, composite, future, health, growth, value, risk };
}`,

  'PerAI View':
`# Python FastAPI — ML-powered AI program classifier
from fastapi import FastAPI
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(n_estimators=200)
clf.fit(X_train, y_train)   # trained on labelled AI-usage telemetry

app = FastAPI()

@app.post("/classify")
def classify(payload: ActivityPayload):
    features = extract_features(payload)
    label    = clf.predict([features])[0]
    conf     = clf.predict_proba([features])[0].max()
    return { "program": label, "confidence": round(float(conf), 3) }`,

  'Newsletter Platform':
`// TypeScript — OpenAI article summariser (Pro feature)
// Runs on Cloudflare Worker via cron trigger every 5 minutes
import OpenAI from "openai";
const openai = new OpenAI();

async function summarise(article: Article) {
    const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "Summarise in exactly 2 sentences." },
            { role: "user",   content: article.content }
        ]
    });
    await db.articles.update(
        { where: { id: article.id } },
        { data:  { aiSummary: res.choices[0].message.content } }
    );
}`,

  'Newsletter CMS':
`// TypeScript — Payload CMS + OpenAI content generation
import { openai } from "@/lib/openai";

export async function generateArticle(topic: string) {
    const res = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: "You are a professional newsletter editor." },
            { role: "user",   content: "Write a 400-word article about: " + topic }
        ]
    });
    await payload.create({
        collection: "articles",
        data: { title: topic,
                content: res.choices[0].message.content,
                status: "draft" }
    });
}`,

  'NWL Newsletter App':
`// Node.js — NewsAPI aggregator with SQLite persistence
const NewsAPI = require('newsapi');
const newsapi  = new NewsAPI(process.env.NEWS_API_KEY);

async function fetchAndStore(category) {
    const { articles } = await newsapi.v2.topHeadlines({
        category, language: 'en', pageSize: 20
    });
    const stmt = db.prepare(
        'INSERT OR IGNORE INTO articles(title,url,source,category) VALUES(?,?,?,?)'
    );
    articles.forEach(a => stmt.run(a.title, a.url, a.source.name, category));
}`,

  'EUR/USD Scalping Bot':
`// Node.js — EMA/RSI signal engine (M1 candles)
function generateSignal(candles) {
    const closes = candles.map(c => c.close);
    const ema9   = EMA(closes, 9).at(-1);
    const ema21  = EMA(closes, 21).at(-1);
    const rsi    = RSI(closes, 14).at(-1);

    if (ema9 > ema21 && rsi > 40 && rsi < 55)
        return { side: 'BUY',  strength: rsi };
    if (ema9 < ema21 && rsi > 45 && rsi < 60)
        return { side: 'SELL', strength: rsi };
    return { side: 'HOLD', strength: rsi };
}`,

  'XAUUSD Trading Bot':
`// Node.js — liquidity zone sweep detector
function detectLiquiditySweep(candles) {
    const recent = candles.slice(-20);
    const swingH = Math.max(...recent.map(c => c.high));
    const swingL = Math.min(...recent.map(c => c.low));
    const last   = candles.at(-1);

    if (last.high > swingH * 0.999)
        return { type: 'SWEEP', zone: swingH,
                 direction: 'SELL', sl: swingH * 1.002 };
    if (last.low  < swingL * 1.001)
        return { type: 'SWEEP', zone: swingL,
                 direction: 'BUY',  sl: swingL * 0.998 };
    return null;
}`,

  'EA Tester — Algo Platform':
`# Python — deterministic backtest engine core
def backtest(strategy, ohlcv, initial_equity=10_000):
    equity, trades, curve = initial_equity, [], []

    for i in range(strategy.lookback, len(ohlcv)):
        sig = strategy.signal(ohlcv[:i])
        if sig and risk_ok(equity, sig, max_risk=0.01):
            sl   = ohlcv[i].close * (1 - sig.stop_pct)
            size = (equity * 0.01) / abs(ohlcv[i].close - sl)
            trades.append(Trade(ohlcv[i].close, sl, size, sig.direction))
        equity = mark_to_market(equity, trades, ohlcv[i])
        curve.append(equity)

    return { "sharpe": sharpe(curve), "max_dd": max_drawdown(curve) }`,

  'adb+ Ad Blocker':
`// Chrome MV3 — declarativeNetRequest ad blocking
const AD_DOMAINS = [
    "doubleclick.net", "googlesyndication.com",
    "facebook.com/tr", "criteo.com", "amazon-adsystem.com"
];

chrome.declarativeNetRequest.updateDynamicRules({
    addRules: AD_DOMAINS.map((domain, i) => ({
        id: i + 1,
        action:    { type: "block" },
        condition: {
            urlFilter: "*" + domain + "*",
            resourceTypes: ["script", "image", "sub_frame"]
        }
    })),
    removeRuleIds: AD_DOMAINS.map((_, i) => i + 1)
});`
};

// ── Card modal open / close ───────────────────────────────────────
const cardModal        = document.getElementById('card-modal');
const cardModalImg     = document.getElementById('card-modal-img');
const cardModalBadge   = document.getElementById('card-modal-badge');
const cardModalTitle   = document.getElementById('card-modal-title');
const cardModalDesc    = document.getElementById('card-modal-desc');
const cardModalCode    = document.getElementById('card-modal-code');
const cardModalSnippet = document.getElementById('card-modal-snippet');
const cardModalTech    = document.getElementById('card-modal-tech');
const cardModalClose   = document.getElementById('card-modal-close');
const cardModalBackdrop = document.querySelector('[data-close-card-modal]');

function openCardModal(card) {
    const img     = card.querySelector('img');
    const title   = card.querySelector('h3').textContent.trim();
    const descEl  = card.querySelector('p:not(.project-tech):not(.build-tech)');
    const desc    = descEl ? descEl.textContent.trim() : '';
    const techEl  = card.querySelector('.project-tech, .build-tech');
    const tech    = techEl ? techEl.textContent.trim() : '';
    const badgeEl = card.querySelector('.build-badge');
    const badge   = badgeEl ? badgeEl.textContent.trim() : '';
    const snippet = CARD_SNIPPETS[title] || '';

    if (img) { cardModalImg.src = img.src; cardModalImg.alt = img.alt; }
    cardModalBadge.textContent   = badge;
    cardModalTitle.textContent   = title;
    cardModalDesc.textContent    = desc;
    cardModalTech.textContent    = tech;
    cardModalSnippet.textContent = snippet;
    cardModalCode.style.display  = snippet ? 'block' : 'none';

    cardModal.classList.add('is-open');
    cardModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    cardModalClose.focus();
}

function closeCardModal() {
    if (!cardModal) return;
    cardModal.classList.remove('is-open');
    cardModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

document.querySelectorAll('.project-card, .build-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-haspopup', 'dialog');
    card.addEventListener('click', () => openCardModal(card));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCardModal(card);
        }
    });
});

if (cardModalClose)   cardModalClose.addEventListener('click', closeCardModal);
if (cardModalBackdrop) cardModalBackdrop.addEventListener('click', closeCardModal);
