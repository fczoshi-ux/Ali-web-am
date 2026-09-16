export async function POST(request) {
  try {
    const body = await request.json();
    const email = body?.email?.trim();

    if (!email) {
      return Response.json(
        { error: "Email wajib diisi" },
        { status: 400 }
      );
    }

    const apiBase =
      process.env.AM_API_BASE_URL ||
      "https://motionapi.justlann.my.id";

    const url =
      `${apiBase.replace(/\/$/, "")}/api/send?email=${encodeURIComponent(email)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    return Response.json(data, {
      status: response.status,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Gagal menghubungi server AM",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
