// import SampleModal from './modal';
import { App, requestUrl, htmlToMarkdown } from 'obsidian';
import { Readability } from '@mozilla/readability';

export interface IGetSiteParams {
   url: string;
   selection?: string;
   useReadbility: boolean;
}

// see https://www.npmjs.com/package/@mozilla/readability
const READBILITY_SETTINGS = {};

export async function getSite(app: App, params: IGetSiteParams) {
   const { url, selection } = params;
   console.log('app:', app);
   console.log('url:', url);
   console.log('selection:', selection);
   const res = await requestUrl(url);
   const parser = new DOMParser();
   const doc = parser.parseFromString(res.text, 'text/html');
   const readable = new Readability(doc, READBILITY_SETTINGS).parse();
   if (!readable) return null;
   const markdown = htmlToMarkdown(readable.content);
   const site: ISite = { ...readable, markdown, url };
   console.log(' ');
   console.log(site.excerpt);
   return site;
}
