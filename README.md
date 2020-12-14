# React Material Ui Cookie Dialog

A simple solution for a GDPR compliant Cookie dialog.

## Example

```tsx
import { Typography } from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  CookieDialog,
  CookieDialogCategory,
  cookieDialogStringDefaultsGerman,
} from 'react-mui-cookie-dialog';

const categories: CookieDialogCategory[] = [
  {
    key: 'necessary',
    title: 'Necessary Cookies',
    description: 'Necessary Cookie description.',
    isNecessary: true,
  },
  {
    key: 'analytics',
    title: 'Analytics & Personalization',
    description: 'Analytics Cookie description.',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    description: 'Marketing Cookie description.',
  },
];

const App = () => {
  const [cookieDialogVisible, setCookieDialogVisible] = React.useState(true);

  const handleAccept = (acceptedCategories: CookieDialogCategory[]) => {
    // Do something with the accepted categories
    setCookieDialogVisible(false);
  };

  return (
    <div>
      <CookieDialog
        visible={cookieDialogVisible}
        categories={categories}
        onAccept={handleAccept}
        // You can use the german pre defined strings but for every
        // other language you will have to define the strings yourself.
        {...cookieDialogStringDefaultsGerman}
        // Every string can be replaced with a function component like this
        mainDialogTitle={() => <Typography>Example title</Typography>}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

```