import { v4 as uuidv4 } from 'uuid';

const originalXMLHttpRequest = XMLHttpRequest.prototype.open;

type Middleware = (method: string, url: string | URL) => boolean;

const middlewares: Map<string, Middleware> = new Map();

XMLHttpRequest.prototype.open = function open(...args: any[]) {
  const [method, url] = args;
  const middlewareArray = Array.from(middlewares.values());
  const shouldContinue = middlewareArray.every((middleware) => middleware(method, url));
  if (!shouldContinue) {
    throw new Error('Request was blocked');
  }
  // @ts-ignore
  return originalXMLHttpRequest.apply(this, [...args]);
};

export function registerMiddleware(callback: Middleware) {
  const id = uuidv4();
  middlewares.set(id, callback);
  return id;
}

export function unregisterMiddleware(id: string) {
  middlewares.delete(id);
  return id;
}
