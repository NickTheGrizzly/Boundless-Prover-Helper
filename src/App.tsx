import React, { useState } from 'react'
import { Search, AlertTriangle, CheckCircle, Terminal, Wrench, AlertCircle } from 'lucide-react'
import { analyzeError } from './utils/errorAnalyzer'
import { ErrorMatch } from './types/troubleshooter'

function App() {
  const [errorInput, setErrorInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<ErrorMatch[]>([])
  const [hasAnalyzed, setHasAnalyzed] = useState(false)

  const handleAnalyze = async () => {
    if (!errorInput.trim()) return

    setIsAnalyzing(true)
    setHasAnalyzed(false)

    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))

    const matches = analyzeError(errorInput)
    setResults(matches)
    setHasAnalyzed(true)
    setIsAnalyzing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAnalyze()
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Boundless Prover Troubleshooter</h1>
        <p>Interactive diagnostic tool for Boundless Prover setup and operation issues</p>
      </header>

      <main className="main-content">
        <section className="input-section">
          <h2>Paste Your Error or Terminal Output</h2>
          <textarea
            className="error-input"
            placeholder="Paste your error message, terminal output, or describe the issue you're experiencing with Boundless Prover setup..."
            value={errorInput}
            onChange={(e) => setErrorInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={!errorInput.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <div className="spinner" />
                Analyzing...
              </>
            ) : (
              <>
                <Search size={20} />
                Analyze & Get Solutions
              </>
            )}
          </button>
          <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '0.5rem' }}>
            Tip: Press Ctrl+Enter to analyze quickly
          </p>
        </section>

        {isAnalyzing && (
          <div className="loading">
            <div className="spinner" />
            <span>Analyzing your error and finding solutions...</span>
          </div>
        )}

        {hasAnalyzed && (
          <section className="results-section">
            {results.length > 0 ? (
              results.map((match, index) => (
                <div key={index} className="error-match">
                  <h3>
                    <AlertTriangle size={20} />
                    {match.title}
                  </h3>
                  <p style={{ color: '#718096', marginBottom: '1rem' }}>
                    Confidence: {Math.round(match.confidence * 100)}% | Category: {match.category}
                  </p>

                  {match.solutions.map((solution, sIndex) => (
                    <div key={sIndex} className="solution-card">
                      <h4>
                        <Wrench size={18} />
                        {solution.title}
                      </h4>
                      <p style={{ color: '#718096', marginBottom: '1rem' }}>
                        {solution.description}
                      </p>

                      <ol className="solution-steps">
                        {solution.steps.map((step, stepIndex) => (
                          <li key={stepIndex}>
                            {step.type === 'command' ? (
                              <>
                                <p>{step.description}</p>
                                <div className="code-block">{step.content}</div>
                              </>
                            ) : step.type === 'warning' ? (
                              <div className="warning-box">
                                <AlertCircle className="warning-icon" size={16} />
                                <div>
                                  <strong>Warning:</strong> {step.content}
                                </div>
                              </div>
                            ) : (
                              <p>{step.content}</p>
                            )}
                          </li>
                        ))}
                      </ol>

                      {solution.additionalNotes && (
                        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
                          <strong>Additional Notes:</strong>
                          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                            {solution.additionalNotes.map((note, noteIndex) => (
                              <li key={noteIndex} style={{ marginBottom: '0.5rem' }}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="no-matches">
                <Terminal size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <h3>No Known Solutions Found</h3>
                <p>
                  The error you provided doesn't match our known issues database. 
                  This could be a new issue or might need manual investigation.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Try rephrasing your error or check the official Boundless documentation.
                </p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default App
