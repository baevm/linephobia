const LOCAL_STORAGE_HISTORY_KEY = 'search-history'

type LocalStorageHistoryItem = {
  html_url: string
}

export const addToHistory = (newItem: LocalStorageHistoryItem) => {
  try {
    const prevHistory = getSearchHistory()
    prevHistory.unshift(newItem)
    window.localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(prevHistory))
  } catch (error) {
    console.error(error)
  }
}

export const getSearchHistory = () => {
  return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY) ?? '[]') as LocalStorageHistoryItem[]
}
