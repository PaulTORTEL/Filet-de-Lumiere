export function mockResponse(): {} {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

export function mockRequest(): {} {
  const req: any = {
    body: {}
  };
  return req;
}

export function mockNext(): {} {
  let next: any = {};
  next = jest.fn().mockReturnValue(next);

  return next;
}
