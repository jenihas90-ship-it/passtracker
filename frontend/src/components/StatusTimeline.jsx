import React from 'react';
import { CheckCircle2, Clock, ShieldAlert, FileCheck, Fingerprint, Cog, Printer, Award } from 'lucide-react';

export default function StatusTimeline({ currentStatus, statusHistory = [], t }) {
  const steps = [
    {
      key: 'Submitted',
      label: t.statusSubmitted,
      desc: t.descSubmitted,
      icon: FileCheck
    },
    {
      key: 'Biometrics Pending',
      label: t.statusBiometrics,
      desc: t.descBiometrics,
      icon: Fingerprint
    },
    {
      key: 'Processing',
      label: t.statusProcessing,
      desc: t.descProcessing,
      icon: Cog
    },
    {
      key: 'Printed',
      label: t.statusPrinted,
      desc: t.descPrinted,
      icon: Printer
    },
    {
      key: 'Ready for Pickup',
      label: t.statusReady,
      desc: t.descReady,
      icon: Award
    }
  ];

  // Determine current active step index in the 5-step pipeline
  const isFlagged = currentStatus === 'Discrepancy Flagged';
  const currentIndex = steps.findIndex(s => s.key === currentStatus);

  // Helper to find recorded timestamp for a status
  const getTimestampForStatus = (statusKey) => {
    const entry = statusHistory.find(h => h.status === statusKey);
    if (!entry || !entry.updatedAt) return null;
    try {
      const d = new Date(entry.updatedAt);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return null;
    }
  };

  return (
    <div className="py-2">
      {/* If flagged, show alert banner */}
      {isFlagged && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm text-rose-800">{t.statusFlagged}</div>
            <p className="text-xs text-rose-700 mt-0.5">{t.descFlagged}</p>
          </div>
        </div>
      )}

      {/* Stepper Pipeline */}
      <div className="relative">
        {/* Desktop / Tablet horizontal pipeline */}
        <div className="hidden md:grid md:grid-cols-5 gap-2 relative">
          {/* Connector Line behind nodes */}
          <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-slate-200 -z-0">
            <div
              className={`h-full transition-all duration-700 ${
                isFlagged ? 'bg-rose-500' : 'bg-emerald-600'
              }`}
              style={{
                width: isFlagged
                  ? '60%'
                  : `${Math.max(0, (currentIndex / (steps.length - 1)) * 100)}%`
              }}
            />
          </div>

          {steps.map((step, index) => {
            const isCompleted = !isFlagged && currentIndex > index;
            const isCurrent = !isFlagged && currentIndex === index;
            const isUpcoming = isFlagged || currentIndex < index;
            const timestamp = getTimestampForStatus(step.key);
            const StepIcon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center text-center px-1 z-10">
                {/* Node Icon */}
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-white border-2 border-emerald-600 text-emerald-700 ring-4 ring-emerald-100 shadow-sm animate-pulse'
                      : 'bg-white border-2 border-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <StepIcon className="h-4 w-4" />
                  )}
                </div>

                {/* Step Label */}
                <h4
                  className={`mt-2.5 text-xs font-bold leading-tight ${
                    isCurrent
                      ? 'text-emerald-800'
                      : isCompleted
                      ? 'text-slate-900'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </h4>

                {/* Timestamp */}
                {timestamp ? (
                  <span className="mt-1 text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                    {timestamp}
                  </span>
                ) : (
                  <span className="mt-1 text-[10px] text-slate-400">
                    {isCurrent ? 'In Progress' : 'Pending'}
                  </span>
                )}

                {/* Description */}
                <p className="mt-1 text-[11px] text-slate-500 leading-snug line-clamp-2">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile vertical pipeline (Ultra-clean low bandwidth responsive layout) */}
        <div className="md:hidden space-y-4 relative pl-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {steps.map((step, index) => {
            const isCompleted = !isFlagged && currentIndex > index;
            const isCurrent = !isFlagged && currentIndex === index;
            const timestamp = getTimestampForStatus(step.key);
            const StepIcon = step.icon;

            return (
              <div key={step.key} className="relative flex items-start gap-3">
                {/* Node indicator */}
                <div
                  className={`absolute -left-6 top-0 h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-emerald-700'
                          : isCompleted
                          ? 'text-slate-800'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                    {timestamp && (
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        {timestamp}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
