import {
  Id,
  toast,
  ToastContent,
  ToastOptions,
  TypeOptions,
} from 'react-toastify'

const defaultToastConfig: ToastOptions = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeButton: true,
  closeOnClick: true,
}

const info = (message: ToastContent) => {
  toast.info(message, defaultToastConfig)
}
const success = (message: ToastContent) => {
  toast.success(message, defaultToastConfig)
}

const warning = (message: ToastContent) => {
  toast.warn(message, defaultToastConfig)
}

const error = (message: ToastContent) => {
  toast.error(message, defaultToastConfig)
}

const loading = (message = 'Vui lòng chờ...') => {
  return toast.loading(message, {
    ...defaultToastConfig,
    autoClose: false,
    hideProgressBar: false,
  })
}

const update = (id: Id, message: ToastContent, type: TypeOptions) => {
  const finalMessage =
    type === 'error' && message === undefined
      ? 'Đã xảy ra lỗi. Vui lòng thử lại !'
      : message
  toast.update(id, {
    render: finalMessage,
    type: type,
    isLoading: false,
    ...defaultToastConfig,
  })
}

const stop = (id: Id) => {
  toast.dismiss(id)
}

const myToast = {
  info,
  success,
  warning,
  error,
  loading,
  update,
  stop,
}
export default myToast
