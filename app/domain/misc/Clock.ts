export module Clock {
    const clock =  {
        before: performance.now(),
        getDelta() {
            let now = performance.now();

            let delta = now - this.before;

            this.before = now;

            return delta;
        }     
    };

    export function getDelta() {
        return clock.getDelta();
    }
};