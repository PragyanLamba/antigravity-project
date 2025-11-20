import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import '../App.css';

export function HeroSection({ onGetStarted }) {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <div className="hero-badge">
                    <span className="badge-dot"></span>
                    <span>The Ultimate DSA Roadmap</span>
                </div>

                <h1 className="hero-title">
                    Master Data Structures <br />
                    <span className="text-gradient">& Algorithms</span>
                </h1>

                <p className="hero-subtitle">
                    A structured, interactive roadmap designed to take you from beginner to interview-ready.
                    Track your progress, master patterns, and land your dream job.
                </p>

                <div className="hero-actions">
                    <button onClick={onGetStarted} className="cta-button primary large">
                        Start Learning Now <ArrowRight size={20} />
                    </button>
                    <button className="cta-button secondary large">
                        View Curriculum
                    </button>
                </div>

                <div className="hero-features">
                    <div className="feature-item">
                        <CheckCircle2 size={20} className="feature-icon" />
                        <span>Curated LeetCode List</span>
                    </div>
                    <div className="feature-item">
                        <CheckCircle2 size={20} className="feature-icon" />
                        <span>Pattern-Based Learning</span>
                    </div>
                    <div className="feature-item">
                        <CheckCircle2 size={20} className="feature-icon" />
                        <span>Progress Tracking</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
