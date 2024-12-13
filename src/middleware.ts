import { verifyRequestOrigin } from "lucia";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    if (req.method === "GET") {
        return NextResponse.next();
    }

	const originHeader = req.headers.get("Origin");
	const hostHeader = req.headers.get("Host");

    console.log(originHeader, hostHeader);

	if (
		!originHeader ||
		!hostHeader ||
		!verifyRequestOrigin(originHeader, [hostHeader])
	) {
		return NextResponse.json(
			{
				error: "Unauthorized",
			},
			{
                status: 401,
            }
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/home/:path*", "/create-link/:path*"],
};
