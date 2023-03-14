import type { User } from "@/types";

declare module "iron-session" {
  interface IronSessionData {
    user?: User
  }
}