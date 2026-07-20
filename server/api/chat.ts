// server/api/chat.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const response = await $fetch("http://192.168.56.1:1234/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: {
      model: "google/gemma-3-12b",
      messages: [
        { role: "system", content: "Je bent een behulpzame AI." },
        { role: "user", content: body.message }
      ]
    }
  });

  return response;
});
