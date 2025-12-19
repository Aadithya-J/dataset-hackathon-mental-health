import React, { useEffect, useState } from 'react';
import { LayoutDashboard, MessageSquare, History, User, ShieldAlert, LogOut, Sun, Moon, Activity, Sparkles, X, Phone, Globe } from 'lucide-react';
import { ViewState, Session } from '../types';
import { COMPANION_NAME } from '../constants';
import { Button } from './Button';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onSelectSession: (sessionId: string | null) => void;
  onOpenWellness: () => void;
}

const EMERGENCY_HELPLINES = [
  { country: 'USA', name: 'National Suicide Prevention Lifeline', number: '988', description: '24/7 crisis support' },
  { country: 'USA', name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Free 24/7 text support' },
  { country: 'UK', name: 'Samaritans', number: '116 123', description: '24/7 emotional support' },
  { country: 'India', name: 'iCall', number: '9152987821', description: 'Psychosocial helpline' },
  { country: 'India', name: 'Vandrevala Foundation', number: '1860-2662-345', description: '24/7 mental health support' },
  { country: 'Canada', name: 'Crisis Services Canada', number: '1-833-456-4566', description: '24/7 support' },
  { country: 'Australia', name: 'Lifeline', number: '13 11 14', description: '24/7 crisis support' },
  { country: 'International', name: 'International Association for Suicide Prevention', number: 'https://www.iasp.info/resources/Crisis_Centres/', description: 'Find local resources' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen, isDarkMode, toggleTheme, onSelectSession, onOpenWellness }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showEmergency, setShowEmergency] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) return;

        try {
            const res = await fetch(`http://localhost:8000/chat/sessions/${userId}`);
            if (res.ok) {
                const sessionData = await res.json();
                const sessionList: Session[] = sessionData.map((s: any) => ({
                    id: s.id,
                    date: new Date(s.created_at).toLocaleDateString(),
                    preview: s.preview
                }));
                
                setSessions(sessionList);
            }
        } catch (err) {
            console.error("Failed to load history for sidebar", err);
        }
    };
    
    fetchHistory();
  }, [isOpen]); // Refresh when sidebar opens

  return (
    <>
      {/* Emergency Helplines Modal */}
      {showEmergency && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowEmergency(false)}>
          <div 
            className="bg-white dark:bg-[#1E293B] rounded-3xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-red-50 dark:bg-red-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary dark:text-white">Emergency Helplines</h3>
                  <p className="text-xs text-text-muted dark:text-slate-400">You're not alone. Help is available 24/7.</p>
                </div>
              </div>
              <button onClick={() => setShowEmergency(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                <X className="w-5 h-5 text-text-muted dark:text-slate-400" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-3">
              {EMERGENCY_HELPLINES.map((line, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-red-200 dark:hover:border-red-500/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">{line.country}</span>
                      </div>
                      <h4 className="font-semibold text-text-primary dark:text-white mb-0.5">{line.name}</h4>
                      <p className="text-xs text-text-muted dark:text-slate-400">{line.description}</p>
                    </div>
                    {line.number.startsWith('http') ? (
                      <a href={line.number} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors">
                        <Globe className="w-4 h-4" />
                        <span>Visit</span>
                      </a>
                    ) : (
                      <a href={`tel:${line.number.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors">
                        <Phone className="w-4 h-4" />
                        <span>{line.number}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
              <p className="text-xs text-text-muted dark:text-slate-400 text-center">
                If you're in immediate danger, please call your local emergency number (911, 112, 999, etc.)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-sidebar dark:bg-sidebar-dark border-r border-gray-200 dark:border-white/5 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 flex items-center gap-4 border-b border-gray-200 dark:border-white/5">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-accent-blue to-accent-tan dark:from-accent-teal dark:to-accent-violet animate-breathe flex items-center justify-center">
            <div className="w-8 h-8 bg-sidebar dark:bg-background-dark rounded-full flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-accent-blue to-accent-tan dark:from-accent-teal dark:to-accent-violet opacity-80" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-medium tracking-wide text-text-primary dark:text-white">{COMPANION_NAME}</h1>
            <p className="text-xs text-text-muted dark:text-text-mutedDark">Always here.</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          <button
            onClick={() => { 
                setView(ViewState.CHAT); 
                onSelectSession(null);
                setIsOpen(false); 
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === ViewState.CHAT 
                ? 'bg-white dark:bg-[#1E293B] text-accent-blue dark:text-accent-teal shadow-md ring-1 ring-gray-100 dark:ring-0' 
                : 'text-text-muted dark:text-text-mutedDark hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-[#E2E8F0]'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>
          
          <button
            onClick={() => { setView(ViewState.INSIGHTS); setIsOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === ViewState.INSIGHTS
                ? 'bg-white dark:bg-[#1E293B] text-accent-tan dark:text-accent-violet shadow-md ring-1 ring-gray-100 dark:ring-0' 
                : 'text-text-muted dark:text-text-mutedDark hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-[#E2E8F0]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Mood Insights</span>
          </button>

          <button
            onClick={() => { setView(ViewState.RITUALS); setIsOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === ViewState.RITUALS
                ? 'bg-white dark:bg-[#1E293B] text-accent-tan dark:text-accent-violet shadow-md ring-1 ring-gray-100 dark:ring-0' 
                : 'text-text-muted dark:text-text-mutedDark hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-[#E2E8F0]'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Ritual Lab</span>
          </button>

          <button
            onClick={() => {
                onOpenWellness();
                setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              text-text-muted dark:text-text-mutedDark hover:bg-black/5 dark:hover:bg-white/5
            `}
          >
            <Activity className="w-5 h-5" />
            <span className="font-medium">Wellness Check</span>
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="flex items-center gap-2 text-text-muted dark:text-[#64748B] text-xs font-bold uppercase tracking-wider mb-3 mt-4 px-2">
            <History className="w-3 h-3" />
            Past Sessions
          </div>
          <div className="space-y-1">
            {sessions.length === 0 ? (
                <div className="px-4 py-3 text-xs text-text-muted dark:text-[#94A3B8]">No history yet</div>
            ) : (
                sessions.map((session) => (
                <div 
                    key={session.id} 
                    onClick={() => {
                        onSelectSession(session.id);
                        setView(ViewState.CHAT);
                        setIsOpen(false);
                    }}
                    className="group px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                >
                    <div className="text-sm text-text-primary dark:text-[#E2E8F0] font-medium mb-0.5 truncate group-hover:text-accent-tan dark:group-hover:text-accent-violet transition-colors">
                        {session.preview}
                    </div>
                    <div className="text-xs text-text-muted dark:text-[#94A3B8]">
                        {session.date}
                    </div>
                </div>
                ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-white/5 space-y-3">
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium text-text-muted dark:text-text-mutedDark hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
               {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
               <span>{isDarkMode ? 'Night Mode' : 'Day Mode'}</span>
            </span>
            <div className={`w-8 h-4 rounded-full relative transition-colors ${isDarkMode ? 'bg-accent-violet/30' : 'bg-accent-tan/30'}`}>
               <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-sm ${isDarkMode ? 'left-4.5 bg-accent-violet' : 'left-0.5 bg-accent-tan'}`} />
            </div>
          </button>

          <Button 
            variant="danger" 
            className="w-full justify-start !px-4 !bg-red-500/5 hover:!bg-red-500/10"
            onClick={() => setShowEmergency(true)}
          >
            <ShieldAlert className="w-5 h-5" />
            <span>Emergency Help</span>
          </Button>
          <div className="flex items-center gap-3 px-4 py-2 text-text-muted dark:text-[#64748B] text-sm">
            <User className="w-4 h-4" />
            <span>Profile Settings</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;