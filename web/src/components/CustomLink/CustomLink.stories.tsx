import { WHITE_BG_DECORATOR } from 'src/utils/decorators'

import CustomLink from './CustomLink'

export default {
  title: 'Components/CustomLink',
  component: CustomLink,
  decorators: [WHITE_BG_DECORATOR],
}

export const Default = () => <CustomLink to="#">Some Text</CustomLink>
