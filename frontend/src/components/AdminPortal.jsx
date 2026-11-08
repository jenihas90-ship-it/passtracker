import React, { useState, useEffect } from 'react';
import {
  Users,
  RefreshCw,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  BellRing,
  Send,
  Building,
  Filter
} from 'lucide-react';

export default function AdminPortal({ onSelectAppForCitizenView, onTriggerAlertPreview, t }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [filterBranch, setFilterBranch] = useState('ALL');
  const [successBanner, setSuccessBanner] = useState(null);

  const statuses = [
    'Submitted',
    'Biometrics Pending',
    'Processing',
    'Printed',
    'Ready for Pickup',
    'Discrepancy Flagged'
  ];

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (appNo, newStatus) => {
    setUpdatingId(appNo);
    try {
      const res = await fetch(`/api/applications/${appNo}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessBanner(`Application ${appNo} updated to "${newStatus}"!`);
        if (data.alertDispatched) {
          onTriggerAlertPreview(data.alertDispatched, data.data);
        }
        await fetchApplications();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
      setTimeout(() => setSuccessBanner(null), 4000);
    }
  };

  const handleResetData = async () => {
    if (confirm('Reset mock database to initial Ethiopian ICS applicants?')) {
      await fetch('/api/reset', { method: 'POST' });
      await fetchApplications();
      setSuccessBanner('Database successfully reset to initial mock data.');
      setTimeout(() => setSuccessBanner(null), 3000);
    }
  };

  const branches = ['ALL', ...new Set(applications.map(a => a.officeLocation).filter(Boolean))];

  const filteredApps = filterBranch === 'ALL'
    ? applications
    : applications.filter(a => a.officeLocation === filterBranch);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Admin Header */}
      <div className="p-6 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">{t.adminTitle}</h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded">
                OFFICER DESK
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.adminDesc}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchApplications}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>{t.refreshDataBtn}</span>
          </button>
          <button
            onClick={handleResetData}
            className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t.resetDataBtn}</span>
          </button>
        </div>
      </div>

      {/* Success banner */}
      {successBanner && (
        <div className="p-3 bg-emerald-500 text-white text-xs font-semibold px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{successBanner}</span>
          </div>
          <span className="text-[10px] opacity-80">Make.com Webhook Fired</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-slate-500" />
          <span className="font-semibold text-slate-700">Filter Branch:</span>
          <div className="flex flex-wrap gap-1">
            {branches.map(branch => (
              <button
                key={branch}
                onClick={() => setFilterBranch(branch)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  filterBranch === branch
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {branch}
              </button>
            ))}
          </div>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          Showing {filteredApps.length} of {applications.length} applications
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-5 py-3">{t.tableHeaderAppNo}</th>
              <th className="px-5 py-3">{t.tableHeaderName}</th>
              <th className="px-5 py-3">{t.tableHeaderBranch}</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">{t.tableHeaderStatus}</th>
              <th className="px-5 py-3 text-right">{t.tableHeaderActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredApps.map((app) => {
              const isUpdating = updatingId === app.applicationNumber;
              const isFlagged = app.currentStatus === 'Discrepancy Flagged';
              const isReady = app.currentStatus === 'Ready for Pickup';

              return (
                <tr key={app.applicationNumber} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3 font-mono font-bold text-slate-900">
                    <button
                      onClick={() => onSelectAppForCitizenView(app.applicationNumber, app.phoneNumber)}
                      className="hover:text-emerald-700 hover:underline flex items-center gap-1.5"
                      title="View in Citizen Tracker"
                    >
                      {app.applicationNumber}
                    </button>
                  </td>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {app.applicantName}
                    {app.discrepancyNotes && (
                      <div className="text-[10px] text-rose-600 font-normal line-clamp-1 mt-0.5">
                        ⚠️ {app.discrepancyNotes}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{app.officeLocation}</td>
                  <td className="px-5 py-3 font-mono text-slate-500">{app.phoneNumber}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                        isReady
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isFlagged
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {app.currentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <select
                        disabled={isUpdating}
                        value={app.currentStatus}
                        onChange={(e) => handleStatusChange(app.applicationNumber, e.target.value)}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                      >
                        {statuses.map(st => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>

                      {isReady && (
                        <button
                          onClick={() => onTriggerAlertPreview(null, app)}
                          title="Preview Dispatched Telegram Alert"
                          className="p-1.5 bg-[#24A1DE] text-white rounded-lg hover:bg-[#1E87BE] transition-colors"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
