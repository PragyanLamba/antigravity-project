import React from 'react';

export function ProgressBar({ total, completed }) {
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div>
            <div className="progress-container">
                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="progress-text">
                {completed} / {total} Solved ({percentage}%)
            </div>
        </div>
    );
}
