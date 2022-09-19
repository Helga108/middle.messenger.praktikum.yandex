import { queryStringify } from "./queryStringify";

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

interface Options {
  timeout?: number;
  data?: object;
  method: string;
  headers?: object | object[];
}

export default class HTTPTransport {
  get = (url: string, options: Options) => {
    const { data } = options;
    if (data) {
      url = url + queryStringify(data);
    }
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  put = (url: string, options: Options) => {
    if (options.data) {
      (options as any).data = queryStringify(options.data);
    }
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  post = (url: string, options: Options) => {
    if (options.data) {
      (options as any).data = queryStringify(options.data);
    }
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  delete = (url: string, options: Options) => {
    if (options.data) {
      (options as any).data = queryStringify(options.data);
    }
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (url: string, options: Options, timeout: number = 5000) => {
    let { headers = {} }: any = options;
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;

      xhr.onerror = reject;

      xhr.ontimeout = reject;

      Object.keys(headers).forEach((key: any) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
