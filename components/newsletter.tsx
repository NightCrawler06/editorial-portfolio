"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function Newsletter() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      setStatus("error");
      setFeedback(result.error ?? "Unable to send message right now.");
      return;
    }

    form.reset();
    setStatus("sent");
    setFeedback("Message sent. I will get back to you soon.");
  }

  return (
    <section
      id="contact"
      className="section-reveal mono-noise border-t border-line px-4 py-24 sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.38em] text-muted">
            Transmission
          </span>
          <span className="h-px w-16 bg-line" />
          <span className="h-3 w-14 bg-[repeating-linear-gradient(115deg,#f5f5f5_0_2px,transparent_2px_6px)] opacity-80" />
        </div>

        <h2 className="font-display text-4xl uppercase leading-[0.88] text-white sm:text-6xl">
          Work with me
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-300">
          Send a project brief, collaboration idea, hiring inquiry, or anything
          you want to discuss.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 grid max-w-4xl gap-3 text-left"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="name">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="h-14 w-full border border-line bg-panel/70 px-5 text-sm text-white outline-none transition placeholder:text-muted/70 focus:border-white"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="contact-email">
                Email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="h-14 w-full border border-line bg-panel/70 px-5 text-sm text-white outline-none transition placeholder:text-muted/70 focus:border-white"
              />
            </div>
          </div>

          <label className="sr-only" htmlFor="message">
            What is this about?
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="What is this about? Tell me about the work, role, collaboration, or question."
            rows={5}
            required
            className="min-h-36 w-full resize-none border border-line bg-panel/70 px-5 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-muted/70 focus:border-white"
          />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              className={`min-h-5 text-xs ${
                status === "error" ? "text-red-300" : "text-muted"
              }`}
              role="status"
            >
              {feedback}
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="h-14 border border-white bg-white px-7 text-[10px] font-bold uppercase tracking-[0.24em] text-ink transition hover:bg-transparent hover:text-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send inquiry ->"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
