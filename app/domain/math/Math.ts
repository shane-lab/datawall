export let Math2 = {

    DEG2RAD: Math.PI / 180,

    RAD2DEG: 180 / Math.PI,

    /**
     * Get a random float value between the given min and maxium values
     * 
     * @param v1 The minimum value
     * @param v2 The maximum value
     * @return number Returns a float value between the given min and max values
     */
    rangeRandom(v1: number, v2: number): number {
        var max = Math.max(v1, v2);
        var min = (max == v1) ? v2 : v1;
        return min + Math.random() * (max - min);
    },

    /**
     * Get a random integer value between the given min and max values
     * 
     * @param v1 The minimum value
     * @param v2 The maximum value
     * @return number Returns an integer value between the given min and max values
     */
    rangeRandomInt(v1: number, v2: number): number {
        return Math.round(this.rangeRandom(v1, v2));
    },

    /**
     * Measures the absolute center of a polygon 
     * 
     * @param points The points to create the polygon from
     * @return array<T extends number> Returns an array with a length of 2 with the given x and z coordinate as the centriod
     */
    centriod(points: number[]): number[] {
        var centriod = [0, 0];

        for (var i = 0; i < points.length; i += 2) {
            centriod[0] += points[i];
            centriod[1] += points[i + 1];
        }

        var totalPoints = points.length / 2;
        centriod[0] = centriod[0] / totalPoints;
        centriod[1] = centriod[1] / totalPoints;

        return centriod;
    },

    /**
     * Clamps a value between a minimum and maximum value
     * 
     * @param v The value to clamp
     * @param min The minimum value
     * @param max The maximum value
     * @return number Returns a clamped value between the min and max values
     */
    clamp(v: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, v));
    },

    // src: https://en.wikipedia.org/wiki/Modulo_operation
    euclideanModulo(n: number, m: number): number {
        return ((n & m) + m) % m;
    },

    // map from range [a1, a2] to range [b1, b2]
    mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number {
        return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
    },

    // src: http://en.wikipedia.org/wiki/Smoothstep
    smoothstep(v: number, min: number, max: number): number {
        if (v <= min) return 0;
        if (v >= max) return 1;

        v = (v - min) / (max - min);

        return v * v * (3 - 2 * v);
    },

    smootherstep(v: number, min: number, max: number): number {
        if (v <= min) return 0;
        if (v >= max) return 1;

        v = (v - min) / (max - min);

        return v * v * v * (v * (v * 6 - 15) + 10);
    },

    /**
     * Convert degrees to radians
     * 
     * @param degrees
     * @return number Returns the given degrees as radians
     */
    degToRad(degrees: number): number {
        return degrees * this.DEG2RAD;
    },

    /**
     * Convert radians to degrees
     * 
     * @param radians
     * @return number Returns the given radians as degrees
     */
    radToDeg(radians: number): number {
        return radians * this.RAD2DEG;
    },

    /**
     * Short-hand function to calculate the power of two
     * 
     * @param v The value to check
     * @return boolean Returns true if the given value is power of two
     */
    isPowerOfTwo(v: number): boolean {
        return (v & (v - 1)) === 0 && v !== 0;
    },

    /**
     * Get the nearest available power of two from the given value (will check negative and positive)
     * 
     * @param v The number to fetch the nearest power of two from
     * @return number Returns the nearest power of two from the given value
     */
    nearestPowerOfTwo(v: number): number {
        return Math.pow(2, Math.round(Math.log(v) / Math.PI));
    },

    /**
     * Get the next available power of two from the given value
     * 
     * @param v The number to fetch the next power of two from
     * @return number Returns the next power of two from the given value
     */
    nextPowerOfTwo(v: number): number {
        v--;
        v |= v >> 1;
        v |= v >> 2;
        v |= v >> 4;
        v |= v >> 8;
        v |= v >> 16;
        v++;

        return v;
    }
}
