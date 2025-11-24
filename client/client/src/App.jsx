import { useState } from 'react';
import ResultComponent from './result.jsx';
import './style.css';

function App() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [analysisOption, setAnalysisOption] = useState("0");

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
    if (!file || (analysisOption === "1" && !description)) {
      alert("אנא בחרו קובץ ותיאור משרה אם נדרש");
      return;
    }

    setIsLoading(true);

    try {
      let res;
      const formData = new FormData();
      formData.append('cv', file);
      
      if (analysisOption === "1") {
        formData.append('description', description);
        res = await fetch('http://localhost:4000/api/cv/job/optimize', {
          method: 'POST',
          body: formData,
        });
      } else {
        res = await fetch('http://localhost:4000/api/cv/general/optimize', {
          method: 'POST',
          body: formData,
        });
      }

      if (!res.ok) {
        const errMsg = await res.json();
        throw new Error(errMsg.message || 'Error analyzing PDF');
      }

      const data = await res.json();
      console.log("Data from server:", data);  // לוג כדי לבדוק שהנתונים מחזוריים
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("אירעה שגיאה במהלך שליחת הבקשה");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>אנליזת קו"ח</h1>

      {!result ? (
        <div>
          <div>
            <label>בחר קובץ PDF:</label>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
          </div>

          <div>
            <label>בחר אופציה לניתוח:</label>
            <select onChange={handleAnalysisOptionChange}>
              <option value="0">ציון כללי של קו"ח</option>
              <option value="1">בדיקת התאמה למשרה</option>
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
        </div>
      ) : (
        <div>
          <ResultComponent data={result} onBack={() => setResult(null)} />
        </div>
      )}
    </div>
  );
}

export default App;
