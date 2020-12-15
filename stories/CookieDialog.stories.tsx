// YourComponent.stories.tsx

import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
  CookieDialog,
  CookieDialogCategory,
  CookieDialogProps,
  cookieDialogStringDefaultsGerman,
} from '../src/index';

export default {
  title: 'CookieDialog',
  component: CookieDialog,
};

const Template: Story<CookieDialogProps> = args => <CookieDialog {...args} />;

const germanCategories: CookieDialogCategory[] = [
  {
    key: 'necessary',
    title: 'Erforderliche Cookies',
    description:
      'Erforderliche Cookies helfen dabei, eine Website nutzbar zu machen, in dem sie Grundfunktionen ' +
      'wie Seitennavigation und Zugriff auf sichere Bereiche der Website ermöglichen. ' +
      'Die Website kann ohne diese Cookies nicht richtig funktionieren.',
    isNecessary: true,
  },
  {
    key: 'analytics',
    title: 'Analytics & Personalisierung',
    description:
      'Diese Cookies werden genutzt, um Funktionen der Website zuzulassen, die Ihnen eine möglichst ' +
      'komfortable und auf Ihre Interessen zugeschnittene Nutzung ermöglichen. Des Weiteren hilft ' +
      'uns die Analyse des Nutzerverhaltens ebenfalls, die Qualität unserer Webseite fortlaufend zu verbessern.',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    description:
      'Wir nutzen diese Cookies, um Ihnen auf Ihre Interessen zugeschnittene Werbung anzuzeigen, ' +
      'innerhalb und außerhalb dieser Webseite.',
  },
];
const englishCategories: CookieDialogCategory[] = [
  {
    key: 'necessary',
    title: 'Necessary Cookies',
    description: 'Description',
    isNecessary: true,
  },
  {
    key: 'analytics',
    title: 'Analytics & Personalisation',
    description: 'Description',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    description: 'Description',
  },
];

export const GermanExample = Template.bind({});
GermanExample.args = {
  visible: true,
  categories: germanCategories,
  ...cookieDialogStringDefaultsGerman,
} as CookieDialogProps;

export const EnglishExample = Template.bind({});
EnglishExample.args = {
  visible: true,
  categories: englishCategories,
  mainDialogTitle: 'Cookies',
  mainDialogDescription: 'We use cookies... Legal text...',
  mainDialogOptions: 'Settings',
  mainDialogAccept: 'Accept and continue',
  optionsDialogTitle: 'Your Cookie settings for this Website',
  optionsDialogDescriptionAbove: 'Some text above',
  optionsDialogDescriptionBelow: 'Some more text below',
  optionsDialogSave: 'Save choice',
  optionsDialogAccept: 'Accept all',
} as CookieDialogProps;
