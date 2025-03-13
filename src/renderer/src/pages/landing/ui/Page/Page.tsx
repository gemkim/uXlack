import { LoginForm } from '@renderer/widget/LoginForm'
import { RegisterForm } from '@renderer/widget/RegisterForm'
import { useState } from 'react'

export function LandingPage() {
  const [isRegistering, setIsRegistering] = useState(false)

  return (
    <div className="bg-linear-to-r from-sky-600 to-pink-100 w-screen h-screen flex flex-col justify-center items-center">
      <div className="bg-white min-w-[350px] min-h-[400px] px-4 py-8 rounded-sm shadow-md flex flex-col">
        <div className="flex-1">{isRegistering ? <RegisterForm /> : <LoginForm />}</div>
        <button
          onClick={() => setIsRegistering((prev) => !prev)}
          className="mt-auto mx-auto cursor-pointer text-sm text-sky-500 hover:text-sky-600 transition-colors"
        >
          {isRegistering ? '로그인' : '회원가입'}{' '}
        </button>
      </div>
    </div>
  )
}
