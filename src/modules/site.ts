// import SampleModal from './modal';
import { App, requestUrl, htmlToMarkdown } from 'obsidian';
import { Readability } from '@mozilla/readability';
import { readabilitySettings } from './site-settings';

export interface ISiteParams {
   url: string;
   [index: string]: unknown;
}

interface Readable {
   title: string;
   content: string;
   textContent: string;
   length: number;
   excerpt: string;
   byline: string;
   dir: string;
   siteName: string;
   lang: string;
}

interface ReadableTransformed extends Omit<Readable, 'length'> {
   length: string;
}

export class Site {
   private static async getDoc(app: App, params: ISiteParams) {
      const { url } = params;
      const res = await requestUrl(url);
      console.log('resolve', res);
      const parser = new DOMParser();
      return parser.parseFromString(res.text, 'text/html');
   }

   private static getReadable(doc: Document) {
      const readable = new Readability(doc, readabilitySettings).parse();
      if (readable === null) return null;

      // readable properties might be null or number
      const result: Partial<ReadableTransformed> = {};
      Object.keys(readable).forEach((key: keyof Readable) => {
         const value = readable[key];
         if (value === null) return (result[key] = ' ');
         if (typeof value === 'number') return (result[key] = value.toString());
         return (result[key] = value);
      });
      return result as ReadableTransformed;
   }

   public static async get(app: App, params: ISiteParams) {
      const url = params.url;
      const doc = await this.getDoc(app, params);
      const readable = this.getReadable(doc);
      if (!readable) return null;
      const markdown = htmlToMarkdown(readable.content || '');
      const site: ISite = { ...readable, markdown, url, publishedTime: ' ' };
      return site;
   }
}
