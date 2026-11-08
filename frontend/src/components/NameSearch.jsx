import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export default function NameSearch({ onSelectApplication }) {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '', 
    lastName: ''    
  });
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const queryParams = new URLSearchParams(formData).toString();
      const response = await fetch(`/api/passport/search-by-name?${queryParams}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || data.error);
      
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (first, middle, last) => {
    setFormData({
      firstName: first,
      middleName: middle,
      lastName: last
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-emerald-900">Search by Name</h2>
          <p className="text-xs text-slate-500 mt-0.5">ባለሶስት ስም ፍለጋ (የእርስዎ፣ የአባት፣ የአያት ስም)</p>
        </div>
        <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <Search className="h-5 w-5" />
        </div>
      </div>

      {/* Quick sample chips */}
      <div className="mb-4 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-1.5">
          <Sparkles className="h-3 w-3 text-amber-500" />
          <span>Quick Demo Names:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => handleQuickFill('Abebe', 'Bikila', 'Kebede')}
            className="px-2 py-0.5 text-xs bg-white border border-slate-200 hover:border-emerald-300 rounded-md text-slate-700 font-medium transition-colors"
          >
            Abebe Bikila
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('Chaltu', 'Desta', 'Gemechu')}
            className="px-2 py-0.5 text-xs bg-white border border-slate-200 hover:border-emerald-300 rounded-md text-slate-700 font-medium transition-colors"
          >
            Chaltu Desta
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('Fatuma', 'Mohammed', 'Ahmed')}
            className="px-2 py-0.5 text-xs bg-white border border-slate-200 hover:border-emerald-300 rounded-md text-slate-700 font-medium transition-colors"
          >
            Fatuma Mohammed
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            First Name <span className="text-slate-400 font-normal font-sans">(የእርስዎ ስም)</span> <span className="text-rose-500">*</span>
          </label>
          <input 
            type="text" 
            name="firstName"
            value={formData.firstName}
            required
            placeholder="e.g., Abebe"
            className="block w-full rounded-xl border-slate-200 bg-slate-50 shadow-2xs focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 p-2.5 text-sm font-medium text-slate-900 border transition-all"
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Middle Name <span className="text-slate-400 font-normal font-sans">(የአባት ስም)</span> <span className="text-rose-500">*</span>
          </label>
          <input 
            type="text" 
            name="middleName"
            value={formData.middleName}
            required
            placeholder="e.g., Bikila"
            className="block w-full rounded-xl border-slate-200 bg-slate-50 shadow-2xs focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 p-2.5 text-sm font-medium text-slate-900 border transition-all"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Last Name <span className="text-slate-400 font-normal font-sans">(የአያት ስም - Optional)</span>
          </label>
          <input 
            type="text" 
            name="lastName"
            value={formData.lastName}
            placeholder="e.g., Kebede"
            className="block w-full rounded-xl border-slate-200 bg-slate-50 shadow-2xs focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 p-2.5 text-sm font-medium text-slate-900 border transition-all"
            onChange={handleInputChange}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Searching Records...</span>
            </>
          ) : (
            <>
              <span>Check Status</span>
              <ArrowRight className="h-4 w-4 opacity-70" />
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
          ✕ {error}
        </div>
      )}
      
      {results && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600">
              Matching Records ({results.length}):
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Case-insensitive regex</span>
          </div>

          {results.map((app, index) => (
            <div
              key={index}
              className="p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-xl border border-slate-200 relative group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-slate-900">{app.applicantName}</p>
                  <p className="text-xs font-mono font-medium text-slate-600 mt-0.5">
                    Ref: <span className="text-emerald-800 font-bold">{app.applicationNumber}</span>
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                    app.currentStatus === 'Ready for Pickup'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : app.currentStatus === 'Discrepancy Flagged'
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  }`}
                >
                  {app.currentStatus}
                </span>
              </div>

              {app.officeLocation && (
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-2">
                  <MapPin className="h-3 w-3 text-emerald-600" />
                  <span>{app.officeLocation}</span>
                </div>
              )}

              {onSelectApplication && (
                <button
                  type="button"
                  onClick={() => onSelectApplication(app.applicationNumber)}
                  className="mt-3 w-full py-1.5 px-3 bg-white hover:bg-emerald-50 text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Track Full Progression & Details</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
