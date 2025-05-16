import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const PasswordInput = ({ placeholder = 'Digite sua senha' }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <Button
        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
        variant="ghost"
        onClick={() => setPasswordIsVisible((prev) => !prev)}
      >
        {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  )
}

export default PasswordInput
