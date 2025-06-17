export interface ErrorPattern {
  id: string
  patterns: string[]
  category: 'setup' | 'dependencies' | 'gpu' | 'network' | 'docker' | 'runtime' | 'configuration'
  title: string
  description: string
}

export interface SolutionStep {
  type: 'command' | 'instruction' | 'warning' | 'note'
  content: string
  description?: string
}

export interface Solution {
  title: string
  description: string
  steps: SolutionStep[]
  additionalNotes?: string[]
}

export interface ErrorMatch {
  pattern: ErrorPattern
  confidence: number
  title: string
  category: string
  solutions: Solution[]
}
