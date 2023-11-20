import { Notice, Plugin } from 'obsidian';
import { Site, ISiteParams } from 'src/modules/site';
import QuickaddWebSettingsTab from './modules/settings-tab';

interface IQuickaddWebSettings {
   useReadability: boolean;
}

const DEFAULT_SETTINGS: IQuickaddWebSettings = {
   useReadability: true,
};

export default class ObsidianQuickaddWeb extends Plugin {
   settings: IQuickaddWebSettings;
   quickadd: IQuickAddAPI;

   async executeChoice(params: IParams) {
      const site = await Site.get(this.app, params as unknown as ISiteParams);
      this.quickadd.executeChoice(params.choice, { ...site });
   }

   async onload() {
      await this.loadSettings();
      this.addSettingTab(new QuickaddWebSettingsTab(this.app, this));

      this.app.workspace.onLayoutReady(() => {
         //@ts-ignore: plugins exists
         const quickadd = this.app.plugins.plugins.quickadd.api as QuickAddAPI;
         if (!quickadd) return new Notice('Quickadd not found');
         this.quickadd = quickadd;
      });

      this.registerObsidianProtocolHandler('quickadd-web', async (params) => {
         if (params.action !== 'quickadd-web') return;
         this.executeChoice(params as unknown as IParams);
      });

      // This adds a simple command that can be triggered anywhere
      this.addCommand({
         id: 'quickadd-web-page',
         name: 'Create new note from URL',
         callback: async () => {
            this.executeChoice({
               choice: 'Test',
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
