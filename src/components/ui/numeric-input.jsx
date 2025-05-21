import { forwardRef } from 'react'
import { NumericFormat } from 'react-number-format'

import { Input } from './input'

const NumericInput = forwardRef((props, ref) => (
  <NumericFormat getInputRef={ref} customInput={Input} {...props} />
))

NumericInput.displayName = 'NumericInput'

export default NumericInput
