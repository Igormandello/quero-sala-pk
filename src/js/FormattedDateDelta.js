export default class FormattedDateDelta {
  constructor(first, last) {
    this.minutes = last.getMinutes() - first.getMinutes()
    if (this.minutes < 0) {
      this.minutes += 60
    }

    this.seconds = last.getSeconds() - first.getSeconds()
    if (this.seconds < 0) {
      this.seconds += 60
    }

    if (this.seconds > 0) {
      this.minutes--
    }
  }

  toString() {
    return `${this.minutes}m e ${this.seconds}s`
  }
}