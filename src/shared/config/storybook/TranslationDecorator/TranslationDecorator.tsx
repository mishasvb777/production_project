import { StoryFn } from '@storybook/react';
import 'app/styles/index.scss';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';

export const TranslastionDecorator = (StoryComponent: StoryFn) => (
  <I18nextProvider i18n={i18nForTests}>
    <Suspense fallback="">
      <StoryComponent />
    </Suspense>    
  </I18nextProvider>
)