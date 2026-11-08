import React from 'react';
import { Search, ShieldCheck, FileText, Phone, ArrowRight, RotateCcw } from 'lucide-react';
import SamplePicker from './SamplePicker';

export default function SearchCard({
  appNumber,
  setAppNumber,
  phone,
  setPhone,
  onSearch,
  onClear,
  loading,
  error,
  t
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleSelectSample = (sampleApp, samplePhone) => {
    setAppNumber(sampleApp);
    setPhone(samplePhone);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7">
      <div className="flex items-start gap-3 mb-4">
        <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">{t.searchCardTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
            {t.searchCardDesc}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Application Number Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.appNumberLabel} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FileText className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={appNumber}
                onChange={(e) => setAppNumber(e.target.value)}
                placeholder={t.appNumberPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Official ICS confirmation slip number</p>
          </div>

          {/* Registered Phone Number Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.phoneNumberLabel} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phoneNumberPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">{t.phoneHelpText}</p>
          </div>
        </div>

        {/* Error notification banner */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
            <span className="font-bold text-rose-600 text-sm">✕</span>
            <div className="flex-1 font-medium">{error}</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {(appNumber || phone) && (
            <button
              type="button"
              onClick={onClear}
              className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.clearBtn}</span>
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{t.searchingBtn}</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>{t.searchBtn}</span>
                <ArrowRight className="h-4 w-4 opacity-70" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Demo Pre-set Chips */}
      <SamplePicker onSelect={handleSelectSample} t={t} />
    </div>
  );
}
