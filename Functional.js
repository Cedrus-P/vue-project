import { h } from 'vue'

const Heading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

Heading.props = ['level']

export default Heading
