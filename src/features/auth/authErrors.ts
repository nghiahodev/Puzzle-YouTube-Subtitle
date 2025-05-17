import errors from '~/common/errors'

const authErrors = {
  REFRESH_TOKEN_REQUIRED: 'Vui lòng đăng nhập lại để tiếp tục.',
  GOOGLE_AUTH_FAILED: 'Không thể đăng nhập bằng Google. Vui lòng thử lại.',
  INVALID_PASSWORD: 'Mật khẩu bạn nhập chưa đúng.',
  INVALID_REFRESH_TOKEN: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  USERNAME_NOT_FOUND: 'Tài khoản không tồn tại.',
  USERNAME_ALREADY_EXISTS: 'Tài khoản đã được đăng ký.',
  ...errors,
}

export default authErrors
