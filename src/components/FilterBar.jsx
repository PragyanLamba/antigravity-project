import React from 'react';

export function FilterBar({
    topics,
    selectedTopic,
    onTopicChange,
    selectedDifficulty,
    onDifficultyChange
}) {
    return (
        <div className="filter-bar">
            <div className="filter-group">
                <label>Topic:</label>
                <select
                    className="filter-select"
                    value={selectedTopic}
                    onChange={(e) => onTopicChange(e.target.value)}
                >
                    <option value="All">All Topics</option>
                    {topics.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Difficulty:</label>
                <select
                    className="filter-select"
                    value={selectedDifficulty}
                    onChange={(e) => onDifficultyChange(e.target.value)}
                >
                    <option value="All">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
        </div>
    );
}
