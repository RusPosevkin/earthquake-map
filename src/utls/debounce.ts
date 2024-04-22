export const debounce = <T extends Function>(cb: T, wait = 20) => {
  let timeoutID = 1;
  const callable = (...args: any) => {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
};
