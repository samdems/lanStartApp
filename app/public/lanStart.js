export const install = ({
  onProgress = () => {},
  onComplete = () => {},
  onError = () => {},
}) => {
  let percentage = 0
  const timer = setInterval(() => {
    onProgress(percentage)
    if (percentage === 100) {
      clearInterval(timer)
      onComplete()
    }
    percentage += 10
  }, 1000)
}
