import { registerUser } from '@renderer/entities/auth/api/authApi'
import { UserDto } from '@renderer/entities/auth/api/types'
import { Button } from '@renderer/shared/ui/Button/Button'
import Form from '@renderer/shared/ui/Form/Form'
import { FormField } from '@renderer/shared/ui/Form/types'
import { useState } from 'react'

const FORM_FIELD_LIST: FormField[] = [
  { displayName: '계정', registerName: 'account' },
  { displayName: '비밀번호', registerName: 'password', type: 'password' },
  { displayName: '이름', registerName: 'name' }
]

interface RegisterFormProps {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>
}

export function RegisterForm(props: RegisterFormProps) {
  const { setIsRegistering } = props

  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(data: UserDto) {
    const res = await registerUser(data)

    // 중복 계정인 경우
    if (res?.status === 400) {
      setErrorMsg(res?.data.message)
      return
    }

    // 정상 회원가입
    if (res?.status === 200) {
      alert('회원가입이 완료 되었습니다.')
      setIsRegistering(false)
    }
  }

  return (
    <div>
      <Form fieldList={FORM_FIELD_LIST} onSubmit={onSubmit}>
        <Button colorScheme="blue" type="submit" className="ml-auto ">
          회원가입
        </Button>
        {errorMsg && <p className="text-red-400">{errorMsg ?? ''}</p>}
      </Form>
    </div>
  )
}
