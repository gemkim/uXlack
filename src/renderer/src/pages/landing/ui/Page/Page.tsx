import { RegisterForm } from '@renderer/widget/RegisterForm'

export function LandingPage() {
  return (
    <div className="bg-linear-to-r from-sky-600 to-pink-100 w-screen h-screen flex justify-center items-center">
      <div>
        <RegisterForm />
      </div>
    </div>
  )
}
