import { DeepPartial } from '@reduxjs/toolkit';
import { Decorator, StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import 'app/styles/index.scss';

export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: StoryFn) => (
  <StoreProvider initialState={state}>
      <StoryComponent />
  </StoreProvider>
)