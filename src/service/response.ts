import { Request, Response, NextFunction } from 'express';

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = function (data = {}) {
    res.status(200).json({
      status: 'SUCCESS',
      message: data.message || 'Your request is successfully executed',
      data: data.data && Object.keys(data.data).length ? data.data : null,
    });
  };

  res.error = function (error = {}) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message || 'Something went wrong',
      data: error.data && Object.keys(error.data).length ? error.data : null,
    });
  };

  res.errorCreating = function (error = {}) {
    res.status(400).json({
      status: 'ERROR',
      message: error.message || 'Error while creating',
    });
  };

  next();
};

export default responseHandler;
