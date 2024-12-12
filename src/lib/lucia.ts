import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "../../prisma/prismaProvider";
import { Lucia, TimeSpan } from "lucia";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production"
		},
	},
	sessionExpiresIn: new TimeSpan(1, "w"),
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}