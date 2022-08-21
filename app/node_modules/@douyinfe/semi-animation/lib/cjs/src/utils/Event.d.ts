export default class Event {
    _eventMap: Map<any, any>;
    on(event: any, callback: any): this;
    once(event: any, callback: any): void;
    off(event: any, callback: any): this;
    emit(event: any, ...args: any): boolean;
}
