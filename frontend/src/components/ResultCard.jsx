import React from 'react';
import {
  Award,
  MapPin,
  Calendar,
  Phone,
  AlertTriangle,
  Printer,
  CheckCircle,
  Clock,
  BellRing,
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';
import StatusTimeline from './StatusTimeline';

export default function ResultCard({
  application,
  onOpenDiscrepancy,
  onOpenTelegramAlert,
  t
}) {
  if (!application) return null;

  const {
    applicationNumber,
    applicantName,
    phoneMasked,
    currentStatus,
    statusHistory = [],
    officeLocation,
    discrepancyNotes,
    lastUpdated
  } = application;

  const isReady = currentStatus === 'Ready for Pickup';
  const isFlagged = currentStatus === 'Discrepancy Flagged';

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Top Banner for Ready Status */}
      {isReady && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                Official Ready Notice
              </div>
              <p className="text-sm font-semibold">{t.readyForPickupBanner}</p>
            </div>
          </div>
          <button
            onClick={onOpenTelegramAlert}
            className="px-3 py-1.5 bg-white text-emerald-800 text-xs font-bold rounded-lg shadow-xs hover:bg-emerald-50 transition-colors flex items-center gap-1.5"
          >
            <BellRing className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t.viewTelegramAlertBtn}</span>
          </button>
        </div>
      )}

      {/* Top Banner for Flagged Status */}
      {isFlagged && (
        <div className="bg-rose-600 text-white px-6 py-3.5 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-rose-100 shrink-0" />
          <p className="text-xs sm:text-sm font-semibold">{t.activeDiscrepancyBanner}</p>
        </div>
      )}

      {/* Main Applicant Summary Header */}
      <div className="p-5 sm:p-7 border-b border-slate-100">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {t.resultHeading}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="h-3 w-3" />
                MFA Verified
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              {applicantName}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5 font-mono text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                {applicationNumber}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                {officeLocation || 'Jimma Branch'}
              </span>
              <span className="flex items-center gap-1 font-mono text-slate-500">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                {phoneMasked}
              </span>
            </div>
          </div>

          {/* Current Status Pill */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Current Stage
            </span>
            <div
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wide border shadow-2xs ${
                isReady
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : isFlagged
                  ? 'bg-rose-50 text-rose-700 border-rose-300'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}
            >
              {currentStatus}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Progression Pipeline */}
      <div className="p-5 sm:p-7 bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>{t.pipelineTitle}</span>
          </h3>
          <span className="text-xs text-slate-500">
            {t.lastUpdateLabel}: <strong className="text-slate-700">{formatDate(lastUpdated)}</strong>
          </span>
        </div>

        <StatusTimeline
          currentStatus={currentStatus}
          statusHistory={statusHistory}
          t={t}
        />
      </div>

      {/* Discrepancy Note display if flagged */}
      {discrepancyNotes && (
        <div className="px-5 sm:px-7 py-4 bg-amber-50/70 border-b border-amber-200/80">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-900 block">
                Administrative Notes & Flag Details:
              </span>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed font-mono">
                {discrepancyNotes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Audit History Log */}
      <div className="px-5 sm:px-7 py-5 border-b border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          <span>{t.timelineAuditTitle}</span>
        </h4>
        <div className="space-y-2">
          {statusHistory.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-100"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                <span className="font-semibold text-slate-800">{item.status}</span>
              </div>
              <span className="text-slate-500 font-mono text-[11px]">
                {formatDate(item.updatedAt)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-5 sm:p-7 bg-white flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={handlePrint}
          className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Printer className="h-4 w-4 text-slate-600" />
          <span>{t.printSlipBtn}</span>
        </button>

        <button
          onClick={onOpenDiscrepancy}
          className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5"
        >
          <AlertTriangle className="h-4 w-4 text-rose-600" />
          <span>{t.reportDiscrepancyBtn}</span>
        </button>
      </div>
    </div>
  );
}
