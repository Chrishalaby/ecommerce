import { SupportedLanguages } from '@Enums/supported-languages.enum';

export interface Environment {
  production: boolean;
  defaultLanguage: SupportedLanguages;
  apiUrl: string;
}
