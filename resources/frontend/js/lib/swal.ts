"use client"

import Swal, { SweetAlertOptions, SweetAlertIcon } from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

type ToastType = "success" | "error" | "info" | "warning" | "question"

type ToastOptions = Omit<SweetAlertOptions, "text" | "html"> & {
  description?: string
  disableTimer?: boolean
  disableConfirmButton?: boolean
  showSpinner?: boolean
  // opsi baru: manualClose -> jika true, toast tidak otomatis hilang
  manualClose?: boolean
}

function showToast(
  type: ToastType,
  title: string,
  options: ToastOptions = {}
) {
  const { description, disableTimer, disableConfirmButton, showSpinner, manualClose, ...rest } = options

  return MySwal.fire({
    icon: type,
    title,
    text: description,
    position: "center",
    timer: manualClose ? undefined : disableTimer ? undefined : 1500,
    timerProgressBar: manualClose ? undefined : disableTimer ? undefined : true,
    showConfirmButton: disableConfirmButton ? false : true,
    didOpen: () => {
      if (showSpinner) {
        MySwal.showLoading()
      }
    },
    customClass: {
      popup: "glassmorphism-toast rounded-xl shadow-lg",
    },
    ...rest,
  })
}

const GlassmorphismToast = MySwal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timerProgressBar: true,
  showCloseButton: true,
  customClass: {
    popup: "glassmorphism-toast",
  },
})

function showGlassToast(
  type: SweetAlertIcon,
  title: string,
  options: ToastOptions = {}
) {
  const { description, manualClose, timer, customClass, ...rest } = options

  return GlassmorphismToast.fire({
    ...rest,
    icon: type,
    title,
    text: description,
    timer: manualClose ? undefined : timer ?? 1500,
    timerProgressBar: manualClose ? false : true,
    customClass: {
      ...(typeof customClass === 'object' ? customClass : {}),
      popup: `glassmorphism-toast swal2-toast-${type}`,
    },
  } as SweetAlertOptions)
}

// export const toast = {
//   success: (title: string, options?: ToastOptions) =>
//     showToast("success", title, options),
//   error: (title: string, options?: ToastOptions) =>
//     showToast("error", title, options),
//   info: (title: string, options?: ToastOptions) =>
//     showToast("info", title, options),
//   warning: (title: string, options?: ToastOptions) =>
//     showToast("warning", title, options),
// }

export const toast = {
  success: (title: string, options?: ToastOptions) =>
    showGlassToast("success", title, options),
  error: (title: string, options?: ToastOptions) =>
    showGlassToast("error", title, options),
  info: (title: string, options?: ToastOptions) =>
    showGlassToast("info", title, options),
  warning: (title: string, options?: ToastOptions) =>
    showGlassToast("warning", title, options),
}