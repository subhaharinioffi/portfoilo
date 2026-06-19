"use client";

import { useState, useEffect } from "react";
import { Lock, Save, Plus, Trash2, ArrowLeft, Check, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("hero");
  const [data, setData] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ type: "", message: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch current portfolio data
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) {
          setData(json);
        }
      })
      .catch((err) => console.error("Error loading portfolio data:", err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === "admin123") {
      setIsAuthorized(true);
      setAuthError("");
    } else {
      setAuthError("Invalid passcode. Please try again.");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: "admin123", data }),
      });
      const json = await res.json();
      if (json.success) {
        setSaveStatus({ type: "success", message: "Portfolio saved successfully and synced with AI indexes!" });
        setTimeout(() => setSaveStatus({ type: "", message: "" }), 4000);
      } else {
        setSaveStatus({ type: "error", message: json.error || "Failed to save portfolio." });
      }
    } catch (err) {
      setSaveStatus({ type: "error", message: "Network error occurred. Try again." });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-bg dark:bg-bg-soft flex items-center justify-center p-6 text-espresso transition-colors duration-300">
        <div className="w-full max-w-md p-8 rounded-3xl glass border border-border-gold/30 shadow-2xl flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gold-cream dark:bg-gold-pale/10 border border-border-gold/30 flex items-center justify-center mb-6">
            <Lock className="w-7 h-7 text-gold-mid animate-float" />
          </div>
          <h1 className="font-display font-black text-2xl mb-2 tracking-tight">CMS Portal Access</h1>
          <p className="text-xs text-muted-text mb-8">Enter your passcode to manage projects, content, and credentials.</p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter Passcode (default: admin123)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl border border-border-gold/30 bg-bg-card dark:bg-bg-warm text-sm text-espresso focus:outline-none focus:border-gold font-sans placeholder-muted-text"
              required
            />
            {authError && (
              <div className="text-xs text-red-500 font-bold flex items-center gap-1.5 justify-center">
                <AlertCircle className="w-3.5 h-3.5" />
                {authError}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-mid to-gold-bright text-espresso font-bold text-xs tracking-wider uppercase shadow-gold hover:shadow-lg transition-all active:scale-95 cursor-pointer mt-2"
            >
              Unlock Dashboard
            </button>
          </form>
          
          <a
            href="/"
            className="mt-6 text-xs font-semibold text-gold-deep dark:text-gold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Live Portfolio
          </a>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-bg dark:bg-bg-soft flex items-center justify-center p-6 text-espresso">
        <span className="text-sm font-semibold tracking-wider animate-pulse">Initializing Database ...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-soft text-espresso p-4 md:p-8 flex flex-col items-center transition-colors duration-300">
      <div className="w-full max-w-6xl flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border-gold/25 pb-6">
          <div>
            <span className="text-[0.65rem] font-bold text-gold-deep dark:text-gold-bright bg-gold-cream dark:bg-gold-pale/10 border border-border-gold/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Administration
            </span>
            <h1 className="font-display font-black text-3xl md:text-4xl mt-2 tracking-tight">Portfolio CMS</h1>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsAuthorized(false)}
              className="px-5 py-3 rounded-xl border border-border-gold text-xs font-bold uppercase tracking-wider hover:bg-gold-cream/40 dark:hover:bg-gold-pale/10 transition-all cursor-pointer text-center flex-1 md:flex-none"
            >
              Lock CMS
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold via-gold-mid to-gold-bright font-bold text-xs tracking-wider uppercase shadow-gold hover:shadow-lg transition-all active:scale-95 cursor-pointer text-center flex-1 md:flex-none flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Save Status Notification */}
        {saveStatus.message && (
          <div className={`p-4 rounded-xl flex items-center gap-2 text-xs md:text-sm font-semibold border ${
            saveStatus.type === "success" 
              ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400" 
              : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
          }`}>
            {saveStatus.type === "success" ? <Check className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            {saveStatus.message}
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 border-b border-border-soft dark:border-border-theme/40 pb-2">
          {["hero", "about", "skills", "projects", "achievements", "experience", "contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-gold text-bg shadow"
                  : "text-muted-text hover:bg-gold-cream/35 dark:hover:bg-gold-pale/5 hover:text-espresso"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form Sections */}
        <div className="glass p-6 md:p-8 rounded-3xl border border-border-gold/15 shadow-xl bg-bg-card dark:bg-bg-soft">
          
          {/* Hero Tab */}
          {activeTab === "hero" && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-black text-lg border-b border-border-soft dark:border-border-theme/20 pb-2 text-gold-deep dark:text-gold-bright">Hero Section</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-text">Status Tag</label>
                  <input
                    type="text"
                    value={data.hero.label}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, label: e.target.value } })}
                    className="px-4 py-2.5 rounded-xl border border-border-soft dark:border-border-theme/20 bg-bg dark:bg-bg-warm text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-text">Name</label>
                  <input
                    type="text"
                    value={data.hero.name}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, name: e.target.value } })}
                    className="px-4 py-2.5 rounded-xl border border-border-soft dark:border-border-theme/20 bg-bg dark:bg-bg-warm text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-text">Typewriter Roles (Separate with Comma)</label>
                  <input
                    type="text"
                    value={data.hero.roles.join(", ")}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, roles: e.target.value.split(",").map(r => r.trim()) } })}
                    className="px-4 py-2.5 rounded-xl border border-border-soft dark:border-border-theme/20 bg-bg dark:bg-bg-warm text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-black text-lg border-b border-border-soft dark:border-border-theme/20 pb-2 text-gold-deep dark:text-gold-bright">About Section</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-text">Sub-heading</label>
                  <input
                    type="text"
                    value={data.about.subheading}
                    onChange={(e) => setData({ ...data, about: { ...data.about, subheading: e.target.value } })}
                    className="px-4 py-2.5 rounded-xl border border-border-soft dark:border-border-theme/20 bg-bg dark:bg-bg-warm text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-text">Secondary Title</label>
                  <input
                    type="text"
                    value={data.about.title}
                    onChange={(e) => setData({ ...data, about: { ...data.about, title: e.target.value } })}
                    className="px-4 py-2.5 rounded-xl border border-border-soft dark:border-border-theme/20 bg-bg dark:bg-bg-warm text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-text">SEO Main H2 Heading</label>
                  <input
                    type="text"
                    value={data.about.heading}
                    onChange={(e) => setData({ ...data, about: { ...data.about, heading: e.target.value } })}
                    className="px-4 py-2.5 rounded-xl border border-border-soft dark:border-border-theme/20 bg-bg dark:bg-bg-warm text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-text">Biography Text</label>
                  <textarea
                    value={data.about.biography}
                    onChange={(e) => setData({ ...data, about: { ...data.about, biography: e.target.value } })}
                    rows={5}
                    className="px-4 py-2.5 rounded-xl border border-border-soft dark:border-border-theme/20 bg-bg dark:bg-bg-warm text-sm focus:outline-none focus:border-gold leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-black text-lg border-b border-border-soft dark:border-border-theme/20 pb-2 text-gold-deep dark:text-gold-bright">Skills Categories</h2>
              <div className="flex flex-col gap-6">
                {data.skills.categories.map((cat, idx) => (
                  <div key={idx} className="p-4 border border-border-soft dark:border-border-theme/20 rounded-2xl flex flex-col gap-3 bg-bg/30 dark:bg-bg-warm/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.65rem] font-bold uppercase text-muted-text">Category Title</label>
                        <input
                          type="text"
                          value={cat.title}
                          onChange={(e) => {
                            const newCats = [...data.skills.categories];
                            newCats[idx].title = e.target.value;
                            setData({ ...data, skills: { ...data.skills, categories: newCats } });
                          }}
                          className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.65rem] font-bold uppercase text-muted-text">Lucide Icon Name</label>
                        <input
                          type="text"
                          value={cat.iconName}
                          onChange={(e) => {
                            const newCats = [...data.skills.categories];
                            newCats[idx].iconName = e.target.value;
                            setData({ ...data, skills: { ...data.skills, categories: newCats } });
                          }}
                          className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[0.65rem] font-bold uppercase text-muted-text">Chips (Separate with Comma)</label>
                      <input
                        type="text"
                        value={cat.chips.join(", ")}
                        onChange={(e) => {
                          const newCats = [...data.skills.categories];
                          newCats[idx].chips = e.target.value.split(",").map(c => c.trim()).filter(Boolean);
                          setData({ ...data, skills: { ...data.skills, categories: newCats } });
                        }}
                        className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-border-soft dark:border-border-theme/20 pb-2">
                <h2 className="font-display font-black text-lg text-gold-deep dark:text-gold-bright">Projects List</h2>
                <button
                  onClick={() => {
                    const newProj = {
                      name: "New Project",
                      category: "Web App",
                      desc: "Description of the project",
                      metrics: ["100% precision", "Sub-100ms API"],
                      github: "https://github.com/subhaharinioffi",
                      live: null
                    };
                    setData({ ...data, projects: { ...data.projects, items: [newProj, ...data.projects.items] } });
                  }}
                  className="px-4 py-2 bg-espresso text-bg hover:bg-gold-deep text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {data.projects.items.map((proj, idx) => (
                  <div key={idx} className="p-5 border border-border-gold/20 rounded-2xl flex flex-col gap-4 bg-bg/25 dark:bg-bg-warm/15 relative">
                    <button
                      onClick={() => {
                        const newItems = data.projects.items.filter((_, i) => i !== idx);
                        setData({ ...data, projects: { ...data.projects, items: newItems } });
                      }}
                      className="absolute top-4 right-4 p-2 rounded-lg text-red-500 hover:bg-red-500/10 active:scale-95 transition-all cursor-pointer"
                      aria-label="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.65rem] font-bold uppercase text-muted-text">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => {
                            const newItems = [...data.projects.items];
                            newItems[idx].name = e.target.value;
                            setData({ ...data, projects: { ...data.projects, items: newItems } });
                          }}
                          className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.65rem] font-bold uppercase text-muted-text">Category Tag</label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => {
                            const newItems = [...data.projects.items];
                            newItems[idx].category = e.target.value;
                            setData({ ...data, projects: { ...data.projects, items: newItems } });
                          }}
                          className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[0.65rem] font-bold uppercase text-muted-text">Description</label>
                      <textarea
                        value={proj.desc}
                        onChange={(e) => {
                          const newItems = [...data.projects.items];
                          newItems[idx].desc = e.target.value;
                          setData({ ...data, projects: { ...data.projects, items: newItems } });
                        }}
                        rows={2}
                        className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs leading-normal"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.65rem] font-bold uppercase text-muted-text">Metrics (Separate with Comma)</label>
                        <input
                          type="text"
                          value={proj.metrics.join(", ")}
                          onChange={(e) => {
                            const newItems = [...data.projects.items];
                            newItems[idx].metrics = e.target.value.split(",").map(m => m.trim()).filter(Boolean);
                            setData({ ...data, projects: { ...data.projects, items: newItems } });
                          }}
                          className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.65rem] font-bold uppercase text-muted-text">GitHub URL</label>
                        <input
                          type="text"
                          value={proj.github}
                          onChange={(e) => {
                            const newItems = [...data.projects.items];
                            newItems[idx].github = e.target.value;
                            setData({ ...data, projects: { ...data.projects, items: newItems } });
                          }}
                          className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-border-soft dark:border-border-theme/20 pb-2">
                <h2 className="font-display font-black text-lg text-gold-deep dark:text-gold-bright">Achievements List</h2>
                <button
                  onClick={() => {
                    const newAward = {
                      title: "New Award",
                      tag: "Winner",
                      desc: "Description of the competition",
                      img: null,
                      hasImage: false
                    };
                    setData({ ...data, achievements: { ...data.achievements, awards: [newAward, ...data.achievements.awards] } });
                  }}
                  className="px-4 py-2 bg-espresso text-bg hover:bg-gold-deep text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Award
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {data.achievements.awards.map((award, idx) => (
                  <div key={idx} className="p-4 border border-border-soft dark:border-border-theme/20 rounded-2xl flex flex-col gap-3 bg-bg/30 dark:bg-bg-warm/30 relative">
                    <button
                      onClick={() => {
                        const newAwards = data.achievements.awards.filter((_, i) => i !== idx);
                        setData({ ...data, achievements: { ...data.achievements, awards: newAwards } });
                      }}
                      className="absolute top-4 right-4 p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                      aria-label="Delete Award"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.65rem] font-bold uppercase text-muted-text">Competition Name</label>
                        <input
                          type="text"
                          value={award.title}
                          onChange={(e) => {
                            const newAwards = [...data.achievements.awards];
                            newAwards[idx].title = e.target.value;
                            setData({ ...data, achievements: { ...data.achievements, awards: newAwards } });
                          }}
                          className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.65rem] font-bold uppercase text-muted-text">Placement Tag</label>
                        <input
                          type="text"
                          value={award.tag}
                          onChange={(e) => {
                            const newAwards = [...data.achievements.awards];
                            newAwards[idx].tag = e.target.value;
                            setData({ ...data, achievements: { ...data.achievements, awards: newAwards } });
                          }}
                          className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.65rem] font-bold uppercase text-muted-text">Host Org / College</label>
                        <input
                          type="text"
                          value={award.desc}
                          onChange={(e) => {
                            const newAwards = [...data.achievements.awards];
                            newAwards[idx].desc = e.target.value;
                            setData({ ...data, achievements: { ...data.achievements, awards: newAwards } });
                          }}
                          className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-black text-lg border-b border-border-soft dark:border-border-theme/20 pb-2 text-gold-deep dark:text-gold-bright">Journey Details</h2>
              <div className="flex flex-col gap-6">
                
                {/* Timeline */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-text mb-3">Timeline Items</h3>
                  <div className="flex flex-col gap-4">
                    {data.experience.timeline.map((time, idx) => (
                      <div key={idx} className="p-4 border border-border-soft dark:border-border-theme/20 rounded-2xl flex flex-col gap-3 bg-bg/30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.65rem] font-bold uppercase text-muted-text">Timeline Dates</label>
                            <input
                              type="text"
                              value={time.date}
                              onChange={(e) => {
                                const newTime = [...data.experience.timeline];
                                newTime[idx].date = e.target.value;
                                setData({ ...data, experience: { ...data.experience, timeline: newTime } });
                              }}
                              className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.65rem] font-bold uppercase text-muted-text">Section Title</label>
                            <input
                              type="text"
                              value={time.title}
                              onChange={(e) => {
                                const newTime = [...data.experience.timeline];
                                newTime[idx].title = e.target.value;
                                setData({ ...data, experience: { ...data.experience, timeline: newTime } });
                              }}
                              className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.65rem] font-bold uppercase text-muted-text">Organization</label>
                            <input
                              type="text"
                              value={time.org}
                              onChange={(e) => {
                                const newTime = [...data.experience.timeline];
                                newTime[idx].org = e.target.value;
                                setData({ ...data, experience: { ...data.experience, timeline: newTime } });
                              }}
                              className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[0.65rem] font-bold uppercase text-muted-text">Description</label>
                          <input
                            type="text"
                            value={time.desc}
                            onChange={(e) => {
                              const newTime = [...data.experience.timeline];
                              newTime[idx].desc = e.target.value;
                              setData({ ...data, experience: { ...data.experience, timeline: newTime } });
                            }}
                            className="px-3 py-2 border border-border-soft dark:border-border-theme/20 rounded-xl bg-bg dark:bg-bg-warm text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-text mb-3">Certifications</h3>
                  <div className="flex flex-col gap-3">
                    {data.experience.certifications.map((cert, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 border border-border-soft rounded-2xl">
                        <div className="flex flex-col gap-1">
                          <label className="text-[0.65rem] font-bold uppercase text-muted-text">Certification Title</label>
                          <input
                            type="text"
                            value={cert.title}
                            onChange={(e) => {
                              const newCerts = [...data.experience.certifications];
                              newCerts[idx].title = e.target.value;
                              setData({ ...data, experience: { ...data.experience, certifications: newCerts } });
                            }}
                            className="px-3 py-2 border border-border-soft rounded-xl bg-bg text-xs"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[0.65rem] font-bold uppercase text-muted-text">Issuer Details</label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => {
                              const newCerts = [...data.experience.certifications];
                              newCerts[idx].issuer = e.target.value;
                              setData({ ...data, experience: { ...data.experience, certifications: newCerts } });
                            }}
                            className="px-3 py-2 border border-border-soft rounded-xl bg-bg text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-black text-lg border-b border-border-soft dark:border-border-theme/20 pb-2 text-gold-deep dark:text-gold-bright">Contact Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-text">Primary Email</label>
                  <input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })}
                    className="px-4 py-2.5 rounded-xl border border-border-soft dark:border-border-theme/20 bg-bg dark:bg-bg-warm text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-text">GitHub Link</label>
                  <input
                    type="text"
                    value={data.contact.github}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, github: e.target.value } })}
                    className="px-4 py-2.5 rounded-xl border border-border-soft dark:border-border-theme/20 bg-bg dark:bg-bg-warm text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-text">LinkedIn Link</label>
                  <input
                    type="text"
                    value={data.contact.linkedin}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, linkedin: e.target.value } })}
                    className="px-4 py-2.5 rounded-xl border border-border-soft dark:border-border-theme/20 bg-bg dark:bg-bg-warm text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* View Site Trigger */}
        <a
          href="/"
          className="self-center mt-4 text-xs font-bold text-muted-text hover:text-gold-deep flex items-center gap-1 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to live portfolio
        </a>

      </div>
    </div>
  );
}
