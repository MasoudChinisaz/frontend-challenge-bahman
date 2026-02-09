export type LoginResponse = {
  id: number
  username: string
  email: string
  token: string
}

export async function loginUser(username: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Login failed')
  }

  return (await res.json()) as LoginResponse
}
