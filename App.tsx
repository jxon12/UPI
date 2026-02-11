import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BuildingSilhouette from './components/BuildingSilhouette';
import { BuildingType, Page, NearbyIssue, Tab } from './types';

const MY_REPORTS: NearbyIssue[] = [
  { id: '101', title: 'Pothole on Jalan Penang', status: 'In Progress', distance: '120m', color: '#FBBC05', date: 'Oct 24, 2024' },
  { id: '102', title: 'Fallen Tree Branch', status: 'Fixed', distance: '2.1km', color: '#34A853', date: 'Oct 20, 2024' },
  { id: '103', title: 'Graffiti on Heritage Wall', status: 'Pending', distance: '800m', color: '#EA4335', date: 'Oct 25, 2024' },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.MAP);
  const [activeFilter, setActiveFilter] = useState<'todo' | 'progress' | 'done'>('progress');
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (currentPage === Page.DASHBOARD && activeTab === Tab.MAP) {
      setIsLocating(true);
      const timer = setTimeout(() => setIsLocating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentPage, activeTab]);

  // --- Sub-Components ---

  const MapView = () => (
    <div className="relative h-full w-full">
      {/* Background Map Simulation */}
      <div className="absolute inset-0 z-0 bg-[#eef0f3]">
        <motion.div 
          animate={isLocating ? { scale: [1, 1.2, 1.1], opacity: [0.3, 0.5, 0.4] } : { scale: 1.1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="w-full h-full bg-[url('https://api.placeholder.com/1200x800')] bg-cover grayscale-[0.4]"
        >
          <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
            <pattern id="grid-map-v6" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="black" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-map-v6)" />
          </svg>
        </motion.div>
        {/* Pulsing Dot */}
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-5 h-5 bg-[#4285F4] rounded-full border-2 border-white shadow-2xl relative z-10"></div>
            <motion.div animate={{ scale: [1, 3], opacity: [0.6, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute inset-0 bg-[#4285F4] rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Top Location Pill */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="backdrop-blur-xl bg-white/40 rounded-full px-5 py-3.5 flex items-center gap-3 border border-white/40 shadow-xl">
           <span className="text-lg">📍</span>
           <div className="flex flex-col">
              <span className="text-[9px] font-bold text-black/30 uppercase tracking-[0.2em] leading-none mb-0.5">Active Location</span>
              <span className="text-sm font-bold text-black/80">Bayan Lepas, Penang</span>
           </div>
        </motion.div>
      </div>

      {/* Hero Scan Button (Above Nav) */}
      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 w-full px-6 flex justify-center">
        <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-[#EA4335] via-[#4285F4] to-[#34A853] shadow-2xl">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-16 px-10 bg-white/90 backdrop-blur-2xl rounded-full flex items-center justify-center gap-4 border border-white/20"
          >
            <svg className="w-6 h-6 text-[#4285F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <circle cx="12" cy="13" r="3" strokeWidth="2.5" />
            </svg>
            <span className="text-lg font-bold text-gray-800 tracking-tight">Scan Issue</span>
          </motion.button>
        </div>
      </div>
    </div>
  );

  const ActivitiesView = () => (
    <div className="relative h-full w-full overflow-y-auto px-6 pt-24 pb-32">
      <div className="max-w-xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#1d1d1f] tracking-tight mb-2">My Contributions</h2>
          <p className="text-sm text-black/40 font-medium italic">Your voice is shaping the city.</p>
        </div>

        {/* Segmented Control */}
        <div className="glass p-1.5 rounded-2xl flex border border-white/60">
          {(['todo', 'progress', 'done'] as const).map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all ${activeFilter === filter ? 'bg-white shadow-sm text-[#4285F4]' : 'text-black/30'}`}
            >
              {filter === 'todo' ? 'To-do' : filter === 'progress' ? 'In Progress' : 'Completed'}
            </button>
          ))}
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {MY_REPORTS.filter(r => (activeFilter === 'progress' && r.status === 'In Progress') || (activeFilter === 'todo' && r.status === 'Pending') || (activeFilter === 'done' && r.status === 'Fixed')).map(report => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={report.id}
              className="glass p-5 rounded-3xl border border-white shadow-sm flex items-center justify-between group hover:bg-white/40 transition-all"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/50 border border-white">
                   <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: report.color }}></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-800">{report.title}</span>
                  <span className="text-[10px] font-bold text-black/20 uppercase tracking-widest">{report.date}</span>
                </div>
              </div>
              <svg className="w-4 h-4 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="relative h-full w-full overflow-y-auto px-6 pt-24 pb-32">
      <div className="max-w-xl mx-auto space-y-10">
        <div className="flex items-center gap-5">
           <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 via-blue-500 to-green-400 border-[3px] border-white shadow-2xl" />
           <div className="flex flex-col">
             <h3 className="text-2xl font-bold text-gray-900">Ahmad Razif</h3>
             <p className="text-sm font-medium text-black/40">Level 4 Civic Advocate</p>
           </div>
        </div>

        <div className="space-y-4">
          <span className="text-[10px] font-extrabold text-black/20 uppercase tracking-[0.2em] px-2">Account Preferences</span>
          <div className="glass rounded-[32px] border border-white overflow-hidden divide-y divide-white/20">
            {[
              { icon: '👤', label: 'Personal Information' },
              { icon: '🔔', label: 'Notifications' },
              { icon: '🛡️', label: 'Privacy & Security' },
              { icon: '🌐', label: 'Language & Locale' },
              { icon: '🚪', label: 'Logout', red: true },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-5 hover:bg-white/30 transition-all text-left">
                <div className="flex items-center gap-4">
                  <span className="text-xl">{item.icon}</span>
                  <span className={`text-sm font-bold ${item.red ? 'text-red-500' : 'text-gray-700'}`}>{item.label}</span>
                </div>
                <svg className="w-4 h-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full font-['Inter'] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <AnimatePresence>
        {currentPage === Page.LANDING && (
          <div className="fixed bottom-0 left-0 right-0 flex items-end justify-around px-8 opacity-20 pointer-events-none z-0">
            <BuildingSilhouette type={BuildingType.TRX} delay={0.5} />
            <BuildingSilhouette type={BuildingType.TWIN_TOWERS} delay={0.7} />
            <BuildingSilhouette type={BuildingType.MENARA_KL} delay={0.9} />
            <BuildingSilhouette type={BuildingType.WARISAN_MERDEKA} delay={1.1} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* LANDING PAGE */}
        {currentPage === Page.LANDING && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative z-10 flex flex-col items-center px-4 pt-24 min-h-screen w-full">
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
              <div className="glass rounded-full px-5 py-2.5 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-4">
                  <span className="font-black text-xl tracking-tighter text-[#1d1d1f]">UPI</span>
                  <div className="flex gap-4 text-[13px] font-bold text-black/70">
                    <a href="#" className="hover:text-[#007AFF] transition-all">About Us</a>
                    <a href="#" className="hover:text-[#007AFF] transition-all">Guide</a>
                  </div>
                </div>
                <button onClick={() => setCurrentPage(Page.LOGIN)} className="bg-white px-5 py-1.5 rounded-full text-[12px] font-bold text-[#007AFF] shadow-lg border border-blue-50/50 hover:bg-blue-50 transition-colors">Join</button>
              </div>
            </nav>
            
            {/* Hero Content */}
            <section className="text-center pt-12 max-w-2xl px-6 flex flex-col items-center">
              <h1 className="text-5xl md:text-7xl font-extrabold text-[#1d1d1f] mb-6 leading-tight">See Your City <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-[#5856D6]">Clearly.</span></h1>
              <p className="text-lg text-black/50 font-medium mb-12">Report infrastructure issues in seconds with spatial AI. Together, we prioritize what matters most to your community.</p>
              
              {/* Phone Mockup Illustration */}
              <div className="glass-dark w-64 h-96 rounded-[48px] border-white/50 shadow-2xl flex flex-col p-4 mb-20">
                 <div className="w-16 h-4 bg-black/5 rounded-full self-center mb-6" />
                 <div className="flex-1 bg-white/30 rounded-[32px] relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                       <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
                       <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20" />
                    </div>
                 </div>
              </div>
            </section>

            {/* Value Props Section */}
            <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mb-24">
              {[
                { title: "Snap & Report", desc: "No long forms. Just a photo and location. Our AI does the rest." },
                { title: "Real-time Hub", desc: "Track every report from submission to completion on a live city map." },
                { title: "Community Impact", desc: "Your data directly influences local budget and priority lists." }
              ].map((prop, i) => (
                <div key={i} className="glass p-8 rounded-[32px] border border-white hover:bg-white/30 transition-all group">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-500 group-hover:text-white transition-all text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{prop.title}</h3>
                  <p className="text-sm font-medium text-black/40 leading-relaxed">{prop.desc}</p>
                </div>
              ))}
            </section>

            {/* Footer Section */}
            <footer className="w-full max-w-5xl px-6 py-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center md:items-start">
                <span className="font-black text-xl text-black/80 mb-2 tracking-tighter">UPI MALAYSIA</span>
                <p className="text-[12px] font-bold text-black/30 uppercase tracking-widest">© 2024 Spatial Clarity Platform</p>
              </div>
              <div className="flex gap-8 text-[12px] font-bold text-black/40 uppercase tracking-widest">
                <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Support</a>
                <a href="#" className="hover:text-blue-500 transition-colors">API</a>
              </div>
            </footer>
          </motion.div>
        )}

        {/* REFINED LOGIN PAGE */}
        {currentPage === Page.LOGIN && (
          <motion.div key="login" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="relative min-h-screen flex items-center justify-center px-6">
             <button onClick={() => setCurrentPage(Page.LANDING)} className="fixed top-8 left-8 glass w-12 h-12 rounded-full flex items-center justify-center shadow-lg active:scale-90"><svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg></button>
             <div className="glass w-full max-w-4xl min-h-[580px] rounded-[64px] border-white/80 shadow-2xl grid md:grid-cols-2 overflow-hidden">
                <div className="p-16 flex flex-col items-center justify-center space-y-12 text-center bg-white/20">
                   <div className="relative">
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-tr from-red-400 via-blue-500 to-green-400 rounded-full blur-[80px]" />
                      <svg width="120" height="150" viewBox="0 0 150 180" className="relative drop-shadow-2xl">
                        <path d="M75 5C39.1 5 10 34.1 10 70C10 85 20 100 35 120L75 90V5Z" fill="#EA4335" />
                        <path d="M75 5V90L115 120C130 100 140 85 140 70C140 34.1 110.9 5 75 5Z" fill="#4285F4" />
                        <path d="M75 175L115 120L75 90V175Z" fill="#34A853" />
                        <path d="M75 175V90L35 120L75 175Z" fill="#FBBC05" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M75 105L70.5 100.9C54.4 86.3 43.8 76.7 43.8 65C43.8 55.5 51.2 48.1 60.6 48.1C66 48.1 71.1 50.6 74.4 54.5C77.6 50.6 82.8 48.1 88.1 48.1C97.6 48.1 105 55.5 105 65C105 76.7 94.4 86.3 78.3 100.9L75 105Z" fill="white" />
                      </svg>
                   </div>
                   <h3 className="text-xl font-bold text-black/60 tracking-[0.2em] uppercase">Your Voice. Your City.</h3>
                </div>
                <div className="p-16 flex flex-col justify-center space-y-12 border-l border-white">
                   <div className="space-y-4">
                      <h2 className="text-5xl font-extrabold text-[#1d1d1f] tracking-tight">Hello,<br/>Welcome.</h2>
                      <p className="text-lg font-medium text-black/40">Sign in to start your civic journey.</p>
                   </div>
                   <button onClick={() => setCurrentPage(Page.DASHBOARD)} className="w-full bg-white px-8 py-4 rounded-full border border-white shadow-xl flex items-center justify-center gap-4 hover:shadow-2xl transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                      <span className="text-base font-bold text-gray-700">Continue with Google</span>
                   </button>
                </div>
             </div>
          </motion.div>
        )}

        {/* MAIN DASHBOARD STRUCTURE */}
        {currentPage === Page.DASHBOARD && (
          <motion.div key="dashboard-main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-screen w-full relative overflow-hidden bg-[#f8f9fa]">
            
            {/* CONTENT AREA */}
            <div className="h-full w-full">
              <AnimatePresence mode="wait">
                {activeTab === Tab.MAP && (
                  <motion.div key="map-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full">
                    <MapView />
                  </motion.div>
                )}
                {activeTab === Tab.ACTIVITIES && (
                  <motion.div key="activities-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full w-full">
                    <ActivitiesView />
                  </motion.div>
                )}
                {activeTab === Tab.SETTINGS && (
                  <motion.div key="settings-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full w-full">
                    <SettingsView />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PREMIUM BOTTOM NAV BAR */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-md:max-w-[calc(100%-2rem)] max-w-md">
              <div className="backdrop-blur-2xl bg-white/70 rounded-[32px] border border-white/80 shadow-2xl p-2.5 flex items-center justify-around">
                <button onClick={() => setActiveTab(Tab.MAP)} className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all ${activeTab === Tab.MAP ? 'bg-[#4285F4]/10 text-[#4285F4]' : 'text-black/20 hover:text-black/40'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" strokeWidth="2.5" /></svg>
                  <span className="text-[9px] font-bold uppercase tracking-wider">Map</span>
                </button>

                <button onClick={() => setActiveTab(Tab.ACTIVITIES)} className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all ${activeTab === Tab.ACTIVITIES ? 'bg-[#4285F4]/10 text-[#4285F4]' : 'text-black/20 hover:text-black/40'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  <span className="text-[9px] font-bold uppercase tracking-wider">Reports</span>
                </button>

                <button onClick={() => setActiveTab(Tab.SETTINGS)} className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all ${activeTab === Tab.SETTINGS ? 'bg-[#4285F4]/10 text-[#4285F4]' : 'text-black/20 hover:text-black/40'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  <span className="text-[9px] font-bold uppercase tracking-wider">Settings</span>
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
