/**
 * Renders a schema.org JSON-LD block. Server-safe — emits a plain script tag
 * with the structured data serialised into it for crawlers to read.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, build-time content — not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
