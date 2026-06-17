import 'resend';

const prerender = false;
const POST = async ({ request }) => {
  {
    console.error("[notify] RESEND_API_KEY not set — skipping email");
    return new Response(JSON.stringify({ ok: true, skipped: "no resend key" }), { status: 200 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
