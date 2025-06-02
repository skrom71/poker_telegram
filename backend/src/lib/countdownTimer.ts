type CountdownTimerCallbacks = {
  onStart?: (time: number) => void
  onTick?: (time: number) => void
  onEnd?: () => void
}

export class CountdownTimer {
  private duration: number
  private remainingTime: number
  private interval: NodeJS.Timeout | null = null
  public onStart?: (time: number) => void
  public onTick?: (time: number) => void
  public onEnd?: () => void

  constructor(duration: number) {
    this.duration = duration
    this.remainingTime = duration
  }

  public start(): void {
    if (this.interval) return // Если таймер уже идет, не запускаем заново

    if (this.onStart) this.onStart(this.remainingTime)

    this.interval = setInterval(() => {
      this.remainingTime--

      if (this.onTick) this.onTick(this.remainingTime)

      if (this.remainingTime <= 0) {
        this.stop()
        if (this.onEnd) this.onEnd()
      }
    }, 1000)
  }

  public stop(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  public reset(): void {
    this.stop()
    this.remainingTime = this.duration
  }
}

// // Использование таймера
// const timer = new CountdownTimer(10, {
//   onStart: (time) => console.log(`Таймер запущен: осталось ${time} сек`),
//   onTick: (time) => console.log(`Осталось: ${time} сек`),
//   onEnd: () => console.log("Таймер завершен"),
// });

// timer.start();
