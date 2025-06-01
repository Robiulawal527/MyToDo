import React, { useState } from 'react';
import { FaListAlt, FaUserGraduate, FaUserFriends } from 'react-icons/fa';
import TodoList from './components/TodoList';
import Mentor from './components/Mentor';
import Personality from './components/Personality';
import './App.css';

function App() {
  // Define our three tabs with icons
  const tabs = [
    { id: 'todo', label: 'To-Do', icon: <FaListAlt /> },
    { id: 'mentor', label: 'Mentor', icon: <FaUserGraduate /> },
    { id: 'personality', label: 'Personality', icon: <FaUserFriends /> },
  ];

  const [activeTab, setActiveTab] = useState('todo');

  return (
    <div className="App">
      <h1>🚀 Task & Mentor & Personality</h1>

      {/* ─── Tab Bar ────────────────────────────────────────────────────────────────── */}
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="tab-icon">{tab.icon}</div>
            <div className="tab-label">{tab.label}</div>
          </div>
        ))}
      </div>

      {/* ─── Tab Content ─────────────────────────────────────────────────────────────── */}
      <div className="tab-content">
        {activeTab === 'todo' && (
          <div className="card">
            <TodoList />
          </div>
        )}
        {activeTab === 'mentor' && (
          <div className="card">
            <Mentor />
          </div>
        )}
        {activeTab === 'personality' && (
          <div className="card">
            <Personality />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
