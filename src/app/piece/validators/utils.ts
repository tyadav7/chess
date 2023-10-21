export function curry(fn: Function, arity = fn.length) {
    return function curried(...args: any[]) {
        if (args.length >= arity) {
            return fn(...args);
        } else {
            return function (...moreArgs: any) {
                return curried(...args, ...moreArgs);
            };
        }
    };
}