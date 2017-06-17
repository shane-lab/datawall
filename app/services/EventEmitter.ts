interface IEvent {
    
}

export function EventEmitter<T extends {new(...args:any[]):{}}>(constructor:T, secret: any) {
    return class extends constructor {
        private secret = secret;

        private events = {};

        match(proof: any): boolean {
            return this.secret != null && (proof === this.secret)
        }

        on(eventName: string, handler: Function) {
            if (!eventName || !handler) {
                return;
            }

            let events = this.events;
            if (!(eventName in events)) {
                events[eventName] = [];
            }

            events[eventName].push(handler);
        }

        emit(secret: any, eventName: string, args?: any) {
            if (!this.match(secret)) {
                return;
            }

            let handlers = this.events[eventName];
            if (!handlers) {
                return;
            }

            for (let handler of handlers) {
                handler(args);
            }
        }
    }
}