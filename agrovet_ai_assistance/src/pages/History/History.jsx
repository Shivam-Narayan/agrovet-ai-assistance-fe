import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Eye, Trash2, Download, Filter } from 'lucide-react';
import './History.css';

function History() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // Load analysis history from localStorage
    const savedHistory = localStorage.getItem('analysisHistory');
    if (savedHistory) {
      setRecords(JSON.parse(savedHistory));
    } else {
      // Demo data for showcase
      const demoRecords = [
        {
          id: '1',
          type: 'soil',
          date: '2024-01-15',
          time: '10:30 AM',
          result: 'Clay soil, pH: 6.8, Neutral',
          confidence: '92.5%',
        },
        {
          id: '2',
          type: 'disease',
          date: '2024-01-14',
          time: '2:15 PM',
          result: 'Leaf Blight detected, Moderate severity',
          confidence: '87.3%',
        },
        {
          id: '3',
          type: 'tomato',
          date: '2024-01-13',
          time: '9:45 AM',
          result: 'Ripe tomato, 90-100% ripeness',
          confidence: '94.1%',
        },
        {
          id: '4',
          type: 'pest',
          date: '2024-01-12',
          time: '4:20 PM',
          result: 'Cotton Bollworm, High threat level',
          confidence: '89.7%',
        },
        {
          id: '5',
          type: 'banana',
          date: '2024-01-11',
          time: '11:10 AM',
          result: 'Yellow (Perfect) stage, 4/5 sweetness',
          confidence: '91.8%',
        },
        {
          id: '6',
          type: 'mango',
          date: '2024-01-10',
          time: '3:30 PM',
          result: 'Nearly Ripe, 2-3 days to perfect ripeness',
          confidence: '88.4%',
        },
      ];
      setRecords(demoRecords);
    }
  }, []);

  const getTypeLabel = (type) => {
    const labels = {
      soil: 'Soil Analysis',
      disease: 'Plant Disease',
      pest: 'Cotton Pest',
      tomato: 'Tomato Ripeness',
      banana: 'Banana Ripeness',
      mango: 'Mango Ripeness',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type) => {
    const colors = {
      soil: 'type-soil',
      disease: 'type-disease',
      pest: 'type-pest',
      tomato: 'type-tomato',
      banana: 'type-banana',
      mango: 'type-mango',
    };
    return colors[type] || 'type-default';
  };

  const filteredRecords = filter === 'all' 
    ? records 
    : records.filter(record => record.type === filter);

  const deleteRecord = (id) => {
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
    localStorage.setItem('analysisHistory', JSON.stringify(updatedRecords));
    setSelectedRecord(null);
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(records, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'analysis-history.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="history-container">
      <div className="history-content">
        <div className="history-wrapper">
          <div className="history-header">
            <div>
              <h1 className="history-title">Analysis History</h1>
              <p className="history-subtitle">
                Review your previous soil tests, plant diagnoses, and ripeness detections
              </p>
            </div>
            <button onClick={exportHistory} className="export-button">
              <Download size={16} />
              Export History
            </button>
          </div>

          <div className="filter-card">
            <div className="filter-header">
              <div className="filter-controls">
                <Filter size={20} />
                <span className="filter-label">Filter by type:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Analyses</option>
                  <option value="soil">Soil Analysis</option>
                  <option value="disease">Plant Disease</option>
                  <option value="pest">Cotton Pest</option>
                  <option value="tomato">Tomato Ripeness</option>
                  <option value="banana">Banana Ripeness</option>
                  <option value="mango">Mango Ripeness</option>
                </select>
              </div>
            </div>

            <div className="records-list">
              {filteredRecords.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <Calendar size={48} />
                  </div>
                  <h3 className="empty-title">No Analysis History</h3>
                  <p className="empty-description">
                    Start analyzing your plants and soil to build your history!
                  </p>
                </div>
              ) : (
                filteredRecords.map((record) => (
                  <div key={record.id} className="record-item">
                    <div className="record-content">
                      <div className="record-info">
                        <div className="record-meta">
                          <span className={`type-badge ${getTypeColor(record.type)}`}>
                            {getTypeLabel(record.type)}
                          </span>
                          <div className="date-time">
                            <Calendar size={16} />
                            {record.date}
                          </div>
                          <div className="date-time">
                            <Clock size={16} />
                            {record.time}
                          </div>
                        </div>
                        <p className="record-result">{record.result}</p>
                        {record.confidence && (
                          <p className="record-confidence">Confidence: {record.confidence}</p>
                        )}
                      </div>
                      <div className="record-actions">
                        <button
                          onClick={() => setSelectedRecord(record)}
                          className="action-button view-button"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => deleteRecord(record.id)}
                          className="action-button delete-button"
                          title="Delete Record"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-title">Total Analyses</h3>
              <p className="stat-value green">{records.length}</p>
              <p className="stat-description">All time</p>
            </div>
            
            <div className="stat-card">
              <h3 className="stat-title">Most Used Feature</h3>
              <p className="stat-value blue">
                {records.length > 0 
                  ? getTypeLabel(records.reduce((a, b) => 
                      records.filter(r => r.type === a.type).length > records.filter(r => r.type === b.type).length ? a : b
                    ).type)
                  : 'None yet'
                }
              </p>
              <p className="stat-description">Based on usage</p>
            </div>
            
            <div className="stat-card">
              <h3 className="stat-title">This Month</h3>
              <p className="stat-value orange">
                {records.filter(record => {
                  const recordDate = new Date(record.date);
                  const now = new Date();
                  return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
              <p className="stat-description">Analyses performed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-inner">
              <div className="modal-header">
                <h3 className="modal-title">Analysis Details</h3>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div>
                  <span className={`type-badge ${getTypeColor(selectedRecord.type)}`}>
                    {getTypeLabel(selectedRecord.type)}
                  </span>
                </div>
                
                <div className="modal-grid">
                  <div>
                    <span className="modal-field-label">Date:</span>
                    <p className="modal-field-value">{selectedRecord.date}</p>
                  </div>
                  <div>
                    <span className="modal-field-label">Time:</span>
                    <p className="modal-field-value">{selectedRecord.time}</p>
                  </div>
                </div>
                
                <div className="modal-result">
                  <span>Result:</span>
                  <p>{selectedRecord.result}</p>
                </div>
                
                {selectedRecord.confidence && (
                  <div className="modal-confidence">
                    <span>Confidence:</span>
                    <p>{selectedRecord.confidence}</p>
                  </div>
                )}
              </div>
              
              <div className="modal-actions">
                <button
                  onClick={() => deleteRecord(selectedRecord.id)}
                  className="modal-button modal-button-delete"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="modal-button modal-button-close"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;