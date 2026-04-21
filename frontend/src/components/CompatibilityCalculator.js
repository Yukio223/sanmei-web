import React, { useState } from 'react';
import { sanmeiAPI } from '../api';
import './Calculator.css';

function CompatibilityCalculator() {
  const [person1Date, setPerson1Date] = useState('');
  const [person2Date, setPerson2Date] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!person1Date || !person2Date) {
        throw new Error('Please select both birth dates');
      }

      const data = await sanmeiAPI.calculateCompatibility(person1Date, person2Date);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to calculate compatibility');
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPerson1Date('');
    setPerson2Date('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-section">
        <h2>💑 相性表 (Compatibility)</h2>
        <p className="description">
          2人の生年月日を入力して、相性を鑑定します。
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="person1Date">人物1の生年月日</label>
              <input
                type="date"
                id="person1Date"
                value={person1Date}
                onChange={(e) => setPerson1Date(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="person2Date">人物2の生年月日</label>
              <input
                type="date"
                id="person2Date"
                value={person2Date}
                onChange={(e) => setPerson2Date(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? '計算中...' : '相性を鑑定'}
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
          <h3>💕 相性鑑定結果</h3>

          <div className="compatibility-comparison">
            <div className="person-info">
              <h4>人物1</h4>
              <div className="info-table">
                <div className="info-row">
                  <span className="label">生年月日:</span>
                  <span className="value">{result.person1.birth_date}</span>
                </div>
              </div>
            </div>

            <div className="vs-divider">vs</div>

            <div className="person-info">
              <h4>人物2</h4>
              <div className="info-table">
                <div className="info-row">
                  <span className="label">生年月日:</span>
                  <span className="value">{result.person2.birth_date}</span>
                </div>
              </div>
            </div>
          </div>

          {result.compatibility && (
            <>
              <div className="result-card">
                <h4>総合相性スコア</h4>
                <div className="compatibility-score">
                  <div className="score-display">
                    <div className="score-number">
                      {result.compatibility.score || '—'}
                    </div>
                    <div className="score-label">/ 100</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                  <strong style={{ color: '#667eea', fontSize: '1.1em' }}>
                    {result.compatibility.details?.compatibility_level}
                  </strong>
                </div>
              </div>

              <div className="result-card">
                <h4>📊 相性分析</h4>
                <p className="analysis" style={{ marginBottom: '20px' }}>
                  {result.compatibility.analysis}
                </p>

                {result.compatibility.details && (
                  <div className="compatibility-details">
                    <h5 style={{ marginBottom: '12px', color: '#333' }}>詳細チェック</h5>
                    <table className="result-table" style={{ marginTop: '0' }}>
                      <tbody>
                        <tr>
                          <td style={{ textAlign: 'left' }}>年支一致</td>
                          <td style={{ color: result.compatibility.details.year_branch_match ? '#4caf50' : '#999' }}>
                            {result.compatibility.details.year_branch_match ? '✅ はい' : '❌ いいえ'}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: 'left' }}>月支一致</td>
                          <td style={{ color: result.compatibility.details.month_branch_match ? '#4caf50' : '#999' }}>
                            {result.compatibility.details.month_branch_match ? '✅ はい' : '❌ いいえ'}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: 'left' }}>日支一致</td>
                          <td style={{ color: result.compatibility.details.day_branch_match ? '#4caf50' : '#999' }}>
                            {result.compatibility.details.day_branch_match ? '✅ はい' : '❌ いいえ'}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: 'left' }}>主星一致数</td>
                          <td style={{ color: result.compatibility.details.matching_stars > 0 ? '#667eea' : '#999' }}>
                            {result.compatibility.details.matching_stars}個
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {result.person1.destiny && result.person2.destiny && (
                <div className="result-card">
                  <h4>干支比較</h4>
                  <table className="result-table">
                    <thead>
                      <tr>
                        <th>柱</th>
                        <th>人物1</th>
                        <th>人物2</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>年</td>
                        <td>{result.person1.destiny.stem_branch.year_stem}{result.person1.destiny.stem_branch.year_branch}</td>
                        <td>{result.person2.destiny.stem_branch.year_stem}{result.person2.destiny.stem_branch.year_branch}</td>
                      </tr>
                      <tr>
                        <td>月</td>
                        <td>{result.person1.destiny.stem_branch.month_stem}{result.person1.destiny.stem_branch.month_branch}</td>
                        <td>{result.person2.destiny.stem_branch.month_stem}{result.person2.destiny.stem_branch.month_branch}</td>
                      </tr>
                      <tr>
                        <td>日</td>
                        <td>{result.person1.destiny.stem_branch.day_stem}{result.person1.destiny.stem_branch.day_branch}</td>
                        <td>{result.person2.destiny.stem_branch.day_stem}{result.person2.destiny.stem_branch.day_branch}</td>
                      </tr>
                      <tr>
                        <td>時</td>
                        <td>{result.person1.destiny.stem_branch.hour_stem}{result.person1.destiny.stem_branch.hour_branch}</td>
                        <td>{result.person2.destiny.stem_branch.hour_stem}{result.person2.destiny.stem_branch.hour_branch}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          <div className="status-notice success">
            <strong>✅ 完成:</strong> 相性計算エンジンが正常に動作しています。
            スコアと詳細分析が表示されます。
          </div>
        </div>
      )}
    </div>
  );
}

export default CompatibilityCalculator;
