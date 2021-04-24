export const formatDate = (date) => {
  return date.toISOString().split('T')[0]
}
export const formatTime = (time) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time / 60) % 60)
  const seconds = Math.floor(time % 60)

  return `${hours}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
}

export const formatTimeSimple = (time) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time / 60) % 60)
  const seconds = Math.floor(time % 60)

  if (hours != 0) return hours + 'h'
  if (minutes != 0) return minutes + 'm'
  return seconds + 's'
}

export const per = (num) => {
  return Math.floor(num * 10000) / 100 + '%'
}

export const formatDateDM = (date) => {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
    .format(date)
    .split(',')[0]
}

export const getDayStr = (date) => {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
    .format(date)
    .split(' ')[0]
}
