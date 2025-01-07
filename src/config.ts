import 'dotenv/config'

const { ACCEPTED_ORIGINS } = process.env

export const acceptedOrigins: string[] = ACCEPTED_ORIGINS?.split(',') ?? []
