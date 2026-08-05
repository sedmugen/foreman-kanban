/**
 * Inspection Queue — Manager's "PR inbox" for tasks awaiting review.
 * Shows confirm/reject buttons with inline reject-feedback panel.
 */

import React, { useState } from 'react';
import RejectPanel from './RejectPanel';

function ComplexityDots({ level }) {
  return (
    <span className="complexity-dots" style={{ display: 'inline' }}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= level ? 'filled' : 'empty'}>●</span>
      ))}
    </span>
  );
}

export default function InspectionQueue({ tasks, onConfirm, onReject }) {
  const [openRejectId, setOpenRejectId] = useState(null);

  return (
    <div className="queue-section">
      <div className="queue-section-head">
        <h3>Inspection Queue</h3>
        <span className="count-pill">{tasks.length}</span>
      </div>
      <div className="queue-list">
        {tasks.length === 0 ? (
          <div className="empty-queue">Nothing waiting on inspection right now.</div>
        ) : (
          tasks.map((task) => (
            <div className="queue-item" key={task.id}>
              <div className="qi-main">
                <div className="qi-title">{task.title}</div>
                <div className="qi-sub">
                  {task.id?.slice(-8)} · Submitted by {task.assigned_to_name || 'Unknown'} ·{' '}
                  Complexity <ComplexityDots level={task.complexity} />
                </div>
              </div>
              <div className="queue-actions">
                <button
                  className="btn btn-sm btn-stamp-approve"
                  onClick={() => onConfirm(task.id)}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-sm btn-stamp-reject"
                  onClick={() =>
                    setOpenRejectId(openRejectId === task.id ? null : task.id)
                  }
                >
                  Send Back
                </button>
              </div>
              {openRejectId === task.id && (
                <RejectPanel
                  taskId={task.id}
                  onReject={(taskId, feedback) => {
                    onReject(taskId, feedback);
                    setOpenRejectId(null);
                  }}
                  onCancel={() => setOpenRejectId(null)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}