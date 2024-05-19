import { Request, Response } from 'express';
import { youtube } from '@config/youtube';

interface Keyword {
  include: string[];
  exclude: string[];
}

class Feed {
  async search(req: Request, res: Response) {
    try {
      const { include, exclude }: Keyword = req.body;

      if (!include) {
        res.error({
          message: 'include is required',
        });
        return;
      }
      const keywords = include.join('|');
      const excludes = exclude?.join('-');

      const repsone = await youtube.search.list({
        type: ['video'],
        part: ['snippet'],
        q: `${keywords} ${excludes}`,
        maxResults: 50,
      });

      res.success({
        message: 'data list',
        data: repsone.data.items,
      });
    } catch (error) {
      console.error('Error in search controller', error);
      res.error(error);
    }
  }

  //single video detail
  async detail(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.error({
          message: 'id is required',
        });
        return;
      }

      const response = await youtube.videos.list({
        part: ['snippet', 'contentDetails', 'statistics'],
        id: [id],
      });
      res.success({
        message: 'data detail',
        data: response.data.items[0],
      });
    } catch (error) {
      console.error('Error in detail controller', error);
      res.error(error);
    }
  }
}

export const feed = new Feed();
