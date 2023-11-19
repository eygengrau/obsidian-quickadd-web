import { App, PluginSettingTab, Setting } from 'obsidian';
import ObsidianQuickaddWeb from 'main';

export default class QuickaddWebSettingsTab extends PluginSettingTab {
   plugin: ObsidianQuickaddWeb;

   constructor(app: App, plugin: ObsidianQuickaddWeb) {
      super(app, plugin);
      this.plugin = plugin;
   }

   display(): void {
      const { containerEl } = this;

      containerEl.empty();

      new Setting(containerEl)
         .setName('Use Readability')
         .setDesc(`Use Mozillas Readability to declutter web content.`)
         .addToggle((toggle) =>
            toggle
               .setValue(this.plugin.settings.useReadability)
               .onChange(async (value) => {
                  this.plugin.settings.useReadability =
                     !this.plugin.settings.useReadability;
                  await this.plugin.saveSettings();
               })
         );
   }
}
