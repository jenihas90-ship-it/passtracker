import React from 'react';
import { X, Send, ShieldCheck, Bell, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function TelegramAlertModal({ isOpen, onClose, alertData, application, t }) {
  if (!isOpen) return null;

  const applicantName = application?.applicantName || alertData?.applicantName || 'Citizen Applicant';
  const appNumber = application?.applicationNumber || 'EP-2024-89211';
  const branch = application?.officeLocation || alertData?.pickupBranch || 'Addis Ababa Main (Kirkos)';
  const phone = application?.phoneMasked || alertData?.recipientPhone || '+251 91 **** 344';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#24A1DE] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <Send className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Telegram Mini-App & SMS Alert</h3>
              <p className="text-[11px] text-white/80">Make.com Webhook Automation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Telegram Chat Simulation */}
        <div className="p-5 bg-slate-100">
          <div className="text-center text-[10px] text-slate-400 font-medium mb-3">
            Today • Automated ICS Notification Bot
          </div>

          <div className="bg-white rounded-2xl rounded-tl-xs p-4 shadow-xs border border-slate-200/80 space-y-2.5 text-xs text-slate-800">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs pb-1 border-b border-slate-100">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Ethiopian ICS Official PassTrack Bot</span>
              <span className="ml-auto text-[10px] text-slate-400 font-normal">Just now</span>
            </div>

            <p className="leading-relaxed">
              🇪🇹 <strong>ሰላም / Hello {applicantName},</strong>
            </p>
            <p className="leading-relaxed">
              Your Ethiopian Passport application (<strong>{appNumber}</strong>) has reached the final stage:
            </p>

            {/* Status Pill */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-emerald-800 block">READY FOR PICKUP</span>
                <span className="text-[11px] text-emerald-700">Ready at {branch}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-normal">
              <strong>Collection Instructions:</strong><br />
              • Please present your original Kebele ID card or Birth Certificate.<br />
              • Office hours: Mon-Fri, 8:30 AM - 4:30 PM.<br />
              • No branch appointment required.
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Dispatched to: {phone}</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                ✓✓ Delivered
              </span>
            </div>
          </div>

          {/* SMS Mirror Badge */}
          <div className="mt-3 bg-amber-50 rounded-xl p-2.5 border border-amber-200 flex items-center gap-2 text-[11px] text-amber-900">
            <MessageSquare className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Simultaneous SMS alert was pushed via Ethio Telecom SMS gateway.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl shadow-xs transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
