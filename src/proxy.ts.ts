export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/cuenta/:path*", "/admin/:path*"],
}