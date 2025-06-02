import { EventEmitter } from 'events'

export class EventManager<TEvents extends Record<string, any>> {
  private _eventEmitter = new EventEmitter()

  emit<T extends keyof TEvents>(eventType: T, payload: TEvents[T]) {
    this._eventEmitter.emit(eventType as string, payload)
  }

  on<T extends keyof TEvents>(eventType: T, handler: (payload: TEvents[T]) => void) {
    this._eventEmitter.on(eventType as string, handler)
  }

  off<T extends keyof TEvents>(eventType: T, handler: (payload: TEvents[T]) => void) {
    this._eventEmitter.off(eventType as string, handler)
  }

  // once<T extends keyof TEvents>(eventType: T, handler: (payload: TEvents[T]) => void) {
  //   this.eventEmitter.once(eventType as string, handler)
  // }
}
