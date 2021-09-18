import axios from 'axios'
import keys from './config/keys'

const getPageSpeedScore = async (): Promise<number> => {
  const response = await axios.get(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${keys.url}&key=${keys.pageSpeedInsightsKey}`
  )
  return response.data.lighthouseResult.categories.performance.score
}

const getScores = async (): Promise<number[]> => {
  const scores: number[] = []
  for (let testIndex = 0; testIndex < keys.testsNumber; testIndex++) {
    const score: number = await getPageSpeedScore()
    scores.push(score)
  }
  return scores
}

const addScore = (sum: number, score: number): number => sum + score

const getScoresSum = (scores: number[]): number => {
  return scores.reduce(addScore, 0)
}

const getAverage = async () => {
  console.log('Starting tests!')
  const scores: number[] = await getScores()
  const sum: number = getScoresSum(scores)
  const average: number = sum / scores.length
  console.log('Average is', average)
}

getAverage()
