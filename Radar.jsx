import React, { useMemo, useState } from "react";

const tools = [
  { rank: 1, name: "ChatGPT", maker: "OpenAI", cat: "Assistants", score: 9.8, users: "300M+", tag: "Best overall", color: "linear-gradient(135deg,#12b981,#064e3b)", icon: "✦", price: "Freemium", affiliate: true },
  { rank: 2, name: "Claude", maker: "Anthropic", cat: "Assistants", score: 9.6, users: "100M+", tag: "Best for writing", color: "linear-gradient(135deg,#d97706,#7c2d12)", icon: "C", price: "Freemium", affiliate: true },
  { rank: 3, name: "Perplexity", maker: "Perplexity", cat: "Research", score: 9.4, users: "20M+", tag: "Best research", color: "linear-gradient(135deg,#22d3ee,#155e75)", icon: "P", price: "Freemium", affiliate: true },
  { rank: 4, name: "Midjourney", maker: "Midjourney", cat: "Image", score: 9.2, users: "20M+", tag: "Best images", color: "linear-gradient(135deg,#a78bfa,#312e81)", icon: "M", price: "Paid", affiliate: true },
  { rank: 5, name: "Cursor", maker: "Anysphere", cat: "Coding", score: 9.1, users: "1M+", tag: "Best for coding", color: "linear-gradient(135deg,#f8fafc,#475569)", icon: "⌘", price: "Freemium", affiliate: true },
  { rank: 6, name: "Runway", maker: "Runway", cat: "Video", score: 8.9, users: "10M+", tag: "Best video", color: "linear-gradient(135deg,#fb7185,#7f1d1d)", icon: "R", price: "Freemium", affiliate: true },
  { rank: 7, name: "ElevenLabs", maker: "ElevenLabs", cat: "Audio", score: 8.8, users: "10M+", tag: "Best voices", color: "linear-gradient(135deg,#fbbf24,#92400e)", icon: "11", price: "Freemium", affiliate: true },
  { rank: 8, name: "Notion AI", maker: "Notion", cat: "Productivity", score: 8.7, users: "100M+", tag: "Best workspace", color: "linear-gradient(135deg,#f3f4f6,#111827)", icon: "N", price: "Paid", affiliate: true }
];

const cats = ["All", "Assistants", "Research", "Image", "Video", "Coding", "Audio", "Productivity"];

export default function Radar() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("rank");
  const [saved, setSaved] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let list = tools.filter(t => (cat === "All" || t.cat === cat) &&
      (t.name + t.maker + t.cat).toLowerCase().includes(query.toLowerCase()));
    if (sort === "score") list = [...list].sort((a,b) => b.score-a.score);
    if (sort === "name") list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return showAll ? list : list.slice(0, 6);
  }, [query, cat, sort, showAll]);

  const toggleSave = (name) => setSaved(s => s.includes(name) ? s.filter(x => x !== name) : [...s, name]);

  return (
    <div className="app">
      <style>{`
        .app{min-height:100vh;background:radial-gradient(circle at 80% -10%,rgba(99,102,241,.18),transparent 32%),radial-gradient(circle at 10% 15%,rgba(14,165,233,.10),transparent 25%);}
        .nav{height:72px;border-bottom:1px solid #1d2028;display:flex;align-items:center;justify-content:space-between;padding:0 5vw;position:sticky;top:0;background:rgba(7,8,12,.78);backdrop-filter:blur(18px);z-index:10}
        .brand{font-weight:850;letter-spacing:-.05em;font-size:22px}.brand span{color:#818cf8}.navlinks{display:flex;gap:26px;color:#a6abb8;font-size:14px}.navlinks a:hover{color:#fff}.pill{border:1px solid #2b3040;background:#11131a;padding:9px 14px;border-radius:999px;font-size:13px}
        .hero{max-width:1180px;margin:0 auto;padding:92px 24px 46px;text-align:center}.eyebrow{display:inline-flex;gap:8px;align-items:center;padding:7px 11px;border:1px solid #272b3a;background:#10121a;border-radius:999px;color:#aeb4c2;font-size:12px}.dot{width:7px;height:7px;border-radius:50%;background:#34d399;box-shadow:0 0 16px #34d399}.hero h1{font-size:clamp(46px,7vw,86px);line-height:.94;letter-spacing:-.075em;margin:22px auto 18px;max-width:900px}.gradient{background:linear-gradient(90deg,#fff,#a5b4fc 45%,#67e8f9);-webkit-background-clip:text;background-clip:text;color:transparent}.hero p{max-width:680px;margin:0 auto;color:#9da3b2;font-size:18px;line-height:1.6}.search{max-width:720px;margin:30px auto 0;display:flex;background:#10121a;border:1px solid #292e3d;border-radius:18px;padding:7px;box-shadow:0 20px 70px rgba(0,0,0,.3)}.search input{flex:1;background:transparent;border:0;outline:0;color:#fff;padding:13px 15px;font-size:15px}.search button{border:0;border-radius:13px;background:#fff;color:#08090d;font-weight:750;padding:0 19px;cursor:pointer}
        .shell{max-width:1180px;margin:auto;padding:20px 24px 90px}.toolbar{display:flex;gap:10px;align-items:center;justify-content:space-between;margin:15px 0 18px;flex-wrap:wrap}.chips{display:flex;gap:8px;overflow:auto;padding-bottom:4px}.chip{white-space:nowrap;border:1px solid #252a36;background:#0e1016;color:#9ca3b1;padding:9px 13px;border-radius:999px;cursor:pointer}.chip.active{background:#fff;color:#090a0d;border-color:#fff}.select{background:#0e1016;color:#cbd0db;border:1px solid #252a36;border-radius:10px;padding:9px 12px}
        .table{border:1px solid #20242f;border-radius:20px;overflow:hidden;background:rgba(12,14,19,.72)}.thead,.row{display:grid;grid-template-columns:58px 2.1fr 1fr 110px 100px 44px;align-items:center}.thead{padding:13px 18px;color:#686f7f;font-size:11px;text-transform:uppercase;letter-spacing:.12em;background:#0d0f14}.row{padding:17px 18px;border-top:1px solid #1b1f29;transition:.2s}.row:hover{background:#11141b}.rank{color:#606777;font-size:13px}.tool{display:flex;gap:13px;align-items:center}.logo{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;font-weight:850;color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.16)}.toolname{font-weight:750}.maker{font-size:12px;color:#6f7583;margin-top:3px}.tag{display:inline-block;margin-top:5px;font-size:10px;color:#a5b4fc}.catname{color:#9ca3af;font-size:13px}.score{font-weight:800}.bar{width:64px;height:4px;background:#252936;border-radius:10px;margin-top:6px;overflow:hidden}.bar i{display:block;height:100%;background:linear-gradient(90deg,#818cf8,#22d3ee);border-radius:10px}.users{color:#8e95a4;font-size:13px}.save{border:0;background:transparent;color:#5f6675;cursor:pointer;font-size:20px}.save.on{color:#fbbf24}.empty{text-align:center;padding:50px;color:#777f90}.more{display:block;margin:22px auto 0;border:1px solid #2a2f3c;background:#11131a;color:#fff;border-radius:12px;padding:11px 18px;cursor:pointer}.trust{display:flex;gap:24px;justify-content:center;flex-wrap:wrap;color:#666d7c;font-size:12px;margin-top:30px}.trust b{color:#a5aab5}.section{margin-top:72px}.section h2{font-size:28px;letter-spacing:-.04em;margin:0 0 8px}.section p{color:#7f8796;margin:0 0 20px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.card{border:1px solid #20242f;border-radius:18px;padding:20px;background:#0d0f14}.card strong{font-size:15px}.card p{font-size:13px;line-height:1.55;margin:8px 0 0}.cta{margin-top:70px;border:1px solid #2a2e3d;border-radius:24px;padding:34px;background:linear-gradient(135deg,rgba(99,102,241,.13),rgba(34,211,238,.05));display:flex;justify-content:space-between;gap:20px;align-items:center}.cta h3{font-size:26px;margin:0 0 7px}.cta p{margin:0;color:#858c9b}.cta a{background:#fff;color:#08090d;padding:12px 17px;border-radius:12px;font-weight:750;white-space:nowrap}
        footer{border-top:1px solid #1d2028;padding:30px 5vw;color:#626978;font-size:12px;display:flex;justify-content:space-between}
        @media(max-width:800px){.navlinks{display:none}.hero{padding-top:65px}.thead{display:none}.row{grid-template-columns:34px 1fr 70px 36px}.row>.catname,.row>.users{display:none}.cards{grid-template-columns:1fr}.cta{display:block}.cta a{display:inline-block;margin-top:18px}.search button{padding:0 13px}.hero h1{font-size:52px}}
      `}</style>

      <nav className="nav">
        <a className="brand" href="#">AI <span>Radar</span></a>
        <div className="navlinks"><a href="#rankings">Rankings</a><a href="#categories">Categories</a><a href="#method">Methodology</a></div>
        <a className="pill" href="#newsletter">Get the weekly radar →</a>
      </nav>

      <header className="hero">
        <div className="eyebrow"><span className="dot"></span> Updated weekly · 1,200+ AI tools tracked</div>
        <h1>Find the <span className="gradient">right AI.</span><br/>Not the loudest one.</h1>
        <p>AI Radar cuts through the hype. Discover, compare and rank the tools that are actually worth your time and money.</p>
        <div className="search">
          <input aria-label="Search AI tools" placeholder="Search tools, categories, use cases…" value={query} onChange={e=>setQuery(e.target.value)} />
          <button onClick={()=>document.getElementById("rankings")?.scrollIntoView()}>Explore</button>
        </div>
        <div className="trust"><span><b>1,200+</b> tools indexed</span><span><b>42</b> categories</span><span><b>Weekly</b> updates</span><span><b>Independent</b> rankings</span></div>
      </header>

      <main className="shell">
        <section id="rankings">
          <div className="toolbar">
            <div className="chips">{cats.map(c=><button key={c} className={"chip "+(cat===c?"active":"")} onClick={()=>{setCat(c);setShowAll(false)}}>{c}</button>)}</div>
            <select className="select" value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="rank">Ranked</option><option value="score">Highest score</option><option value="name">A–Z</option>
            </select>
          </div>
          <div className="table">
            <div className="thead"><span>#</span><span>Tool</span><span>Category</span><span>Score</span><span>Reach</span><span></span></div>
            {filtered.length ? filtered.map(t=>
              <div className="row" key={t.name}>
                <span className="rank">#{t.rank}</span>
                <div className="tool"><div className="logo" style={{background:t.color}}>{t.icon}</div><div><div className="toolname">{t.name}</div><div className="maker">{t.maker} · {t.price}</div><div className="tag">{t.tag}</div></div></div>
                <span className="catname">{t.cat}</span>
                <span><span className="score">{t.score}</span><span className="bar"><i style={{width:(t.score/10*100)+"%"}} /></span></span>
                <span className="users">{t.users}</span>
                <button className={"save "+(saved.includes(t.name)?"on":"")} aria-label={"Save "+t.name} onClick={()=>toggleSave(t.name)}>{saved.includes(t.name)?"★":"☆"}</button>
              </div>
            ):<div className="empty">No tools found. Try another search or category.</div>}
          </div>
          {!showAll && filtered.length > 6 && <button className="more" onClick={()=>setShowAll(true)}>Show more tools</button>}
        </section>

        <section className="section" id="categories">
          <h2>Built around how you work.</h2>
          <p>Start with a job to be done, not a model name.</p>
          <div className="cards">
            {[
              ["⚡","Work faster","Automate repetitive work, summarize meetings and turn ideas into execution."],
              ["✍️","Create better","Writing, design, image, video and audio tools for creators and teams."],
              ["🧠","Think deeper","Research, analysis and reasoning tools for better decisions."]
            ].map(([i,h,p])=><article className="card" key={h}><div style={{fontSize:24,marginBottom:14}}>{i}</div><strong>{h}</strong><p>{p}</p></article>)}
          </div>
        </section>

        <section className="cta" id="newsletter">
          <div><h3>The 5-minute AI Radar.</h3><p>One email every Sunday: the best new tools, price drops and rankings worth knowing.</p></div>
          <a href="mailto:hello@airadar.example?subject=AI Radar newsletter">Join the radar →</a>
        </section>
      </main>

      <footer id="method"><span>© 2026 AI Radar</span><span>Rankings are editorial. Some links may be affiliate links.</span></footer>
    </div>
  );
}
