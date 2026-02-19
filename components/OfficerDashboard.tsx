/// <reference types="@types/google.maps" />
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Activity, Map as MapIcon, Zap, Settings, ClipboardList, Search, User, Clock, 
  MapPin, Leaf, Truck, CheckCircle, Layers, Box, Plus, Minus, Bell, ChevronDown, 
  X, LogOut, ShieldCheck, Smartphone, PanelLeftClose, PanelLeftOpen 
} from 'lucide-react';

type CaseStatus = 'To-do' | 'In Progress' | 'Completed';
type SubTab = 'Overview' | 'Settings' | 'Reports';
type ViewScale = 'City' | 'District' | 'Street' | 'Building';

interface IncidentLog { time: string; action: string; }
interface Resource { name: string; count: number; }

interface Case {
  id: string;
  title: string;
  location: string;
  status: CaseStatus;
  severity: 'High' | 'Medium' | 'Low';
  reportedBy: string;
  timestamp: string;
  imageUrls: string[];
  aiAnalysis: string;
  envImpact: string;
  position: { lat: number; lng: number };
  incidentLog: IncidentLog[];
  resources: Resource[];
  costEstimate: string;
}

interface OfficerDashboardProps {
  onLogout: () => void;
  userData: { email: string; dept: string } | null;
}

const OfficerDashboard: React.FC<OfficerDashboardProps> = ({ onLogout, userData }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('LP-A012406');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('Overview');
  const [activeScale, setActiveScale] = useState<ViewScale>('Street');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const markersRef = useRef<any>({});

  const [cases, setCases] = useState<Case[]>([
    {
      id: 'LP-A012406',
      title: 'Smart Lamp Failure',
      location: 'Raja Uda, Butterworth',
      status: 'To-do',
      severity: 'High',
      reportedBy: 'Citizen #829',
      timestamp: 'Reported 2 hours ago',
      imageUrls: [
        'https://c2.staticflickr.com/4/3618/3383458014_d7850bddb2_b.jpg',
        'https://i2-prod.kentlive.news/incoming/article8398468.ece/ALTERNATES/s1200d/0_Faulty-streetlights.jpg'
      ],
      aiAnalysis: 'Gemini identified capacitor bank failure. High risk of immediate segment collapse in grid zone 42.',
      envImpact: 'Early intervention prevents 45kg CO2 emission and minimizes localized light pollution.',
      position: { lat: 5.4320, lng: 100.3850 },
      incidentLog: [{ time: '10:30 AM', action: 'Case Opened' }, { time: '11:00 AM', action: 'AI Diagnosis Attached' }],
      resources: [{ name: 'Repair Crane', count: 1 }, { name: 'Field Tech', count: 2 }],
      costEstimate: '$1,200.00'
    },
    {
      id: 'LP-A012423',
      title: 'Road Structural Fissure',
      location: 'Jalan Ong Yi Hao, Penang',
      status: 'In Progress',
      severity: 'High',
      reportedBy: 'Citizen #102',
      timestamp: '45 mins ago',
      imageUrls: ['https://static.vecteezy.com/system/resources/previews/009/444/319/non_2x/paved-road-with-a-lot-of-holes-photo.jpg'],
      aiAnalysis: 'Subsurface erosion detected. Possible water main burst causing soil instability.',
      envImpact: 'Preventing 200L of clean water waste per hour.',
      position: { lat: 5.4410, lng: 100.3920 },
      incidentLog: [{ time: '09:00 PM', action: 'Team Dispatched' }],
      resources: [{ name: 'Excavator', count: 1 }],
      costEstimate: '$8,500.00'
    }
  ]);

  // 1. Initialize Hybrid Map
  useEffect(() => {
    if (mapRef.current && window.google?.maps && !mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 17,
        center: cases[0].position,
        mapTypeId: 'hybrid',
        disableDefaultUI: true,
      });
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, []);

  // 2. Map View Scale Logic (City -> Building)
  useEffect(() => {
    if (mapInstanceRef.current) {
      const zoomMap: Record<ViewScale, number> = { City: 12, District: 14, Street: 17, Building: 20 };
      mapInstanceRef.current.setZoom(zoomMap[activeScale]);
    }
  }, [activeScale]);

  // 3. Sync Markers (Fixed setMap scope)
  useEffect(() => {
    if (mapInstanceRef.current && window.google?.maps) {
      Object.values(markersRef.current).forEach((m: any) => { if (m && m.setMap) m.setMap(null); });
      markersRef.current = {};

      cases.forEach(c => {
        const marker = new window.google.maps.Marker({
          position: c.position,
          map: mapInstanceRef.current,
          animation: c.id === selectedCaseId ? window.google.maps.Animation.BOUNCE : undefined,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: c.severity === 'High' ? '#ef4444' : '#f59e0b',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: c.id === selectedCaseId ? 10 : 7,
          }
        });
        marker.addListener('click', () => setSelectedCaseId(c.id));
        markersRef.current[c.id] = marker;
      });

      const activeCase = cases.find(c => c.id === selectedCaseId);
      if (activeCase) mapInstanceRef.current.panTo(activeCase.position);
    }
  }, [selectedCaseId, cases]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const updateCaseStatus = (status: CaseStatus) => {
    setCases(prev => prev.map(c => c.id === selectedCaseId ? { ...c, status } : c));
    setShowStatusDropdown(false);
  };

  const handleGlobalSearch = () => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return;

    const matchedCase = cases.find(c =>
      c.id.toLowerCase().includes(keyword) ||
      c.title.toLowerCase().includes(keyword) ||
      c.location.toLowerCase().includes(keyword)
    );

    if (matchedCase) {
      setSelectedCaseId(matchedCase.id);
      setActiveScale('Street');
      mapInstanceRef.current?.panTo(matchedCase.position);
      return;
    }

    if (!geocoderRef.current || !mapInstanceRef.current) return;

    geocoderRef.current.geocode({ address: searchQuery.trim() }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        mapInstanceRef.current?.setCenter(results[0].geometry.location);
        mapInstanceRef.current?.setZoom(16);
      }
    });
  };

  const handleZoomIn = () => {
    if (!mapInstanceRef.current) return;
    const currentZoom = mapInstanceRef.current.getZoom() ?? 17;
    mapInstanceRef.current.setZoom(Math.min(currentZoom + 1, 21));
  };

  const handleZoomOut = () => {
    if (!mapInstanceRef.current) return;
    const currentZoom = mapInstanceRef.current.getZoom() ?? 17;
    mapInstanceRef.current.setZoom(Math.max(currentZoom - 1, 3));
  };

  // Status Color Mapping defined inside component scope
  const statusColors = {
    'To-do': 'text-red-400 bg-red-500/20 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]',
    'In Progress': 'text-amber-400 bg-amber-500/20 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    'Completed': 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
  };

  if (!userData) return <div className="fixed inset-0 bg-black flex items-center justify-center text-white/40 uppercase tracking-[0.5em] text-xs">Authenticating Hub...</div>;

  return (
    <div className="fixed inset-0 bg-[#020202] text-[#f5f5f7] font-sans overflow-hidden flex flex-col selection:bg-blue-500/30">
      
      {/* Profile Settings Overlay */}
      <AnimatePresence>
        {showProfileSettings && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/60 backdrop-blur-3xl"
            onClick={() => setShowProfileSettings(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg vision-glass rounded-[50px] p-10 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowProfileSettings(false)} className="absolute top-8 right-8 w-10 h-10 rounded-full vision-glass flex items-center justify-center text-white/30 hover:text-white"><X className="w-5 h-5" /></button>
              <div className="flex flex-col items-center mb-10">
                <div className="w-24 h-24 rounded-full bg-white/5 p-1 mb-6 border border-white/10 shadow-2xl">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`} className="w-full h-full rounded-full bg-black" alt="Officer" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-1">{userData.email.split('@')[0].toUpperCase()}</h3>
                <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em]">{userData.dept} Intelligence Unit</p>
              </div>
              <div className="space-y-4">
                {[{ icon: <User className="w-5" />, label: "Personal Information" }, { icon: <ShieldCheck className="w-5" />, label: "Security & Credentials" }, { icon: <Bell className="w-5" />, label: "Notification Layers" }, { icon: <Smartphone className="w-5" />, label: "Device Management" }].map((item, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between p-5 vision-glass rounded-[28px] border border-white/5 hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-4"><div className="text-white/30 group-hover:text-white">{item.icon}</div><span className="text-[12px] font-bold">{item.label}</span></div>
                    <ChevronDown className="w-4 h-4 text-white/10 -rotate-90" />
                  </button>
                ))}
              </div>
              <button onClick={onLogout} className="w-full mt-10 py-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-[28px] text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-red-500/20 transition-all"><LogOut className="w-4 h-4" /> Sign Out from Core</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HEADER (High Visibility Search Bar) */}
      <header className="h-24 flex items-center justify-between px-10 z-[100] relative">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 vision-glass rounded-[18px] flex items-center justify-center shadow-2xl"><Activity className="w-6 h-6 text-blue-500" /></div>
             <h1 className="text-sm font-black uppercase tracking-[0.2em] text-white/90 leading-none">UPI Commander Center</h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-4 vision-glass rounded-full px-6 py-2.5 border border-white/30 bg-white/10 focus-within:border-blue-500 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
            <button onClick={handleGlobalSearch} className="text-white/60 hover:text-white transition-colors" aria-label="Run global search">
              <Search className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleGlobalSearch();
                }
              }}
              placeholder="Global Search..."
              className="bg-transparent border-none outline-none text-[11px] w-56 text-white placeholder:text-white/30"
            />
          </div>
        </div>

        <nav className="vision-glass px-2 py-2 rounded-full flex items-center gap-2 border border-white/10 shadow-inner">
          {(['City', 'District', 'Street', 'Building'] as ViewScale[]).map((scale) => (
            <button key={scale} onClick={() => setActiveScale(scale)} className={`px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-500 ${activeScale === scale ? 'text-black bg-white shadow-xl' : 'text-white/40 hover:text-white/70'}`}>{scale}</button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
           <div className="text-right"><p className="text-[12px] font-bold tracking-tight text-white/90">{currentTime.toLocaleTimeString().toUpperCase()}</p><p className="text-[9px] opacity-20 uppercase font-black tracking-widest">Penang Sector</p></div>
           <button onClick={() => setShowProfileSettings(true)} className="w-12 h-12 rounded-full vision-glass p-0.5 border border-white/20 hover:scale-110 transition-transform shadow-2xl overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`} className="w-full h-full rounded-full bg-black" alt="Profile" />
           </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden p-6 gap-6 relative">
        
        {/* 2. LEFT INTELLIGENCE PANEL (Fully Restored Detail Analysis) */}
        <motion.aside animate={{ width: isPanelCollapsed ? 80 : 440 }} className="vision-glass rounded-[50px] overflow-hidden flex flex-col z-[150] shadow-3xl relative">
          <button onClick={() => setIsPanelCollapsed(!isPanelCollapsed)} className="absolute top-1/2 -right-4 w-8 h-20 vision-glass rounded-full flex items-center justify-center border border-white/10 z-[160] hover:bg-white/10 transition-all">{isPanelCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}</button>

          {!isPanelCollapsed && (
            <div className="flex flex-col h-full">
              <div className="flex p-4 border-b border-white/5 gap-2 bg-white/5">
                {(['Overview', 'Settings', 'Reports'] as SubTab[]).map((tab) => (
                  <button key={tab} onClick={() => setActiveSubTab(tab)} className={`flex-1 py-3 rounded-[24px] text-[10px] font-bold uppercase tracking-widest transition-all ${activeSubTab === tab ? 'bg-white text-black shadow-2xl' : 'text-white/20 hover:bg-white/5'}`}>{tab}</button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">
                <AnimatePresence mode="wait">
                  {activeSubTab === 'Overview' && (
                    <motion.div key="ov" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-10">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em]">{selectedCase.id}</span>
                        <div className="relative">
                          <button onClick={() => setShowStatusDropdown(!showStatusDropdown)} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase border transition-all hover:scale-105 active:scale-95 flex items-center gap-2 ${statusColors[selectedCase.status]}`}>{selectedCase.status} <ChevronDown className="w-3.5" /></button>
                          <AnimatePresence>
                            {showStatusDropdown && (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-3 vision-glass p-2 rounded-3xl w-44 z-[200] border border-white/10 shadow-2xl">
                                {(['To-do', 'In Progress', 'Completed'] as CaseStatus[]).map(s => (
                                  <button key={s} onClick={() => updateCaseStatus(s)} className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 rounded-2xl transition-colors">{s}</button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <header>
                        <h2 className="text-3xl font-black mb-4 leading-none tracking-tight">{selectedCase.title}</h2>
                        <div className="space-y-2 opacity-40 text-[10px] font-black uppercase tracking-widest">
                           <p className="flex items-center gap-2"><User className="w-3 h-3" /> {selectedCase.reportedBy}</p>
                           <p className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {selectedCase.location}</p>
                        </div>
                      </header>

                      <section className="space-y-4">
                        <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">AI Synthesis Core</h3>
                        <div className="vision-glass border-blue-500/20 rounded-[32px] p-8 relative">
                          <div className="absolute top-8 left-0 w-1 h-12 bg-blue-500 shadow-[0_0_15px_#3b82f6] rounded-r-full" />
                          <div className="flex items-center gap-3 mb-4 text-blue-400 font-black text-[10px] uppercase tracking-widest"><Zap className="w-4 h-4" /> Gemini Prediction Core</div>
                          <p className="text-[13px] text-white/80 font-medium leading-relaxed italic">"{selectedCase.aiAnalysis}"</p>
                        </div>
                      </section>

                      <section className="space-y-5">
                        <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Visual Matrix</h3>
                        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
                          {selectedCase.imageUrls.map((u, i) => <img key={i} src={u} className="w-64 h-40 object-cover rounded-[32px] border border-white/10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700 shadow-2xl flex-shrink-0" alt="Proof" />)}
                        </div>
                      </section>

                      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[36px] p-8 shadow-inner">
                         <div className="flex items-center gap-3 mb-4 text-emerald-400 font-black text-[10px] uppercase tracking-widest"><Leaf className="w-4 h-4" /> Environmental Impact Score</div>
                         <p className="text-[12px] text-emerald-100/60 font-bold leading-relaxed">{selectedCase.envImpact}</p>
                      </div>
                    </motion.div>
                  )}

                  {activeSubTab === 'Settings' && (
                    <motion.div key="st" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-10">
                      <div>
                        <label className="text-[9px] uppercase opacity-30 font-black mb-3 block ml-4">Deployment Unit</label>
                        <select className="w-full vision-glass p-5 rounded-[24px] text-xs font-bold outline-none border border-white/10 cursor-pointer hover:border-blue-500/40">
                           <option>Electrical Response Alpha</option>
                           <option>Road Maintenance Div-2</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between p-6 vision-glass rounded-[28px] border border-white/5">
                         <span className="text-[10px] font-black uppercase tracking-widest">Active Notifications</span>
                         <button className="w-12 h-6 bg-blue-600 rounded-full relative shadow-[0_0_10px_#3b82f6]"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"/></button>
                      </div>
                      <textarea placeholder="Field operational notes..." className="w-full h-40 vision-glass p-8 rounded-[32px] text-xs font-medium border border-white/5 outline-none resize-none focus:border-blue-500/30" />
                    </motion.div>
                  )}

                  {activeSubTab === 'Reports' && (
                    <motion.div key="rp" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-12">
                      <div className="space-y-8 relative ml-6">
                        <div className="absolute top-0 left-0 w-px h-full bg-white/10" />
                         {selectedCase.incidentLog.map((log, i) => (
                           <div key={i} className="relative pl-10">
                             <div className="absolute top-1.5 -left-[3px] w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                             <p className="text-[9px] opacity-30 uppercase font-black mb-1">{log.time}</p>
                             <p className="text-[12px] font-bold text-white/80">{log.action}</p>
                           </div>
                         ))}
                      </div>
                      <div className="p-8 vision-glass rounded-[36px] border border-blue-500/10 shadow-3xl">
                         <p className="text-[9px] uppercase text-blue-500 font-black mb-2 tracking-[0.2em]">Live Cost Projection</p>
                         <h4 className="text-3xl font-black">{selectedCase.costEstimate}</h4>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-10 bg-black/60 backdrop-blur-3xl border-t border-white/5 grid grid-cols-2 gap-5 z-30">
                  <button className="py-5 bg-white text-black rounded-[28px] text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.03] transition-all">Dispatch</button>
                  <button className="py-5 vision-glass border border-white/10 rounded-[28px] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">Close Entry</button>
              </div>
            </div>
          )}
        </motion.aside>

        {/* 3. CENTER SECTION (Hybrid Map Layer) */}
        <section className="flex-1 relative rounded-[50px] overflow-hidden vision-glass z-10 border-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
           <div ref={mapRef} className="absolute inset-0 z-0" />
           <div className="absolute top-10 right-10 flex flex-col gap-5 z-[50]">
              <button className="w-16 h-16 vision-glass rounded-[28px] flex items-center justify-center hover:bg-white/10 border border-white/10 shadow-3xl active:scale-90 transition-all"><Box className="w-5 h-5 text-white/70" /></button>
              <button className="w-16 h-16 vision-glass rounded-[28px] flex items-center justify-center hover:bg-white/10 border border-white/10 shadow-3xl active:scale-90 transition-all"><Layers className="w-5 h-5 text-white/70" /></button>
              <button onClick={handleZoomIn} className="w-16 h-16 vision-glass rounded-[28px] flex items-center justify-center hover:bg-white/10 border border-white/10 shadow-3xl active:scale-90 transition-all"><Plus className="w-5 h-5 text-white/70" /></button>
              <button onClick={handleZoomOut} className="w-16 h-16 vision-glass rounded-[28px] flex items-center justify-center hover:bg-white/10 border border-white/10 shadow-3xl active:scale-90 transition-all"><Minus className="w-5 h-5 text-white/70" /></button>
           </div>
        </section>

        {/* 4. BOTTOM SECTION (Incident Queue) */}
        <motion.section animate={{ left: isPanelCollapsed ? 120 : 500 }} className="absolute bottom-10 right-12 h-44 z-[100] pointer-events-none">
           <div className="w-full h-full flex gap-6 overflow-x-auto pb-6 no-scrollbar items-center px-4 pointer-events-auto">
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {setSelectedCaseId(c.id); setIsPanelCollapsed(false);}}
                  className={`flex-shrink-0 w-80 h-[125px] vision-glass rounded-[40px] p-8 text-left transition-all duration-500 ${selectedCaseId === c.id ? 'border-white/40 bg-white/15 scale-105 shadow-[0_30px_60px_rgba(0,0,0,0.8)]' : 'border-white/5 opacity-40 hover:opacity-100 hover:scale-[1.02]'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${c.severity === 'High' ? 'bg-red-500 animate-pulse shadow-[0_0_10px_red]' : 'bg-amber-500 shadow-[0_0_10px_orange]'}`} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{c.id}</span>
                    </div>
                    <span className="text-[8px] opacity-40 font-black uppercase tracking-widest">{c.status}</span>
                  </div>
                  <h4 className="text-[13px] font-black mb-1 truncate text-white tracking-tight">{c.title}</h4>
                  <p className="text-[9px] opacity-30 truncate uppercase tracking-tighter"><MapPin className="w-3 h-3 inline mr-1" /> {c.location}</p>
                </button>
              ))}
           </div>
        </motion.section>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .vision-glass {
            background: rgba(15, 15, 15, 0.4);
            backdrop-filter: blur(50px) saturate(210%);
            -webkit-backdrop-filter: blur(50px) saturate(210%);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
        }
      `}</style>
    </div>
  );
};

export default OfficerDashboard;