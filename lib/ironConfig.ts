const {IRON_PASSWORD} = process.env

const config =  {
  cookieName: "authToken",
  password: IRON_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  }
}

export default config