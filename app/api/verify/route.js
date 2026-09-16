export async function POST(request) {
  try {
    const body = await request.json();

    const { email, magicLink, orderId } = body;

    if (!email || !magicLink || !orderId) {
      return Response.json(
        {
          success: false,
          message: "Email, Magic Link, dan Order ID wajib diisi."
        },
        { status: 400 }
      );
    }

    const apiBase =
      process.env.AM_API_BASE_URL ||
      "https://motionapi.justlann.my.id";

    const response = await fetch(`${apiBase}/api/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        magicLink,
        orderId
      })
    });

    const data = await response.json();

    return Response.json(data, {
      status: response.status
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Gagal menghubungi server verifikasi.",
        error: error.message
      },
      { status: 500 }
    );
  }
}
