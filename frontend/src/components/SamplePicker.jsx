import React from 'react';
import { Sparkles, CheckCircle2, Clock, Printer, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function SamplePicker({ onSelect, t }) {
  const samples = [
    {
      appNo: 'EP-2024-89211',
      phone: '0911223344',
      name: 'Abebe Bikila',
      status: 'Ready for Pickup',
      branch: 'Addis Ababa',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
      icon: CheckCircle2,
      label: 'Ready for Pickup'
    },
    {
      appNo: 'EP-2024-45192',
      phone: '0922334455',
      name: 'Chaltu Desta',
      status: 'Processing',
      branch: 'Jimma',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
      icon: Clock,
      label: 'Processing'
    },
    {
      appNo: 'EP-2024-19283',
      phone: '0944556677',
      name: 'Fatuma Mohammed',
      status: 'Printed',
      branch: 'Dire Dawa',
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100',
      icon: Printer,
      label: 'Printed'
    },
    {
      appNo: 'EP-2024-38102',
      phone: '0966778899',
      name: 'Almaz Bekele',
      status: 'Discrepancy Flagged',
      branch: 'Jimma',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
      icon: AlertTriangle,
      label: 'Discrepancy Flagged'
    },
    {
      appNo: 'EP-2024-89211',
      phone: '0911000000',
      name: 'Security Test',
      status: 'MFA Test',
      branch: 'Mismatch Case',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
      icon: ShieldAlert,
      label: 'Wrong Phone (MFA Test)'
    }
  ];

  return (
    <div className="mt-4 pt-3 border-t border-slate-100">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-2">
        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
        <span>{t.trySampleTitle}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {samples.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(item.appNo, item.phone)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border font-medium transition-all shadow-2xs ${item.badgeClass}`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.name}</span>
              <span className="opacity-70 text-[10px]">({item.label})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
