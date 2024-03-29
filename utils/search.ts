// Search Array Functions

export function checkIfStringsContainSameCharacters(string1: string, string2: string) {
  return new Set(string1).size === new Set(string1 + string2).size
}

export function compareTwoStrings(first: string, second: string) {
  first = first.replace(/\s+/g, '')
  second = second.replace(/\s+/g, '')

  if (first === second)
    return 1 // identical or empty
  if (first.length < 2 || second.length < 2)
    return 0 // if either is a 0-letter or 1-letter string

  const firstBigrams = new Map()
  for (let i = 0; i < first.length - 1; i++) {
    const bigram = first.substring(i, i + 2)
    const count = firstBigrams.has(bigram)
      ? firstBigrams.get(bigram) + 1
      : 1

    firstBigrams.set(bigram, count)
  }

  let intersectionSize = 0
  for (let i = 0; i < second.length - 1; i++) {
    const bigram = second.substring(i, i + 2)
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0

    if (count > 0) {
      firstBigrams.set(bigram, count - 1)
      intersectionSize++
    }
  }

  return (2.0 * intersectionSize) / (first.length + second.length - 2)
}

export function findBestMatch(mainString: string, targetStrings: { name: string }[]) {
  const ratings = []
  let bestMatchIndex = 0

  for (let i = 0; i < targetStrings.length; i++) {
    const currentTargetString = targetStrings[i]
    const currentRating = compareTwoStrings(
      mainString,
      currentTargetString.name,
    )
    ratings.push({ target: currentTargetString, rating: currentRating })
    if (currentRating > ratings[bestMatchIndex].rating)
      bestMatchIndex = i
  }

  const bestMatch = ratings[bestMatchIndex]

  return {
    ratings,
    bestMatch,
    bestMatchIndex,
  }
}

export function sortCallback(a: any, b: any, key: string, secondKey?: string) {
  if (a[key] > b[key])
    return -1

  else if (a[key] < b[key])
    return 1
  else if (a[key] === b[key] && secondKey)
    return String(a[secondKey]).localeCompare(b[secondKey])

  return 0
}
