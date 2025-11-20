import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { ProgressBar } from './components/ProgressBar';
import { ProblemList } from './components/ProblemList';
import { useProgress } from './hooks/useProgress';
import { useAuth } from './context/AuthContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

function App() {
    const { completedIds, toggleProblem } = useProgress();
    const [problems, setProblems] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const { user, loading } = useAuth();

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    // Auth Modal State
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const response = await axios.get('http://localhost:5160/api/problems');
            setProblems(response.data);
        } catch (error) {
            console.error('Failed to fetch problems:', error);
        }
    };

    const topics = useMemo(() => {
        return [...new Set(problems.map(p => p.topic))].sort();
    }, [problems]);

    const filteredProblems = useMemo(() => {
        return problems.filter(problem => {
            const topicMatch = selectedTopic === 'All' || problem.topic === selectedTopic;
            const difficultyMatch = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
            return topicMatch && difficultyMatch;
        });
    }, [problems, selectedTopic, selectedDifficulty]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
    const paginatedProblems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProblems.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProblems, currentPage]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTopic, selectedDifficulty]);

    const handleOpenAuth = (mode = 'login') => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
    };

    if (loading) return <div className="loading-screen">Loading...</div>;

    return (
        <div className="app">
            <Navbar onOpenAuth={handleOpenAuth} />

            <main className="main-content">
                {!user ? (
                    <HeroSection onGetStarted={() => handleOpenAuth('register')} />
                ) : (
                    <div className="dashboard-container">
                        <div className="dashboard-header-section">
                            <h2>Your Progress</h2>
                            <p>Keep pushing forward, {user.username}!</p>
                        </div>

                        <ProgressBar
                            total={problems.length}
                            completed={completedIds.length}
                        />

                        <FilterBar
                            topics={topics}
                            selectedTopic={selectedTopic}
                            onTopicChange={setSelectedTopic}
                            selectedDifficulty={selectedDifficulty}
                            onDifficultyChange={setSelectedDifficulty}
                        />

                        <ProblemList
                            problems={paginatedProblems}
                            completedIds={completedIds}
                            onToggle={toggleProblem}
                        />

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="pagination-controls">
                                <button
                                    className="pagination-button"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="pagination-info">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    className="pagination-button"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialMode={authMode}
            />
        </div>
    );
}

export default App;
