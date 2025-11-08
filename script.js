// Basic tool functions
document.addEventListener("DOMContentLoaded", () => {
  const tools = [
    { name: "BMI Calculator", func: bmiTool },
    { name: "Age Calculator", func: ageTool },
    { name: "Days Between Dates", func: daysBetweenTool },
    { name: "Percentage Calculator", func: percentTool },
    { name: "Unit Converter", func: unitConverter },
    { name: "EMI Calculator", func: emiTool },
    { name: "GST Calculator", func: gstTool },
    { name: "Word Counter", func: wordCountTool },
    { name: "Text Case Converter", func: caseTool },
    { name: "Password Generator", func: passwordTool },
    { name: "URL Encoder / Decoder", func: urlTool },
    { name: "Tip & Split Calculator", func: tipTool },
    { name: "Countdown Timer", func: timerTool },
    { name: "Stopwatch", func: stopwatchTool },
    { name: "Image to Base64", func: base64Tool },
    { name: "Slug Generator", func: slugTool },
    { name: "Character & Byte Counter", func: byteTool },
    { name: "QR Code Helper", func: qrTool }
  ];

  // ========== SEARCH TO SCROLL ==========
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    const tools = document.querySelectorAll(".tool");

    let firstMatch = null;

    tools.forEach((tool) => {
      const title = tool.querySelector("h2")?.textContent?.toLowerCase() || "";
      const match = title.includes(query);
      tool.style.display = match || query === "" ? "block" : "none";
      if (match && !firstMatch) firstMatch = tool;
    });

    if (firstMatch && query !== "") {
      firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

  const container = document.getElementById("tool-container");

  tools.forEach(t => {
    const div = document.createElement("div");
    div.className = "tool";
    div.innerHTML = `<h2>${t.name}</h2>`;
    div.appendChild(t.func());
    container.appendChild(div);
  });
});

// Tool definitions
function createInput(label, id, type="text", value="") {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `<label>${label}: <input id='${id}' type='${type}' value='${value}'></label>`;
  return wrapper;
}

function createButton(text, onClick) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.onclick = onClick;
  return btn;
}

// BMI
function bmiTool() {
  const c = document.createElement("div");
  const h = createInput("Height (cm)", "h", "number", "170");
  const w = createInput("Weight (kg)", "w", "number", "65");
  const result = document.createElement("div");
  result.className = "result";
  const btn = createButton("Calculate", () => {
    const height = parseFloat(h.querySelector("input").value)/100;
    const weight = parseFloat(w.querySelector("input").value);
    const bmi = (weight / (height*height)).toFixed(1);
    let cat = bmi<18.5?"Underweight":bmi<25?"Normal":bmi<30?"Overweight":"Obese";
    result.textContent = `BMI: ${bmi} (${cat})`;
  });
  c.append(h,w,btn,result);
  return c;
}

// Age
function ageTool() {
  const c = document.createElement("div");
  const input = createInput("Date of Birth", "dob", "date");
  const result = document.createElement("div");
  result.className = "result";
  const btn = createButton("Calculate", () => {
    const dob = new Date(input.querySelector("input").value);
    const now = new Date();
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();
    if (days<0){months--;days+=30;}
    if (months<0){years--;months+=12;}
    result.textContent = `${years} years, ${months} months, ${days} days`;
  });
  c.append(input,btn,result);
  return c;
}

// Days Between Dates
function daysBetweenTool() {
  const c = document.createElement("div");
  const s = createInput("Start Date", "s", "date");
  const e = createInput("End Date", "e", "date");
  const result = document.createElement("div");
  result.className = "result";
  const btn = createButton("Calculate", () => {
    const d1 = new Date(s.querySelector("input").value);
    const d2 = new Date(e.querySelector("input").value);
    const diff = Math.abs(d2-d1);
    const days = Math.floor(diff/86400000);
    result.textContent = `${days} days`;
  });
  c.append(s,e,btn,result);
  return c;
}

// (Other tools abbreviated for brevity)
// ---------- Percentage Calculator ----------
function percentTool(){
  const c = document.createElement('div');

  const row = document.createElement('div');
  row.style.display = 'grid';
  row.style.gridTemplateColumns = '1fr 1fr';
  row.style.gap = '8px';

  const baseLabel = document.createElement('label');
  baseLabel.textContent = 'Base (Y): ';
  const baseInput = document.createElement('input');
  baseInput.type = 'number';
  baseInput.value = 100;
  baseInput.style.width = '100%';
  baseLabel.appendChild(baseInput);

  const pctLabel = document.createElement('label');
  pctLabel.textContent = 'Percent (X): ';
  const pctInput = document.createElement('input');
  pctInput.type = 'number';
  pctInput.value = 15;
  pctInput.style.width = '100%';
  pctLabel.appendChild(pctInput);

  row.append(baseLabel, pctLabel);

  const btn = createButton('Calculate', ()=>{
    const b = parseFloat(baseInput.value) || 0;
    const p = parseFloat(pctInput.value) || 0;
    const res = +(b * p / 100).toFixed(2);
    result.textContent = `Result: ${res}`;
  });

  const result = document.createElement('div');
  result.className = 'result';

  c.append(row, btn, result);
  return c;
}

// ---------- Unit Converter (Length) ----------
function unitConverter(){
  const units = {
    m:1, km:1000, cm:0.01, mm:0.001, mi:1609.34, yd:0.9144, ft:0.3048, in:0.0254
  };
  const c = document.createElement('div');

  const inputVal = document.createElement('input'); inputVal.type='number'; inputVal.value='1';
  const fromSel = document.createElement('select');
  const toSel = document.createElement('select');

  Object.keys(units).forEach(u=>{
    const o1 = document.createElement('option'); o1.value=u; o1.textContent=u; fromSel.appendChild(o1);
    const o2 = document.createElement('option'); o2.value=u; o2.textContent=u; toSel.appendChild(o2);
  });
  toSel.value = 'ft';

  const row = document.createElement('div'); row.style.display='flex'; row.style.gap='8px';
  row.append(inputVal, fromSel, toSel);

  const btn = createButton('Convert', ()=>{
    const v = parseFloat(inputVal.value) || 0;
    const from = fromSel.value; const to = toSel.value;
    const meters = v * units[from];
    const conv = +(meters / units[to]).toFixed(6);
    result.textContent = `Result: ${conv} ${to}`;
  });

  const result = document.createElement('div'); result.className = 'result';

  c.append(row, btn, result);
  return c;
}

// ---------- EMI Calculator ----------
function emiTool(){
  const c = document.createElement('div');
  const P = document.createElement('input'); P.type='number'; P.value='500000'; P.style.width='100%';
  const rate = document.createElement('input'); rate.type='number'; rate.value='10';
  const tenure = document.createElement('input'); tenure.type='number'; tenure.value='60';

  const grid = document.createElement('div');
  grid.style.display='grid'; grid.style.gridTemplateColumns='1fr 1fr 1fr'; grid.style.gap='8px';
  const l1 = document.createElement('label'); l1.textContent='Principal (₹)'; l1.appendChild(P);
  const l2 = document.createElement('label'); l2.textContent='Annual Rate (%)'; l2.appendChild(rate);
  const l3 = document.createElement('label'); l3.textContent='Tenure (months)'; l3.appendChild(tenure);
  grid.append(l1,l2,l3);

  const btn = createButton('Calculate EMI', ()=>{
    const principal = Number(P.value) || 0;
    const annual = Number(rate.value) || 0;
    const months = Number(tenure.value) || 1;
    const r = annual/12/100;
    let emi;
    if (r === 0) emi = principal / months;
    else {
      const x = Math.pow(1+r, months);
      emi = (principal * r * x) / (x - 1);
    }
    const total = emi * months;
    const interest = total - principal;
    result.innerHTML = `EMI: ₹ ${Math.round(emi).toLocaleString()}<br>Total Interest: ₹ ${Math.round(interest).toLocaleString()}<br>Total Payment: ₹ ${Math.round(total).toLocaleString()}`;
  });

  const result = document.createElement('div'); result.className='result';
  c.append(grid, btn, result);
  return c;
}

// ---------- GST Calculator (Add/Remove) ----------
function gstTool(){
  const c = document.createElement('div');
  const price = document.createElement('input'); price.type='number'; price.value='1000';
  const gst = document.createElement('input'); gst.type='number'; gst.value='18';
  const modeSel = document.createElement('select');
  const o1=document.createElement('option'); o1.value='add'; o1.textContent='Add GST';
  const o2=document.createElement('option'); o2.value='remove'; o2.textContent='Remove GST';
  modeSel.append(o1,o2);

  const row = document.createElement('div'); row.style.display='flex'; row.style.gap='8px';
  row.append(price, gst, modeSel);
  const btn = createButton('Calculate', ()=>{
    const p = Number(price.value) || 0; const g = Number(gst.value) || 0;
    if (modeSel.value === 'add'){
      const gstAmt = +(p * (g/100)).toFixed(2);
      result.innerHTML = `GST Amount: ₹ ${gstAmt}<br>Final Price: ₹ ${(p + gstAmt).toFixed(2)}`;
    } else {
      const base = +(p / (1 + g/100)).toFixed(2);
      result.innerHTML = `Base Price: ₹ ${base}<br>GST Amount: ₹ ${(p - base).toFixed(2)}`;
    }
  });

  const result = document.createElement('div'); result.className='result';
  c.append(row, btn, result);
  return c;
}

// ---------- Word Counter ----------
function wordCountTool(){
  const c = document.createElement('div');
  const ta = document.createElement('textarea'); ta.rows=6; ta.style.width='100%';
  const counts = document.createElement('div'); counts.className='result';
  const update = ()=>{
    const text = ta.value || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const lines = text ? text.split(/\n/).length : 0;
    counts.textContent = `Words: ${words} • Characters: ${chars} • Lines: ${lines}`;
  };
  ta.addEventListener('input', update);
  update();
  c.append(ta, counts);
  return c;
}

// ---------- Text Case Converter ----------
function caseTool(){
  const c = document.createElement('div');
  const ta = document.createElement('textarea'); ta.rows=5; ta.style.width='100%';
  const btnU = createButton('UPPERCASE', ()=> ta.value = ta.value.toUpperCase());
  const btnL = createButton('lowercase', ()=> ta.value = ta.value.toLowerCase());
  const btnT = createButton('Title Case', ()=> {
    ta.value = ta.value.toLowerCase().split(/\s+/).map(w => w ? w[0].toUpperCase() + w.slice(1) : '').join(' ');
  });
  c.append(ta, btnU, btnL, btnT);
  return c;
}

// ---------- Password Generator ----------
function passwordTool(){
  const c = document.createElement('div');
  const len = document.createElement('input'); len.type='number'; len.value='12'; len.style.width='80px';
  const cbLower = document.createElement('input'); cbLower.type='checkbox'; cbLower.checked=true;
  const cbUpper = document.createElement('input'); cbUpper.type='checkbox'; cbUpper.checked=true;
  const cbDigits = document.createElement('input'); cbDigits.type='checkbox'; cbDigits.checked=true;
  const cbSym = document.createElement('input'); cbSym.type='checkbox';

  const lbls = document.createElement('div');
  lbls.innerHTML = `Length: `; lbls.append(len);
  const opts = document.createElement('div'); opts.style.marginTop='8px';
  opts.innerHTML = `<label><input type='checkbox' checked> lower</label> `;
  // we'll build custom controls:
  const lwrap = document.createElement('div');
  lwrap.style.display='flex'; lwrap.style.gap='8px'; lwrap.style.alignItems='center';
  lwrap.append(document.createTextNode('Options: '),
    createLabeledCheckbox('lower', cbLower),
    createLabeledCheckbox('UPPER', cbUpper),
    createLabeledCheckbox('123', cbDigits),
    createLabeledCheckbox('!@#', cbSym)
  );

  const out = document.createElement('input'); out.readOnly=true; out.style.width='100%';
  function generate(){
    const L = 'abcdefghijklmnopqrstuvwxyz';
    const U = L.toUpperCase();
    const D = '0123456789';
    const S = '!@#$%^&*()_+{}[]<>?';
    let pool = '';
    if (cbLower.checked) pool += L;
    if (cbUpper.checked) pool += U;
    if (cbDigits.checked) pool += D;
    if (cbSym.checked) pool += S;
    if (!pool) { out.value = ''; return; }
    const n = Math.max(1, Number(len.value) || 12);
    let p = '';
    for (let i=0;i<n;i++) p += pool[Math.floor(Math.random()*pool.length)];
    out.value = p;
  }
  const btn = createButton('Generate', generate);
  const copyBtn = createButton('Copy', ()=> { navigator.clipboard?.writeText(out.value); copyBtn.textContent='Copied'; setTimeout(()=>copyBtn.textContent='Copy',1200); });

  c.append(lbls, lwrap, btn, out, copyBtn);
  return c;

  // helpers
  function createLabeledCheckbox(text, element){
    const wrap = document.createElement('label'); wrap.style.display='flex'; wrap.style.alignItems='center'; wrap.style.gap='6px';
    wrap.append(element, document.createTextNode(text));
    return wrap;
  }
}

// ---------- URL Encoder / Decoder ----------
function urlTool(){
  const c = document.createElement('div');
  const ta = document.createElement('textarea'); ta.rows=3; ta.style.width='100%';
  const encBtn = createButton('Encode', ()=> ta.value = encodeURIComponent(ta.value));
  const decBtn = createButton('Decode', ()=> {
    try { ta.value = decodeURIComponent(ta.value); } catch(e){ alert('Invalid encoded string'); }
  });
  c.append(ta, encBtn, decBtn);
  return c;
}

// ---------- Tip & Split Calculator ----------
function tipTool(){
  const c = document.createElement('div');
  const bill = document.createElement('input'); bill.type='number'; bill.value='1000';
  const tip = document.createElement('input'); tip.type='number'; tip.value='10';
  const people = document.createElement('input'); people.type='number'; people.value='2';

  const row = document.createElement('div'); row.style.display='flex'; row.style.gap='8px';
  row.append(bill, tip, people);

  const btn = createButton('Calculate', ()=>{
    const b = Number(bill.value) || 0;
    const t = Number(tip.value) || 0;
    const p = Math.max(1, Number(people.value) || 1);
    const tipAmt = +(b * t / 100).toFixed(2);
    const total = +(b + tipAmt).toFixed(2);
    const per = +(total / p).toFixed(2);
    result.innerHTML = `Tip: ₹ ${tipAmt} • Total: ₹ ${total} • Per person: ₹ ${per}`;
  });

  const result = document.createElement('div'); result.className='result';
  c.append(row, btn, result);
  return c;
}

// ---------- Countdown Timer ----------
function timerTool(){
  const c = document.createElement('div');
  const seconds = document.createElement('input'); seconds.type='number'; seconds.value='60';
  const startBtn = createButton('Start', start);
  const stopBtn = createButton('Stop', stop);
  const resetBtn = createButton('Reset', reset);
  const display = document.createElement('div'); display.className='result'; display.style.fontSize='24px';

  let left = Number(seconds.value) || 60;
  let interval = null;
  function updateDisplay(){ display.textContent = `${left}s`; }

  function start(){
    left = Number(seconds.value) || 60;
    updateDisplay();
    if (interval) clearInterval(interval);
    interval = setInterval(()=>{
      if (left <= 1){ left = 0; clearInterval(interval); interval = null; }
      else left -= 1;
      updateDisplay();
    }, 1000);
  }
  function stop(){ if (interval) { clearInterval(interval); interval = null; } }
  function reset(){ stop(); left = Number(seconds.value) || 60; updateDisplay(); }

  c.append(seconds, startBtn, stopBtn, resetBtn, display);
  updateDisplay();
  return c;
}

// ---------- Stopwatch ----------
function stopwatchTool(){
  const c = document.createElement('div');
  const startBtn = createButton('Start', start);
  const stopBtn = createButton('Stop', stop);
  const resetBtn = createButton('Reset', reset);
  const display = document.createElement('div'); display.className='result'; display.style.fontSize='20px';

  let ms = 0, interval=null, running=false, startedAt=0;
  function fmt(t){
    const s = Math.floor(t/1000);
    const m = Math.floor(s/60);
    const h = Math.floor(m/60);
    const mm = String(m%60).padStart(2,'0');
    const ss = String(s%60).padStart(2,'0');
    const cs = String(Math.floor((t%1000)/10)).padStart(2,'0');
    return `${h}:${mm}:${ss}.${cs}`;
  }
  function tick(){ ms = Date.now() - startedAt; display.textContent = fmt(ms); }

  function start(){
    if (running) return;
    running = true;
    startedAt = Date.now() - ms;
    interval = setInterval(tick, 50);
  }
  function stop(){ if (!running) return; running=false; clearInterval(interval); interval=null; }
  function reset(){ stop(); ms=0; display.textContent = fmt(ms); }

  reset();
  c.append(startBtn, stopBtn, resetBtn, display);
  return c;
}

// ---------- Image to Base64 ----------
function base64Tool(){
  const c = document.createElement('div');
  const file = document.createElement('input'); file.type='file'; file.accept='image/*';
  const img = document.createElement('img'); img.style.maxHeight='140px'; img.style.display='block'; img.style.marginTop='8px';
  const out = document.createElement('textarea'); out.rows=6; out.style.width='100%';
  file.addEventListener('change', ()=>{
    const f = file.files && file.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ()=> {
      out.value = reader.result;
      img.src = reader.result;
    };
    reader.readAsDataURL(f);
  });
  c.append(file, img, out);
  return c;
}

// ---------- Slug Generator ----------
function slugTool(){
  const c = document.createElement('div');
  const input = document.createElement('input'); input.type='text'; input.style.width='100%';
  const btn = createButton('Generate Slug', ()=> {
    const slug = input.value.toLowerCase().trim().replace(/[^a-z0-9\\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');
    result.textContent = slug;
  });
  const result = document.createElement('div'); result.className='result';
  c.append(input, btn, result);
  return c;
}

// ---------- Character & Byte Counter ----------
function byteTool(){
  const c = document.createElement('div');
  const ta = document.createElement('textarea'); ta.rows=5; ta.style.width='100%';
  const res = document.createElement('div'); res.className='result';
  ta.addEventListener('input', ()=>{
    const text = ta.value || '';
    const chars = text.length;
    const bytes = new TextEncoder().encode(text).length;
    res.textContent = `Characters: ${chars} • UTF-8 bytes: ${bytes}`;
  });
  c.append(ta, res);
  return c;
}

// ---------- QR Code Helper (uses qrserver.com) ----------
function qrTool(){
  const c = document.createElement('div');
  const ta = document.createElement('input'); ta.type='text'; ta.style.width='100%'; ta.value='Hello from QuickTools!';
  const sizeSel = document.createElement('select');
  ['150','200','300'].forEach(s=>{
    const o=document.createElement('option'); o.value=s; o.textContent=s; sizeSel.appendChild(o);
  });
  const img = document.createElement('img'); img.style.display='block'; img.style.marginTop='8px'; img.alt='QR';
  const gen = ()=>{
    const data = encodeURIComponent(ta.value || '');
    const s = sizeSel.value || '200';
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&data=${data}`;
  };
  const btn = createButton('Generate QR', gen);
  gen();
  c.append(ta, sizeSel, btn, img);
  return c;
}

// ========== DARK / LIGHT MODE ==========
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  // Load saved theme
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.body.classList.add("dark-mode");

  // Toggle handler
  const setTheme = (dark) => {
    document.body.classList.toggle("dark-mode", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    themeToggle.textContent = dark ? "☀️" : "🌙";
  };

  // Initial button icon
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    setTheme(!isDark);
  });
}


