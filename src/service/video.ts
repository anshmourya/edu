import { YoutubeTranscript } from 'youtube-transcript';

class Video {
  async transcript(id: string) {
    const url = `https://www.youtube.com/watch?v=${id}`;
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    //remove everthing expect the text
    const transformedData = transcript.map((item) => item.text);
    return transformedData.join(' ');
  }
}

export const video = new Video();
