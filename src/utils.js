export const sortByDate = (array, dateField) =>
  array.sort((a, b) =>
    new Date(a[dateField]) > new Date(b[dateField]) ? -1 : 1
  )

export const scrollToTopBy = (px = 0) =>
  window.scrollTo({
    top: window.scrollY - px,
    left: 0,
    behaviour: 'smooth',
  })
