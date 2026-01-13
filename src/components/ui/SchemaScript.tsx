// Schema Script Component for JSON-LD structured data
// Injects JSON-LD schema markup into pages for SEO

export function SchemaScript({ schema }: { schema: object | object[] }) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
