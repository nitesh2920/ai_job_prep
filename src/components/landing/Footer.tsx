export function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container">
        <div className="text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} VeloAI. Empowering your career journey with AI-powered job preparation tools.
          </p>
        </div>
      </div>
    </footer>
  )
}
