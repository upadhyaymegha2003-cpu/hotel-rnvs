import { NextRequest } from "next/server";
import QRCode from "qrcode";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params;
  const target =
    request.nextUrl.searchParams.get("target") ||
    `${request.nextUrl.origin}/room/${encodeURIComponent(roomId)}`;

  const svg = await QRCode.toString(target, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    width: 320,
    color: {
      dark: "#1E293B",
      light: "#FFFFFF",
    },
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store",
      "X-QR-Target": target,
    },
  });
}
