import { z } from 'zod'

const usernameSchema = z
  .string()
  .min(6, 'Tên đăng nhập phải ít nhất 6 ký tự')
  .regex(/^[a-zA-Z0-9]+$/, 'Tên đăng nhập chỉ chứa chữ cái và số')

const passwordSchema = z
  .string()
  .min(6, 'Mật khẩu phải ít nhất 6 ký tự')
  .regex(/[a-zA-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái')
  .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất một chữ số')

const register = z.object({
  name: z.string().min(1, 'Tên không được để trống'),
  username: usernameSchema,
  password: passwordSchema,
})

const login = z.object({
  username: usernameSchema,
  password: passwordSchema,
})

export type LoginInput = z.input<typeof login>
export type LoginBody = LoginInput
export type RegisterInput = z.input<typeof register>
export type RegisterBody = RegisterInput

const authSchemas = {
  register,
  login,
}

export default authSchemas
