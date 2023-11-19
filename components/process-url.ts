// import SampleModal from './modal';
import { App, requestUrl, htmlToMarkdown } from 'obsidian';
import { Readability } from '@mozilla/readability';

export interface GetSiteParams {
   url: string;
   selection?: string;
   useReadbility: boolean;
}

export interface Site {
   // url of site
   url: string;
   // article title
   title: string;
   // HTML string of processed article content
   content: string;
   // text content of the article, with all the HTML tags removed
   textContent: string;
   // length of an article, in characters
   length: number;
   // article description, or short excerpt from the content
   excerpt: string;
   // author metadata
   byline: string;
   // content direction
   dir: string;
   // name of the site
   siteName: string;
   // content language
   lang: string;
   // published time
   publishedTime?: string;
   // markdown of content
   markdown: string;
}

export async function processUrl(app: App, params: GetSiteParams) {
   const { url, selection } = params;
   console.log('app:', app);
   console.log('url:', url);
   console.log('selection:', selection);
   const res = await requestUrl(url);
   const parser = new DOMParser();
   const doc = parser.parseFromString(res.text, 'text/html');
   const readable = new Readability(doc).parse();
   if (!readable) return null;
   const markdown = htmlToMarkdown(readable.content);
   const site: Site = { ...readable, markdown, url };
   console.log(' ');
   console.log(site.excerpt);
   return site;
}
