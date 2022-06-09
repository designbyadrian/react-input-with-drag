/**
 * Based on GIST: https://gist.github.com/fr-ser/ded7690b245223094cd876069456ed6c
 * by Sergej Herbert https://gist.github.com/fr-ser
 */

/**
 * Debounce
 * @param func Function to debounce
 * @param wait Millisecond to wait before firing
 * @returns
 */
export function debounce<F extends Function>(func: F, wait: number): F {
  let timeoutID: number;

  if (!Number.isInteger(wait)) {
    console.warn('Called debounce without a valid number');
    wait = 300;
  }

  // conversion through any necessary as it wont satisfy criteria otherwise
  return <any>function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    const context = this;

    timeoutID = window.setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}
