import { ErrorPattern, ErrorMatch, Solution } from '../types/troubleshooter'
import { errorPatterns } from '../data/errorPatterns'
import { solutions } from '../data/solutions'

export function analyzeError(input: string): ErrorMatch[] {
  const normalizedInput = input.toLowerCase()
  const matches: ErrorMatch[] = []

  for (const pattern of errorPatterns) {
    let confidence = 0
    let matchCount = 0

    // Check for pattern matches
    for (const patternText of pattern.patterns) {
      if (normalizedInput.includes(patternText.toLowerCase())) {
        matchCount++
        confidence += 1 / pattern.patterns.length
      }
    }

    // Only include matches with reasonable confidence
    if (confidence > 0.3) {
      const patternSolutions = solutions[pattern.id] || []
      
      matches.push({
        pattern,
        confidence,
        title: pattern.title,
        category: pattern.category,
        solutions: patternSolutions
      })
    }
  }

  // Sort by confidence (highest first)
  return matches.sort((a, b) => b.confidence - a.confidence)
}

export function searchByKeywords(keywords: string[]): ErrorMatch[] {
  const matches: ErrorMatch[] = []
  
  for (const pattern of errorPatterns) {
    let relevanceScore = 0
    
    for (const keyword of keywords) {
      const keywordLower = keyword.toLowerCase()
      
      // Check title and description
      if (pattern.title.toLowerCase().includes(keywordLower)) {
        relevanceScore += 2
      }
      if (pattern.description.toLowerCase().includes(keywordLower)) {
        relevanceScore += 1
      }
      
      // Check patterns
      for (const patternText of pattern.patterns) {
        if (patternText.toLowerCase().includes(keywordLower)) {
          relevanceScore += 1.5
        }
      }
    }
    
    if (relevanceScore > 0) {
      const patternSolutions = solutions[pattern.id] || []
      
      matches.push({
        pattern,
        confidence: Math.min(relevanceScore / (keywords.length * 2), 1),
        title: pattern.title,
        category: pattern.category,
        solutions: patternSolutions
      })
    }
  }
  
  return matches.sort((a, b) => b.confidence - a.confidence)
}
