import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export function useProgress() {
    const [completedIds, setCompletedIds] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchProgress();
        } else {
            setCompletedIds([]);
        }
    }, [user]);

    const fetchProgress = async () => {
        try {
            const response = await axios.get('http://localhost:5160/api/progress');
            setCompletedIds(response.data);
        } catch (error) {
            console.error('Failed to fetch progress:', error);
        }
    };

    const toggleProblem = async (id) => {
        if (!user) return;

        // Optimistic update
        setCompletedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(p => p !== id);
            } else {
                return [...prev, id];
            }
        });

        try {
            await axios.post(`http://localhost:5160/api/progress/${id}`);
        } catch (error) {
            console.error('Failed to update progress:', error);
            // Revert on error
            fetchProgress();
        }
    };

    return { completedIds, toggleProblem };
}
