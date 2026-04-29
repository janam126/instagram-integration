import InstagramFeed from '@/components/InstagramFeed';

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-10 text-center text-2xl font-semibold tracking-tight text-zinc-900">
          Instagram
        </h1>
        <InstagramFeed />
      </div>
    </main>
  );
}
