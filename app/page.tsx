import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Link
        href="/login"
        className="px-6 py-3 bg-black text-white rounded"
      >
        Go to Login
      </Link>
    </div>
  )
}
