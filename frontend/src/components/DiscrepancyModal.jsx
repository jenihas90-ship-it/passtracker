import React, { useState } from 'react';
import { AlertCircle, X, CheckCircle, Ticket, Send } from 'lucide-react';

export default function DiscrepancyModal({
  isOpen,
  onClose,
  application,
  phoneInput,
  onDiscrepancySubmitted,
  t
}) {
  const [category, setCategory] = useState('Name Spelling Mismatch');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen || !application) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notes.trim()) {
      setError('Please provide a description of the error.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/discrepancy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationNumber: application.applicationNumber,
          phoneNumber: phoneInput,
          discrepancyType: category,
          notes: notes.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit report');
      }

      setTicketResult(data);
      if (onDiscrepancySubmitted) {
        onDiscrepancySubmitted(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setTicketResult(null);
    setNotes('');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">{t.discrepancyCardTitle}</h3>
              <p className="text-[11px] text-slate-500 font-mono">Ref: {application.applicationNumber}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {ticketResult ? (
            /* Success confirmation */
            <div className="text-center py-4 space-y-4">
              <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">{t.discrepancySuccessHeading}</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  {t.discrepancySuccessDesc}
                </p>
              </div>

              {/* Ticket badge */}
              <div className="bg-slate-50 border-2 border-dashed border-emerald-300 rounded-xl p-4 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  {t.ticketNumberLabel}
                </span>
                <div className="text-xl font-mono font-extrabold text-emerald-800 tracking-wider mt-1 flex items-center justify-center gap-2">
                  <Ticket className="h-5 w-5 text-emerald-600" />
                  <span>{ticketResult.ticketId}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Keep this ticket number for tracking your administrative resolution.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors"
              >
                Close & Return to Tracking
              </button>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.discrepancyCardDesc}
              </p>

              {/* Discrepancy Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.discrepancyTypeLabel}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                >
                  <option value="Name Spelling Mismatch">{t.typeSpelling}</option>
                  <option value="Incorrect Branch / Office Location">{t.typeBranch}</option>
                  <option value="Phone Number Update">{t.typePhone}</option>
                  <option value="Photo or Biometric Clarification">{t.typePhoto}</option>
                  <option value="Other Administrative Inquiry">{t.typeOther}</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.discrepancyNotesLabel} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.discrepancyNotesPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all resize-none"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t.submittingReportBtn}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>{t.submitReportBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
