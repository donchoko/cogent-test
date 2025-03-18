import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import StoreProvider from '../store/provider'
import { Place } from '../types/places';
import { MantineProvider } from '@mantine/core';


export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: {places?: Place[];},
  places: Place[],
) {
  const {
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => (
    <StoreProvider places={places}>
      <MantineProvider defaultColorScheme="auto">
        {children}
        </MantineProvider>
      </StoreProvider>
  )

  // Return an object with the store and all of RTL's query functions
  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}