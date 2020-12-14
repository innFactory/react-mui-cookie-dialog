// YourComponent.stories.tsx

import { Typography } from '@material-ui/core';
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

const categories: CookieDialogCategory[] = [
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

export const StringExample = Template.bind({});
StringExample.args = {
  visible: true,
  categories: categories,
  ...cookieDialogStringDefaultsGerman,
} as CookieDialogProps;

export const ComponentExample = Template.bind({});
ComponentExample.args = {
  visible: true,
  categories: categories,
  ...cookieDialogStringDefaultsGerman,
  optionsDialogDescriptionBelow: () => (
    <Typography>
      Detaillierte Informationen zu den Cookies und eingesetzten Tracking Tools
      können Sie unserer <a href="">Datenschutzerklärung</a> oder der{' '}
      <a href="">Cookie-Richtlinie</a> entnehmen. Sie können Ihre gesetzte
      Präferenz jederzeit anpassen, indem Sie diesen Cookie Manager über den
      Link in der Datenschutzerklärung aufrufen.
    </Typography>
  ),
} as CookieDialogProps;
