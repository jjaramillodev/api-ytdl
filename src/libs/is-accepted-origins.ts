export const isAcceptedOrigins = (origin: string | undefined, acceptedOrigins: string[]): boolean => {
  return acceptedOrigins.includes('*') ||
    (
      !!origin &&
      acceptedOrigins.includes(origin)
    )
}
