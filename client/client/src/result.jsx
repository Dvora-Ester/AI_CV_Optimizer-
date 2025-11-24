function ResultComponent({ data, onBack }) {
  const handleDownloadPdf = () => {
    if (data.generatedFileName) {
      console.log("Preparing to download:", data.generatedFileName); // לוג להורדה
      // הורדה מה-server
      window.location.href = `http://localhost:4000/api/cv/download/${data.generatedFileName}`;
    } else {
      alert("לא קיים קובץ PDF להורדה");
    }
  };

  return (
    <div className="result-container">
      <button onClick={onBack} className="back-button">← חזור</button>
      
      <h2>תוצאות הניתוח</h2>

      <div className="score-section">
        <h3>ניקוד התאמה: {data.matchScore}%</h3>
        <div className="score-bar">
          <div className="score-fill" style={{ width: `${data.matchScore}%` }}></div>
        </div>
      </div>

      {data.keySkillsToHighlight && data.keySkillsToHighlight.length > 0 && (
        <div className="section">
          <h3>💡 מיומנויות עיקריות להדגיש:</h3>
          <ul>
            {data.keySkillsToHighlight.map((skill, i) => (
              <li key={i}><strong>{skill}</strong></li>
            ))}
          </ul>
        </div>
      )}

      {data.missingSkillsOrGaps && data.missingSkillsOrGaps.length > 0 && (
        <div className="section">
          <h3>⚠️ מיומנויות חסרות:</h3>
          <ul>
            {data.missingSkillsOrGaps.map((gap, i) => (
              <li key={i}>{gap}</li>
            ))}
          </ul>
        </div>
      )}

      {data.specificRecommendations && data.specificRecommendations.length > 0 && (
        <div className="section">
          <h3>✅ המלצות ספציפיות:</h3>
          <ul>
            {data.specificRecommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {data.suggestedChangesSummary && data.suggestedChangesSummary.length > 0 && (
        <div className="section">
          <h3>📝 שינויים מומלצים:</h3>
          <ul>
            {data.suggestedChangesSummary.map((change, i) => (
              <li key={i}>{change}</li>
            ))}
          </ul>
        </div>
      )}

      {data.improvedCvText && (
        <div className="section">
          <h3>📄 קו"ח משופר:</h3>
          <div className="improved-cv">
            <pre>{data.improvedCvText}</pre>
          </div>
        </div>
      )}

      {data.generatedFileName && (
        <div className="download-section">
          <button onClick={handleDownloadPdf} className="download-button">
            📥 הורד קו"ח ב-PDF
          </button>
          <p className="file-name">קובץ: {data.generatedFileName}</p>
        </div>
      )}
    </div>
  );
}

export default ResultComponent;
