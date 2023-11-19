import { App, Notice, Plugin } from 'obsidian';
import QuickaddWebSettingsTab from './modules/settings-tab';
import { getSite, IGetSiteParams } from 'src/modules/get-site';

interface IQuickaddWebSettings {
   useReadability: boolean;
}

const DEFAULT_SETTINGS: IQuickaddWebSettings = {
   useReadability: true,
};

export default class ObsidianQuickaddWeb extends Plugin {
   settings: IQuickaddWebSettings;
   quickadd: IQuickAddAPI;
   getSite: (app: App, params: IGetSiteParams) => Promise<ISite | null>;

   async onload() {
      this.getSite = getSite;
      await this.loadSettings();
      this.addSettingTab(new QuickaddWebSettingsTab(this.app, this));

      this.app.workspace.onLayoutReady(() => {
         //@ts-ignore: plugins exists
         const qaApi = this.app.plugins.plugins.quickadd.api as QuickAddAPI;
         if (!qaApi) return new Notice('Quickadd not found');
         this.quickadd = qaApi;
      });

      this.registerObsidianProtocolHandler('quickadd-web', async (params) => {
         if (params.action !== 'quickadd-web') return;
         const { url, selection } = params;
         const useReadbility = true; // get from settings!!!!
         await getSite(this.app, { url, selection, useReadbility });
      });

      // This adds a simple command that can be triggered anywhere
      this.addCommand({
         id: 'quickadd-web-page',
         name: 'Create new note from URL',
         callback: () => {
            this.getSite(this.app, {
               url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:has',
               useReadbility: true,
            });
         },
      });
   }

   onunload() {}

   async loadSettings() {
      this.settings = Object.assign(
         {},
         DEFAULT_SETTINGS,
         await this.loadData()
      );
   }

   async saveSettings() {
      await this.saveData(this.settings);
   }
}
