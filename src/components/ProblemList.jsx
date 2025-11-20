import React from 'react';
import { Check, ExternalLink, Circle } from 'lucide-react';

export function ProblemList({ problems, completedIds, onToggle }) {
    if (problems.length === 0) {
        return <div className="text-center text-gray-500 py-8">No problems found matching your filters.</div>;
    }

    return (
        <div className="problem-table-container">
            <table className="problem-table">
                <thead>
                    <tr>
                        <th className="w-16">Status</th>
                        <th>Title</th>
                        <th className="w-32">Difficulty</th>
                        <th className="w-48">Topic</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map(problem => {
                        const isCompleted = completedIds.includes(problem.id);

                        return (
                            <tr key={problem.id} className={isCompleted ? 'row-completed' : ''}>
                                <td className="text-center">
                                    <button
                                        className={`status-btn ${isCompleted ? 'completed' : ''}`}
                                        onClick={() => onToggle(problem.id)}
                                    >
                                        {isCompleted ? <Check size={18} /> : <Circle size={18} />}
                                    </button>
                                </td>
                                <td>
                                    <a
                                        href={problem.leetcodeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="problem-link"
                                    >
                                        {problem.title}
                                        <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </td>
                                <td>
                                    <span className={`badge ${problem.difficulty.toLowerCase()}`}>
                                        {problem.difficulty}
                                    </span>
                                </td>
                                <td>
                                    <span className="topic-tag">{problem.topic}</span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
