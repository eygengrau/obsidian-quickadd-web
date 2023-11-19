// https://quickadd.obsidian.guide/docs/QuickAddAPI

interface IQuickAddAPI {
   inputPrompt: (
      header: string,
      placeholder?: string,
      value?: string
   ) => Promise<string>;
   wideInputPrompt: (
      header: string,
      placeholder?: string,
      value?: unknown
   ) => Promise<string>;
   yesNoPrompt: (header: string, text?: string) => Promise<boolean>;
   infoDialog: (header: string, text: string[] | string) => Promise<void>;
   suggester: (
      displayItems:
         | string[]
         | ((value: string, index?: number, arr?: string[]) => string[]),
      actualItems: string[]
   ) => Promise<string>;
   checkboxPrompt: (
      items: string[],
      selectedItems: string[]
   ) => Promise<string[]>;
   executeChoice: (
      choiceName: string,
      variables?: { [key: string]: unknown }
   ) => Promise<unknown>;
   utility: {
      getClipboard(): Promise<string>;
      setClipboard(text: string): Promise<void>;
   };
   date: {
      now: (format?: string, offset?: number) => string;
      tomorrow: (format?: string) => string;
      yesterday: (format?: string) => string;
   };
   ai: {
      prompt: (
         prompt: string,
         model: unknown, // Model
         settings?: Partial<{
            variableName: string;
            shouldAssignVariables: boolean;
            modelOptions: unknown; //Partial<OpenAIModelParameters>
            showAssistantMessages: boolean;
            systemPrompt: string;
         }>
      ) => Promise<{ [key: string]: string }>;
      getModels: () => unknown; // Model[];
      getMaxTokens: (model: unknown /*Model*/) => number;
      countTokens: (text: string, model: unknown /*Model*/) => number;
   };
}
