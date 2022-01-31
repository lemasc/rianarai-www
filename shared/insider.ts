import { GetServerSideProps } from "next";
import { withSession } from "./session";

export const portalAuthGaurd: GetServerSideProps = withSession(async (context) => {
  if (!context.req.session.portal?.user) {
    return {
      redirect: {
        destination: "/portal/signin",
        permanent: true,
      },
    };
  }
  return {
    props: {
      user: context.req.session.portal.user,
    },
  };
});
