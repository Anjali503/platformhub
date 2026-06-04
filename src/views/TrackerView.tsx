import React, { useState } from 'react';
import { Plus, Trash, ArrowLeft, ArrowRight, ClipboardList, PenTool, CheckCircle, ChevronDown, Check, X, Calendar, Edit3 } from 'lucide-react';
import { ApplicationTrackerCard, ApplicationStage, UserProfile } from '../types';

interface TrackerViewProps {
  user: UserProfile | null;
  applicationCards: ApplicationTrackerCard[];
  onUpdateCardStage: (id: string, nextStage: ApplicationStage) => void;
  onDeleteCard: (id: string) => void;
  onAddCustomCard: (card: Omit<ApplicationTrackerCard, 'id' | 'appliedDate'>) => void;
  onAddToast: (text: string, type: 'success' | 'error' | 'info' | 'ai') => void;
}

export const TrackerView: React.FC<TrackerViewProps> = ({
  user,
  applicationCards,
  onUpdateCardStage,
  onDeleteCard,
  onAddCustomCard,
  onAddToast,
}) => {
  // Modal toggle state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newCategory, setNewCategory] = useState('Internships');
  const [newStage, setNewStage] = useState<ApplicationStage>('Applied');
  const [newNotes, setNewNotes] = useState('');

  // Active details card view
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const stages: ApplicationStage[] = ['Applied', 'Under Review', 'Interview', 'Selected', 'Rejected'];

  const stageTheme = {
    'Applied': 'border-blue-500/30 text-blue-400 bg-blue-500/5',
    'Under Review': 'border-amber-500/30 text-amber-400 bg-amber-500/5',
    'Interview': 'border-purple-500/30 text-[#9b5bff] bg-purple-500/5',
    'Selected': 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
    'Rejected': 'border-rose-400/30 text-rose-400 bg-rose-500/5',
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newOrg.trim()) {
      onAddToast('Please complete role title and organization fields.', 'error');
      return;
    }

    onAddCustomCard({
      title: newTitle,
      organization: newOrg,
      category: newCategory,
      stage: newStage,
      notes: newNotes
    });

    // Reset loop
    setNewTitle('');
    setNewOrg('');
    setNewCategory('Internships');
    setNewStage('Applied');
    setNewNotes('');
    setShowAddModal(false);
  };

  // HTML5 Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData('text/plain', cardId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: ApplicationStage) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      onUpdateCardStage(cardId, targetStage);
    }
  };

  const handleMoveStage = (cardId: string, current: ApplicationStage, direction: 'left' | 'right') => {
    const currentIndex = stages.indexOf(current);
    let nextIndex = currentIndex + (direction === 'right' ? 1 : -1);
    if (nextIndex >= 0 && nextIndex < stages.length) {
      onUpdateCardStage(cardId, stages[nextIndex]);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 min-h-[80vh] flex items-center">
        <div className="p-8 bg-slate-950/40 border border-slate-850 rounded-2xl text-center backdrop-blur-sm shadow-xl w-full">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-[#9b5bff] text-lg mx-auto mb-4">📊</div>
          <h2 className="font-sans font-extrabold text-xl text-white">Unlock Application Tracker</h2>
          <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed mb-6">
            Log in to establish your customized Kanban workflow boards, schedule deadlines, and catalog individual role updates.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onAddToast('Sign in required to view Tracker.', 'info')}
              className="py-2.5 bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white rounded-xl font-semibold text-xs uppercase cursor-pointer"
            >
              Access Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 min-h-[85vh] text-slate-100 relative">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 text-left">
        <div>
          <h1 className="font-sans font-extrabold text-3xl text-white tracking-tight">Application Tracker</h1>
          <p className="text-sm text-slate-400 mt-1 font-light">
            Monitor role filings inside your visual pipeline. Drag cards smoothly to update stages, or select arrows.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10 active:scale-98 transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Application Slot
        </button>
      </div>

      {/* KANBAN BOARD SYSTEM ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start overflow-x-auto pb-4 select-none">
        {stages.map((stage) => {
          const stageCards = applicationCards.filter((card) => card.stage === stage);
          return (
            <div
              key={stage}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
              className="p-3 bg-slate-900/15 border border-slate-850 rounded-2xl flex flex-col gap-3 min-w-[210px]"
            >
              {/* Stage Header */}
              <div className={`p-2 border rounded-xl flex items-center justify-between font-sans font-bold text-xs uppercase tracking-wider ${stageTheme[stage]}`}>
                <span>{stage}</span>
                <span className="bg-slate-950/40 py-0.5 px-2 rounded-full font-mono text-[10px] text-slate-200">
                  {stageCards.length}
                </span>
              </div>

              {/* Cards block wrapper */}
              <div className="flex flex-col gap-3.5 min-h-[400px]">
                {stageCards.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center border border-dashed border-slate-800/40 rounded-xl p-6 text-center text-slate-600 text-[10px] font-medium italic">
                    Drop items here
                  </div>
                ) : (
                  stageCards.map((card) => (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, card.id)}
                      onClick={() => setSelectedCardId(selectedCardId === card.id ? null : card.id)}
                      className="p-4 bg-slate-950/60 hover:bg-slate-900/30 border border-slate-850/80 hover:border-slate-800 rounded-xl transition-all cursor-grab active:cursor-grabbing text-left relative group shadow gap-2 text-xs"
                    >
                      <div>
                        {/* Title details */}
                        <h4 className="font-sans font-extrabold text-slate-100 group-hover:text-blue-400 transition-colors leading-tight line-clamp-1">
                          {card.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-semibold">{card.organization}</span>
                      </div>

                      <div className="flex justify-between items-center gap-2 mt-3 text-[10px] text-slate-500 leading-none">
                        <span className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 font-bold uppercase tracking-wide">
                          {card.category}
                        </span>
                        
                        {/* Rating if exists */}
                        {card.matchScore && (
                          <span className="text-emerald-400 font-semibold">{card.matchScore}% match</span>
                        )}
                      </div>

                      {/* Expanded notes section */}
                      {selectedCardId === card.id && (
                        <div className="mt-3.5 pt-3 border-t border-slate-900/80 text-[11px] text-slate-400 font-light flex flex-col gap-2 bg-slate-950/20 p-2 rounded-lg leading-relaxed">
                          <p>
                            <span className="font-bold text-slate-400">Activity Note: </span>
                            {card.notes || 'No added notes coordinates yet.'}
                          </p>
                          <div className="flex items-center justify-between mt-1 text-[10px] text-slate-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> Filed: {card.appliedDate}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Direction Shift Actions */}
                      <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between gap-1 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveStage(card.id, card.stage, 'left');
                          }}
                          disabled={card.stage === 'Applied'}
                          className="p-1 hover:bg-slate-900 rounded disabled:opacity-20 text-slate-400 hover:text-white transition"
                          title="Move Left"
                          aria-label={`Move application to previous stage`}
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteCard(card.id);
                          }}
                          className="p-1 hover:bg-rose-500/10 text-slate-600 hover:text-rose-400 rounded transition"
                          title="Delete slot entry"
                          aria-label={`Delete application for ${card.title || 'application'}`}
                        >
                          <Trash className="w-3 h-3" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveStage(card.id, card.stage, 'right');
                          }}
                          disabled={card.stage === 'Rejected'}
                          className="p-1 hover:bg-slate-900 rounded disabled:opacity-20 text-slate-400 hover:text-white transition"
                          title="Move Right"                          aria-label={`Move application to next stage`}                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* MANUAL APPLICATION ADDITION MODAL DIALOG */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#050810]/90 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-[fadeUp_0.2s_ease]">
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl max-w-md w-full shadow-2xl relative text-left">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-900 text-slate-500 hover:text-slate-300 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-sans font-extrabold text-lg text-white mb-1">Add Job Tracker Slot</h3>
            <p className="text-xs text-slate-500 font-light mb-6">Catalog customized career applications or other third-party entries.</p>

            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Position/Role Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Architect, SWE Intern"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs py-2.5 px-3 rounded-lg text-slate-200 outline-none focus:border-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Organization Company *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google, Vercel, Stripe"
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs py-2.5 px-3 rounded-lg text-slate-200 outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Category type</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs py-2.5 px-2 rounded-lg text-slate-400 outline-none"
                  >
                    <option>Internships</option>
                    <option>Hackathons</option>
                    <option>Scholarships</option>
                    <option>Open Source</option>
                    <option>Fellowships</option>
                    <option>Remote Jobs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Board Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as ApplicationStage)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs py-2.5 px-2 rounded-lg text-slate-400 outline-none"
                  >
                    <option>Applied</option>
                    <option>Under Review</option>
                    <option>Interview</option>
                    <option>Selected</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Activity Notes</label>
                <textarea
                  rows={3}
                  placeholder="Insert links, interview logs, or pending checklist items..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-850 text-xs py-2 px-3 rounded-lg text-slate-200 outline-none focus:border-blue-500/50 resize-none font-light"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all"
              >
                Catalog Card
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
