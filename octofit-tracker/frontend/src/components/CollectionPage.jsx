function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.length ? value.map(displayValue).join(', ') : '—'
  }

  if (typeof value === 'object') {
    return value.name ?? value.username ?? value.email ?? value._id ?? '—'
  }

  return String(value)
}

function CollectionPage({ columns, error, loading, rows, title }) {
  return (
    <section>
      <h1 className="page-title h2 mb-4">{title}</h1>

      {loading && (
        <div className="alert alert-info" role="status">
          Loading {title.toLowerCase()}…
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {!loading && !error && rows.length === 0 && (
        <div className="alert alert-secondary">No {title.toLowerCase()} found.</div>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="row g-3">
          {rows.map((row, index) => (
            <div className="col-12 col-md-6 col-xl-4" key={row._id ?? row.id ?? index}>
              <article className="card data-card shadow-sm">
                <div className="card-body">
                  <h2 className="card-title h5">
                    {displayValue(columns[0]?.value(row))}
                  </h2>
                  <dl className="mb-0">
                    {columns.slice(1).map((column) => (
                      <div key={column.label}>
                        <dt>{column.label}</dt>
                        <dd>{displayValue(column.value(row))}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CollectionPage
