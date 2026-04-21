import React, { useState } from 'react';
import { sanmeiAPI } from '../api';
import './Calculator.css';

function DestinyCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!birthDate) {
        throw new Error('Please select a birth date');
      }

      const data = await sanmeiAPI.calculateDestiny(birthDate);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to calculate destiny');
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBirthDate('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-section">
        <h2>🎴 宿命表 (Destiny Table)</h2>
        <p className="description">
          生年月日を入力して、あなたの宿命を鑑定します。
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="birthDate">生年月日 (Birth Date)</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? '計算中...' : '宿命を鑑定'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
            >
              リセット
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            <strong>エラー:</strong> {error}
          </div>
        )}
      </div>

      {result && (
        <div className="result-section">
          <h3>📊 鑑定結果</h3>

          <div className="result-card">
            <h4>基本情報</h4>
            <div className="info-table">
              <div className="info-row">
                <span className="label">生年月日:</span>
                <span className="value">{result.birth_date}</span>
              </div>
            </div>
          </div>

          {result.stem_branch && (
            <div className="result-card">
              <h4>干支 (Stem & Branch)</h4>
              <div className="stem-branch-grid">
                <div className="sb-item">
                  <span className="label">年干:</span>
                  <span className="value">{result.stem_branch.year_stem || '—'}</span>
                </div>
                <div className="sb-item">
                  <span className="label">年支:</span>
                  <span className="value">{result.stem_branch.year_branch || '—'}</span>
                </div>
                <div className="sb-item">
                  <span className="label">月干:</span>
                  <span className="value">{result.stem_branch.month_stem || '—'}</span>
                </div>
                <div className="sb-item">
                  <span className="label">月支:</span>
                  <span className="value">{result.stem_branch.month_branch || '—'}</span>
                </div>
                <div className="sb-item">
                  <span className="label">日干:</span>
                  <span className="value">{result.stem_branch.day_stem || '—'}</span>
                </div>
                <div className="sb-item">
                  <span className="label">日支:</span>
                  <span className="value">{result.stem_branch.day_branch || '—'}</span>
                </div>
                <div className="sb-item">
                  <span className="label">時干:</span>
                  <span className="value">{result.stem_branch.hour_stem || '—'}</span>
                </div>
                <div className="sb-item">
                  <span className="label">時支:</span>
                  <span className="value">{result.stem_branch.hour_branch || '—'}</span>
                </div>
              </div>
            </div>
          )}

          {result.major_stars && (
            <div className="result-card">
              <h4>十大主星 (10 Major Stars)</h4>
              <table className="result-table">
                <thead>
                  <tr>
                    <th>柱 (Pillar)</th>
                    <th>主星 (Star)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>年 (Year)</td>
                    <td className="star-name">{result.major_stars.year}</td>
                  </tr>
                  <tr>
                    <td>月 (Month)</td>
                    <td className="star-name">{result.major_stars.month}</td>
                  </tr>
                  <tr>
                    <td>日 (Day)</td>
                    <td className="star-name">{result.major_stars.day}</td>
                  </tr>
                  <tr>
                    <td>時 (Hour)</td>
                    <td className="star-name">{result.major_stars.hour}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {result.cosmic_plate && (
            <div className="result-card">
              <h4>宇宙盤 (Cosmic Plate - 12 Palaces)</h4>
              <div className="cosmic-plate-grid">
                {Object.entries(result.cosmic_plate).map(([palace, data]) => (
                  <div key={palace} className="palace-card" title={`${data.branch} (${data.degrees}°)`}>
                    <div className="palace-branch">{data.branch}</div>
                    <div className="palace-star">{data.star || '—'}</div>
                  </div>
                ))}
              </div>
              <p className="grid-legend">各宮に配置された十大主星 | Each palace shows the star assigned</p>
            </div>
          )}

          {result.yin_constellation && result.yin_constellation.data && (
            <div className="result-card yin-yang-section">
              <h4>陰占・陽占 (Yin & Yang Aspects)</h4>
              <div className="yin-yang-grid">
                <div className="yin-column">
                  <h5>陰占 (Yin - Internal)</h5>
                  <table className="aspect-table">
                    <tbody>
                      <tr>
                        <td>年</td>
                        <td>{result.yin_constellation.data.year_type}</td>
                      </tr>
                      <tr>
                        <td>月</td>
                        <td>{result.yin_constellation.data.month_type}</td>
                      </tr>
                      <tr>
                        <td>日</td>
                        <td>{result.yin_constellation.data.day_type}</td>
                      </tr>
                      <tr>
                        <td>時</td>
                        <td>{result.yin_constellation.data.hour_type}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="yang-column">
                  <h5>陽占 (Yang - External)</h5>
                  <table className="aspect-table">
                    <tbody>
                      <tr>
                        <td>年</td>
                        <td>{result.yang_constellation.data.year_type}</td>
                      </tr>
                      <tr>
                        <td>月</td>
                        <td>{result.yang_constellation.data.month_type}</td>
                      </tr>
                      <tr>
                        <td>日</td>
                        <td>{result.yang_constellation.data.day_type}</td>
                      </tr>
                      <tr>
                        <td>時</td>
                        <td>{result.yang_constellation.data.hour_type}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {result.major_cycles && (
            <div className="result-card">
              <h4>大運 (Major Cycles - 10 Year Periods)</h4>
              {result.major_cycles.current_cycle && (
                <p className="current-cycle">
                  <strong>現在の大運:</strong> {result.major_cycles.current_cycle}
                </p>
              )}
              <table className="result-table">
                <thead>
                  <tr>
                    <th>周期</th>
                    <th>年齢</th>
                  </tr>
                </thead>
                <tbody>
                  {result.major_cycles.data && result.major_cycles.data.map((cycle, idx) => (
                    <tr key={idx}>
                      <td>{cycle.period}</td>
                      <td>{cycle.age_range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {result.annual_cycles && (
            <div className="result-card">
              <h4>年運 (Annual Cycles - Next 5 Years)</h4>
              <table className="result-table small-text">
                <thead>
                  <tr>
                    <th>年</th>
                    <th>年齢</th>
                  </tr>
                </thead>
                <tbody>
                  {result.annual_cycles.data && result.annual_cycles.data.map((cycle, idx) => (
                    <tr key={idx}>
                      <td>{cycle.year}</td>
                      <td>{cycle.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="status-notice success">
            <strong>✅ 完成:</strong> 計算エンジンが正常に動作しています。
            すべての干支・主星・周期データが表示されます。
          </div>
        </div>
      )}
    </div>
  );
}

export default DestinyCalculator;
