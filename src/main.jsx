import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import { Heart, Music2, VolumeX, Crown, Sparkles, LockKeyhole, Gift, Mail, Send, Play, Pause } from "lucide-react";
import "./style.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const compliments = [
  "Tum sirf khoobsurat nahi ho, Tabassum… tumhare har andaaz mein ek alag hi khoobsurati hai. ❤️",
  "Tumhari muskurahat, tumhari baatein, tumhara gussa aur tumhari shararatein — har ada apni jagah khaas hai.",
  "Tumhari khoobsurati sirf chehre mein nahi, tumhare dil aur tumhari rooh ke narm andaaz mein bhi hai.",
  "Meri pyaari si pariii ji, tum jaisi ho, bilkul waise hi lajawab ho. 👑"
];
const letters = [
  ["MERI JAAN ❤️", "Tum meri zindagi ka woh hissa ho jise main hamesha sambhaal kar rakhna chahta hoon. Tumhari khushi mere liye bohot maayne rakhti hai."],
  ["MERI PARIII 👑", "Tumhari har ada mere liye khaas hai. Tumhari hansi ho ya chidchidapan, tum meri zindagi ki apni si kahaani ho."],
  ["FOREVER US ❤️", "Zindagi ke har mod par tumhara saath chahta hoon. Har din ek doosre ko samajhne, hansne aur saath nibhaane ka mauka mile."]
];

function App() {
  const [step, setStep] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [compliment, setCompliment] = useState(0);
  const [popped, setPopped] = useState([]);
  const [scratched, setScratched] = useState(false);
  const [quiz, setQuiz] = useState(["", "", ""]);
  const [verdict, setVerdict] = useState("");
  const [complaintReply, setComplaintReply] = useState("");
  const [loveChoice, setLoveChoice] = useState("");
  const [openLetters, setOpenLetters] = useState([]);
  const [message, setMessage] = useState("");
  const [relationship, setRelationship] = useState("");
  const [special, setSpecial] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    const audio = document.getElementById("jhol-audio");
    if (!audio) return;
    if (musicOn) audio.play().catch(() => setMusicOn(false));
    else audio.pause();
  }, [musicOn]);

  useEffect(() => {
    const tick = () => {
      const diff = new Date("2027-01-02T00:00:00+05:30").getTime() - Date.now();
      const d = Math.max(0, diff);
      setCountdown({ days: Math.floor(d/86400000), hours: Math.floor(d/3600000)%24, minutes: Math.floor(d/60000)%60, seconds: Math.floor(d/1000)%60 });
    };
    tick(); const timer = setInterval(tick, 1000); return () => clearInterval(timer);
  }, []);

  const start = () => { setStep(1); setMusicOn(true); };
  const submit = async () => {
    if (!message.trim() && !relationship && !special.trim()) { alert("Aap chahein toh kuch likh sakti hain, ya apni marzi se skip kar sakti hain."); return; }
    setSending(true);
    const payload = { verdict, complaint_reply: complaintReply, quiz_answers: quiz, love_choice: loveChoice, message, relationship, special_message: special, submitted_at: new Date().toISOString() };
    try {
      if (supabase) {
        const { error } = await supabase.from("tabassum_responses").insert(payload);
        if (error) throw error;
      } else {
        localStorage.setItem("tabassum_preview_response", JSON.stringify(payload));
        alert("Preview mode: response is saved only in this browser. Connect Supabase before sharing the public website.");
      }
      setSent(true);
    } catch (e) {
      alert("Response send nahi ho paaya. Please try again. " + e.message);
    } finally { setSending(false); }
  };

  const sections = ["Secret Entry","Husband's Court","Husband-Wife Quiz","Compliment Machine","Pop the Hearts","Scratch & Reveal","Love Meter","Secret Love Letters","A Beautiful Dua","Her Heart, Her Words"];
  const next = () => setStep(s => Math.min(10, s + 1));
  const select = (arr, idx, value, setter) => setter(arr.map((v,i)=>i===idx?value:v));

  return <div className="app">
    <header><div className="brand"><Crown size={17}/> TABASSUM’S SECRET WORLD</div><button className="music" onClick={()=>setMusicOn(v=>!v)} aria-label="Toggle music">{musicOn?<Music2/>:<VolumeX/>}{musicOn?" MUSIC ON":" MUSIC OFF"}</button></header>
    <main>
      {step===0 && <section className="hero">
        <div className="ornament">✦　♥　✦</div><div className="eyebrow">A WORLD MADE JUST FOR YOU</div>
        <h1>Yo Tabassum! <em>❤️</em></h1><h2>Meri pyaari si pariii ji 👑</h2>
        <p>Tumhare liye kuch special banaya hai…<br/>Bina soche open karo! 😂❤️</p>
        <button className="primary" onClick={start}>OPEN MY SURPRISE ❤️</button>
        <footer>Tumhara maasum makluq ❤️😂</footer>
      </section>}

      {step>0 && <div className="progress"><span>SHARIK-E-HAYAT ❤️</span><span>{step}/10</span></div>}
      {step===1 && <section className="panel center"><LockKeyhole className="gold big"/><div className="eyebrow">A LITTLE SECRET…</div><h1 className="gold">AAP K LIYE MAALKIN ❤️</h1><h2>Meri pyaari si pariii ji 👑</h2><p>Yeh duniya sirf tumhare liye hai, meri pari! 👑</p><p>Aage jaane se pehle ek chhota sa sawaal… 😂</p><div className="inner"><b>WHO IS THE QUEEN HERE?</b><h2>TABASSUM 👑</h2></div><small>Your secret world is waiting…</small><button className="primary" onClick={next}>ENTER MY WORLD ❤️</button><small>Made with love, by your maasum makluq 😂</small></section>}

      {step===2 && <section className="panel"><div className="eyebrow">⚖️ THE HUSBAND'S COURT</div><h1>Ek bechare pati ki fariyaad 😂</h1><p>Maalkin ji, aap par kuch serious ilzaam hain!</p><ul><li>Bina wajah gussa karna.</li><li>Bechare pati ko tang karna.</li><li>Hamesha apni marzi chalana.</li><li>Lekin phir bhi sabse pyaari banna. ❤️</li></ul><h3>MAALKIN KA FAISLA KYA HAI? 👑</h3><div className="choices">{["GUILTY 😂","INNOCENT 😇"].map(x=><button className={verdict===x?"choice active":"choice"} onClick={()=>setVerdict(x)}>{x}</button>)}</div><button className="primary" onClick={next} disabled={!verdict}>CONTINUE ❤️</button></section>}

      {step===3 && <section className="panel"><div className="eyebrow">💑 HOW WELL DO YOU KNOW YOUR HUSBAND?</div><h1>Chalo maalkin ji, dekhte hain! 😂</h1>
        {["Aapke pati ka favourite person kaun hai?","Gussa hone ke baad sabse pehle kaun manata hai?","Aapke pati aapko kya bulate hain?"].map((q,i)=><div className="question"><b>{i+1}. {q}</b><div className="choices">{(i===0?["Main khud 😂","Tabassum ❤️","Khana 🍕"]:i===1?["Pati 🥺","Maalkin 👑","Dono zid karte hain 😂"]:["Maalkin 👑","Meri pyaari si parii ❤️","Biwi 💍","Moti 😂","Kaali 😂"]).map(v=><button className={quiz[i]===v?"choice active":"choice"} onClick={()=>select(quiz,i,v,setQuiz)}>{v}</button>)}</div></div>)}<button className="primary" onClick={next} disabled={quiz.some(x=>!x)}>SUBMIT MY ANSWERS ❤️</button></section>}

      {step===4 && <section className="panel center"><Sparkles className="gold big"/><div className="eyebrow">THE COMPLIMENT MACHINE</div><h1>Specially made for my maalkin ❤️</h1><div className="inner quote">{compliments[compliment%compliments.length]}</div><button className="primary" onClick={()=>setCompliment(v=>v+1)}>EK AUR TAAREEF SUNOGI, MAALKIN? 😂❤️</button><button className="secondary" onClick={next}>CONTINUE</button></section>}

      {step===5 && <section className="panel center"><Heart className="gold big"/><div className="eyebrow">POP THE HEARTS ❤️</div><h1>Maalkin, zara apna kamaal dikhao! 😂</h1><p>10 hearts tap karke pop karo.</p><div className="heartgrid">{Array.from({length:10},(_,i)=><button className="heart" key={i} onClick={()=>setPopped(p=>p.includes(i)?p:[...p,i])}>{popped.includes(i)?"✨":"❤️"}</button>)}</div><b>HEARTS POPPED: {popped.length}/10</b>{popped.length===10&&<p className="gold">Saare pyaar ke hearts aapke! ❤️</p>}<button className="primary" onClick={next} disabled={popped.length<10}>UNLOCK NEXT SURPRISE</button></section>}

      {step===6 && <section className="panel center"><Gift className="gold big"/><div className="eyebrow">A SPECIAL GIFT FOR YOU</div><h1>Meri maalkin ke liye kuch khaas ❤️</h1><p>Gift ko tap karke surprise reveal karo.</p><button className="scratch" onClick={()=>setScratched(true)}>{scratched?"Tum meri zindagi ka bohot khaas hissa ho. ❤️":"✦ SCRATCH / TAP HERE ✦"}</button><button className="primary" onClick={next} disabled={!scratched}>CONTINUE</button></section>}

      {step===7 && <section className="panel center"><div className="eyebrow">THE LOVE METER ❤️</div><h1 className="huge">∞%</h1><h3 className="gold">UNLIMITED LOVE! ❤️</h3><div className="meter"><span/></div><h2>Sach sach batana, Tabassum! 👑</h2><p>Aapke dil mein apne pati ke liye kitna pyaar hai?</p><div className="choices vertical">{["Bas thoda sa 😂","Kaafi zyada ❤️","Bahut hi zyada 🥰","Jitna lafzon mein bayaan na ho sake ❤️"].map(v=><button className={loveChoice===v?"choice active":"choice"} onClick={()=>setLoveChoice(v)}>{v}</button>)}</div><div className="inner">Tumhara pati tumse beinteha mohabbat karta hai, meri jaan, meri pyaari si parii jaisi biwi! ❤️🥰</div><button className="primary" onClick={next} disabled={!loveChoice}>CONTINUE ❤️</button></section>}

      {step===8 && <section className="panel"><Mail className="gold big"/><div className="eyebrow">SOME WORDS FROM MY HEART</div><h1>For my dearest Tabassum ❤️</h1>{letters.map(([title,body],i)=><div className="letter"><button className="letterhead" onClick={()=>setOpenLetters(a=>a.includes(i)?a.filter(x=>x!==i):[...a,i])}>{title}　{openLetters.includes(i)?"−":"＋"}</button>{openLetters.includes(i)&&<p>{body}</p>}</div>)}<button className="primary" onClick={next}>CONTINUE ❤️</button></section>}

      {step===9 && <section className="panel center"><div className="eyebrow">A BEAUTIFUL DUA 🤲</div><h1>Meri Tabassum ❤️</h1><p className="dua">Ya Allah, hamare rishte mein mohabbat, sukoon, barkat aur rehmat ata farma. Humein ek doosre ke liye behtareen humsafar bana, har mushkil mein ek doosre ka sahara bana aur hamare nikah ko khushiyon se bhar de. Aameen. ❤️</p><h3 className="gold">AAMEEN YA RABBAL AALAMEEN 🤲</h3><div className="inner">Main wada karta hoon ki har haal mein tumhara saath nibhaane ki koshish karunga. Tumhari muskurahat meri khushi aur tumhara sukoon meri dua rahega.</div><h2 className="gold">FOREVER & ALWAYS ❤️</h2><button className="primary" onClick={next}>CONTINUE ❤️</button></section>}

      {step===10 && <section className="panel"><div className="eyebrow">NOW IT'S YOUR TURN, TABASSUM</div><h1>Ab tumhare dil ki baari, meri jaan… ❤️</h1><label>Apne pati ko kuch kehna chahti ho?</label><textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Yahan apne dil ki baat likho… ❤️"/><label>Hamare rishte ko ek word mein describe karo.</label><div className="choices vertical">{["Mohabbat ❤️","Sukoon 🥰","Pagalpanti 😂","Forever 💍"].map(v=><button className={relationship===v?"choice active":"choice"} onClick={()=>setRelationship(v)}>{v}</button>)}</div><label>Apne pati ke liye koi special message?</label><textarea value={special} onChange={e=>setSpecial(e.target.value)} placeholder="Write your special message…"/><p className="muted">Aap kuch bhi skip kar sakti hain. Sirf wahi share karein jo aap chahein.</p><button className="primary" onClick={submit} disabled={sending}>{sending?"SENDING…":"SEND MY HEART ❤️"}</button>{sent&&<p className="gold">Thank you, Tabassum. ❤️ Your response has been submitted.</p>}</section>}

      {step>0 && <div className="nav"><button className="secondary" onClick={()=>setStep(s=>Math.max(1,s-1))}>BACK</button><span>{sections[step-1]}</span></div>}
    </main>
    <section className="countdown"><div className="eyebrow">COUNTING DOWN TO OUR BIG DAY 💍</div><div className="digits">{["days","hours","minutes","seconds"].map(k=><div><b>{countdown[k]??"00"}</b><small>{k.toUpperCase()}</small></div>)}</div><small>2 JANUARY 2027</small></section>
    <footer className="sitefoot">SHARIK-E-HAYAT ❤️ · Tumhara maasum makluq ❤️😂</footer>
    <audio id="jhol-audio" src="/jhol.mp3" loop preload="none" />
    <script />
  </div>;
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
