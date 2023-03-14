import { withIronSessionApiRoute } from "iron-session/next";
import config from "@/lib/ironConfig";

export default withIronSessionApiRoute(
  function logoutRoute(req, res, session) {
    req.session.destroy();
    res.send({ ok: true });
  }, config
);