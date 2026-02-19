import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type UserRole = 'citizen' | 'officer';

interface AuthPageProps {
  onBack: () => void;
  onSuccess: (role: UserRole, data: any) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onBack, onSuccess }) => {
  const [pathway, setPathway] = useState<'citizen' | 'officer'>('citizen');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Officer Form State
  const [officerEmail, setOfficerEmail] = useState('');
  const [officerPass, setOfficerPass] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const validateOfficer = () => {
    const govDomains = ['@gov.my', '@mbpj.gov.my', '@selangor.gov.my'];
    const isGovEmail = govDomains.some(domain => officerEmail.toLowerCase().endsWith(domain));
    
    if (!isGovEmail) {
      setError('A valid government email is required (@gov.my)');
      return false;
    }
    if (accessCode.length < 4) {
      setError('Invalid Department Access Code');
      return false;
    }
    return true;
  };

  const handleOfficerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateOfficer()) return;

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    onSuccess('officer', { email: officerEmail, dept: 'Infrastructure' });
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    // Simulate Google Popup and Logic
    await new Promise(r => setTimeout(r, 1200));
    onSuccess('citizen', { name: 'Citizen User', email: 'user@gmail.com' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-[440px] ios-glass rounded-[48px] p-8 md:p-12 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <button onClick={onBack} className="text-white/30 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black font-black text-[9px]">U</span>
            </div>
            <span className="font-extrabold text-sm tracking-tighter text-white">UPI</span>
          </div>
          <div className="w-6"></div> {/* Spacer */}
        </div>

        <h2 className="text-3xl font-black text-white mb-2 text-center">Entry Gateway</h2>
        <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-10 text-center">Select your pathway</p>

        {/* Pathway Toggles */}
        <div className="flex p-1 bg-white/5 rounded-2xl mb-10 border border-white/5">
          <button 
            onClick={() => { setPathway('citizen'); setError(null); }}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${pathway === 'citizen' ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white'}`}
          >
            Citizen
          </button>
          <button 
            onClick={() => { setPathway('officer'); setError(null); }}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${pathway === 'officer' ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white'}`}
          >
            Officer
          </button>
        </div>

        <AnimatePresence mode="wait">
          {pathway === 'citizen' ? (
            <motion.div 
              key="citizen"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex flex-col items-center"
            >
              <p className="text-white/40 text-center text-sm mb-8 leading-relaxed">
                Connect via Google for instant reporting access. Non-government emails are automatically granted Citizen status.
              </p>
              
              <button 
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-4 py-5 bg-white rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-black font-black text-xs uppercase tracking-widest">Continue with Google</span>
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.form 
              key="officer"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onSubmit={handleOfficerLogin}
              className="space-y-4"
            >
              <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder="Official Gov Email (@gov.my)" 
                  value={officerEmail}
                  onChange={(e) => setOfficerEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <input 
                  type="password" 
                  placeholder="Secure Password" 
                  value={officerPass}
                  onChange={(e) => setOfficerPass(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Department Access Code (4 numbers)" 
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full bg-blue-500/5 border border-blue-500/20 rounded-2xl py-4 px-6 text-sm text-blue-400 placeholder:text-blue-400/30 focus:outline-none focus:border-blue-500/50 transition-colors"
                  required
                />
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center"
                >
                  {error}
                </motion.p>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-white rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all text-black font-black text-xs uppercase tracking-widest flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
                ) : (
                  'Authorize Access'
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-12 text-center text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] leading-relaxed">
          Authorized personnel only. <br/>All access is logged by UPI Civic Intelligence.
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
