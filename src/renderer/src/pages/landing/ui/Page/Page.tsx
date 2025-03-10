import { LoginForm } from '@renderer/widget/LoginForm'
import { RegisterForm } from '@renderer/widget/RegisterForm'
import { useState } from 'react'

export function LandingPage() {
  const [isRegistering, setIsRegistering] = useState(false)

  return (
    <div className="bg-linear-to-r from-sky-600 to-pink-100 w-screen h-screen flex flex-col justify-center items-center">
      <div>{isRegistering ? <RegisterForm /> : <LoginForm />}</div>
      <button onClick={() => setIsRegistering((prev) => !prev)} className="mt-4 cursor-pointer">
        {isRegistering ? '로그인 하기' : '회원가입 하기'}{' '}
      </button>
    </div>
  )
}
