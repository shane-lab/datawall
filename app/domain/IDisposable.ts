export interface IDisposable {
    /**
     * Free any allocated memory
     */
    dispose(): void;
    /**
     * Add an optional condition to whether or not the disposable object is infact disposable
     * 
     * @return {boolean}
     */
    isDisposable(): boolean;
}