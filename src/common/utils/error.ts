export function getError<T extends Record<string, string>>(
  code: any,
  errorMap: T,
  fallbackCode: keyof T = 'SERVER_ERROR' as keyof T,
): string {
  const finalCode =
    code && typeof code === 'string' && code in errorMap
      ? (code as keyof T)
      : fallbackCode

  return errorMap[finalCode]
}
