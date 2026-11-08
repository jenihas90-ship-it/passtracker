import React from 'react';
import { ShieldCheck, Globe, Wifi, Users, UserCheck } from 'lucide-react';

export default function Header({ lang, setLang, t, viewMode, setViewMode }) {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'am', label: 'አማርኛ' },
    { code: 'om', label: 'Afaan Oromoo' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      {/* Ethiopian Flag Accent Strip */}
      <div className="h-1.5 w-full flex">
        <div className="w-1/3 bg-[#009b44]"></div>
        <div className="w-1/3 bg-[#fed100]"></div>
        <div className="w-1/3 bg-[#e01424]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode('citizen')}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-500/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">{t.systemTitle}</h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                ICS PoC
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-1">{t.systemSubtitle}</p>
          </div>
        </div>

        {/* Right Controls: Mode Toggle, Low-bandwidth indicator, Language picker */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Low Bandwidth pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-100 text-slate-600 rounded-md border border-slate-200">
            <Wifi className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t.lowBandwidthBadge}</span>
          </div>

          {/* Mode Switcher: Citizen vs Officer Admin */}
          <button
            onClick={() => setViewMode(viewMode === 'citizen' ? 'admin' : 'citizen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
              viewMode === 'admin'
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Toggle between Citizen tracking and ICS Officer management view"
          >
            {viewMode === 'admin' ? (
              <>
                <UserCheck className="h-4 w-4" />
                <span>{t.citizenMode}</span>
              </>
            ) : (
              <>
                <Users className="h-4 w-4" />
                <span>{t.adminMode}</span>
              </>
            )}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <Globe className="h-3.5 w-3.5 ml-2 text-slate-500 hidden sm:block" />
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  lang === l.code
                    ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
