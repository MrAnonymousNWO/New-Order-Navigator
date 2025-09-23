export default function Home() {
  return (
    <div className="flex h-full flex-col bg-background">
      <iframe
        src="https://electric-paradise.start.page"
        title="Electric Paradise Startpage"
        className="h-full w-full border-0"
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
