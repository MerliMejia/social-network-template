export const DECORATORS = [
  (Story) => (
    <div style={{ margin: '3em', backgroundColor: '#B43BC4' }}>
      <Story />
    </div>
  ),
]

export const WHITE_BG_DECORATOR = (Story) => (
  <div style={{ margin: '3em' }}>
    <Story />
  </div>
)
