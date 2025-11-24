// import './styleResult.css';
// function ResultComponent({ data, onBack }) {
//     const handleDownloadPdf = () => {
//         if (allData.generatedFileName) {
//             console.log("Preparing to download:", allData.generatedFileName); // לוג להורדה
//             // הורדה מה-server
//             window.location.href = `http://localhost:4000/api/download/${allData.generatedFileName}`;
//         } else {
//             alert("לא קיים קובץ PDF להורדה");
//         }
//     };
//     const allData = data.optimizedText;

//     return (
//         <div className="result-container">
//             <button onClick={onBack} className="back-button">← חזור</button>
//             {allData.generatedFileName && (
//                 <div className="download-section">
//                     <button onClick={handleDownloadPdf} className="download-button">
//                         📥 הורד קו"ח ב-PDF
//                     </button>
//                     <p className="file-name">קובץ: {allData.generatedFileName}</p>
//                 </div>
//             )}

//             <h2>תוצאות הניתוח</h2>

//             <div className="score-section">
//                 <h3>ניקוד התאמה: {allData.matchScore}%</h3>
//                 <div className="score-bar">
//                     <div className="score-fill" style={{ width: `${allData.matchScore}%` }}></div>
//                 </div>
//             </div>

//             {allData.keySkillsToHighlight && allData.keySkillsToHighlight.length > 0 && (
//                 <div className="section">
//                     <h3>💡 מיומנויות עיקריות להדגיש:</h3>
//                     <ul>
//                         {allData.keySkillsToHighlight.map((skill, i) => (
//                             <li key={i}><strong>{skill}</strong></li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {allData.missingSkillsOrGaps && allData.missingSkillsOrGaps.length > 0 && (
//                 <div className="section">
//                     <h3>⚠️ מיומנויות חסרות:</h3>
//                     <ul>
//                         {allData.missingSkillsOrGaps.map((gap, i) => (
//                             <li key={i}>{gap}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {allData.specificRecommendations && allData.specificRecommendations.length > 0 && (
//                 <div className="section">
//                     <h3>✅ המלצות ספציפיות:</h3>
//                     <ul>
//                         {allData.specificRecommendations.map((rec, i) => (
//                             <li key={i}>{rec}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {allData.suggestedChangesSummary && allData.suggestedChangesSummary.length > 0 && (
//                 <div className="section">
//                     <h3>📝 שינויים מומלצים:</h3>
//                     <ul>
//                         {allData.suggestedChangesSummary.map((change, i) => (
//                             <li key={i}>{change}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {/* {allData.improvedCvText && (
//                 <div className="section">
//                     <h3>📄 קו"ח משופר:</h3>
//                     <div className="improved-cv">
//                         <pre>{allData.improvedCvText}</pre>
//                     </div>
//                 </div>
//             )} */}

//         </div>
//     );
// }

// export default ResultComponent;
import './styleResult.css';
import { useState } from 'react';

function ResultComponent({ data, onBack }) {
  const [isVisible, setIsVisible] = useState(false); // סטייט לניהול חשיפת התוכן

  const handleDownloadPdf = () => {
    if (allData.generatedFileName) {
      console.log("Preparing to download:", allData.generatedFileName); // לוג להורדה
      // הורדה מה-server
      window.location.href = `http://localhost:4000/api/download/${allData.generatedFileName}`;
    } else {
      alert("לא קיים קובץ PDF להורדה");
    }
  };

  const allData = data.optimizedText;

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // שינוי הסטייט בלחיצה
  };

  return (
    <div className="result-container">
      <button onClick={onBack} className="back-button">← חזור</button>
      
      {allData.generatedFileName && (
        <div className="download-section">
          <button onClick={handleDownloadPdf} className="download-button">
            📥 הורד קו"ח ב-PDF
          </button>
          <p className="file-name">קובץ: {allData.generatedFileName}</p>
        </div>
      )}

      <h2>תוצאות הניתוח</h2>

      <div className="score-section">
        <h3>ניקוד התאמה: {allData.matchScore}%</h3>
        <div className="score-bar">
          <div className="score-fill" style={{ width: `${allData.matchScore}%` }}></div>
        </div>
      </div>

      <button className="toggle-button" onClick={toggleVisibility}>
        {isVisible ? "הסתר את המידע" : "הצג את כל המידע"}
      </button>

      {/* אם הסטייט isVisible הוא true, נציג את כל המידע */}
      {isVisible && (
        <>
          {allData.keySkillsToHighlight && allData.keySkillsToHighlight.length > 0 && (
            <div className="section">
              <h3>💡 מיומנויות עיקריות להדגיש:</h3>
              <ul>
                {allData.keySkillsToHighlight.map((skill, i) => (
                  <li key={i}><strong>{skill}</strong></li>
                ))}
              </ul>
            </div>
          )}

          {allData.missingSkillsOrGaps && allData.missingSkillsOrGaps.length > 0 && (
            <div className="section">
              <h3>⚠️ מיומנויות חסרות:</h3>
              <ul>
                {allData.missingSkillsOrGaps.map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          )}

          {allData.specificRecommendations && allData.specificRecommendations.length > 0 && (
            <div className="section">
              <h3>✅ המלצות ספציפיות:</h3>
              <ul>
                {allData.specificRecommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {allData.suggestedChangesSummary && allData.suggestedChangesSummary.length > 0 && (
            <div className="section">
              <h3>📝 שינויים מומלצים:</h3>
              <ul>
                {allData.suggestedChangesSummary.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </div>
          )}

          {/* כל המידע הזה יוצג רק אם הסטייט 'isVisible' הוא true */}
          {/* {allData.improvedCvText && (
            <div className="section">
              <h3>📄 קו"ח משופר:</h3>
              <div className="improved-cv">
                <pre>{allData.improvedCvText}</pre>
              </div>
            </div>
          )} */}
        </>
      )}
    </div>
  );
}

export default ResultComponent;

