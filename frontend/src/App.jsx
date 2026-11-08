import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchCard from './components/SearchCard';
import ResultCard from './components/ResultCard';
import DiscrepancyModal from './components/DiscrepancyModal';
import TelegramAlertModal from './components/TelegramAlertModal';
import AdminPortal from './components/AdminPortal';
import { translations } from './i18n/translations';
import { ShieldCheck, HelpCircle, Sparkles, Building2, ExternalLink } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en');
  const [viewMode, setViewMode] = useState('citizen'); // 'citizen' or 'admin'
  const [appNumber, setAppNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDiscrepancyModalOpen, setIsDiscrepancyModalOpen] = useState(false);
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [alertData, setAlertData] = useState(null);

  const t = translations[lang] || translations.en;

  const handleSearch = async () => {
    if (!appNumber.trim() || !phone.trim()) {
      setError(t.errorRequired);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationNumber: appNumber.trim(),
          phoneNumber: phone.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setApplication(null);
        setError(data.message || t.errorGeneric);
      } else {
        setApplication(data.data);
      }
    } catch (err) {
      setError(t.errorGeneric);
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setAppNumber('');
    setPhone('');
    setApplication(null);
    setError(null);
  };

  // Called from Admin portal when clicking on an application number
  const handleSelectFromAdmin = (selectedAppNo, selectedPhone) => {
    setAppNumber(selectedAppNo);
    setPhone(selectedPhone);
    setViewMode('citizen');
    setTimeout(() => {
      // Auto search
      fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationNumber: selectedAppNo,
          phoneNumber: selectedPhone
        })
      })
        .then(r => r.json())
        .then(d => {
          if (d.success) setApplication(d.data);
        });
    }, 100);
  };

  // Triggered when an application is updated to "Ready for Pickup"
  const handleTriggerAlertPreview = (dispatchedAlert, appData) => {
    setAlertData(dispatchedAlert);
    if (appData) {
      setApplication(appData);
    }
    setIsTelegramModalOpen(true);
  };

  const handleDiscrepancySuccess = (ticketData) => {
    if (ticketData && ticketData.data) {
      setApplication(ticketData.data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Global Navigation */}
      <Header
        lang={lang}
        setLang={setLang}
        t={t}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:px-6 space-y-8">
        {/* View Mode Switching: Citizen Tracker vs Officer Portal */}
        {viewMode === 'admin' ? (
          <AdminPortal
            onSelectAppForCitizenView={handleSelectFromAdmin}
            onTriggerAlertPreview={handleTriggerAlertPreview}
            t={t}
          />
        ) : (
          <>
            {/* Hero Section */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
                {t.poCTag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t.heroHeading}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.heroSubheading}
              </p>
            </div>

            {/* Multi-Factor Search Form Card */}
            <SearchCard
              appNumber={appNumber}
              setAppNumber={setAppNumber}
              phone={phone}
              setPhone={setPhone}
              onSearch={handleSearch}
              onClear={handleClear}
              loading={loading}
              error={error}
              t={t}
            />

            {/* Tracking Result Card */}
            {application && (
              <ResultCard
                application={application}
                onOpenDiscrepancy={() => setIsDiscrepancyModalOpen(true)}
                onOpenTelegramAlert={() => setIsTelegramModalOpen(true)}
                t={t}
              />
            )}
          </>
        )}
      </main>

      {/* Discrepancy Reporting Modal */}
      <DiscrepancyModal
        isOpen={isDiscrepancyModalOpen}
        onClose={() => setIsDiscrepancyModalOpen(false)}
        application={application}
        phoneInput={phone}
        onDiscrepancySubmitted={handleDiscrepancySuccess}
        t={t}
      />

      {/* Telegram & SMS Alert Simulation Modal */}
      <TelegramAlertModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        alertData={alertData}
        application={application}
        t={t}
      />

      {/* Hackathon Pitch & Gov-Tech Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">PassTrack PoC</span>
            <span>•</span>
            <span>Ethiopian ICS Passport Tracking</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">Jeni High Technology</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Target Pitch: Cursor Hackathon South West Ethiopia / Innobiz-K</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
