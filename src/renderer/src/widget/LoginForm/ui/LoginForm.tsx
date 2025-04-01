import { loginUser } from '@renderer/entities/auth/api/authApi'
import { UserDto } from '@renderer/entities/auth/api/types'
import { useAuthActions } from '@renderer/entities/auth/model/slices'
import { Button } from '@renderer/shared/ui/Button/Button'
import Form from '@renderer/shared/ui/Form/Form'
import { FormField } from '@renderer/shared/ui/Form/types'
import { useState } from 'react'

const FORM_FIELD_LIST: FormField[] = [
  { displayName: '계정', registerName: 'account' },
  { displayName: '비밀번호', registerName: 'password', type: 'password' }
]

export default function LoginForm() {
  const { setProfile } = useAuthActions()
  const [errorMsg, setErrorMsg] = useState('')

  // 아직 제대로된 db가 없기때문에 임시 코드임
  async function onSubmit(data: UserDto) {
    const res = await loginUser(data)

    if (res.status !== 200) {
      setErrorMsg(res.data.message)
      return
    }

    if (res.status === 200) {
      setErrorMsg('')
      setProfile(res.data.user.profile)
    }
    // const existUser = res.data[0] as UserDto

    // if (existUser.password === data.password) {
    //   setUser(existUser)
    // } else {
    //   alert('비밀번호가 일치하지 않습니다.')
    // }
  }

  return (
    <div className="h-full">
      <Form fieldList={FORM_FIELD_LIST} onSubmit={onSubmit}>
        <Button colorScheme="blue" type="submit" className="mt-auto ml-auto">
          로그인
        </Button>
        {errorMsg && <p className="text-red-400">{errorMsg ?? ''}</p>}
      </Form>
    </div>
  )
}
