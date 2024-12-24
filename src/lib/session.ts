/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";
import { lucia } from "./lucia";

export const getUser = async () => {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) return null;

  try {
    const { user, session } = await lucia.validateSession(sessionId);

    // console.log("user", user);
    if (!user) return null;

    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    return user;
  } catch (_) {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return null;
};

export const getUserId = async () => {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;

  const { user, session } = await lucia.validateSession(sessionId);

  if (!user) return null;

  return user.id;
}