import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'

import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const theme = extendTheme({
  colors: {
    purple: {
      '50': '#F7EBF9',
      '100': '#EAC8EF',
      '200': '#DCA5E4',
      '300': '#CF81D9',
      '400': '#C15ECF',
      '500': '#B43BC4',
      '600': '#902F9D',
      '700': '#6C2376',
      '800': '#48184E',
      '900': '#240C27',
    },
    lavender: {
      '50': '#F2F1F3',
      '100': '#DBD8DF',
      '200': '#C4BFCA',
      '300': '#ADA6B5',
      '400': '#968DA0',
      '500': '#7F748B',
      '600': '#665D6F',
      '700': '#4C4554',
      '800': '#332E38',
      '900': '#19171C',
    },
    grullo: {
      '50': '#F4F2F1',
      '100': '#DFDBD8',
      '200': '#CAC4BF',
      '300': '#B6ADA5',
      '400': '#A1968C',
      '500': '#8C7F73',
      '600': '#70655C',
      '700': '#544C45',
      '800': '#38332E',
      '900': '#1C1917',
    },
    tumble: {
      '50': '#FAF1EB',
      '100': '#F0D9C6',
      '200': '#E7C1A2',
      '300': '#DEA87D',
      '400': '#D49059',
      '500': '#CB7834',
      '600': '#A2602A',
      '700': '#7A481F',
      '800': '#513015',
      '900': '#29180A',
    },
    rose: {
      '50': '#F5EFEF',
      '100': '#E3D3D3',
      '200': '#D2B7B7',
      '300': '#C09B9B',
      '400': '#AE7F7F',
      '500': '#9D6263',
      '600': '#7D4F50',
      '700': '#5E3B3C',
      '800': '#3F2728',
      '900': '#1F1414',
    },
  },
})

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth">
        <ColorModeScript />
        <ChakraProvider theme={theme}>
          <RedwoodApolloProvider>
            <Routes />
          </RedwoodApolloProvider>
        </ChakraProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
