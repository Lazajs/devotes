const {IRON_PASSWORD} = process.env

const config =  {
  cookieName: "myapp_cookiename",
  password: IRON_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  }
}

export default config