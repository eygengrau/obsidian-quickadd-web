interface ISite {
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
