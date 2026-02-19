/// <reference types="@types/google.maps" />
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface ReportPageProps {
  onLogout: () => void;
}

type ViewState = 'map' | 'nearby' | 'history';
type ReportStatus = 'todo' | 'progress' | 'completed';

interface ReportItem {
  id: string;
  title: string;
  location: string;
  distance?: string;
  status: ReportStatus;
  category: string;
  severity: 'High' | 'Medium' | 'Low';
  eta: string;
  analysis: string;
  envImpact: string;
  imageUrl: string;
  timestamp: string;
}

const ReportPage: React.FC<ReportPageProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState<ViewState>('map');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);
  const [showFlash, setShowFlash] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<{ category: string; severity: string; text: string } | null>(null);
  const [currentLocation, setCurrentLocation] = useState("Damansara, Kuala Lumpur");
  const [historyFilter, setHistoryFilter] = useState<ReportStatus | 'all'>('all');
  const [nearbyFilter, setNearbyFilter] = useState<string>('All');
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // Initialize Map
  useEffect(() => {
    if (mapRef.current && window.google?.maps && !mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: { lat: 3.1390, lng: 101.6869 },
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1a1a1c" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2c2e" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#001220" }] },
        ],
        disableDefaultUI: true,
      });
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, []);

  // Mock Data
  const nearbyReports: ReportItem[] = [
    {
      id: 'n1',
      title: "Pothole Anomaly",
      location: "Jalan Beringin (250m)",
      status: 'progress',
      category: "Roads",
      severity: 'High',
      eta: "12h to fix",
      analysis: "Sub-surface erosion detected. High risk of expansion during rain. Immediate detour suggested.",
      envImpact: "Early repair saves 40% in asphalt waste and prevents chemical runoff into local drains.",
      imageUrl: "https://www.nbmcw.com/images/Road-Pavements/47765-Engineering-Measures-1.jpg",
      timestamp: "10 mins ago"
    },
    {
      id: 'n2',
      title: "Broken Node Pole",
      location: "Bukit Damansara (400m)",
      status: 'todo',
      category: "Lighting",
      severity: 'Medium',
      eta: "48h to handle",
      analysis: "Sensor failure in lighting node. Causes 20% increase in safety hazards for pedestrians.",
      envImpact: "Replacing with Smart-LED reduces carbon footprint by 12kg/year and 15% energy usage.",
      imageUrl: "https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2021/11/08/damaged-pole-2.jpg",
      timestamp: "1h ago"
    }
  ];

  const historyReports: ReportItem[] = [
    {
      id: 'h1',
      title: "Sanitation Request",
      location: "Medan Damansara",
      status: 'completed',
      category: "Sanitation",
      severity: 'Low',
      eta: "Fixed",
      analysis: "Drain blockage cleared. Flow restored to optimal capacity.",
      envImpact: "Protected 500m area from pest breeding and localized flash floods.",
      imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600",
      timestamp: "2024-05-20"
    }
  ];

  // Camera & AI Trigger
  const startCamera = async () => {
    setIsScanning(true);
    setAiResponse(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Simulate capturing photo after 3 seconds
      setTimeout(() => {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 150);
        
        // Stop stream
        stream.getTracks().forEach(track => track.stop());

        setAiResponse({
          category: "Infrastructure",
          severity: "Medium",
          text: "Anomaly identified. Pothole detected with 94% confidence. Routing to DBKL Public Works..."
        });
        setIsScanning(false);
      }, 3500);
    } catch (err) {
      alert("Camera access denied or not available.");
      setIsScanning(false);
    }
  };

  const handleLocationSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInputRef.current && geocoderRef.current) {
      geocoderRef.current.geocode({ address: searchInputRef.current.value }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          mapInstanceRef.current?.setCenter(results[0].geometry.location);
          setCurrentLocation(results[0].formatted_address);
          setIsSearchExpanded(false);
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white font-sans overflow-hidden mesh-bg">
      
      {/* Search & Location Bar */}
      <nav className="fixed top-8 left-0 right-0 z-[150] px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <motion.div layout className={`liquid-glass rounded-full flex items-center border border-white/10 shadow-2xl transition-all duration-500 ${isSearchExpanded ? 'flex-1 h-14 px-5' : 'w-auto h-14 px-6'}`}>
            <AnimatePresence mode="wait">
              {!isSearchExpanded ? (
                <motion.button key="loc" onClick={() => setIsSearchExpanded(true)} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center border border-blue-500/50 shadow-[0_0_15px_rgba(0,122,255,0.4)]">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-xs font-bold truncate max-w-[150px]">{currentLocation}</span>
                </motion.button>
              ) : (
                <motion.input 
                  ref={searchInputRef} autoFocus placeholder="Find a location..." 
                  onKeyDown={handleLocationSearch}
                  className="bg-transparent border-none outline-none text-sm font-bold w-full text-white"
                  onBlur={() => setIsSearchExpanded(false)}
                />
              )}
            </AnimatePresence>
          </motion.div>
          <button onClick={onLogout} className="w-14 h-14 liquid-glass rounded-full flex items-center justify-center border border-white/10">
            <svg className="w-6 h-6 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
          </button>
        </div>
      </nav>

      {/* Persistent Map Layer */}
      <div ref={mapRef} className={`absolute inset-0 transition-opacity duration-700 ${activeView === 'map' ? 'opacity-100' : 'opacity-20 pointer-events-none'}`} />

      {/* Real Camera Surface */}
      {isScanning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[160] bg-black">
          <video ref={videoRef} className="w-full h-full object-cover" playsInline />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-64 h-64 border-2 border-white/20 rounded-[40px] flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping" />
             </div>
             <p className="absolute bottom-32 text-[10px] font-black uppercase tracking-[0.5em] text-white/50">Analyzing Live Feed</p>
          </div>
        </motion.div>
      )}

      {/* NEARBY OVERLAY */}
      <AnimatePresence>
        {activeView === 'nearby' && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-[140] liquid-glass-panel overflow-y-auto pt-32 pb-44 px-6">
            <div className="max-w-xl mx-auto space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-black">Nearby</h2>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em]">Local Intelligence</p>
                </div>
                <button onClick={() => setActiveView('map')} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">×</button>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {['All', 'Roads', 'Lighting', 'Sanitation', 'Safety'].map(cat => (
                  <button 
                    key={cat} onClick={() => setNearbyFilter(cat)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase border transition-all ${nearbyFilter === cat ? 'bg-blue-600 border-blue-400' : 'bg-white/5 border-white/10 opacity-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {nearbyReports.filter(r => nearbyFilter === 'All' || r.category === nearbyFilter).map(report => (
                <div key={report.id} className="liquid-glass rounded-[40px] overflow-hidden border border-white/10 mb-8 shadow-3xl">
                  <div className="h-56 relative overflow-hidden">
                    <img src={report.imageUrl} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
                    <div className="absolute bottom-6 left-8">
                       <span className="bg-blue-600 text-[8px] font-black px-3 py-1 rounded-full uppercase mb-2 inline-block">AI Diagnostic</span>
                       <h3 className="text-2xl font-black">{report.title}</h3>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between text-[10px] font-black opacity-40 uppercase tracking-widest">
                       <span>{report.location}</span>
                       <span>{report.timestamp}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[8px] uppercase opacity-40 mb-1">Risk Assessment</p>
                          <p className={`font-black ${report.severity === 'High' ? 'text-red-500' : 'text-amber-500'}`}>{report.severity}</p>
                       </div>
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[8px] uppercase opacity-40 mb-1">Est. Resolution</p>
                          <p className="font-black">{report.eta}</p>
                       </div>
                    </div>
                    <p className="text-sm font-medium text-white/70 italic leading-relaxed">"{report.analysis}"</p>
                    <div className="p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                       <h4 className="text-[9px] font-black uppercase text-emerald-400 mb-2 tracking-widest">Environmental Impact</h4>
                       <p className="text-xs text-emerald-100/60 leading-relaxed">{report.envImpact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* HISTORY OVERLAY */}
        {activeView === 'history' && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-[140] liquid-glass-panel overflow-y-auto pt-32 pb-44 px-6">
            <div className="max-w-xl mx-auto">
              <div className="flex justify-between items-end mb-10">
                 <div>
                    <h2 className="text-4xl font-black">Journey</h2>
                    <p className="opacity-40 text-[10px] font-black uppercase tracking-[0.4em]">Personal Records</p>
                 </div>
                 <button onClick={() => setActiveView('map')} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">×</button>
              </div>

              {/* Status Filter */}
              <div className="flex p-1.5 bg-white/5 rounded-[22px] border border-white/5 mb-8">
                {['all', 'todo', 'progress', 'completed'].map(f => (
                  <button 
                    key={f} onClick={() => setHistoryFilter(f as any)}
                    className={`flex-1 py-3 rounded-[16px] text-[9px] font-black uppercase transition-all ${historyFilter === f ? 'bg-white text-black' : 'opacity-30'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {historyReports.filter(r => historyFilter === 'all' || r.status === historyFilter).map(report => (
                  <div key={report.id} className="liquid-glass rounded-[32px] p-5 flex gap-6 items-center border border-white/5">
                    <img src={report.imageUrl} className="w-20 h-20 rounded-2xl object-cover border border-white/10" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-sm">{report.title}</h3>
                        <span className="text-[8px] px-2 py-0.5 rounded-full border border-blue-500/30 text-blue-400 uppercase">{report.status}</span>
                      </div>
                      <p className="text-[10px] opacity-30 mb-3 tracking-wide">{report.location} • {report.timestamp}</p>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                         <div className={`h-full ${report.status === 'completed' ? 'w-full bg-blue-500' : 'w-1/2 bg-amber-500'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIQUID DOCK */}
      <div className="fixed bottom-12 left-0 right-0 z-[200] px-6 pointer-events-none">
        <div className="max-w-md mx-auto liquid-glass-dock pointer-events-auto flex items-center px-4 py-2 gap-3">
          <button onClick={() => setActiveView('history')} className={`flex items-center gap-3 px-5 py-3 rounded-full transition-all ${activeView === 'history' ? 'bg-white/10' : ''}`}>
             <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${activeView === 'history' ? 'bg-blue-600 border-blue-400 shadow-[0_0_15px_#3b82f6]' : 'bg-white/5 border-white/10'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2.5" /></svg>
             </div>
             <span className="text-[10px] font-black uppercase">History</span>
          </button>

          <motion.button 
            onClick={startCamera} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.9 }} 
            className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-3xl z-30"
          >
             <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <circle cx="12" cy="13" r="3" strokeWidth="2.2" />
             </svg>
          </motion.button>

          <button onClick={() => setActiveView('nearby')} className={`flex items-center gap-3 px-5 py-3 rounded-full transition-all ${activeView === 'nearby' ? 'bg-white/10' : ''}`}>
             <span className="text-[10px] font-black uppercase">Nearby</span>
             <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${activeView === 'nearby' ? 'bg-blue-600 border-blue-400 shadow-[0_0_15px_#3b82f6]' : 'bg-white/5 border-white/10'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2.5" /></svg>
             </div>
          </button>
        </div>
      </div>

      {/* AI ANALYSIS SHEET */}
      <AnimatePresence>
        {aiResponse && activeView === 'map' && (
          <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-40 left-6 right-6 z-[210] max-w-xl mx-auto liquid-glass rounded-[44px] p-8 border border-white/10 shadow-3xl">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-xl">✓</div>
               <div>
                  <h4 className="text-sm font-black uppercase tracking-widest">Diagnostic Complete</h4>
                  <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Verified by Gemini Core</p>
               </div>
            </div>
            <p className="text-white/80 text-sm mb-8 italic leading-relaxed">"{aiResponse.text}"</p>
            <div className="flex gap-3">
              <button onClick={() => setAiResponse(null)} className="flex-1 py-4 bg-white text-black rounded-2xl font-black uppercase text-[11px]">Confirm Report</button>
              <button onClick={() => setAiResponse(null)} className="px-8 py-4 bg-white/5 rounded-2xl text-[11px] font-black uppercase border border-white/10">Edit</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{showFlash && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white z-[300]" />}</AnimatePresence>

      <style>{`
        .liquid-glass-dock {
          background: rgba(15, 15, 15, 0.4);
          backdrop-filter: blur(50px) saturate(210%);
          border-radius: 60px;
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          border-top-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 30px 60px -12px rgba(0,0,0,0.8);
        }
        .liquid-glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.1); }
        .liquid-glass-panel { background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(80px) saturate(250%); }
        .mesh-bg { background: #000; background-image: radial-gradient(at 0% 0%, rgba(0, 122, 255, 0.1) 0, transparent 60%), radial-gradient(at 100% 100%, rgba(88, 86, 214, 0.1) 0, transparent 60%); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ReportPage;