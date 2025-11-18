import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './style.css';

function App() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [improvedPdf, setImprovedPdf] = useState(null);
  const [analysisOption, setAnalysisOption] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAnalysisOptionChange = (e) => {
    setAnalysisOption(e.target.value);
  };

  const handleSubmit = async () => {
    // if (analysisOption === null) {
    //   alert("אנא בחרו אופציית ניתוח");
    //   return;
    // }
    if (!file || (analysisOption === "1" && !description)) {
      alert("אנא בחרו קובץ ותיאור משרה אם נדרש");
      return;
    }

    //setIsLoading(true);

    try {
      let res;
      if (analysisOption === "1") {
        res = await fetch('http://localhost:3000/api/cv/optimize/job', {
          method: 'POST',
          body: JSON.stringify({ file, description }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        res = await fetch('http://localhost:3000/api/cv/optimize/general', {
          method: 'POST',
          body: JSON.stringify({ file }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (!res.ok) {
        const errMsg = await res.json();
        throw new Error(errMsg.message || 'Error analyzing PDF');
      }

      const data = await res.json();
      setResult(data.result);
      setImprovedPdf(data.improvedPdf);
    } catch (error) {
      console.error(error);
      alert("אירעה שגיאה במהלך שליחת הבקשה");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>אנליזת משרות</h1>

      <div>
        <label>בחר קובץ PDF:</label>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>

      <div>
        <label>בחר אופציה לניתוח:</label>
        <select onChange={handleAnalysisOptionChange}>
          <option value="0">לציון של קו"ח</option>
          <option value="1">לבדיקת התאמה למשרה</option>
        </select>
      </div>

      {analysisOption === "1" && (
        <div>
          <label>תיאור משרה:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="הכנס תיאור משרה"
          />
        </div>
      )}

      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'ממתין לניתוח...' : 'שלח ניתוח'}
      </button>

      {isLoading && <div>המערכת פועלת...</div>}

      {result && (
        <div>
          <h3>תוצאות הניתוח:</h3>
          <p>{result}</p>
        </div>
      )}

      {improvedPdf && (
        <div>
          <a href={improvedPdf} download>
            <button>הורד PDF משופר</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
