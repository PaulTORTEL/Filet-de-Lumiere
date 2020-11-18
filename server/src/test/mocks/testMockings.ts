export class MockResponse {
   status: jest.Mock | null;
   sendStatus: jest.Mock | null;
   json: jest.Mock | null;
}

export class MockRequest {
   body: any;
}

export function mockResponse(): MockResponse {
   const res: MockResponse = {
      status: null,
      sendStatus: null,
      json: null
   };

   res.status = jest.fn().mockReturnValue(res);
   res.sendStatus = jest.fn().mockReturnValue(res);
   res.json = jest.fn().mockReturnValue(res);

   return res;
}

export function mockRequest(): {} {
   const req: MockRequest = {
      body: {}
   };
   return req;
}

export function mockNext(): {} {
   let next = {};
   next = jest.fn().mockReturnValue(next);

   return next;
}
