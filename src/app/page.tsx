import InstagramFeed from "@/components/InstagramFeed";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center bg-white px-12 py-16">
      <div className="max-w-[1400px] w-full mx-auto">
        <h1 className="mb-10 text-center text-3xl font-semibold tracking-tight text-zinc-900">
          Instagram Feed
        </h1>
        <InstagramFeed />
      </div>
    </main>
  );
}
