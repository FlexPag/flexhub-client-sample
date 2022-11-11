/* eslint-disable no-await-in-loop */
export interface PollUntilOptions<T> {
  pollingInterval: number;
  pollUntil: (data: T) => boolean;
  ignoreErrors: boolean;
  signal: AbortSignal;
}

export type PollDataFetchingFunction<T> = (() => Promise<T>) | ((signal: AbortSignal) => Promise<T>);

export async function pollUntil<T>(dataFunction: PollDataFetchingFunction<T>, options: PollUntilOptions<T>) {
  do {
    const data = await dataFunction(options.signal);
    if (options.pollUntil(data)) {
      return data;
    }

    await wait(options.pollingInterval, options.signal);
  } while (!options.signal.aborted);
}

async function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    const timeout = setTimeout(resolve, ms);

    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      resolve();
    });
  });
}
